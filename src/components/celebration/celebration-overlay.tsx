"use client";

import type { AnimationPattern } from "@/types/habit";
import { Festival } from "./patterns/festival";
import { GrassBurst } from "./patterns/grass-burst";
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
			{pattern === "festival" && <Festival {...commonProps} />}
			{pattern === "toast" && <Toast {...commonProps} />}
			{pattern === "grass-burst" && <GrassBurst {...commonProps} />}
		</div>
	);
}
