"use client";

import { Button } from "@/components/ui/button";

const GRID_SIZE = 5;
const CENTER = Math.floor(GRID_SIZE / 2);

function getDistance(row: number, col: number): number {
	return Math.sqrt((row - CENTER) ** 2 + (col - CENTER) ** 2);
}

const CELLS = Array.from({ length: GRID_SIZE }, (_, row) =>
	Array.from({ length: GRID_SIZE }, (_, col) => ({
		row,
		col,
		delay: getDistance(row, col) * 0.12,
	})),
).flat();

const CELL_SIZE = 28;
const CELL_GAP = 4;
const CELL_STEP = CELL_SIZE + CELL_GAP;
const SVG_SIZE = GRID_SIZE * CELL_STEP;

type GrassBurstProps = {
	milestone: number;
	message: string;
	color: string;
	onClose: () => void;
};

export function GrassBurst({
	milestone,
	message,
	color,
	onClose,
}: GrassBurstProps) {
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: ダイアログの背景クリックで閉じるパターン
		// biome-ignore lint/a11y/useKeyWithClickEvents: Escapeキー対応はCelebrationOverlayレベルで行う
		<div
			className="relative flex h-full w-full flex-col items-center justify-center bg-black/60"
			onClick={onClose}
		>
			<style>{`
        @keyframes grass-scale {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
      `}</style>

			{/* biome-ignore lint/a11y/noStaticElementInteractions: イベント伝播を止めるためのラッパー */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: イベント伝播を止めるためのラッパー */}
			<div
				className="rounded-2xl bg-white p-6 text-center shadow-xl dark:bg-gray-900"
				onClick={(e) => e.stopPropagation()}
			>
				<svg
					width={SVG_SIZE}
					height={SVG_SIZE}
					viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
					role="img"
					aria-label="草が広がるアニメーション"
					className="mx-auto"
				>
					{CELLS.map(({ row, col, delay }) => (
						<rect
							key={`${row}-${col}`}
							x={col * CELL_STEP}
							y={row * CELL_STEP}
							width={CELL_SIZE}
							height={CELL_SIZE}
							rx={4}
							fill={color}
							style={{
								animation: `grass-scale 0.5s ease-out ${delay}s both`,
								transformOrigin: `${col * CELL_STEP + CELL_SIZE / 2}px ${row * CELL_STEP + CELL_SIZE / 2}px`,
							}}
						/>
					))}
				</svg>

				<div className="mt-4 text-4xl font-bold" style={{ color }}>
					{milestone}日
				</div>
				<div className="mt-1 text-lg font-semibold">達成！✨</div>
				<p className="mt-3 text-sm text-muted-foreground">{message}</p>
				<Button className="mt-4 w-full" onClick={onClose}>
					やったー！
				</Button>
			</div>
		</div>
	);
}
