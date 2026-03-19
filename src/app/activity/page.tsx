"use client";

import { ActivityList } from "@/components/habit/activity-list";
import { useHabits } from "@/hooks/use-habits";
import { useRecordsAll } from "@/hooks/use-records-all";

export default function ActivityPage() {
	const { habits } = useHabits();
	const { records } = useRecordsAll();

	return (
		<main className="min-h-svh pb-20">
			<div className="px-4 pt-6">
				<h1 className="mb-6 text-xl font-semibold">アクティビティ</h1>
			</div>
			<ActivityList habits={habits} records={records} />
		</main>
	);
}
