"use client";

import { useCallback, useMemo } from "react";
import {
	checkMilestoneReached,
	getMilestoneMessage,
	getNextMilestone,
} from "@/lib/milestone-utils";
import type { MilestoneCheck } from "@/types/habit";
import { useLocalStorage } from "./use-local-storage";

const STORAGE_KEY = "kusa-hayasu:milestones";

/** マイルストーン検出と祝い済みマークを提供するフック */
export function useMilestone(habitId: string, streak: number) {
	const [milestoneChecks, setMilestoneChecks] = useLocalStorage<
		MilestoneCheck[]
	>(STORAGE_KEY, []);

	// この習慣のチェック済みマイルストーン
	const habitChecks = useMemo(
		() => milestoneChecks.filter((m) => m.habitId === habitId),
		[milestoneChecks, habitId],
	);

	// 新たに達成されたマイルストーン（未祝い）
	const currentMilestone = useMemo(
		() => checkMilestoneReached(streak, habitChecks, habitId),
		[streak, habitChecks, habitId],
	);

	// 次のマイルストーン
	const nextMilestone = useMemo(() => getNextMilestone(streak), [streak]);

	// マイルストーンメッセージ
	const milestoneMessage = useMemo(
		() => (currentMilestone ? getMilestoneMessage(currentMilestone) : null),
		[currentMilestone],
	);

	// 祝い済みにマークする
	const celebrate = useCallback(() => {
		if (currentMilestone === null) return;
		const check: MilestoneCheck = {
			habitId,
			milestone: currentMilestone,
			celebratedAt: new Date().toISOString(),
		};
		setMilestoneChecks((prev) => [...prev, check]);
	}, [habitId, currentMilestone, setMilestoneChecks]);

	return { currentMilestone, nextMilestone, milestoneMessage, celebrate };
}
