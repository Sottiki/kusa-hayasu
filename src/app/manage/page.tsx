"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { HabitForm } from "@/components/habit/habit-form";
import { HabitList } from "@/components/habit/habit-list";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useHabits } from "@/hooks/use-habits";
import type { AnimationPattern, Habit } from "@/types/habit";

type FormData = {
	name: string;
	color: string;
	animationPattern: AnimationPattern;
};

export default function ManagePage() {
	const { habits, addHabit, updateHabit, archiveHabit, deleteHabit } =
		useHabits();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

	function handleAdd() {
		setEditingHabit(null);
		setDialogOpen(true);
	}

	function handleEdit(habit: Habit) {
		setEditingHabit(habit);
		setDialogOpen(true);
	}

	function handleSubmit(data: FormData) {
		if (editingHabit) {
			updateHabit(editingHabit.id, data);
		} else {
			addHabit(data);
		}
		setDialogOpen(false);
	}

	function handleDialogClose(open: boolean) {
		if (!open) setDialogOpen(false);
	}

	return (
		<main className="min-h-svh pb-20">
			<div className="px-4 pt-6">
				<div className="mb-6 flex items-center justify-between">
					<h1 className="text-xl font-semibold">習慣の管理</h1>
					<Button size="sm" onClick={handleAdd}>
						<Plus className="mr-1 h-4 w-4" />
						追加
					</Button>
				</div>
				<HabitList
					habits={habits}
					onEdit={handleEdit}
					onArchive={archiveHabit}
					onDelete={deleteHabit}
				/>
			</div>

			<Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{editingHabit ? "習慣を編集" : "習慣を追加"}
						</DialogTitle>
					</DialogHeader>
					<HabitForm
						habit={editingHabit ?? undefined}
						onSubmit={handleSubmit}
						onCancel={() => setDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</main>
	);
}
