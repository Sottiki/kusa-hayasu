import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Festival } from "./festival";

const defaultProps = {
	milestone: 7,
	message: "1週間達成！脳が新しいパターンを認識し始めています。",
	color: "#22c55e",
	onClose: vi.fn(),
};

describe("Festival", () => {
	it("マイルストーン数を表示する", () => {
		render(<Festival {...defaultProps} />);
		expect(screen.getByText("7日")).toBeInTheDocument();
	});

	it("メッセージを表示する", () => {
		render(<Festival {...defaultProps} />);
		expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
	});

	it("「やったー！」ボタンクリックでonCloseを呼ぶ", async () => {
		const onClose = vi.fn();
		render(<Festival {...defaultProps} onClose={onClose} />);
		await userEvent.click(screen.getByRole("button", { name: "やったー！" }));
		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
