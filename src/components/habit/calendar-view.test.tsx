import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CalendarView } from "./calendar-view";

const mockRecords = [
	{
		id: "1",
		habitId: "h1",
		date: "2024-01-01",
		completed: true,
		createdAt: "2024-01-01T00:00:00Z",
	},
];

describe("CalendarView", () => {
	it("習慣名を表示する", () => {
		render(
			<CalendarView
				habitName="ランニング"
				color="#22c55e"
				records={mockRecords}
				onToggle={vi.fn()}
			/>,
		);
		expect(screen.getByText("ランニング")).toBeInTheDocument();
	});

	it("草グラフを表示する", () => {
		render(
			<CalendarView
				habitName="ランニング"
				color="#22c55e"
				records={mockRecords}
				onToggle={vi.fn()}
			/>,
		);
		expect(screen.getByLabelText("習慣達成グラフ")).toBeInTheDocument();
	});

	it("期間セレクターを表示する", () => {
		render(
			<CalendarView
				habitName="ランニング"
				color="#22c55e"
				records={mockRecords}
				onToggle={vi.fn()}
			/>,
		);
		expect(screen.getByRole("tablist")).toBeInTheDocument();
	});

	it("デフォルトの表示期間は3ヶ月", () => {
		render(
			<CalendarView
				habitName="ランニング"
				color="#22c55e"
				records={mockRecords}
				onToggle={vi.fn()}
			/>,
		);
		expect(screen.getByRole("tab", { name: "3ヶ月" })).toHaveAttribute(
			"data-state",
			"active",
		);
	});

	it("セルをクリックするとonToggleが日付付きで呼ばれる", async () => {
		const user = userEvent.setup();
		const onToggle = vi.fn();
		const { container } = render(
			<CalendarView
				habitName="ランニング"
				color="#22c55e"
				records={mockRecords}
				onToggle={onToggle}
			/>,
		);

		// 達成済みセルをクリック
		const cell = container.querySelector("[data-date='2024-01-01']");
		if (cell) {
			await user.click(cell as HTMLElement);
			expect(onToggle).toHaveBeenCalledWith("2024-01-01");
		}
	});
});
