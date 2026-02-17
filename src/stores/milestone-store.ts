import type { MilestoneCheck } from "@/types/habit";

const STORAGE_KEY = "kusa-hayasu:milestones";

/** 全マイルストーンチェックを取得する（内部用） */
function readAll(storage: Storage): MilestoneCheck[] {
	const raw = storage.getItem(STORAGE_KEY);
	if (!raw) return [];
	return JSON.parse(raw) as MilestoneCheck[];
}

/** 指定した習慣のマイルストーンチェックを取得する */
export function getMilestoneChecks(
	storage: Storage,
	habitId: string,
): MilestoneCheck[] {
	return readAll(storage).filter((m) => m.habitId === habitId);
}

/** マイルストーンチェックを保存する（お祝い済みとしてマーク） */
export function saveMilestoneCheck(
	storage: Storage,
	check: MilestoneCheck,
): void {
	const all = readAll(storage);
	storage.setItem(STORAGE_KEY, JSON.stringify([...all, check]));
}
