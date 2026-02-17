import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StreakDisplay } from "./streak-display";

describe("StreakDisplay", () => {
	it("連続日数を表示する", () => {
		render(<StreakDisplay streak={7} nextMilestone={14} />);

		expect(screen.getByText("7")).toBeInTheDocument();
		expect(screen.getByText(/日連続/)).toBeInTheDocument();
	});

	it("連続0日のとき表示する", () => {
		render(<StreakDisplay streak={0} nextMilestone={3} />);

		expect(screen.getByText("0")).toBeInTheDocument();
	});

	it("次のマイルストーンを表示する", () => {
		render(<StreakDisplay streak={5} nextMilestone={7} />);

		expect(screen.getByText(/次の目標: 7日/)).toBeInTheDocument();
	});

	it("マイルストーンがnullの場合、目標を表示しない", () => {
		render(<StreakDisplay streak={365} nextMilestone={null} />);

		expect(screen.queryByText(/次の目標/)).not.toBeInTheDocument();
	});
});
