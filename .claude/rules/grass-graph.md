---
paths: src/components/graph/**
---
# Grass Graph Specification

## Layout
- GitHub と同様、右端が今日、左端が過去
- 横軸: 週、縦軸: 曜日（7日）
- SVG で描画（将来のカスタマイズに対応）

## Color Scale
- 5段階（0〜4）
  - 0: 未達成（グレー系）
  - 1〜4: 習慣のテーマカラーを薄い→濃いで表現
- 色はHabitごとに設定、カスタマイズ可能

## Display Periods
1日, 7日, 14日, 31日, 3ヶ月, 6ヶ月, 1年（切替タブで選択）
