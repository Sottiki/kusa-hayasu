import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Habit } from "@/types/habit";
import { HabitForm } from "./habit-form";

describe("HabitForm", () => {
	it("習慣名の入力フィールドを表示する", () => {
		render(<HabitForm onSubmit={vi.fn()} onCancel={vi.fn()} />);
		expect(screen.getByLabelText("習慣名")).toBeInTheDocument();
	});

	it("保存ボタンとキャンセルボタンを表示する", () => {
		render(<HabitForm onSubmit={vi.fn()} onCancel={vi.fn()} />);
		expect(screen.getByRole("button", { name: "保存" })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "キャンセル" }),
		).toBeInTheDocument();
	});

	it("名前が空のまま保存するとonSubmitが呼ばれない", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();
		render(<HabitForm onSubmit={onSubmit} onCancel={vi.fn()} />);

		await user.click(screen.getByRole("button", { name: "保存" }));
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("名前が空のままの場合エラーメッセージを表示する", async () => {
		const user = userEvent.setup();
		render(<HabitForm onSubmit={vi.fn()} onCancel={vi.fn()} />);

		await user.click(screen.getByRole("button", { name: "保存" }));
		expect(screen.getByText("習慣名を入力してください")).toBeInTheDocument();
	});

	it("名前を入力して保存するとonSubmitが呼ばれる", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();
		render(<HabitForm onSubmit={onSubmit} onCancel={vi.fn()} />);

		await user.type(screen.getByLabelText("習慣名"), "ランニング");
		await user.click(screen.getByRole("button", { name: "保存" }));

		expect(onSubmit).toHaveBeenCalledWith({
			name: "ランニング",
			color: expect.any(String),
			animationPattern: expect.any(String),
		});
	});

	it("キャンセルボタンでonCancelが呼ばれる", async () => {
		const user = userEvent.setup();
		const onCancel = vi.fn();
		render(<HabitForm onSubmit={vi.fn()} onCancel={onCancel} />);

		await user.click(screen.getByRole("button", { name: "キャンセル" }));
		expect(onCancel).toHaveBeenCalledOnce();
	});

	it("編集モード: 既存の習慣データで初期化される", () => {
		const habit: Habit = {
			id: "1",
			name: "ランニング",
			color: "#3b82f6",
			animationPattern: "toast",
			createdAt: "2024-01-01T00:00:00Z",
			order: 0,
		};
		render(<HabitForm habit={habit} onSubmit={vi.fn()} onCancel={vi.fn()} />);

		expect(screen.getByLabelText("習慣名")).toHaveValue("ランニング");
	});

	it("編集モード: 習慣名を変更して保存できる", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();
		const habit: Habit = {
			id: "1",
			name: "ランニング",
			color: "#22c55e",
			animationPattern: "festival",
			createdAt: "2024-01-01T00:00:00Z",
			order: 0,
		};
		render(<HabitForm habit={habit} onSubmit={onSubmit} onCancel={vi.fn()} />);

		const input = screen.getByLabelText("習慣名");
		await user.clear(input);
		await user.type(input, "ウォーキング");
		await user.click(screen.getByRole("button", { name: "保存" }));

		expect(onSubmit).toHaveBeenCalledWith(
			expect.objectContaining({ name: "ウォーキング" }),
		);
	});
});
