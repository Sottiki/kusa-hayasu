"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "./bottom-nav";

/** pathname を取得してBottomNavに渡すクライアントラッパー */
export function BottomNavWrapper() {
	const pathname = usePathname();
	return <BottomNav currentPath={pathname} />;
}
