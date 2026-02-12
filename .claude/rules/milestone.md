---
paths: src/components/celebration/**
---
# Milestone & Celebration

## Milestone Timing
- 3日, 7日, 14日, 30日（初期は密に）
- 以降 1ヶ月ごと（60日, 90日, 120日...）
- 365日でスーパーアニメーション（特別演出）

## Animation
- 複数パターンを用意（お祭り、トースト、草グラフ演出 等）
- カレンダーごとにパターンを選択可能（習慣作成・編集時）
- パフォーマンスに配慮（CSS/SVGアニメーション推奨）

## Celebration Content
- マイルストーン達成時に習慣化のコツ・豆知識を表示

## Critical Rule
- 連続数は記録の取り消しでリセットしない（脅迫的にならない設計）
- MilestoneCheck で celebratedAt を記録し、二重再生を防止
