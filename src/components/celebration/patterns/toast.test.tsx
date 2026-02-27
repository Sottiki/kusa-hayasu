import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Toast } from "./toast";

const defaultProps = {
	milestone: 7,
	message: "1週間達成！脳が新しいパターンを認識し始めています。",
	color: "#22c55e",
	onClose: vi.fn(),
};

describe("Toast", () => {
	it("マイルストーン数を表示する", () => {
		render(<Toast {...defaultProps} />);
		expect(screen.getByText("7")).toBeInTheDocument();
	});

	it("メッセージを表示する", () => {
		render(<Toast {...defaultProps} />);
		expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
	});

	it("「閉じる」ボタンクリックでonCloseを呼ぶ", async () => {
		const onClose = vi.fn();
		render(<Toast {...defaultProps} onClose={onClose} />);
		await userEvent.click(screen.getByRole("button", { name: "閉じる" }));
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	describe("自動クローズ", () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});
		afterEach(() => {
			vi.useRealTimers();
		});

		it("4秒後にonCloseを呼ぶ", () => {
			const onClose = vi.fn();
			render(<Toast {...defaultProps} onClose={onClose} />);
			vi.advanceTimersByTime(4000);
			expect(onClose).toHaveBeenCalledTimes(1);
		});
	});
});
