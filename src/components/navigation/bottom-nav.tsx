"use client";

import { Home, LayoutList, ListChecks, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavItem = {
	href: string;
	label: string;
	icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
	{
		href: "/",
		label: "ホーム",
		icon: <Home className="h-5 w-5" />,
	},
	{
		href: "/activity",
		label: "アクティビティ",
		icon: <LayoutList className="h-5 w-5" />,
	},
	{
		href: "/manage",
		label: "管理",
		icon: <ListChecks className="h-5 w-5" />,
	},
	{
		href: "/settings",
		label: "設定",
		icon: <Settings className="h-5 w-5" />,
	},
];

type BottomNavProps = {
	currentPath: string;
};

/** ボトムナビゲーション — ホーム・管理を切替 */
export function BottomNav({ currentPath }: BottomNavProps) {
	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
			<ul className="flex">
				{NAV_ITEMS.map((item) => {
					const isActive = currentPath === item.href;
					return (
						<li key={item.href} className="flex-1">
							<Link
								href={item.href}
								aria-label={item.label}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"flex flex-col items-center gap-1 py-3 text-xs transition-colors",
									isActive
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground",
								)}
							>
								{item.icon}
								<span>{item.label}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
