import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GrassBurst } from "./grass-burst";

const defaultProps = {
	milestone: 30,
	message: "30日達成！1ヶ月継続は大きな節目です。",
	color: "#22c55e",
	onClose: vi.fn(),
};

describe("GrassBurst", () => {
	it("マイルストーン数を表示する", () => {
		render(<GrassBurst {...defaultProps} />);
		expect(screen.getByText("30日")).toBeInTheDocument();
	});

	it("メッセージを表示する", () => {
		render(<GrassBurst {...defaultProps} />);
		expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
	});

	it("「やったー！」ボタンクリックでonCloseを呼ぶ", async () => {
		const onClose = vi.fn();
		render(<GrassBurst {...defaultProps} onClose={onClose} />);
		await userEvent.click(screen.getByRole("button", { name: "やったー！" }));
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("SVGをレンダリングする", () => {
		const { container } = render(<GrassBurst {...defaultProps} />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});
});
