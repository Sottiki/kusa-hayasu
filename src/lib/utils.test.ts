import { describe, expect, it } from "vitest";
import { cn, generateId } from "./utils";

describe("generateId", () => {
	it("UUID v4形式の文字列を返す", () => {
		const id = generateId();
		expect(id).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
		);
	});

	it("呼び出しごとに異なるIDを返す", () => {
		const ids = Array.from({ length: 10 }, () => generateId());
		const unique = new Set(ids);
		expect(unique.size).toBe(10);
	});
});

describe("cn", () => {
	it("クラス名を結合する", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("条件付きクラスを正しく処理する", () => {
		expect(cn("base", false && "hidden", "visible")).toBe("base visible");
	});

	it("Tailwindの競合クラスを後勝ちでマージする", () => {
		expect(cn("p-2", "p-4")).toBe("p-4");
	});
});
