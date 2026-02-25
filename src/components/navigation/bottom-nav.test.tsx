import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BottomNav } from "./bottom-nav";

describe("BottomNav", () => {
	it("ホームリンクを表示する", () => {
		render(<BottomNav currentPath="/" />);
		expect(screen.getByRole("link", { name: "ホーム" })).toBeInTheDocument();
	});

	it("管理リンクを表示する", () => {
		render(<BottomNav currentPath="/" />);
		expect(screen.getByRole("link", { name: "管理" })).toBeInTheDocument();
	});

	it("ホームページではホームリンクがアクティブになる", () => {
		render(<BottomNav currentPath="/" />);
		expect(screen.getByRole("link", { name: "ホーム" })).toHaveAttribute(
			"aria-current",
			"page",
		);
	});

	it("管理ページでは管理リンクがアクティブになる", () => {
		render(<BottomNav currentPath="/manage" />);
		expect(screen.getByRole("link", { name: "管理" })).toHaveAttribute(
			"aria-current",
			"page",
		);
	});

	it("ホームページでは管理リンクがアクティブでない", () => {
		render(<BottomNav currentPath="/" />);
		expect(screen.getByRole("link", { name: "管理" })).not.toHaveAttribute(
			"aria-current",
			"page",
		);
	});
});
