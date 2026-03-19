import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MiniGraph } from "./mini-graph";

describe("MiniGraph", () => {
	const cells = [
		{ date: "2024-01-01", level: 0 },
		{ date: "2024-01-02", level: 1 },
		{ date: "2024-01-03", level: 0 },
		{ date: "2024-01-04", level: 1 },
		{ date: "2024-01-05", level: 1 },
	];

	it("SVGを描画する", () => {
		render(<MiniGraph cells={cells} color="#22c55e" />);
		expect(screen.getByRole("img")).toBeInTheDocument();
	});

	it("cellsが空の場合は何も描画しない", () => {
		const { container } = render(<MiniGraph cells={[]} color="#22c55e" />);
		expect(container.firstChild).toBeNull();
	});
});
