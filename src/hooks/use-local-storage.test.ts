import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useLocalStorage } from "./use-local-storage";

describe("useLocalStorage", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("初期値を返す（localStorageが空の場合）", () => {
		const { result } = renderHook(() => useLocalStorage("test-key", "default"));
		expect(result.current[0]).toBe("default");
	});

	it("localStorageに保存された値を読み込む", () => {
		localStorage.setItem("test-key", JSON.stringify("stored-value"));

		const { result } = renderHook(() => useLocalStorage("test-key", "default"));

		expect(result.current[0]).toBe("stored-value");
	});

	it("値を更新するとlocalStorageにも保存される", () => {
		const { result } = renderHook(() => useLocalStorage("test-key", "default"));

		act(() => {
			result.current[1]("new-value");
		});

		expect(result.current[0]).toBe("new-value");
		expect(JSON.parse(localStorage.getItem("test-key") ?? "")).toBe(
			"new-value",
		);
	});

	it("関数による更新ができる", () => {
		const { result } = renderHook(() => useLocalStorage("test-key", 0));

		act(() => {
			result.current[1]((prev) => prev + 1);
		});

		expect(result.current[0]).toBe(1);
	});

	it("オブジェクトを保存・取得できる", () => {
		const initial = { name: "test", count: 0 };
		const { result } = renderHook(() => useLocalStorage("test-key", initial));

		act(() => {
			result.current[1]({ name: "updated", count: 5 });
		});

		expect(result.current[0]).toEqual({ name: "updated", count: 5 });
	});

	it("配列を保存・取得できる", () => {
		const { result } = renderHook(() =>
			useLocalStorage<string[]>("test-key", []),
		);

		act(() => {
			result.current[1](["a", "b", "c"]);
		});

		expect(result.current[0]).toEqual(["a", "b", "c"]);
	});
});
