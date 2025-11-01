# Zenn記事執筆ワークフロー改善テンプレート

[![CI - Quality Checks](https://github.com/y-mitsuyoshi/zenn-article-template/actions/workflows/ci.yml/badge.svg)](https://github.com/y-mitsuyoshi/zenn-article-template/actions/workflows/ci.yml)

GitHubベースのZenn記事執筆環境 + CI/CD + AIレビュー機能を提供するテンプレートリポジトリです。

## 🎯 このテンプレートの特徴

- **GitHubでのバージョン管理**: すべての記事をGitリポジトリで管理し、変更履歴を完全に追跡
- **ローカル執筆環境**: 好きなエディタ(VSCode, Vimなど)で執筆し、リアルタイムプレビューが可能
- **自動品質チェック**: プルリクエスト作成時に、Zenn記法チェックとtextlint(日本語校正)が自動実行
- **AI自動レビュー**: GitHub Copilotによる記事内容のレビュー(誤字脱字、表記ゆれ、冗長表現の検出など)
- **自動デプロイ**: `main`ブランチへのマージで自動的にZenn.devに公開

## 📋 目次

- [前提条件](#前提条件)
- [このテンプレートの使い方](#このテンプレートの使い方)
- [セットアップ手順](#セットアップ手順)
- [執筆ワークフロー](#執筆ワークフロー)
- [カスタマイズ方法](#カスタマイズ方法)
- [トラブルシューティング](#トラブルシューティング)

## 🔧 前提条件

このテンプレートを利用するには、以下が必要です:

- [Zenn](https://zenn.dev/)のアカウント
- GitHubアカウント
- Node.js (v18以上推奨)
- Git
- (推奨) GitHub Copilotの利用権限(AIレビュー機能を使用する場合)

## 🚀 このテンプレートの使い方

### 1. リポジトリの作成

1. このリポジトリのページ上部にある **「Use this template」** ボタンをクリック
2. 以下の設定でリポジトリを作成:
   - **Repository name**: 任意の名前(例: `my-zenn-articles`)
   - **Visibility**: **Private** を推奨(下書き記事の管理のため)
3. 「Create repository」をクリック

### 2. ローカルにクローン

```bash
git clone https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
cd <リポジトリ名>
```

## 📝 セットアップ手順

### ステップ1: 依存関係のインストール

```bash
npm install
```

このコマンドで、Zenn CLIやtextlintなど、必要なパッケージがすべてインストールされます。

### ステップ2: Zennアカウントとの連携

1. [Zennのダッシュボード](https://zenn.dev/dashboard/deploys)を開く
2. 「リポジトリを連携する」をクリック
3. 作成したGitHubリポジトリを選択
4. デプロイ対象ブランチに **`main`** を指定
5. 連携を完了

これで、`main`ブランチへのマージが自動的にZennに反映されるようになります。

> **詳しい手順**: [Zenn公式ドキュメント - GitHubリポジトリ連携](https://zenn.dev/zenn/articles/connect-to-github)を参照してください。

### ステップ3: GitHub Copilotレビューの有効化(任意)

AI自動レビューを使用する場合は、以下の手順で設定します:

1. GitHubのリポジトリページで **Settings**(歯車アイコン)をクリック
2. 左サイドバーから **Copilot** を選択
3. **Code review** セクションで以下を設定:
   - 「Enable Copilot code review」をチェック
   - 「Use custom instructions when reviewing pull requests」を **On** に設定
4. 保存して完了

これで、プルリクエスト作成時に `.github/copilot/instructions.md` に基づいたAIレビューが自動実行されます。

> **Note**: この機能を使用するには、GitHub Copilot Enterprise または Copilot Business の契約が必要です。個人プランでは利用できません。

## ✍️ 執筆ワークフロー

### 新規記事の作成

```bash
npm run new:article
```

`articles/` ディレクトリに新しいMarkdownファイルが生成されます。

### 新規Bookの作成

```bash
npm run new:book
```

### ローカルでのプレビュー

```bash
npm run dev
```

ブラウザで `http://localhost:8000` を開くと、リアルタイムプレビューが表示されます。

### 記事の公開フロー

1. **作業ブランチを作成**
   ```bash
   git checkout -b feat/new-article
   ```

2. **記事を執筆**
   - ローカルエディタで `articles/` 内のファイルを編集
   - `npm run dev` でプレビューを確認

3. **変更をコミット & プッシュ**
   ```bash
   git add .
   git commit -m "Add: 新しい記事を追加"
   git push origin feat/new-article
   ```

4. **プルリクエストを作成**
   - GitHubでプルリクエストを作成
   - 自動で以下が実行されます:
     - ✅ **Zenn記法チェック** (`zenn build`) - エラーがあるとPRマージをブロック
     - 📝 **日本語校正チェック** (`textlint`) - 結果はPRコメントに表示（警告のみ、マージはブロックしません）
     - 🤖 **GitHub Copilotによるレビュー** - AI による記事内容のレビュー

5. **レビュー内容を確認・修正**
   - Zenn記法エラーがあれば修正が必須
   - textlintの指摘は参考情報として確認し、必要に応じて修正
   - Copilotの指摘も参考に、文章をブラッシュアップ

6. **マージして公開**
   - Zenn記法チェックが通れば `main` ブランチにマージ可能
   - Zenn.devに自動デプロイされます!

> **💡 Tip**: textlintの指摘はすべて修正する必要はありません。文脈に応じて適切に判断してください。

## ⚙️ カスタマイズ方法

### textlintルールのカスタマイズ

現在、textlintのルールは`package.json`の`lint:text`スクリプト内で直接指定されています。

デフォルトで有効化されているルール:
- `preset-ja-technical-writing`: 技術文書向けの日本語ルール
- `preset-ja-spacing`: 日本語のスペーシングルール

より詳細にカスタマイズしたい場合は、`.textlintrc`ファイルを作成することもできます:

```json
{
  "rules": {
    "preset-ja-technical-writing": {
      "sentence-length": {
        "max": 150
      },
      "no-exclamation-question-mark": false
    },
    "preset-ja-spacing": true
  }
}
```

`.textlintrc`ファイルを作成した場合は、`package.json`の`lint:text`スクリプトを以下のように変更してください:

```json
"lint:text": "textlint articles/**/*.md books/**/*.md"
```

詳しくは [textlintのドキュメント](https://textlint.github.io/)を参照してください。

### AIレビュー指示のカスタマイズ

`.github/copilot/instructions.md` を編集して、レビューの観点を変更できます。

例:
- チーム独自の用語統一ルールを追加
- 特定の表現を推奨/非推奨に設定
- レビューの厳しさを調整

## 🛠️ 利用可能なコマンド

| コマンド | 説明 |
|---|---|
| `npm run dev` | ローカルプレビューサーバーを起動 |
| `npm run new:article` | 新規記事を作成 |
| `npm run new:book` | 新規Bookを作成 |
| `npm run lint:zenn` | Zenn記法チェックを実行 |
| `npm run lint:text` | textlintによる日本語校正を実行 |
| `npm run lint` | すべてのLintを一括実行 |

## 🐛 トラブルシューティング

### CIが失敗する

**Zenn記法エラーの場合:**
- Front Matterの記述ミス（`title`, `emoji`, `type`, `topics`など）を確認
- Markdownの構文エラーを確認
- このエラーはPRマージをブロックするため、修正が必須です

**textlintについて:**
- textlintはPRマージをブロックしません
- 検出結果はPRコメントに表示されます
- すべての指摘を修正する必要はなく、参考情報として活用してください

### Zennに記事が反映されない

- `main`ブランチにマージされているか確認
- Zennダッシュボードでリポジトリ連携が有効か確認
- Front Matterの `published` が `true` になっているか確認

### AIレビューが動作しない

- リポジトリ設定で Copilot Code review が有効か確認
- GitHub Copilotの契約状況を確認

### textlintの指摘が多すぎる場合

ローカルで個別にルールを無効化できます:
```bash
# 特定のルールを無効化して実行
npx textlint --rule preset-ja-spacing articles/your-article.md
```

または、`.textlintrc`ファイルを作成してルールをカスタマイズしてください（詳細は「カスタマイズ方法」セクション参照）。

## 🎓 テンプレート管理者向け: 次のステップ

このテンプレートを作成した後、以下の設定を行うことで、他のユーザーが「Use this template」ボタンから利用できるようになります。

### 1. GitHubでテンプレートリポジトリとして設定

1. リポジトリページで **Settings**(歯車アイコン)をクリック
2. 「General」セクションの上部にある **Template repository** にチェックを入れる
3. 変更が自動保存されます

これで、リポジトリページに緑色の「Use this template」ボタンが表示されるようになります。

### 2. 初回セットアップ(このリポジトリでの作業)

このテンプレートリポジトリ自体を使って記事を書く場合は、以下を実行してください:

#### 2-1. 依存関係のインストール

```bash
npm install
```

#### 2-2. Zenn CLIの初期化(まだの場合)

```bash
npx zenn init
```

このコマンドで、`articles/` と `books/` ディレクトリ、および `.zenn-config.json` が生成されます。
(このテンプレートには既に含まれているため、実行不要です)

#### 2-3. Zennアカウントとの連携

上記「[セットアップ手順](#セットアップ手順)」のステップ2を参照してください。

#### 2-4. GitHub Copilot Code Reviewの有効化

上記「[セットアップ手順](#セットアップ手順)」のステップ3を参照してください。

### 3. テンプレート利用者への案内

テンプレート利用者には、以下を案内してください:

1. 「Use this template」ボタンから新しいリポジトリを作成
2. 本READMEの「[このテンプレートの使い方](#このテンプレートの使い方)」セクションに従ってセットアップ
3. 記事を書いて、プルリクエストを作成し、自動レビューを受ける!

## 📚 参考リンク

- [Zenn公式ドキュメント](https://zenn.dev/zenn/articles/zenn-cli-guide)
- [Zenn CLIのGitHub連携](https://zenn.dev/zenn/articles/connect-to-github)
- [textlint](https://textlint.github.io/)
- [GitHub Copilot](https://github.com/features/copilot)

## 📄 ライセンス

MIT License

---

**Happy Writing! 📝✨**
