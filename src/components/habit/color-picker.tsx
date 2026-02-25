"use client";

/** カラーパレットの定義 */
export const PRESET_COLORS = [
	{ value: "#22c55e", label: "グリーン" },
	{ value: "#3b82f6", label: "ブルー" },
	{ value: "#a855f7", label: "パープル" },
	{ value: "#f97316", label: "オレンジ" },
	{ value: "#ec4899", label: "ピンク" },
	{ value: "#ef4444", label: "レッド" },
	{ value: "#eab308", label: "イエロー" },
	{ value: "#14b8a6", label: "ティール" },
] as const;

type ColorPickerProps = {
	value: string;
	onChange: (color: string) => void;
};

/** カラーピッカー — プリセットカラーからテーマカラーを選択 */
export function ColorPicker({ value, onChange }: ColorPickerProps) {
	return (
		<fieldset className="m-0 flex flex-wrap gap-3 border-0 p-0">
			<legend className="sr-only">テーマカラー</legend>
			{PRESET_COLORS.map((color) => (
				<button
					key={color.value}
					type="button"
					aria-label={`${color.label}を選択`}
					aria-pressed={value === color.value}
					className={`h-8 w-8 rounded-full transition-all ${
						value === color.value
							? "ring-2 ring-offset-2 ring-foreground scale-110"
							: "hover:scale-110 opacity-70 hover:opacity-100"
					}`}
					style={{ backgroundColor: color.value }}
					onClick={() => onChange(color.value)}
				/>
			))}
		</fieldset>
	);
}
