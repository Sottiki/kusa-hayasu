# kusa-hayasu セットアップ手順書

## 1. リポジトリ作成

### GitHub でリポジトリを作成

1. https://github.com/new にアクセス
2. 以下の設定で作成：
   - **Repository name**: `kusa-hayasu`
   - **Description**: `草を生やして習慣を可視化するアプリ`
   - **Public / Private**: お好みで
   - **Add .gitignore**: `Node`を選択
   - **License**: MIT（お好みで）

### ローカルにクローン

```bash
git clone https://github.com/Sottiki/kusa-hayasu.git
cd kusa-hayasu
```

## 2. Next.js プロジェクト作成

```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

プロンプトで聞かれた場合の選択：

| 質問 | 選択 |
|------|------|
| Would you like to use Turbopack? | Yes |
| Would you like to customize the import alias? | No（デフォルト `@/*`） |

## 3. shadcn/ui セットアップ

```bash
pnpm dlx shadcn@latest init
```

推奨選択：

| 質問 | 選択 |
|------|------|
| Style | New York |
| Base color | Neutral |
| CSS variables for theming | Yes |

### 最初に入れておくコンポーネント

```bash
pnpm dlx shadcn@latest add button card dialog input label switch tabs
```

## 4. 追加パッケージ

```bash
pnpm add date-fns next-themes
```

## 5. フォルダ構成の作成

```bash
mkdir -p src/components/habit
mkdir -p src/components/graph
mkdir -p src/components/celebration/patterns
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/stores
mkdir -p src/types
```

## 6. CLAUDE.md と .claude/rules/ を配置

このスクリプト（init-docs.sh）で自動作成済み。

## 7. 動作確認

```bash
pnpm dev
```

http://localhost:3000 でデフォルトページが表示されればOK。

## 8. 初回コミット

```bash
git add .
git commit -m "feat: initial project setup with Next.js, shadcn/ui, and CLAUDE.md"
git push origin main
```
