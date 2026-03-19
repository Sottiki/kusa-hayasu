"use client";

import type { HabitRecord } from "@/types/habit";
import { useLocalStorage } from "./use-local-storage";

const STORAGE_KEY = "kusa-hayasu:records";

/** 全習慣のレコードを返すフック（アクティビティ一覧用） */
export function useRecordsAll() {
	const [records] = useLocalStorage<HabitRecord[]>(STORAGE_KEY, []);
	return { records };
}
