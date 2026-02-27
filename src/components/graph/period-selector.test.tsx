import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PeriodSelector } from "./period-selector";

describe("PeriodSelector", () => {
	it("期間の選択肢をタブとして表示する", () => {
		render(<PeriodSelector value="3mo" onChange={vi.fn()} />);
		expect(screen.getByRole("tab", { name: "3ヶ月" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "1年" })).toBeInTheDocument();
	});

	it("選択中の期間タブがアクティブになる", () => {
		render(<PeriodSelector value="3mo" onChange={vi.fn()} />);
		expect(screen.getByRole("tab", { name: "3ヶ月" })).toHaveAttribute(
			"data-state",
			"active",
		);
	});

	it("別の期間タブをクリックするとonChangeが呼ばれる", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<PeriodSelector value="3mo" onChange={onChange} />);

		await user.click(screen.getByRole("tab", { name: "1年" }));
		expect(onChange).toHaveBeenCalledWith("1yr");
	});

	it("7日・14日・31日の選択肢も表示される", () => {
		render(<PeriodSelector value="7d" onChange={vi.fn()} />);
		expect(screen.getByRole("tab", { name: "7日" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "14日" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "31日" })).toBeInTheDocument();
	});
});
