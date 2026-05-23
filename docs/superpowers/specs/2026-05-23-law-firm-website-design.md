# 智行法律地政士事務所 網站設計規格書

**日期：** 2026-05-23  
**設計參考：** rrenda-land.com（版型與風格）  
**內容來源：** actwiselaw.com  
**目的：** 學習用途，純 HTML/CSS/JS 單頁網站

---

## 一、技術規格

- **語言：** 純 HTML5 + CSS3 + Vanilla JavaScript
- **無框架依賴**
- **響應式：** RWD，斷點 `768px`（手機/桌機）
- **字型：** Google Fonts — Noto Sans TC（繁體中文）
- **多語言：** 繁體中文 / English / Tiếng Việt，JS 動態切換

**檔案結構：**
```
my-law-land/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── main.js
    └── i18n.js          ← 語言切換邏輯與翻譯資料
```

---

## 二、色彩系統

配合 Logo（海軍藍圓形徽章 + 金色天秤）調整主色調：

| 用途 | 顏色 | 說明 |
|------|------|------|
| 主色 | `#1B3A6B` | 海軍藍（配合 Logo） |
| 輔助色 | `#C9A84C` | 金色（點綴，配合 Logo） |
| 背景 | `#F9F6F0` | 米白 |
| 文字 | `#333333` | 深灰 |
| 白色區塊 | `#FFFFFF` | 白 |

**Logo 圖片：** `img/Gemini_Generated_Image_afdpbtafdpbtafdp.png`（圓形徽章，含天秤、月桂、WISEPATH LAW FIRM）

---

## 三、頁面區塊規格

### 1. 導覽列 (Navbar)
- 左側：事務所 Logo 文字「智行法律地政士事務所」
- 右側：錨點連結（關於我們、服務項目、收費標準、聯絡我們）+ 語言切換按鈕（繁中 / EN / VI）
- 手機版：漢堡選單（☰），JS 控制展開/收合
- 固定置頂（`position: sticky`），滾動後加陰影

### 2. Hero 橫幅
- 全寬深色背景圖（疊加半透明墨綠遮罩）
- 標題：「智行法律地政士事務所」
- 副標題：「專業法律 × 不動產服務」
- CTA 按鈕：「立即諮詢」→ 錨點跳轉至聯絡我們

### 3. 關於我們
- 左側：文字介紹（來源：actwiselaw.com）
  - 創立背景、核心理念、服務宗旨
- 右側：事務所 Logo 或代表圖片佔位

### 4. 團隊介紹
- 卡片式排列，桌機 3 欄 / 手機 1 欄
- 每張卡片：照片佔位 + 姓名 + 職稱 + 簡介
- 成員：詹連財律師（主持律師）+ 其他團隊成員

### 5. 服務項目
- 9 個服務卡片，桌機 3 欄 Grid / 手機 1 欄
- 每個卡片：圖示（emoji 或 SVG）+ 標題 + 簡述
- 服務項目：
  1. 民事訴訟
  2. 家事事件
  3. 刑事辯護
  4. 行政訴訟
  5. 勞資爭議
  6. 公司法務與契約
  7. 不動產登記
  8. 遺產繼承
  9. 智慧財產權

### 6. 收費標準
- 以表格方式展示各類案件收費範圍
- 底部加註：「實際費用依個案情況而定，歡迎免費諮詢」

### 7. 聯絡我們
- **左側：** Google 表單 iframe 嵌入（佔位符連結，待替換）
- **右側：**
  - LINE OA 按鈕（綠色，官方 LINE 品牌色 `#06C755`）
  - 聯絡資訊：
    - 📍 台北市中山區林森北路612號4樓
    - 📞 (02) 2707-6968
    - 📠 (02) 2707-6996
    - 🕐 週一至五 09:00~18:00
    - ✉ zupo64@gmail.com
- 手機版：上下堆疊

### 8. 知識分享
- 3 欄卡片（手機 1 欄）
- 每張卡片：標題 + 摘要 + 閱讀更多按鈕
- 內容：不動產與法律常識文章（3 篇範例）

### 9. Footer
- 事務所名稱、地址、電話
- 版權聲明：`© 2024 智行法律地政士事務所`
- 背景色：墨綠 `#2D5016`，文字白色

---

## 四、RWD 響應式策略

| 區塊 | 桌機（>768px） | 手機（≤768px） |
|------|----------------|----------------|
| 導覽列 | 橫向連結列 | 漢堡選單 |
| 服務項目 | 3 欄 Grid | 1 欄堆疊 |
| 團隊介紹 | 3 欄卡片 | 1 欄堆疊 |
| 聯絡我們 | 左右並排 | 上下堆疊 |
| 知識分享 | 3 欄卡片 | 1 欄堆疊 |

---

## 五、表單整合

- **Google 表單 iframe 嵌入**
  - 在 HTML 中以 `<iframe src="YOUR_GOOGLE_FORM_URL">` 嵌入
  - 表單外觀為 Google 預設樣式
  - 替換說明：將 `YOUR_GOOGLE_FORM_URL` 替換為實際 Google 表單連結

- **LINE OA 連結**
  - `<a href="https://line.me/R/ti/p/YOUR_LINE_ID">加入 LINE 官方帳號</a>`
  - 替換說明：將 `YOUR_LINE_ID` 替換為實際 LINE OA ID

---

## 六、JavaScript 功能

- 漢堡選單展開/收合
- 導覽列滾動後加陰影效果
- 錨點平滑滾動（`scroll-behavior: smooth`）
- 可選：滾動進場動畫（Intersection Observer）
- 語言切換（i18n）

---

## 六-A、多語言（i18n）設計

**實作方式：** 單一 HTML 搭配 `data-i18n` 屬性，`i18n.js` 負責儲存翻譯資料並動態替換文字。

**HTML 標記範例：**
```html
<h1 data-i18n="hero.title">智行法律地政士事務所</h1>
<p data-i18n="hero.subtitle">專業法律 × 不動產服務</p>
```

**i18n.js 翻譯資料結構：**
```js
const translations = {
  "zh-TW": {
    "hero.title": "智行法律地政士事務所",
    "hero.subtitle": "專業法律 × 不動產服務",
    "nav.about": "關於我們",
    // ...
  },
  "en": {
    "hero.title": "ActWise Law & Land Office",
    "hero.subtitle": "Professional Legal × Real Estate Services",
    "nav.about": "About Us",
    // ...
  },
  "vi": {
    "hero.title": "Văn Phòng Luật ActWise",
    "hero.subtitle": "Dịch Vụ Pháp Lý × Bất Động Sản Chuyên Nghiệp",
    "nav.about": "Về Chúng Tôi",
    // ...
  }
};
```

**切換邏輯：**
- 預設語言：繁體中文（`zh-TW`）
- 語言偏好存入 `localStorage`，重新整理後維持設定
- 切換時更新頁面所有 `data-i18n` 元素的 `textContent`
- 同時更新 `<html lang="">` 屬性

**語言切換按鈕樣式（導覽列右側）：**
```html
<div class="lang-switcher">
  <button onclick="setLang('zh-TW')">繁中</button>
  <button onclick="setLang('en')">EN</button>
  <button onclick="setLang('vi')">VI</button>
</div>
```
- 目前選中語言按鈕加粗/底線標示
- 手機版：收合於漢堡選單內

---

## 七、待替換佔位符清單

| 佔位符 | 說明 |
|--------|------|
| `YOUR_GOOGLE_FORM_URL` | Google 表單嵌入連結 |
| `YOUR_LINE_ID` | LINE OA 帳號 ID |
| 團隊照片 | 替換為實際人員照片 |
| 收費標準數字 | 替換為實際收費資訊 |
