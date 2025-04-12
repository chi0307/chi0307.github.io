# 個人網頁的專案說明

### Generate Pages

#### 原因

- github page 是純靜態網站，找不到 html 就不會觸發 vue router
- 不想每個 path 都要維護重複的檔案

#### 處理

寫一個 ts 檢查 router enum 在路徑中有沒有存在 html file 沒有的話就複製一份給他，最終會讓有設定的 router 都有一個 html 但複製出來的都是取用同一個 vue router。

### Github Page

用 gh-pages 當作 default branch，在每次 push commit 就觸發 lint, test 最終執行 build 跟 deploy 去自動更新[個人網站](https://chi0307.github.io)。

### Mini Side Project

不想維護太多專案，而且還要定期更新套件，所以就暫時性的把它寫在同一個專案中，減少維護套件的麻煩度。

同時 Mini Side Project 會有自己的 入口點 main.ts 所以會有各自的 `*.html`。

### Upgrade Packages

用 `ncu` (npm-check-updates) 跟 github action 讓他自動在固定時間觸發升級套件，同時會檢查 lint, tsc, test 如果成功才會升級，最終開成 PR 進行合併。

### Service Worker

因為 Mini Side Project 有用到 PWA 跟 Service Worker 所以在個人網站中會因為 Service Worker 觸發到其他 Side Project (寫在 github 的其他專案中使用 gh-pages) 會進不去 (卡到 Service Worker cache 機制)。

最終就是自己控制過濾需要 cache 的才 cache ，不然就是 pass 讓 github page router 自動處理。
