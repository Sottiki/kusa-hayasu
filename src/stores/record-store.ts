import type { HabitRecord } from "@/types/habit";

const STORAGE_KEY = "kusa-hayasu:records";

/** 全レコードを取得する（内部用） */
function readAll(storage: Storage): HabitRecord[] {
	const raw = storage.getItem(STORAGE_KEY);
	if (!raw) return [];
	return JSON.parse(raw) as HabitRecord[];
}

/** 全レコードを保存する（内部用） */
function writeAll(storage: Storage, records: HabitRecord[]): void {
	storage.setItem(STORAGE_KEY, JSON.stringify(records));
}

/** 指定した習慣のレコードを取得する */
export function getRecords(storage: Storage, habitId: string): HabitRecord[] {
	return readAll(storage).filter((r) => r.habitId === habitId);
}

/** 全習慣のレコードを取得する */
export function getAllRecords(storage: Storage): HabitRecord[] {
	return readAll(storage);
}

/** 指定した日付の記録をトグルする。レコードがなければ新規作成（completed=true） */
export function toggleRecord(
	storage: Storage,
	habitId: string,
	date: string,
): HabitRecord {
	const all = readAll(storage);
	const index = all.findIndex((r) => r.habitId === habitId && r.date === date);

	if (index === -1) {
		// 新規作成
		const record: HabitRecord = {
			id: crypto.randomUUID(),
			habitId,
			date,
			completed: true,
			createdAt: new Date().toISOString(),
		};
		writeAll(storage, [...all, record]);
		return record;
	}

	// 既存レコードのトグル
	const toggled = { ...all[index], completed: !all[index].completed };
	all[index] = toggled;
	writeAll(storage, all);
	return toggled;
}
