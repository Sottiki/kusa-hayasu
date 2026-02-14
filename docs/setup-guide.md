# kusa-hayasu セットアップ手順書

## 1. Next.js プロジェクト作成

```bash
pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
```

> **注意**: `--eslint` フラグは付けない。リンター / フォーマッターは Biome を使用する。

プロンプトで聞かれた場合の選択：

| 質問                                          | 選択                   |
| --------------------------------------------- | ---------------------- |
| Would you like to use ESLint?                 | **No**                 |
| Would you like to use Turbopack?              | Yes                    |
| Would you like to customize the import alias? | No（デフォルト `@/*`） |

## 2. Biome セットアップ（リンター + フォーマッター）

```bash
pnpm add -D @biomejs/biome
pnpm biome init
```

生成された `biome.json` をプロジェクト用の設定ファイルで置き換える（別途作成済み）。

### Next.js ビルド時の ESLint 無効化

```js
// next.config.ts
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
```

### VS Code 設定

```bash
mkdir -p .vscode
```

`.vscode/settings.json` を作成：

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit",
    "source.fixAll.biome": "explicit",
    "quickfix.biome": "explicit"
  },
  "[typescriptreact]": { "editor.defaultFormatter": "biomejs.biome" },
  "[typescript]": { "editor.defaultFormatter": "biomejs.biome" },
  "[json]": { "editor.defaultFormatter": "biomejs.biome" },
  "[css]": { "editor.defaultFormatter": "biomejs.biome" }
}
```

### package.json にスクリプト追加

```json
{
  "scripts": {
    "check": "biome check .",
    "check:fix": "biome check --fix .",
    "format": "biome format --write ."
  }
}
```

## 3. Vitest セットアップ（テストフレームワーク）

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event vite-tsconfig-paths
```

### vitest.config.mts

```typescript
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
  },
});
```

### vitest.setup.ts

```typescript
import "@testing-library/jest-dom/vitest";
```

### package.json にスクリプト追加

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

## 4. shadcn/ui セットアップ

```bash
pnpm dlx shadcn@latest init
```

推奨選択：

| 質問                      | 選択     |
| ------------------------- | -------- |
| Style                     | New York |
| Base color                | Neutral  |
| CSS variables for theming | Yes      |

### 最初に入れておくコンポーネント

```bash
pnpm dlx shadcn@latest add button card dialog input label switch tabs
```

## 5. 追加パッケージ

```bash
pnpm add date-fns next-themes
```

## 6. フォルダ構成の作成

```bash
mkdir -p src/components/habit
mkdir -p src/components/graph
mkdir -p src/components/celebration/patterns
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/stores
mkdir -p src/types
```

## 7. CLAUDE.md と .claude/rules/ を配置

プロジェクトルートに CLAUDE.md、`.claude/rules/` に各ルールファイルを配置する。

## 8. 動作確認

```bash
pnpm dev        # 開発サーバー起動
pnpm check      # Biome リント・フォーマットチェック
pnpm test:run   # テスト実行（初回はテストファイルがないのでスキップ）
```

http://localhost:3000 でデフォルトページが表示されればOK。

## 9. 初回コミット

```bash
git add .
git commit -m "feat: Next.js + Biome + Vitest + shadcn/ui の初期セットアップ"
git push origin main
```
