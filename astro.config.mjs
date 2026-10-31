// 架空のカフェ「星と過ごす珈琲夜」の制作例（docs/plan.md）
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://inuverse44.github.io",
  base: "/cafe-sample",
  trailingSlash: "always",
  markdown: { syntaxHighlight: false },
  // フォントや画像を data: URI で埋め込まない（CSP を保つ）。小さい CSS は既定どおりインラインにする
  vite: { build: { assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined) } },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "form-action 'self'",
        "frame-src 'none'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
    },
  },
});
