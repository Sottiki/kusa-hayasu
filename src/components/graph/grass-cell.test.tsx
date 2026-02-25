import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GrassCellRect } from "./grass-cell";

/** SVGコンテキストでセルを描画するヘルパー */
function renderCell(props: Parameters<typeof GrassCellRect>[0]) {
	return render(
		<svg role="img" aria-label="test">
			<GrassCellRect {...props} />
		</svg>,
	);
}

describe("GrassCellRect", () => {
	it("rectを描画する", () => {
		const { container } = renderCell({
			cell: { date: "2024-01-01", level: 1 },
			x: 0,
			y: 0,
			size: 12,
			color: "#22c55e",
		});
		expect(container.querySelector("rect")).toBeInTheDocument();
	});

	it("level=1のセルに習慣色が適用される", () => {
		const { container } = renderCell({
			cell: { date: "2024-01-01", level: 1 },
			x: 0,
			y: 0,
			size: 12,
			color: "#22c55e",
		});
		expect(container.querySelector("rect")).toHaveAttribute("fill", "#22c55e");
	});

	it("level=0のセルには習慣色が適用されない", () => {
		const { container } = renderCell({
			cell: { date: "2024-01-01", level: 0 },
			x: 0,
			y: 0,
			size: 12,
			color: "#22c55e",
		});
		expect(container.querySelector("rect")).not.toHaveAttribute(
			"fill",
			"#22c55e",
		);
	});

	it("date属性が設定される", () => {
		const { container } = renderCell({
			cell: { date: "2024-01-15", level: 0 },
			x: 0,
			y: 0,
			size: 12,
			color: "#22c55e",
		});
		expect(
			container.querySelector("[data-date='2024-01-15']"),
		).toBeInTheDocument();
	});

	it("onPressが渡された場合クリックでコールバックが呼ばれる", async () => {
		const user = userEvent.setup();
		const onPress = vi.fn();
		const { container } = renderCell({
			cell: { date: "2024-01-01", level: 1 },
			x: 0,
			y: 0,
			size: 12,
			color: "#22c55e",
			onPress,
		});
		const rect = container.querySelector("rect");
		expect(rect).not.toBeNull();
		await user.click(rect as Element);
		expect(onPress).toHaveBeenCalledWith("2024-01-01");
	});

	it("onPressがない場合クリックしてもエラーにならない", async () => {
		const user = userEvent.setup();
		const { container } = renderCell({
			cell: { date: "2024-01-01", level: 0 },
			x: 0,
			y: 0,
			size: 12,
			color: "#22c55e",
		});
		const rect = container.querySelector("rect");
		expect(rect).not.toBeNull();
		await user.click(rect as Element);
	});
});
