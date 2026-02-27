"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const AUTO_CLOSE_MS = 4000;

type ToastProps = {
	milestone: number;
	message: string;
	color: string;
	onClose: () => void;
};

export function Toast({ milestone, message, color, onClose }: ToastProps) {
	useEffect(() => {
		const timer = setTimeout(onClose, AUTO_CLOSE_MS);
		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<>
			<style>{`
        @keyframes toast-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
			<div
				className="absolute bottom-24 left-4 right-4 rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
				style={{
					animation: "toast-slide-up 0.3s ease-out",
					borderLeft: `4px solid ${color}`,
				}}
				role="alert"
				aria-live="assertive"
			>
				<div className="flex items-start gap-3 p-5">
					<div
						className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
						style={{ backgroundColor: color }}
					>
						{milestone}
					</div>
					<div className="flex-1">
						<div className="font-semibold">🎊 マイルストーン達成！</div>
						<p className="mt-1 text-sm text-muted-foreground">{message}</p>
					</div>
				</div>
				<div className="border-t px-5 pb-4">
					<Button
						variant="ghost"
						size="sm"
						className="w-full"
						onClick={onClose}
					>
						閉じる
					</Button>
				</div>
			</div>
		</>
	);
}
