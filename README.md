# **Simple Recipe**

簡單食譜網站為你帶來健康飲食，藉由器具、烹煮難度、烹煮時間進行篩選或使用食材、食譜名稱、上傳者名稱進行關鍵字搜尋，瀏覽時能將食譜進行收藏，等待未來閱讀，同時也能對食譜按讚，鼓勵上傳者。如有獨家食譜，也能上傳食譜分享給其他使用者。

## **Catalog**

- [Live Demo](#live-demo)
- [Skill Structure](#skill-structure)
- [Component Planning](#component-planning)
- [Features](#features)
  - [#1 Keywords searching & Filter/Sorting](#keywords-searching-&-filter/sorting)
  - [#2 Signin/Signup](#-signin/signup)
  - [#3 Collected/Liked recipe](#collected/liked-recipe)
  - [#4 Leave comment for recipe](#leave-comment-for-recipe)
  - [#5 Upload Recipe](#upload-recipe)
  - [#6 Delete Recipe](#delete-recipe)

## **Live Demo**

https://simple-recipe-for-you.web.app/

## Skill Structure

Simple Recipe 在前端開發的部分是使用 React 建構的，搭配套件 React-Router 實現單頁式應用，讓使用者體驗更好。後端開發使用 Firebase 後端服務平臺，進行架設網站（Hoisting）、資料庫（Firestore）和會員系統（Auth）的操作，藉由 Firebase 延伸套件 Algolia 達成關鍵字 Full-text-search。開發工具使用 Webpack 進行 JavaScript 的模組打包、Babel 解決瀏覽器相容性問題、NPM 進行套件管理、Prettier 檢查語法與統一程式碼風格、GitHub 控制 Git 的版本。

![Imgur](https://i.imgur.com/04sMOA9.png)

## Component Planning

組建的規劃依造頁面分成 6 個區塊，

![Imgur](https://i.imgur.com/zMy7BPu.png)

## Features

### :one: **Keywords Searching & Filter/Sorting** </br>

User can search dish name, ingredients and uploader by Keywords, in the meanwhile, filter and sorting can assist further search.</br>
使用關鍵字可以食譜名稱、食材、上傳者名稱並結合篩選及排序標籤快速搜尋想要的食譜。</br></br>
![Imgur](https://i.imgur.com/Ed62lr1.gif)

### :two: **Signin/Signup**</br>

Sign-up and sign-in to become member who got the right to collect, like and leave the comments to the recipe, and upload their own recipe.</br>
使用者需成為會員才能將食譜收藏、點讚食譜、留言及上傳食譜。</br></br>
![Imgur](https://i.imgur.com/2zyEyyL.gif)

### :three: **Collected/Liked recipe**</br>

After collecting the recipe, it's showed at the member page and user can check it anytime.</br>
收藏後的食譜會儲存於會員頁面，隨時可以查看。</br></br>
![Imgur](https://i.imgur.com/bZVkkyU.gif)

### :four: **Leave comment for recipe**</br>

User can leave the comments for recipe to interact with uploader.</br>
藉由留言與其他使用者互動。</br></br>
![Imgur](https://i.imgur.com/dxZQ9MJ.gif)

### :five: **Upload Recipe**</br>

To success upload recipe by filling in the detail of recipe, including upload image.</br>
輸入食譜細節並上傳食譜照片即完成上傳。</br></br>
![Imgur](https://i.imgur.com/Zqj9ZNd.gif)

### :six: **Delete Recipe**</br>

User own recipe can be deleted at the member page.</br>
可至會員頁面將食譜刪除。</br></br>
![Imgur](https://i.imgur.com/WYbXzXn.gif)

## Contact

:woman: 陳宥琪</br>
:mailbox: yo7chen@gmail.com
