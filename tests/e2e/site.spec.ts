// 検証（docs/plan.md §6）：V-01〜V-03
import { readFileSync, readdirSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["./", "menu/", "about/", "access/", "news/", "news/2026-10-star-party/"];

test.describe("V-01：全ページが表示され、架空のお店である旨と noindex がある", () => {
  for (const path of pages) {
    test(path, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("note")).toContainText("実在のお店ではありません");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

test("V-02：メニューの品目数が menu.yaml と一致する", async ({ page }) => {
  const yaml = readFileSync("src/content/menu.yaml", "utf8");
  const items = (yaml.match(/^\s+- \{ id:/gm) ?? []).length;
  await page.goto("menu/");
  await expect(page.locator(".item")).toHaveCount(items);
});

test("V-02：お知らせの件数が src/content/news/ のファイル数と一致する", async ({ page }) => {
  const files = readdirSync("src/content/news").filter((f) => f.endsWith(".md")).length;
  await page.goto("news/");
  await expect(page.locator(".list li")).toHaveCount(files);
});

test("サイト内リンクにリンク切れがない", async ({ page }) => {
  const seen = new Set<string>();
  const queue = ["/cafe-sample/"];
  while (queue.length > 0) {
    const path = queue.shift()!;
    if (seen.has(path)) continue;
    seen.add(path);
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    const hrefs = await page.locator("a[href^='/cafe-sample/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    for (const href of hrefs) if (!seen.has(href)) queue.push(href);
  }
});

test.describe("V-03：アクセシビリティ（axe）・CSP・画面幅", () => {
  for (const path of pages) {
    for (const scheme of ["light", "dark"] as const) {
      test(`${path}（${scheme}）`, async ({ page }) => {
        await page.addInitScript(() => {
          (window as unknown as { v: string[] }).v = [];
          document.addEventListener("securitypolicyviolation", (e) =>
            (window as unknown as { v: string[] }).v.push(`${e.violatedDirective} ${e.blockedURI}`),
          );
        });
        await page.setViewportSize({ width: 360, height: 780 });
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
        const serious = axe.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
        expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
        expect(await page.evaluate(() => (window as unknown as { v: string[] }).v)).toEqual([]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
      });
    }
  }
});

test("外部のリンクは新しいタブで開かず、noopener を持つ（制作者・クレジットへのリンク）", async ({ page }) => {
  await page.goto("./");
  for (const a of await page.locator("a[href^='http']").all()) {
    const target = await a.getAttribute("target");
    if (target === "_blank") await expect(a).toHaveAttribute("rel", /noopener/);
  }
});
