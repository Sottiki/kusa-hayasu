import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SettingsPanel } from "./settings-panel";

describe("SettingsPanel", () => {
	it("ダークモード切替ボタンを表示する", () => {
		render(<SettingsPanel />);
		expect(screen.getByText(/ダークモード/)).toBeInTheDocument();
	});

	it("データエクスポートボタンを表示する", () => {
		render(<SettingsPanel />);
		expect(
			screen.getByRole("button", { name: /エクスポート/ }),
		).toBeInTheDocument();
	});

	it("エクスポートボタンクリックでダウンロードが開始される", async () => {
		const user = userEvent.setup();
		// URL.createObjectURL / revokeObjectURL をモック
		const createObjectURL = vi.fn(() => "blob:test");
		const revokeObjectURL = vi.fn();
		vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });

		// <a> のクリックをモック
		const clickSpy = vi.fn();
		vi.spyOn(document, "createElement").mockImplementationOnce(() => {
			const el = document.createElement("a");
			el.click = clickSpy;
			return el;
		});

		render(<SettingsPanel />);
		await user.click(screen.getByRole("button", { name: /エクスポート/ }));
		expect(createObjectURL).toHaveBeenCalled();

		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});
});
