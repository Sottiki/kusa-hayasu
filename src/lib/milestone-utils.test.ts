import { describe, expect, it } from "vitest";
import type { MilestoneCheck } from "@/types/habit";
import {
	checkMilestoneReached,
	getMilestoneMessage,
	getMilestones,
	getNextMilestone,
} from "./milestone-utils";

describe("getMilestones", () => {
	it("正しいマイルストーン配列を返す", () => {
		const milestones = getMilestones();
		// 初期は密に: 3, 7, 14, 30
		expect(milestones.slice(0, 4)).toEqual([3, 7, 14, 30]);
		// 以降は30日ごと: 60, 90, 120...
		expect(milestones).toContain(60);
		expect(milestones).toContain(90);
		expect(milestones).toContain(120);
		// 365日は含まれる
		expect(milestones).toContain(365);
	});

	it("昇順にソートされている", () => {
		const milestones = getMilestones();
		for (let i = 1; i < milestones.length; i++) {
			expect(milestones[i]).toBeGreaterThan(milestones[i - 1]);
		}
	});
});

describe("getNextMilestone", () => {
	it("streak 0 の場合は最初のマイルストーンを返す", () => {
		expect(getNextMilestone(0)).toBe(3);
	});

	it("streak 3 の場合は次の7を返す", () => {
		expect(getNextMilestone(3)).toBe(7);
	});

	it("streak 5 の場合は次の7を返す", () => {
		expect(getNextMilestone(5)).toBe(7);
	});

	it("streak 365 の場合はnullを返す（最後のマイルストーン達成済み）", () => {
		expect(getNextMilestone(365)).toBeNull();
	});
});

describe("checkMilestoneReached", () => {
	it("マイルストーンに到達し未祝いの場合はマイルストーン番号を返す", () => {
		const result = checkMilestoneReached(7, [], "habit-1");
		expect(result).toBe(7);
	});

	it("マイルストーンに到達していない場合はnullを返す", () => {
		const result = checkMilestoneReached(2, [], "habit-1");
		expect(result).toBeNull();
	});

	it("すでに祝い済みの場合はnullを返す", () => {
		const celebrated: MilestoneCheck[] = [
			{
				habitId: "habit-1",
				milestone: 7,
				celebratedAt: new Date().toISOString(),
			},
		];
		const result = checkMilestoneReached(7, celebrated, "habit-1");
		expect(result).toBeNull();
	});

	it("別の習慣の祝い済みは影響しない", () => {
		const celebrated: MilestoneCheck[] = [
			{
				habitId: "habit-2",
				milestone: 7,
				celebratedAt: new Date().toISOString(),
			},
		];
		const result = checkMilestoneReached(7, celebrated, "habit-1");
		expect(result).toBe(7);
	});

	it("streak 30 で 3, 7, 14 が祝い済みの場合は30を返す", () => {
		const celebrated: MilestoneCheck[] = [
			{
				habitId: "habit-1",
				milestone: 3,
				celebratedAt: new Date().toISOString(),
			},
			{
				habitId: "habit-1",
				milestone: 7,
				celebratedAt: new Date().toISOString(),
			},
			{
				habitId: "habit-1",
				milestone: 14,
				celebratedAt: new Date().toISOString(),
			},
		];
		const result = checkMilestoneReached(30, celebrated, "habit-1");
		expect(result).toBe(30);
	});
});

describe("getMilestoneMessage", () => {
	it("マイルストーンに対応するメッセージを返す", () => {
		const message = getMilestoneMessage(3);
		expect(typeof message).toBe("string");
		expect(message.length).toBeGreaterThan(0);
	});

	it("365日の場合は特別なメッセージを返す", () => {
		const message = getMilestoneMessage(365);
		expect(typeof message).toBe("string");
		expect(message.length).toBeGreaterThan(0);
	});
});
