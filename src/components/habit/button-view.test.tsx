import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ButtonView } from "./button-view";

describe("ButtonView", () => {
	it("習慣名を表示する", () => {
		render(
			<ButtonView
				habitName="ランニング"
				completed={false}
				color="#22c55e"
				streak={3}
				nextMilestone={7}
				onToggle={vi.fn()}
			/>,
		);

		expect(screen.getByText("ランニング")).toBeInTheDocument();
	});

	it("達成ボタンを表示する", () => {
		render(
			<ButtonView
				habitName="ランニング"
				completed={false}
				color="#22c55e"
				streak={0}
				nextMilestone={3}
				onToggle={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: "達成！" })).toBeInTheDocument();
	});

	it("連続日数を表示する", () => {
		render(
			<ButtonView
				habitName="読書"
				completed={true}
				color="#3b82f6"
				streak={14}
				nextMilestone={30}
				onToggle={vi.fn()}
			/>,
		);

		expect(screen.getByText("14")).toBeInTheDocument();
		expect(screen.getByText(/日連続/)).toBeInTheDocument();
	});
});
