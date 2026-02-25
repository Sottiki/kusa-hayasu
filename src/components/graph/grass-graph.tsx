"use client";

import { parseDate } from "@/lib/date-utils";
import type { GrassCell } from "@/lib/grass-utils";
import { GrassCellRect } from "./grass-cell";

const CELL_SIZE = 12;
const CELL_GAP = 2;
const CELL_STEP = CELL_SIZE + CELL_GAP;

type GrassGraphProps = {
	cells: GrassCell[];
	color: string;
	onCellPress?: (date: string) => void;
};

/** 草グラフ本体 — GitHub風の週列SVGグリッド（月曜始まり） */
export function GrassGraph({ cells, color, onCellPress }: GrassGraphProps) {
	if (cells.length === 0) return null;

	// 最初の日の曜日（月曜始まり: 月=0, ..., 日=6）
	const firstDate = parseDate(cells[0].date);
	const firstDayOfWeek = (firstDate.getDay() + 6) % 7;

	// 先頭に空セルを追加して月曜始まりのグリッドに揃える
	const padded: (GrassCell | null)[] = [
		...Array<null>(firstDayOfWeek).fill(null),
		...cells,
	];

	const numWeeks = Math.ceil(padded.length / 7);
	const svgWidth = numWeeks * CELL_STEP - CELL_GAP;
	const svgHeight = 7 * CELL_STEP - CELL_GAP;

	return (
		<div className="overflow-x-auto">
			<svg
				role="img"
				width={svgWidth}
				height={svgHeight}
				aria-label="習慣達成グラフ"
			>
				{padded.map((cell, i) => {
					const col = Math.floor(i / 7);
					const row = i % 7;
					const x = col * CELL_STEP;
					const y = row * CELL_STEP;

					if (cell === null) {
						return (
							<rect
								// biome-ignore lint/suspicious/noArrayIndexKey: パディング用の空セルにはインデックスが適切
								key={`pad-${i}`}
								x={x}
								y={y}
								width={CELL_SIZE}
								height={CELL_SIZE}
								fill="transparent"
								rx={2}
							/>
						);
					}

					return (
						<GrassCellRect
							key={cell.date}
							cell={cell}
							x={x}
							y={y}
							size={CELL_SIZE}
							color={color}
							onPress={onCellPress}
						/>
					);
				})}
			</svg>
		</div>
	);
}
