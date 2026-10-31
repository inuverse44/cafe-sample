// サイト内のリンクに、公開先のベースパス（/cafe-sample/）を付ける
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
