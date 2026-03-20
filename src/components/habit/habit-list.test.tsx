import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Habit } from "@/types/habit";
import { HabitList } from "./habit-list";

const mockArchivedHabits: Habit[] = [
	{
		id: "3",
		name: "瞑想",
		color: "#a855f7",
		animationPattern: "grass-burst",
		createdAt: "2024-01-01T00:00:00Z",
		archivedAt: "2024-06-01T00:00:00Z",
		order: 2,
	},
];

const mockHabits: Habit[] = [
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

describe("HabitList", () => {
	it("習慣の一覧を表示する", () => {
		render(
			<HabitList
				habits={mockHabits}
				onEdit={vi.fn()}
				onArchive={vi.fn()}
				onDelete={vi.fn()}
			/>,
		);
		expect(screen.getByText("ランニング")).toBeInTheDocument();
		expect(screen.getByText("読書")).toBeInTheDocument();
	});

	it("習慣が0件のときメッセージを表示する", () => {
		render(
			<HabitList
				habits={[]}
				onEdit={vi.fn()}
				onArchive={vi.fn()}
				onDelete={vi.fn()}
			/>,
		);
		expect(screen.getByText(/習慣がありません/)).toBeInTheDocument();
	});

	it("編集ボタンをクリックするとonEditが呼ばれる", async () => {
		const user = userEvent.setup();
		const onEdit = vi.fn();
		render(
			<HabitList
				habits={mockHabits}
				onEdit={onEdit}
				onArchive={vi.fn()}
				onDelete={vi.fn()}
			/>,
		);

		await user.click(screen.getAllByRole("button", { name: "編集" })[0]);
		expect(onEdit).toHaveBeenCalledWith(mockHabits[0]);
	});

	it("アーカイブボタンをクリックするとonArchiveが呼ばれる", async () => {
		const user = userEvent.setup();
		const onArchive = vi.fn();
		render(
			<HabitList
				habits={mockHabits}
				onEdit={vi.fn()}
				onArchive={onArchive}
				onDelete={vi.fn()}
			/>,
		);

		await user.click(screen.getAllByRole("button", { name: "アーカイブ" })[0]);
		expect(onArchive).toHaveBeenCalledWith("1");
	});

	it("削除ボタンをクリックすると確認ダイアログが表示される", async () => {
		const user = userEvent.setup();
		render(
			<HabitList
				habits={mockHabits}
				onEdit={vi.fn()}
				onArchive={vi.fn()}
				onDelete={vi.fn()}
			/>,
		);

		await user.click(screen.getAllByRole("button", { name: "削除" })[0]);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("削除確認ダイアログで「削除する」をクリックするとonDeleteが呼ばれる", async () => {
		const user = userEvent.setup();
		const onDelete = vi.fn();
		render(
			<HabitList
				habits={mockHabits}
				onEdit={vi.fn()}
				onArchive={vi.fn()}
				onDelete={onDelete}
			/>,
		);

		await user.click(screen.getAllByRole("button", { name: "削除" })[0]);
		await user.click(screen.getByRole("button", { name: "削除する" }));
		expect(onDelete).toHaveBeenCalledWith("1");
	});

	it("削除ダイアログでキャンセルするとonDeleteが呼ばれない", async () => {
		const user = userEvent.setup();
		const onDelete = vi.fn();
		render(
			<HabitList
				habits={mockHabits}
				onEdit={vi.fn()}
				onArchive={vi.fn()}
				onDelete={onDelete}
			/>,
		);

		await user.click(screen.getAllByRole("button", { name: "削除" })[0]);
		await user.click(screen.getByRole("button", { name: "キャンセル" }));
		expect(onDelete).not.toHaveBeenCalled();
	});

	describe("アーカイブ済みセクション", () => {
		it("archivedHabitsがある場合にセクションを表示する", () => {
			render(
				<HabitList
					habits={mockHabits}
					archivedHabits={mockArchivedHabits}
					onEdit={vi.fn()}
					onArchive={vi.fn()}
					onUnarchive={vi.fn()}
					onDelete={vi.fn()}
				/>,
			);

			expect(screen.getByText("アーカイブ済み")).toBeInTheDocument();
			expect(screen.getByText("瞑想")).toBeInTheDocument();
		});

		it("archivedHabitsが空の場合はセクションを表示しない", () => {
			render(
				<HabitList
					habits={mockHabits}
					archivedHabits={[]}
					onEdit={vi.fn()}
					onArchive={vi.fn()}
					onUnarchive={vi.fn()}
					onDelete={vi.fn()}
				/>,
			);

			expect(screen.queryByText("アーカイブ済み")).not.toBeInTheDocument();
		});

		it("復元ボタンをクリックするとonUnarchiveが呼ばれる", async () => {
			const user = userEvent.setup();
			const onUnarchive = vi.fn();
			render(
				<HabitList
					habits={mockHabits}
					archivedHabits={mockArchivedHabits}
					onEdit={vi.fn()}
					onArchive={vi.fn()}
					onUnarchive={onUnarchive}
					onDelete={vi.fn()}
				/>,
			);

			await user.click(screen.getByRole("button", { name: "復元" }));
			expect(onUnarchive).toHaveBeenCalledWith("3");
		});
	});
});
