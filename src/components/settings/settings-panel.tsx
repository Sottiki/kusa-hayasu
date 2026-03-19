"use client";

import { Download, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

/** データのエクスポート処理 — localStorage の全データをJSONファイルとしてダウンロード */
function exportData() {
	const keys = [
		"kusa-hayasu:habits",
		"kusa-hayasu:records",
		"kusa-hayasu:milestones",
	];
	const data: Record<string, unknown> = {};
	for (const key of keys) {
		const raw = localStorage.getItem(key);
		data[key] = raw ? JSON.parse(raw) : [];
	}

	const json = JSON.stringify(data, null, 2);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = `kusa-hayasu-backup-${new Date().toISOString().slice(0, 10)}.json`;
	a.click();
	URL.revokeObjectURL(url);
}

/** 設定パネル — ダークモード切替・データエクスポート */
export function SettingsPanel() {
	const { theme, setTheme } = useTheme();
	// hydration mismatch 防止
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const isDark = theme === "dark";

	return (
		<div className="divide-y">
			{/* ダークモード切替 */}
			<div className="flex items-center justify-between px-4 py-4">
				<div>
					<p className="font-medium">ダークモード</p>
					<p className="text-muted-foreground text-sm">テーマを切り替えます</p>
				</div>
				{mounted && (
					<Button
						variant="outline"
						size="sm"
						onClick={() => setTheme(isDark ? "light" : "dark")}
						aria-label={isDark ? "ライトモードに切替" : "ダークモードに切替"}
					>
						{isDark ? (
							<Sun className="h-4 w-4" />
						) : (
							<Moon className="h-4 w-4" />
						)}
					</Button>
				)}
			</div>

			{/* データエクスポート */}
			<div className="flex items-center justify-between px-4 py-4">
				<div>
					<p className="font-medium">データのエクスポート</p>
					<p className="text-muted-foreground text-sm">
						習慣データをJSONで保存
					</p>
				</div>
				<Button variant="outline" size="sm" onClick={exportData}>
					<Download className="mr-1 h-4 w-4" />
					エクスポート
				</Button>
			</div>

			{/* ローカル保存の注意書き */}
			<div className="px-4 py-4">
				<p className="text-muted-foreground text-xs leading-relaxed">
					※ データはこのデバイスのブラウザにのみ保存されています。
					ブラウザのキャッシュをクリアするとデータが失われる場合があります。
					定期的にエクスポートしてバックアップしてください。
				</p>
			</div>
		</div>
	);
}
