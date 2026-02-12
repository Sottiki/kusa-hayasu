# Data Design (Phase 1)

## Types

```typescript
type Habit = {
  id: string;                // UUID
  name: string;              // 習慣名
  color: string;             // テーマカラー（HEX）- UIアクセントにも反映
  animationPattern: string;  // お祝いアニメーションのパターン名
  createdAt: string;         // ISO 8601
  archivedAt?: string;       // アーカイブ日時（undefinedなら有効）
  order: number;             // 表示順（スワイプ順）
};

type HabitRecord = {
  id: string;        // UUID
  habitId: string;   // Habit の ID
  date: string;      // YYYY-MM-DD
  completed: boolean;
  createdAt: string; // ISO 8601
};

type MilestoneCheck = {
  habitId: string;
  milestone: number;    // 達成日数（3, 7, 14, 30, 60...）
  celebratedAt: string; // お祝い済み日時（二重再生防止）
};
```

## localStorage Keys

- `kusa-hayasu:habits` — Habit[]
- `kusa-hayasu:records` — HabitRecord[]
- `kusa-hayasu:milestones` — MilestoneCheck[]

## Rules

- stores/ 内にデータアクセスを集約（将来 Supabase に差し替えるため）
- localStorage の読み書きは必ず useEffect 内で行うこと
- 日付は YYYY-MM-DD 文字列で統一（タイムゾーン問題を回避）
