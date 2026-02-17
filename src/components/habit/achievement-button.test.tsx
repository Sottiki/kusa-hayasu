import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AchievementButton } from "./achievement-button";

describe("AchievementButton", () => {
	it("未達成状態でボタンを表示する", () => {
		render(
			<AchievementButton
				completed={false}
				color="#22c55e"
				onToggle={vi.fn()}
			/>,
		);

		const button = screen.getByRole("button", { name: "達成！" });
		expect(button).toBeInTheDocument();
	});

	it("達成済み状態でチェックマーク付きボタンを表示する", () => {
		render(
			<AchievementButton completed={true} color="#22c55e" onToggle={vi.fn()} />,
		);

		const button = screen.getByRole("button", { name: "達成済み" });
		expect(button).toBeInTheDocument();
	});

	it("クリックでonToggleが呼ばれる", async () => {
		const user = userEvent.setup();
		const onToggle = vi.fn();
		render(
			<AchievementButton
				completed={false}
				color="#22c55e"
				onToggle={onToggle}
			/>,
		);

		await user.click(screen.getByRole("button"));
		expect(onToggle).toHaveBeenCalledOnce();
	});

	it("習慣の色がボタンに反映される", () => {
		render(
			<AchievementButton
				completed={false}
				color="#ef4444"
				onToggle={vi.fn()}
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveStyle({ "--habit-color": "#ef4444" });
	});
});
