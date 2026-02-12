# コーディング規約

## 命名規則

### ファイル・ディレクトリ

- **kebab-case** を使用する（例: `user-profile.tsx`, `use-auth.ts`, `format-date.ts`）

### コンポーネント・関数・変数

- コンポーネント名: **PascalCase** (`UserProfile`)
- カスタムフック: **`useXxx`** (`useHabits`, `useSwipe`)
- イベントハンドラ prop: **`onXxx`** / 実装: **`handleXxx`**
- 定数: **UPPER_SNAKE_CASE** (`MAX_RETRY_ATTEMPTS`)
- 通常の変数・関数: **camelCase**

### 型

- 型名: **PascalCase** (`Habit`, `HabitRecord`)
- Props 型: `ComponentNameProps` パターン (`ProductCardProps`)
- `I` / `T` プレフィックスは使わない

## TypeScript 規約

- **デフォルトは `type` を使用**。`interface` は declaration merging / `extends` が必要な場合のみ
- **enum は使わない**。ユニオン型を使用する（`type Status = 'active' | 'archived'`）
- `any` は使わない。`unknown` + 型の絞り込みで対処する
- 配列は `Foo[]` 表記（`Array<Foo>` ではなく）
- `import type` を型のみのインポートに使用する（Biome が強制）

## コンポーネント規約

- **関数コンポーネントのみ**（クラスコンポーネント禁止）
- 関数宣言（`function` キーワード）で定義する
- Props は関数シグネチャで分割代入する

```typescript
type ProductCardProps = {
  product: Product;
  onSelect?: (product: Product) => void;
  className?: string;
};

export function ProductCard({ product, onSelect, className }: ProductCardProps) {
  return <div className={cn("rounded-lg", className)}>...</div>;
}
```

### export ルール

- `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`: **`export default`**（フレームワーク必須）
- **その他すべて**: **named export** を使用する

## Server Components vs Client Components

- **デフォルトは Server Component**
- `'use client'` は以下の場合のみ追加する:
  1. React Hooks（`useState`, `useEffect` 等）
  2. イベントハンドラ（`onClick` 等）
  3. ブラウザ API（`localStorage`, `window`）
- **末端のコンポーネントに `'use client'` を押し下げる**。ページ全体を Client Component にしない

## shadcn/ui 規約

- `src/components/ui/` は CLI でインストールしたまま使う。大幅な変更禁止
- カスタマイズは上位の合成コンポーネントで包んで行う
- `cn()` ユーティリティをすべての className マージに使用する

## import 順序（Biome が自動ソート）

```typescript
// 1. Node.js ビルトイン
// 2. 外部パッケージ（react, next, サードパーティ）
// 3. 内部エイリアス（@/ パス）
// 4. 相対インポート
// 5. 型インポート（import type）
```

## テスト規約

- **Vitest + React Testing Library** を使用
- テストファイルはテスト対象と同じディレクトリに配置する
- 命名: `[対象ファイル名].test.ts(x)`
- TDD: テストを先に書く → 実装 → リファクタリング
