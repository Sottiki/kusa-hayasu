import type { AnimationPattern, Habit } from "@/types/habit";

const STORAGE_KEY = "kusa-hayasu:habits";

/** ストレージから習慣一覧を取得する */
export function getHabits(storage: Storage): Habit[] {
	const raw = storage.getItem(STORAGE_KEY);
	if (!raw) return [];
	return JSON.parse(raw) as Habit[];
}

/** 習慣一覧をストレージに保存する */
export function saveHabits(storage: Storage, habits: Habit[]): void {
	storage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

/** 新しい習慣を追加する */
export function addHabit(
	storage: Storage,
	data: { name: string; color: string; animationPattern: AnimationPattern },
): Habit {
	const habits = getHabits(storage);
	const maxOrder =
		habits.length > 0 ? Math.max(...habits.map((h) => h.order)) + 1 : 0;

	const habit: Habit = {
		id: crypto.randomUUID(),
		name: data.name,
		color: data.color,
		animationPattern: data.animationPattern,
		createdAt: new Date().toISOString(),
		order: maxOrder,
	};

	saveHabits(storage, [...habits, habit]);
	return habit;
}

/** 習慣を更新する */
export function updateHabit(
	storage: Storage,
	id: string,
	updates: Partial<Pick<Habit, "name" | "color" | "animationPattern">>,
): Habit {
	const habits = getHabits(storage);
	const index = habits.findIndex((h) => h.id === id);
	if (index === -1) {
		throw new Error(`習慣が見つかりません: ${id}`);
	}

	const updated = { ...habits[index], ...updates };
	habits[index] = updated;
	saveHabits(storage, habits);
	return updated;
}

/** 習慣をアーカイブする */
export function archiveHabit(storage: Storage, id: string): void {
	const habits = getHabits(storage);
	const index = habits.findIndex((h) => h.id === id);
	if (index === -1) return;

	habits[index] = { ...habits[index], archivedAt: new Date().toISOString() };
	saveHabits(storage, habits);
}

/** 習慣を完全に削除する */
export function deleteHabit(storage: Storage, id: string): void {
	const habits = getHabits(storage).filter((h) => h.id !== id);
	saveHabits(storage, habits);
}
