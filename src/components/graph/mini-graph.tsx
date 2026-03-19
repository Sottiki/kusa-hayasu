"use client";

import { parseDate } from "@/lib/date-utils";
import type { GrassCell } from "@/lib/grass-utils";

const CELL_SIZE = 8;
const CELL_GAP = 1;
const CELL_STEP = CELL_SIZE + CELL_GAP;

type MiniGraphProps = {
	cells: GrassCell[];
	color: string;
};

/** ミニ草グラフ — アクティビティ一覧用の小型SVGグラフ */
export function MiniGraph({ cells, color }: MiniGraphProps) {
	if (cells.length === 0) return null;

	// 最初の日の曜日（月曜始まり: 月=0, ..., 日=6）
	const firstDate = parseDate(cells[0].date);
	const firstDayOfWeek = (firstDate.getDay() + 6) % 7;

	const padded: (GrassCell | null)[] = [
		...Array<null>(firstDayOfWeek).fill(null),
		...cells,
	];

	const numWeeks = Math.ceil(padded.length / 7);
	const svgWidth = numWeeks * CELL_STEP - CELL_GAP;
	const svgHeight = 7 * CELL_STEP - CELL_GAP;

	return (
		<svg
			role="img"
			width={svgWidth}
			height={svgHeight}
			aria-label="習慣達成ミニグラフ"
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
							rx={1}
						/>
					);
				}

				return (
					<rect
						key={cell.date}
						x={x}
						y={y}
						width={CELL_SIZE}
						height={CELL_SIZE}
						fill={cell.level > 0 ? color : "currentColor"}
						className={cell.level === 0 ? "text-muted/50" : ""}
						rx={1}
					/>
				);
			})}
		</svg>
	);
}
