# Simple Recipe

簡單食譜網站為你帶來健康飲食，藉由器具、烹煮難度、烹煮時間進行篩選或使用食材、食譜名稱、上傳者名稱進行關鍵字搜尋，瀏覽時能將食譜進行收藏，等待未來閱讀，同時也能對食譜按讚，鼓勵上傳者。如有獨家食譜，也能上傳食譜分享給其他使用者。

# Catalog

- [Live Demo](#LiveDemo)
- [Skill Structure](#Skill)
- Component Planning
- Features
  - Keywords searching
  - Filter/Sorting
  - Signin/Signup
  - Collected/Liked recipe
  - Upload Recipe
  - Delete Recipe

# Live Demo

https://simple-recipe-for-you.web.app/

# Skill Structure

Simple Recipe 在前端開發的部分是使用 React 建構的，搭配套件 React-Router 實現單頁式應用，讓使用者體驗更好。後端開發使用 Firebase 後端服務平臺，進行架設網站（Hoisting）、資料庫（Firestore）和會員系統（Auth）的操作，藉由 Firebase 延伸套件 Algolia 達成關鍵字 Full-text-search。開發工具使用 Webpack 進行 JavaScript 的模組打包、Babel 解決瀏覽器相容性問題、NPM 進行套件管理、Prettier 檢查語法與統一程式碼風格、GitHub 控制 Git 的版本。

# Component Planning

組建的規劃依造頁面分成 7 個區塊，

# Features

1. Keywords Searching
2. Filter/Sorting
3. Signin/Signup
4. Collected/Liked recipe
5. Upload Recipe
6. Delete Recipe
