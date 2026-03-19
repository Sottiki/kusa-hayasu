import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Habit, HabitRecord } from "@/types/habit";
import { ActivityList } from "./activity-list";

const habits: Habit[] = [
	{
		id: "1",
		name: "ランニング",
		color: "#22c55e",
		animationPattern: "festival",
		createdAt: "2024-01-01T00:00:00Z",
		order: 0,
	},
	{
		id: "2",
		name: "読書",
		color: "#3b82f6",
		animationPattern: "toast",
		createdAt: "2024-01-01T00:00:00Z",
		order: 1,
	},
];

const records: HabitRecord[] = [
	{
		id: "r1",
		habitId: "1",
		date: "2024-01-01",
		completed: true,
		createdAt: "2024-01-01T00:00:00Z",
	},
	{
		id: "r2",
		habitId: "1",
		date: "2024-01-02",
		completed: true,
		createdAt: "2024-01-02T00:00:00Z",
	},
];

describe("ActivityList", () => {
	it("全習慣名を表示する", () => {
		render(
			<ActivityList habits={habits} records={records} today="2024-01-03" />,
		);
		expect(screen.getByText("ランニング")).toBeInTheDocument();
		expect(screen.getByText("読書")).toBeInTheDocument();
	});

	it("習慣が0件の場合はメッセージを表示する", () => {
		render(<ActivityList habits={[]} records={[]} today="2024-01-03" />);
		expect(screen.getByText(/習慣がありません/)).toBeInTheDocument();
	});

	it("連続日数を表示する", () => {
		render(
			<ActivityList habits={habits} records={records} today="2024-01-02" />,
		);
		// habitId=1 は 2日連続
		expect(screen.getByText(/2日/)).toBeInTheDocument();
	});
});
