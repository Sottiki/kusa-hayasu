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

	it("アクティビティリンクを表示する", () => {
		render(<BottomNav currentPath="/" />);
		expect(
			screen.getByRole("link", { name: "アクティビティ" }),
		).toBeInTheDocument();
	});

	it("設定リンクを表示する", () => {
		render(<BottomNav currentPath="/" />);
		expect(screen.getByRole("link", { name: "設定" })).toBeInTheDocument();
	});

	it("アクティビティページではアクティビティリンクがアクティブになる", () => {
		render(<BottomNav currentPath="/activity" />);
		expect(
			screen.getByRole("link", { name: "アクティビティ" }),
		).toHaveAttribute("aria-current", "page");
	});

	it("設定ページでは設定リンクがアクティブになる", () => {
		render(<BottomNav currentPath="/settings" />);
		expect(screen.getByRole("link", { name: "設定" })).toHaveAttribute(
			"aria-current",
			"page",
		);
	});
});
