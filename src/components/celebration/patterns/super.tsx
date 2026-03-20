"use client";

import { Button } from "@/components/ui/button";

// 固定データでhydration safeにする（紙吹雪 + 草アイコン）
const CONFETTI_PIECES = [
	{
		id: 0,
		left: "3%",
		duration: 1.8,
		delay: 0,
		color: "#ef4444",
		size: 14,
		round: false,
	},
	{
		id: 1,
		left: "8%",
		duration: 2.4,
		delay: 0.2,
		color: "#f97316",
		size: 10,
		round: true,
	},
	{
		id: 2,
		left: "14%",
		duration: 2.0,
		delay: 0.1,
		color: "#eab308",
		size: 16,
		round: false,
	},
	{
		id: 3,
		left: "20%",
		duration: 2.6,
		delay: 0.4,
		color: "#22c55e",
		size: 10,
		round: true,
	},
	{
		id: 4,
		left: "26%",
		duration: 2.2,
		delay: 0.05,
		color: "#3b82f6",
		size: 14,
		round: false,
	},
	{
		id: 5,
		left: "32%",
		duration: 1.9,
		delay: 0.6,
		color: "#a855f7",
		size: 10,
		round: true,
	},
	{
		id: 6,
		left: "38%",
		duration: 2.8,
		delay: 0.3,
		color: "#ec4899",
		size: 16,
		round: false,
	},
	{
		id: 7,
		left: "44%",
		duration: 2.1,
		delay: 0.5,
		color: "#ef4444",
		size: 10,
		round: true,
	},
	{
		id: 8,
		left: "50%",
		duration: 2.5,
		delay: 0,
		color: "#22c55e",
		size: 14,
		round: false,
	},
	{
		id: 9,
		left: "56%",
		duration: 1.7,
		delay: 0.7,
		color: "#f97316",
		size: 10,
		round: true,
	},
	{
		id: 10,
		left: "62%",
		duration: 2.3,
		delay: 0.2,
		color: "#3b82f6",
		size: 16,
		round: false,
	},
	{
		id: 11,
		left: "68%",
		duration: 2.0,
		delay: 0.4,
		color: "#eab308",
		size: 10,
		round: true,
	},
	{
		id: 12,
		left: "74%",
		duration: 2.7,
		delay: 0.1,
		color: "#a855f7",
		size: 14,
		round: false,
	},
	{
		id: 13,
		left: "80%",
		duration: 1.9,
		delay: 0.8,
		color: "#ec4899",
		size: 10,
		round: true,
	},
	{
		id: 14,
		left: "86%",
		duration: 2.4,
		delay: 0.3,
		color: "#22c55e",
		size: 16,
		round: false,
	},
	{
		id: 15,
		left: "92%",
		duration: 2.1,
		delay: 0.6,
		color: "#ef4444",
		size: 10,
		round: true,
	},
	{
		id: 16,
		left: "97%",
		duration: 2.6,
		delay: 0.1,
		color: "#f97316",
		size: 14,
		round: false,
	},
	// 第2波（遅延大きめ）
	{
		id: 17,
		left: "5%",
		duration: 2.2,
		delay: 1.2,
		color: "#eab308",
		size: 10,
		round: false,
	},
	{
		id: 18,
		left: "18%",
		duration: 2.5,
		delay: 1.0,
		color: "#3b82f6",
		size: 14,
		round: true,
	},
	{
		id: 19,
		left: "35%",
		duration: 1.8,
		delay: 1.4,
		color: "#22c55e",
		size: 10,
		round: false,
	},
	{
		id: 20,
		left: "52%",
		duration: 2.3,
		delay: 1.1,
		color: "#a855f7",
		size: 16,
		round: true,
	},
	{
		id: 21,
		left: "70%",
		duration: 2.0,
		delay: 1.3,
		color: "#ef4444",
		size: 10,
		round: false,
	},
	{
		id: 22,
		left: "88%",
		duration: 2.7,
		delay: 1.0,
		color: "#ec4899",
		size: 14,
		round: true,
	},
];

// 草グリッド（7x7）
const GRID_SIZE = 7;
const CELL_SIZE = 20;
const CELL_GAP = 3;
const CELL_STEP = CELL_SIZE + CELL_GAP;
const SVG_SIZE = GRID_SIZE * CELL_STEP - CELL_GAP;

const CELLS = Array.from({ length: GRID_SIZE }, (_, row) =>
	Array.from({ length: GRID_SIZE }, (_, col) => {
		const center = Math.floor(GRID_SIZE / 2);
		const dist = Math.sqrt((row - center) ** 2 + (col - center) ** 2);
		return { row, col, delay: dist * 0.08 };
	}),
).flat();

type SuperProps = {
	milestone: number;
	message: string;
	color: string;
	onClose: () => void;
};

/** 365日達成専用のスーパーアニメーション */
export function Super({ milestone, message, color, onClose }: SuperProps) {
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: ダイアログの背景クリックで閉じるパターン
		// biome-ignore lint/a11y/useKeyWithClickEvents: Escapeキー対応はCelebrationOverlayレベルで行う
		<div
			className="relative h-full w-full overflow-hidden bg-black/70"
			onClick={onClose}
		>
			<style>{`
        @keyframes super-confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(900deg); opacity: 0; }
        }
        @keyframes super-grass-scale {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes super-crown-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-6px) scale(1.1); }
        }
      `}</style>

			{/* 紙吹雪 */}
			{CONFETTI_PIECES.map((piece) => (
				<div
					key={piece.id}
					style={{
						position: "absolute",
						left: piece.left,
						top: "-20px",
						width: `${piece.size}px`,
						height: `${piece.size}px`,
						backgroundColor: piece.color,
						animation: `super-confetti-fall ${piece.duration}s linear ${piece.delay}s infinite`,
						borderRadius: piece.round ? "50%" : "2px",
					}}
				/>
			))}

			{/* メッセージカード */}
			{/* biome-ignore lint/a11y/noStaticElementInteractions: イベント伝播を止めるためのラッパー */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: イベント伝播を止めるためのラッパー */}
			<div
				className="absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="rounded-2xl bg-white p-6 text-center shadow-2xl dark:bg-gray-900">
					{/* 王冠アイコン */}
					<div
						className="text-4xl"
						style={{
							animation: "super-crown-bounce 1.5s ease-in-out infinite",
						}}
					>
						👑
					</div>

					{/* 草グリッド */}
					<div className="my-3 flex justify-center">
						<svg
							width={SVG_SIZE}
							height={SVG_SIZE}
							viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
							role="img"
							aria-label="全草マスが埋まったグリッド"
						>
							{CELLS.map(({ row, col, delay }) => (
								<rect
									key={`${row}-${col}`}
									x={col * CELL_STEP}
									y={row * CELL_STEP}
									width={CELL_SIZE}
									height={CELL_SIZE}
									rx={3}
									fill={color}
									style={{
										animation: `super-grass-scale 0.4s ease-out ${delay}s both`,
										transformOrigin: `${col * CELL_STEP + CELL_SIZE / 2}px ${row * CELL_STEP + CELL_SIZE / 2}px`,
									}}
								/>
							))}
						</svg>
					</div>

					<div className="text-5xl font-bold" style={{ color }}>
						{milestone}日
					</div>
					<div className="mt-1 text-xl font-bold">達成！🎊🌟</div>
					<p className="mt-3 text-sm text-muted-foreground">{message}</p>
					<Button
						className="mt-5 w-full text-base font-bold"
						onClick={onClose}
						style={{ backgroundColor: color, borderColor: color }}
					>
						🌱 1年間お疲れさまでした！
					</Button>
				</div>
			</div>
		</div>
	);
}
