import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GrassGraph } from "./grass-graph";

const sampleCells = [
	{ date: "2024-01-01", level: 1 },
	{ date: "2024-01-02", level: 0 },
	{ date: "2024-01-03", level: 1 },
];

describe("GrassGraph", () => {
	it("SVGをレンダリングする", () => {
		const { container } = render(
			<GrassGraph cells={sampleCells} color="#22c55e" />,
		);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("aria-labelが設定される", () => {
		render(<GrassGraph cells={sampleCells} color="#22c55e" />);
		expect(screen.getByLabelText("習慣達成グラフ")).toBeInTheDocument();
	});

	it("全セルが描画される", () => {
		const { container } = render(
			<GrassGraph cells={sampleCells} color="#22c55e" />,
		);
		expect(
			container.querySelector("[data-date='2024-01-01']"),
		).toBeInTheDocument();
		expect(
			container.querySelector("[data-date='2024-01-02']"),
		).toBeInTheDocument();
		expect(
			container.querySelector("[data-date='2024-01-03']"),
		).toBeInTheDocument();
	});

	it("cellsが空の場合は何もレンダリングしない", () => {
		const { container } = render(<GrassGraph cells={[]} color="#22c55e" />);
		expect(container.querySelector("svg")).not.toBeInTheDocument();
	});

	it("onCellPressが渡された場合セルをクリックするとコールバックが呼ばれる", async () => {
		const user = userEvent.setup();
		const onCellPress = vi.fn();
		const { container } = render(
			<GrassGraph
				cells={sampleCells}
				color="#22c55e"
				onCellPress={onCellPress}
			/>,
		);
		const cell = container.querySelector("[data-date='2024-01-01']");
		expect(cell).not.toBeNull();
		await user.click(cell as Element);
		expect(onCellPress).toHaveBeenCalledWith("2024-01-01");
	});

	it("月曜始まりのグリッドレイアウトで描画される", () => {
		// 2024-01-01 は月曜日（row=0, col=0）
		const { container } = render(
			<GrassGraph cells={[{ date: "2024-01-01", level: 1 }]} color="#22c55e" />,
		);
		const rect = container.querySelector("[data-date='2024-01-01']");
		// パディングなしで x=0, y=0 に配置されるはず
		expect(rect).toHaveAttribute("x", "0");
		expect(rect).toHaveAttribute("y", "0");
	});

	describe("split=true（2段表示）", () => {
		// 1年分のセルを生成（2024-01-01 〜 2024-12-31）
		const yearCells: { date: string; level: number }[] = [];
		const start = new Date("2024-01-01");
		for (let i = 0; i < 366; i++) {
			const d = new Date(start);
			d.setDate(start.getDate() + i);
			yearCells.push({
				date: d.toISOString().slice(0, 10),
				level: i % 5,
			});
		}

		it("split=trueのとき2つのSVGを描画する", () => {
			const { container } = render(
				<GrassGraph cells={yearCells} color="#22c55e" split />,
			);
			const svgs = container.querySelectorAll("svg");
			expect(svgs).toHaveLength(2);
		});

		it("split=trueのとき全セルが描画される", () => {
			const { container } = render(
				<GrassGraph cells={yearCells} color="#22c55e" split />,
			);
			for (const cell of yearCells) {
				expect(
					container.querySelector(`[data-date='${cell.date}']`),
				).toBeInTheDocument();
			}
		});

		it("split=falseのときSVGは1つ", () => {
			const { container } = render(
				<GrassGraph cells={yearCells} color="#22c55e" split={false} />,
			);
			expect(container.querySelectorAll("svg")).toHaveLength(1);
		});
	});
});
