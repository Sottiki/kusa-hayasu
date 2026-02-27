"use client";

import { Button } from "@/components/ui/button";

// 固定データでhydration safeにする
const CONFETTI_PIECES = [
	{
		id: 0,
		left: "5%",
		duration: 2.2,
		delay: 0,
		color: "#ef4444",
		size: 10,
		round: false,
	},
	{
		id: 1,
		left: "12%",
		duration: 2.8,
		delay: 0.3,
		color: "#f97316",
		size: 8,
		round: true,
	},
	{
		id: 2,
		left: "20%",
		duration: 2.4,
		delay: 0.1,
		color: "#eab308",
		size: 12,
		round: false,
	},
	{
		id: 3,
		left: "28%",
		duration: 3.0,
		delay: 0.5,
		color: "#22c55e",
		size: 8,
		round: true,
	},
	{
		id: 4,
		left: "35%",
		duration: 2.6,
		delay: 0.2,
		color: "#3b82f6",
		size: 10,
		round: false,
	},
	{
		id: 5,
		left: "42%",
		duration: 2.1,
		delay: 0.7,
		color: "#a855f7",
		size: 8,
		round: true,
	},
	{
		id: 6,
		left: "50%",
		duration: 2.9,
		delay: 0.4,
		color: "#ec4899",
		size: 12,
		round: false,
	},
	{
		id: 7,
		left: "58%",
		duration: 2.3,
		delay: 0.6,
		color: "#ef4444",
		size: 8,
		round: true,
	},
	{
		id: 8,
		left: "65%",
		duration: 2.7,
		delay: 0.1,
		color: "#f97316",
		size: 10,
		round: false,
	},
	{
		id: 9,
		left: "72%",
		duration: 2.5,
		delay: 0.8,
		color: "#eab308",
		size: 8,
		round: true,
	},
	{
		id: 10,
		left: "80%",
		duration: 2.2,
		delay: 0.3,
		color: "#22c55e",
		size: 12,
		round: false,
	},
	{
		id: 11,
		left: "88%",
		duration: 3.1,
		delay: 0.5,
		color: "#3b82f6",
		size: 8,
		round: true,
	},
	{
		id: 12,
		left: "93%",
		duration: 2.6,
		delay: 0.2,
		color: "#a855f7",
		size: 10,
		round: false,
	},
	{
		id: 13,
		left: "8%",
		duration: 2.4,
		delay: 1.0,
		color: "#ec4899",
		size: 8,
		round: true,
	},
	{
		id: 14,
		left: "16%",
		duration: 2.8,
		delay: 0.9,
		color: "#ef4444",
		size: 12,
		round: false,
	},
	{
		id: 15,
		left: "45%",
		duration: 2.0,
		delay: 1.2,
		color: "#22c55e",
		size: 8,
		round: true,
	},
	{
		id: 16,
		left: "60%",
		duration: 3.2,
		delay: 0.7,
		color: "#f97316",
		size: 10,
		round: false,
	},
	{
		id: 17,
		left: "75%",
		duration: 2.3,
		delay: 1.1,
		color: "#3b82f6",
		size: 8,
		round: true,
	},
	{
		id: 18,
		left: "85%",
		duration: 2.7,
		delay: 0.4,
		color: "#eab308",
		size: 12,
		round: false,
	},
	{
		id: 19,
		left: "97%",
		duration: 2.5,
		delay: 0.6,
		color: "#a855f7",
		size: 8,
		round: true,
	},
];

type FestivalProps = {
	milestone: number;
	message: string;
	color: string;
	onClose: () => void;
};

export function Festival({
	milestone,
	message,
	color,
	onClose,
}: FestivalProps) {
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: ダイアログの背景クリックで閉じるパターン
		// biome-ignore lint/a11y/useKeyWithClickEvents: Escapeキー対応はCelebrationOverlayレベルで行う
		<div
			className="relative h-full w-full overflow-hidden bg-black/50"
			onClick={onClose}
		>
			<style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>

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
						animation: `confetti-fall ${piece.duration}s linear ${piece.delay}s infinite`,
						borderRadius: piece.round ? "50%" : "2px",
					}}
				/>
			))}

			{/* メッセージカード */}
			{/* biome-ignore lint/a11y/noStaticElementInteractions: イベント伝播を止めるためのラッパー */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: イベント伝播を止めるためのラッパー */}
			<div
				className="absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="rounded-2xl bg-white p-6 text-center shadow-xl dark:bg-gray-900">
					<div className="text-5xl font-bold" style={{ color }}>
						{milestone}日
					</div>
					<div className="mt-1 text-xl font-semibold">達成！🎉</div>
					<p className="mt-3 text-sm text-muted-foreground">{message}</p>
					<Button
						className="mt-4 w-full"
						onClick={onClose}
						style={{ backgroundColor: color, borderColor: color }}
					>
						やったー！
					</Button>
				</div>
			</div>
		</div>
	);
}
