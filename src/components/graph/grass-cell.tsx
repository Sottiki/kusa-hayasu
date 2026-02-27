import type { GrassCell } from "@/lib/grass-utils";

type GrassCellRectProps = {
	cell: GrassCell;
	x: number;
	y: number;
	size: number;
	color: string;
	onPress?: (date: string) => void;
};

/** 草グラフの1セル（SVG rect） */
export function GrassCellRect({
	cell,
	x,
	y,
	size,
	color,
	onPress,
}: GrassCellRectProps) {
	const fill = cell.level === 1 ? color : "#e2e8f0";

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: SVGのrectは条件付きでrole="button"を付与済み
		<rect
			x={x}
			y={y}
			width={size}
			height={size}
			fill={fill}
			rx={2}
			role={onPress ? "button" : undefined}
			data-date={cell.date}
			aria-label={`${cell.date}: ${cell.level === 1 ? "達成" : "未達成"}`}
			onClick={onPress ? () => onPress(cell.date) : undefined}
			style={{ cursor: onPress ? "pointer" : "default" }}
		/>
	);
}
