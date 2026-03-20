import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Super } from "./super";

describe("Super", () => {
	it("365日達成メッセージを表示する", () => {
		render(
			<Super
				milestone={365}
				message="1年間継続！"
				color="#22c55e"
				onClose={vi.fn()}
			/>,
		);

		expect(screen.getByText("365日")).toBeInTheDocument();
		expect(screen.getByText(/1年間継続/)).toBeInTheDocument();
	});

	it("閉じるボタンをクリックするとonCloseが呼ばれる", async () => {
		const onClose = vi.fn();
		render(
			<Super
				milestone={365}
				message="1年間継続！"
				color="#22c55e"
				onClose={onClose}
			/>,
		);

		await userEvent.click(screen.getByRole("button"));
		expect(onClose).toHaveBeenCalledOnce();
	});

	it("草のアイコンが複数表示される", () => {
		render(
			<Super
				milestone={365}
				message="1年間継続！"
				color="#22c55e"
				onClose={vi.fn()}
			/>,
		);

		// 草グラフを模した背景要素が存在する
		const grassIcons = screen.getAllByRole("img", { hidden: true });
		expect(grassIcons.length).toBeGreaterThan(0);
	});
});
