# 星と過ごす珈琲夜（制作例）

Inuverse が作ったホームページの見本サイトです。**架空のカフェ**のホームページで、実在のお店ではありません。

- 公開ページ：https://inuverse44.github.io/cafe-sample/
- 制作計画書：[docs/plan.md](docs/plan.md)
- 写真のクレジット：[CREDITS.md](CREDITS.md)
- 制作：[Inuverse](https://www.inuverse.dev)

## 更新のしかた

| 更新したいもの | 書き換えるファイル |
| --- | --- |
| メニュー | `src/content/menu.yaml` |
| お知らせ | `src/content/news/` に Markdown のファイルを 1 つ足す |

`main` に入ると、検査（ビルド、表示、アクセシビリティ、CSP、Lighthouse、画像のメタデータ）が通ったときだけ公開されます。

## 開発

```sh
npm ci
npm run dev          # http://localhost:4321/cafe-sample/
npm run build && npm run test:e2e && npm run test:lighthouse
```
