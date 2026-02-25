import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ColorPicker } from "./color-picker";

describe("ColorPicker", () => {
	it("色の選択肢を表示する", () => {
		render(<ColorPicker value="#22c55e" onChange={vi.fn()} />);
		const buttons = screen.getAllByRole("button");
		expect(buttons.length).toBeGreaterThan(0);
	});

	it("選択中の色ボタンがaria-pressed=trueになる", () => {
		render(<ColorPicker value="#22c55e" onChange={vi.fn()} />);
		const selected = screen.getByRole("button", { name: "グリーンを選択" });
		expect(selected).toHaveAttribute("aria-pressed", "true");
	});

	it("選択されていない色ボタンはaria-pressed=falseになる", () => {
		render(<ColorPicker value="#22c55e" onChange={vi.fn()} />);
		const unselected = screen.getByRole("button", { name: "ブルーを選択" });
		expect(unselected).toHaveAttribute("aria-pressed", "false");
	});

	it("色をクリックするとonChangeが正しい値で呼ばれる", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<ColorPicker value="#22c55e" onChange={onChange} />);

		await user.click(screen.getByRole("button", { name: "ブルーを選択" }));
		expect(onChange).toHaveBeenCalledWith("#3b82f6");
	});

	it("既に選択中の色をクリックしてもonChangeが呼ばれる", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<ColorPicker value="#22c55e" onChange={onChange} />);

		await user.click(screen.getByRole("button", { name: "グリーンを選択" }));
		expect(onChange).toHaveBeenCalledOnce();
	});
});
