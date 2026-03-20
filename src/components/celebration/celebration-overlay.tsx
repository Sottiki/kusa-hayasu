"use client";

import type { AnimationPattern } from "@/types/habit";
import { Festival } from "./patterns/festival";
import { GrassBurst } from "./patterns/grass-burst";
import { Super } from "./patterns/super";
import { Toast } from "./patterns/toast";

type CelebrationOverlayProps = {
	isOpen: boolean;
	pattern: AnimationPattern;
	milestone: number;
	message: string;
	color: string;
	onClose: () => void;
};

export function CelebrationOverlay({
	isOpen,
	pattern,
	milestone,
	message,
	color,
	onClose,
}: CelebrationOverlayProps) {
	if (!isOpen) return null;

	const commonProps = { milestone, message, color, onClose };

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-label={`${milestone}日達成！`}
			className="fixed inset-0 z-50"
		>
			{/* 365日はパターン設定によらずスーパーアニメーションを表示 */}
			{milestone === 365 && <Super {...commonProps} />}
			{milestone !== 365 && pattern === "festival" && (
				<Festival {...commonProps} />
			)}
			{milestone !== 365 && pattern === "toast" && <Toast {...commonProps} />}
			{milestone !== 365 && pattern === "grass-burst" && (
				<GrassBurst {...commonProps} />
			)}
		</div>
	);
}
