# 写真のクレジット

このサイトの写真は、すべて [Unsplash](https://unsplash.com/) から [Unsplash License](https://unsplash.com/license)（商用利用可、クレジット表記は任意）のもとで使っています。サイズを変え、メタデータを削除しています。

| ファイル | 内容 | 撮影者 | 元の写真 |
| --- | --- | --- | --- |
| `public/images/hero-*.webp` | 木々の間に広がる星空 | Jonathan Gagnon | https://unsplash.com/photos/a-starry-night-sky-seen-through-dark-tree-silhouettes-YME1gPbj_0Q |
| `public/images/books-*.webp` | 窓辺の机に積まれた本 | Sergey Beschastnykh | https://unsplash.com/photos/a-stack-of-books-sitting-on-top-of-a-table-next-to-a-window-ecjDWff40cc |
| `public/images/menu-*.webp` | 珈琲と焼き菓子 | simon follin | https://unsplash.com/photos/a-cup-of-coffee-and-some-pastries-on-a-table-G36pUixWrOA |
| `public/images/meadow-*.webp` | 草原の先に続く森 | Zehra Torun | https://unsplash.com/photos/a-wide-open-field-with-trees-in-the-background-CGCSnU2AvQc |

写真を追加するときは、この表に追記し、メタデータを削除してから置く（例：`magick in.jpg -strip -resize 1600x -quality 76 out.webp`）。CI で検査している。
