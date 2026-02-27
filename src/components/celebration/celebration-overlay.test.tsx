import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CelebrationOverlay } from "./celebration-overlay";

const defaultProps = {
	milestone: 7,
	message: "1週間達成！",
	color: "#22c55e",
	onClose: vi.fn(),
};

describe("CelebrationOverlay", () => {
	it("isOpen=falseのときは何もレンダリングしない", () => {
		const { container } = render(
			<CelebrationOverlay
				{...defaultProps}
				isOpen={false}
				pattern="festival"
			/>,
		);
		expect(container.firstChild).toBeNull();
	});

	it("isOpen=trueのときdialogをレンダリングする", () => {
		render(
			<CelebrationOverlay {...defaultProps} isOpen={true} pattern="festival" />,
		);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it('pattern="toast"のときrole="alert"をレンダリングする', () => {
		render(
			<CelebrationOverlay {...defaultProps} isOpen={true} pattern="toast" />,
		);
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it('pattern="grass-burst"のときSVGをレンダリングする', () => {
		const { container } = render(
			<CelebrationOverlay
				{...defaultProps}
				isOpen={true}
				pattern="grass-burst"
			/>,
		);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("milestoneをariaラベルに含む", () => {
		render(
			<CelebrationOverlay {...defaultProps} isOpen={true} pattern="festival" />,
		);
		expect(screen.getByRole("dialog", { name: /7日達成/ })).toBeInTheDocument();
	});
});
