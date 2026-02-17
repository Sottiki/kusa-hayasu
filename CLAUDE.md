# kusa-hayasu

GitHub風の草グラフで習慣の達成状況を可視化するスマホファーストWebアプリ。Phase 1 はローカル保存（localStorage）のみ。

## Tech Stack

- Next.js 15 (App Router) + TypeScript (strict)
- shadcn/ui + Tailwind CSS v4
- Biome（リンター + フォーマッター）
- Vitest + React Testing Library（テスト）
- date-fns / next-themes / SVG自作グラフ
- pnpm

## Commands

- `pnpm dev` — 開発サーバー
- `pnpm build` — ビルド
- `pnpm check` — Biome リント + フォーマットチェック
- `pnpm check:fix` — Biome 自動修正
- `pnpm test` — Vitest（watchモード）
- `pnpm test:run` — Vitest（単発実行）

## Architecture

```
src/
├── app/                 # ページ（App Router）
├── components/
│   ├── ui/              # shadcn/ui（自動生成、編集禁止）
│   ├── habit/           # 習慣管理UI
│   ├── graph/           # 草グラフ（SVG）
│   └── celebration/     # お祝いアニメーション
├── hooks/               # useLocalStorage, useHabits, useSwipe, useMilestone
├── lib/                 # dateUtils, grassUtils, milestoneUtils
├── stores/              # データアクセス層（将来Supabase差し替え）
└── types/               # 型定義
```

## Key Design Decisions

- **脅迫的にならない**: 記録取り消しでも連続数はリセットしない
- **ボタンファースト**: デフォルトは達成ボタン表示、下スワイプでカレンダー表示
- **データ層の抽象化**: stores/ に集約し将来の Supabase 移行に備える
- **カレンダーごとの色**: 習慣の色がUIアクセントカラーに動的反映（CSS変数）

## 開発フロー

### テスト方針

- TDD で進める。実装前にテストを書く。
- Red-Green-Refactorのサイクルで実装すること。
- 単体テストは必ず書く。
- 結合テスト・E2E テストは必須ではない。必要と判断した場合は提案すること。

### Git 運用

- コミットは指示者（人間）が行う。agent はコミットしない。
- コミットメッセージは agent が作成する。
  - 形式: Conventional Commits。接頭辞は英語、本文は日本語。
  - 例: `fix: ほげほげのフガフガを修正`
- 小さい粒度でコミット可能な単位を意識して作業する。
- プルリクエストも適切な粒度にまとめる。

### agent の権限範囲

- ファイルの作成・編集・削除: 自由に行ってよい
- リファクタリング: 小規模なら実施OK。大規模なら提案して確認を取る。
- ライブラリの新規導入（npm install 等）: **必ず事前に確認を取ること**
- その他のインストール系コマンド: **必ず事前に確認を取ること**
- ビルド・テスト・リントの実行: 自由に行ってよい

### 作業の進め方

- 一度に大量の変更をせず、小さく作って確認を取りながら進める。
  - 開発速度が速いため、少しの間違いにより方向がズレたまま進むのを防ぐためです。
- バックエンドから順に実装せず、バックエンドからフロントエンドまでをiterativeに実装してください。
  - いち早く公開でき、目視による全体的なフィードバックが可能になるためです。
  - 後になって初めからやり直しを防ぐためです。
- 実装方針に迷った場合は、選択肢を提示して指示者に判断を仰ぐ。

### 言語

- コメント: 日本語
- コミットメッセージ: 接頭辞は英語、本文は日本語

## Important

- NEVER edit `src/components/ui/` directly — managed by `pnpm dlx shadcn@latest add`
- localStorage は useEffect 内でのみアクセス（hydration mismatch 防止）
- Server Components でブラウザAPI使用禁止
- 詳細な要件定義は @docs/requirements.md を参照
