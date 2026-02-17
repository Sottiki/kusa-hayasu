"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * SSR安全なlocalStorageフック。
 * サーバーサイドではinitialValueを返し、クライアント側でlocalStorageから読み込む。
 */
export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === "undefined") return initialValue;
		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch {
			return initialValue;
		}
	});

	// localStorageへの書き込み
	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		} catch {
			// localStorage容量超過等のエラーを静かに無視
		}
	}, [key, storedValue]);

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			setStoredValue((prev) => {
				const nextValue =
					value instanceof Function ? value(prev) : value;
				return nextValue;
			});
		},
		[],
	);

	return [storedValue, setValue];
}
