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
	// サーバーとクライアントの初回レンダリングを一致させるため、
	// 初期値は常に initialValue を使い、localStorageの読み込みはuseEffect内で行う
	const [storedValue, setStoredValue] = useState<T>(initialValue);
	// hydration完了後のみ書き込みを許可するフラグ
	const [hydrated, setHydrated] = useState(false);

	// クライアント側でlocalStorageから読み込み
	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				setStoredValue(JSON.parse(item) as T);
			}
		} catch {
			// 読み込みエラーは無視
		}
		setHydrated(true);
	}, [key]);

	// localStorageへの書き込み（hydration後のみ実行し、読み込み前に上書きしない）
	useEffect(() => {
		if (!hydrated) return;
		try {
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		} catch {
			// localStorage容量超過等のエラーを静かに無視
		}
	}, [key, storedValue, hydrated]);

	const setValue = useCallback((value: T | ((prev: T) => T)) => {
		setStoredValue((prev) => {
			const nextValue = value instanceof Function ? value(prev) : value;
			return nextValue;
		});
	}, []);

	return [storedValue, setValue];
}
