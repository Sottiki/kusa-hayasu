"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ViewPeriod } from "@/types/habit";

const PERIOD_OPTIONS: { value: ViewPeriod; label: string }[] = [
	{ value: "7d", label: "7日" },
	{ value: "14d", label: "14日" },
	{ value: "31d", label: "31日" },
	{ value: "3mo", label: "3ヶ月" },
	{ value: "6mo", label: "6ヶ月" },
	{ value: "1yr", label: "1年" },
];

type PeriodSelectorProps = {
	value: ViewPeriod;
	onChange: (period: ViewPeriod) => void;
};

/** 草グラフの表示期間を切り替えるタブ */
export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
	return (
		<Tabs value={value} onValueChange={(v) => onChange(v as ViewPeriod)}>
			<TabsList className="overflow-x-auto">
				{PERIOD_OPTIONS.map((opt) => (
					<TabsTrigger key={opt.value} value={opt.value}>
						{opt.label}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
}
