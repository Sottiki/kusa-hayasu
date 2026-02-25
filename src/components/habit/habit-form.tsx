"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AnimationPattern, Habit } from "@/types/habit";
import { ColorPicker, PRESET_COLORS } from "./color-picker";

type HabitFormData = {
	name: string;
	color: string;
	animationPattern: AnimationPattern;
};

type HabitFormProps = {
	habit?: Habit;
	onSubmit: (data: HabitFormData) => void;
	onCancel: () => void;
};

const ANIMATION_PATTERNS: { value: AnimationPattern; label: string }[] = [
	{ value: "festival", label: "お祭り 🎉" },
	{ value: "toast", label: "トースト 🍞" },
	{ value: "grass-burst", label: "草バースト 🌿" },
];

/** 習慣フォーム — 作成・編集共用 */
export function HabitForm({ habit, onSubmit, onCancel }: HabitFormProps) {
	const [name, setName] = useState(habit?.name ?? "");
	const [color, setColor] = useState(habit?.color ?? PRESET_COLORS[0].value);
	const [animationPattern, setAnimationPattern] = useState<AnimationPattern>(
		habit?.animationPattern ?? "festival",
	);
	const [nameError, setNameError] = useState(false);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!name.trim()) {
			setNameError(true);
			return;
		}
		onSubmit({ name: name.trim(), color, animationPattern });
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="space-y-2">
				<Label htmlFor="habit-name">習慣名</Label>
				<Input
					id="habit-name"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
						setNameError(false);
					}}
					placeholder="例: ランニング"
					aria-invalid={nameError}
				/>
				{nameError && (
					<p className="text-sm text-destructive">習慣名を入力してください</p>
				)}
			</div>

			<div className="space-y-2">
				<Label>テーマカラー</Label>
				<ColorPicker value={color} onChange={setColor} />
			</div>

			<div className="space-y-2">
				<Label>お祝いアニメーション</Label>
				<div className="flex flex-wrap gap-2">
					{ANIMATION_PATTERNS.map((pattern) => (
						<button
							key={pattern.value}
							type="button"
							aria-pressed={animationPattern === pattern.value}
							className={`rounded-full px-3 py-1 text-sm border transition-all ${
								animationPattern === pattern.value
									? "bg-primary text-primary-foreground border-primary"
									: "border-border text-foreground hover:bg-accent"
							}`}
							onClick={() => setAnimationPattern(pattern.value)}
						>
							{pattern.label}
						</button>
					))}
				</div>
			</div>

			<div className="flex justify-end gap-2 pt-1">
				<Button type="button" variant="outline" onClick={onCancel}>
					キャンセル
				</Button>
				<Button type="submit">保存</Button>
			</div>
		</form>
	);
}
