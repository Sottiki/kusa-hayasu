import type { MilestoneCheck } from "@/types/habit";

/** マイルストーンの閾値一覧（昇順） */
const MILESTONES: number[] = [
	3, 7, 14, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 365,
];

/** マイルストーン閾値の配列を返す */
export function getMilestones(): number[] {
	return [...MILESTONES];
}

/** 現在のstreakに対する次のマイルストーンを返す。全達成済みならnull */
export function getNextMilestone(currentStreak: number): number | null {
	return MILESTONES.find((m) => m > currentStreak) ?? null;
}

/**
 * 新たに達成されたマイルストーンを検出する。
 * streakがマイルストーンに到達済み かつ 未祝いの場合にマイルストーン番号を返す。
 * 該当しない場合はnull。
 */
export function checkMilestoneReached(
	streak: number,
	celebrated: MilestoneCheck[],
	habitId: string,
): number | null {
	// streakが到達しているマイルストーンを大きい方から探す
	const reached = [...MILESTONES].reverse().find((m) => streak >= m);
	if (reached === undefined) {
		return null;
	}

	// すでに祝い済みかチェック
	const alreadyCelebrated = celebrated.some(
		(c) => c.habitId === habitId && c.milestone === reached,
	);
	if (alreadyCelebrated) {
		return null;
	}

	return reached;
}

/** マイルストーンに対応するお祝いメッセージを返す */
export function getMilestoneMessage(milestone: number): string {
	const messages: Record<number, string> = {
		3: "3日連続達成！まずは小さな一歩から。習慣は最初の3日が一番きつい！",
		7: "1週間達成！脳が新しいパターンを認識し始めています。",
		14: "2週間達成！習慣の土台ができてきました。",
		30: "30日達成！1ヶ月継続は大きな節目です。もう立派な習慣です！",
		60: "60日達成！習慣が自然な行動になりつつあります。",
		90: "90日達成！3ヶ月継続、素晴らしい！",
		120: "120日達成！4ヶ月も続けられるなんて、すごい！",
		150: "150日達成！半年の折り返し地点を過ぎました。",
		180: "180日達成！半年間の継続、本当にすごい！",
		210: "210日達成！7ヶ月目に突入！",
		240: "240日達成！8ヶ月継続中。あなたの努力は本物です。",
		270: "270日達成！9ヶ月、すっかり生活の一部ですね。",
		300: "300日達成！300日の積み重ね、圧巻です。",
		330: "330日達成！1年まであと少し！",
		360: "360日達成！ゴールが見えてきました！",
		365: "365日達成！1年間毎日続けました。あなたは本当にすごい人です！",
	};

	return messages[milestone] ?? `${milestone}日達成！おめでとうございます！`;
}
