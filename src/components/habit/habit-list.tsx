"use client";

import { Archive, ArchiveX, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Habit } from "@/types/habit";

type HabitListProps = {
	habits: Habit[];
	archivedHabits?: Habit[];
	onEdit: (habit: Habit) => void;
	onArchive: (habitId: string) => void;
	onUnarchive?: (habitId: string) => void;
	onDelete: (habitId: string) => void;
};

/** 習慣一覧 — 編集・アーカイブ・削除アクション付き */
export function HabitList({
	habits,
	archivedHabits = [],
	onEdit,
	onArchive,
	onUnarchive,
	onDelete,
}: HabitListProps) {
	const [deleteTarget, setDeleteTarget] = useState<Habit | null>(null);

	if (habits.length === 0 && archivedHabits.length === 0) {
		return (
			<div className="py-12 text-center text-muted-foreground">
				<p>習慣がありません</p>
				<p className="mt-1 text-sm">「追加」ボタンから習慣を作成してください</p>
			</div>
		);
	}

	return (
		<>
			{habits.length > 0 && (
				<ul className="space-y-2">
					{habits.map((habit) => (
						<li
							key={habit.id}
							className="flex items-center gap-3 rounded-lg border p-3"
						>
							<div
								className="h-4 w-4 flex-none rounded-full"
								style={{ backgroundColor: habit.color }}
								aria-hidden
							/>
							<span className="flex-1 font-medium">{habit.name}</span>
							<div className="flex gap-1">
								<Button
									type="button"
									variant="ghost"
									size="icon"
									aria-label="編集"
									onClick={() => onEdit(habit)}
								>
									<Pencil className="h-4 w-4" />
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									aria-label="アーカイブ"
									onClick={() => onArchive(habit.id)}
								>
									<Archive className="h-4 w-4" />
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									aria-label="削除"
									onClick={() => setDeleteTarget(habit)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</li>
					))}
				</ul>
			)}

			{archivedHabits.length > 0 && (
				<div className="mt-6">
					<h2 className="mb-2 text-sm font-medium text-muted-foreground">
						アーカイブ済み
					</h2>
					<ul className="space-y-2">
						{archivedHabits.map((habit) => (
							<li
								key={habit.id}
								className="flex items-center gap-3 rounded-lg border border-dashed p-3 opacity-60"
							>
								<div
									className="h-4 w-4 flex-none rounded-full"
									style={{ backgroundColor: habit.color }}
									aria-hidden
								/>
								<span className="flex-1 font-medium">{habit.name}</span>
								<div className="flex gap-1">
									<Button
										type="button"
										variant="ghost"
										size="icon"
										aria-label="復元"
										onClick={() => onUnarchive?.(habit.id)}
									>
										<ArchiveX className="h-4 w-4" />
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										aria-label="削除"
										onClick={() => setDeleteTarget(habit)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}

			<Dialog
				open={deleteTarget !== null}
				onOpenChange={(open) => !open && setDeleteTarget(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>習慣を削除</DialogTitle>
						<DialogDescription>
							「{deleteTarget?.name}
							」を完全に削除します。この操作は取り消せません。
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setDeleteTarget(null)}>
							キャンセル
						</Button>
						<Button
							variant="destructive"
							onClick={() => {
								if (deleteTarget) {
									onDelete(deleteTarget.id);
									setDeleteTarget(null);
								}
							}}
						>
							削除する
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
