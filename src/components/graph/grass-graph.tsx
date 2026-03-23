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
	/** trueのとき週を半分に分けて2段で表示（1年表示用） */
	split?: boolean;
};

type GraphSVGProps = {
	padded: (GrassCell | null)[];
	numWeeks: number;
	color: string;
	onCellPress?: (date: string) => void;
	ariaLabel: string;
};

function GraphSVG({
	padded,
	numWeeks,
	color,
	onCellPress,
	ariaLabel,
}: GraphSVGProps) {
	const svgWidth = numWeeks * CELL_STEP - CELL_GAP;
	const svgHeight = 7 * CELL_STEP - CELL_GAP;

	return (
		<svg role="img" width={svgWidth} height={svgHeight} aria-label={ariaLabel}>
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
	);
}

/** 草グラフ本体 — GitHub風の週列SVGグリッド（月曜始まり） */
export function GrassGraph({
	cells,
	color,
	onCellPress,
	split = false,
}: GrassGraphProps) {
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

	if (split) {
		const halfWeeks = Math.ceil(numWeeks / 2);
		const firstHalf = padded.slice(0, halfWeeks * 7);
		const secondHalf = padded.slice(halfWeeks * 7);
		const secondHalfWeeks = numWeeks - halfWeeks;

		return (
			<div className="flex flex-col gap-2 overflow-x-auto">
				<GraphSVG
					padded={firstHalf}
					numWeeks={halfWeeks}
					color={color}
					onCellPress={onCellPress}
					ariaLabel="習慣達成グラフ（前半）"
				/>
				<GraphSVG
					padded={secondHalf}
					numWeeks={secondHalfWeeks}
					color={color}
					onCellPress={onCellPress}
					ariaLabel="習慣達成グラフ（後半）"
				/>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto">
			<svg
				role="img"
				width={numWeeks * CELL_STEP - CELL_GAP}
				height={7 * CELL_STEP - CELL_GAP}
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
