// メニューとお知らせ（docs/plan.md §5「更新のしやすさ」、V-02）
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const menuItem = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().int().positive(),
    note: z.string().optional(),
  })
  .strict();

export const collections = {
  menu: defineCollection({
    loader: file("src/content/menu.yaml"),
    schema: z.object({ id: z.string(), title: z.string(), order: z.number(), items: z.array(menuItem) }).strict(),
  }),
  news: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/news" }),
    schema: z.object({ title: z.string().min(1).max(60), date: z.coerce.date(), summary: z.string().max(120) }).strict(),
  }),
};
