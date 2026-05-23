# 智行法律地政士事務所 網站實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一個仿 rrenda-land.com 版型、以純 HTML/CSS/JS 實作的單頁響應式網站，供「智行法律地政士事務所」使用，含三語切換（繁中/英文/越南文）。

**Architecture:** 三個核心檔案分離職責：`index.html` 負責結構、`css/style.css` 負責樣式（含 RWD）、`js/main.js` 負責互動（漢堡選單、滾動效果），`js/i18n.js` 獨立管理翻譯資料與語言切換邏輯。HTML 元素以 `data-i18n` 屬性標記，i18n.js 初始化時掃描並替換文字。

**Tech Stack:** HTML5、CSS3（Flexbox + Grid + CSS Variables）、Vanilla JavaScript（ES6+）、Google Fonts（Noto Sans TC）

---

## 檔案結構

```
my-law-land/
├── index.html                  ← 頁面結構，所有區塊
├── css/
│   └── style.css               ← CSS 變數、排版、各區塊樣式、RWD
├── js/
│   ├── i18n.js                 ← 翻譯資料物件 + setLang() 函式
│   └── main.js                 ← 漢堡選單、滾動陰影、Intersection Observer
└── img/
    └── Gemini_Generated_Image_afdpbtafdpbtafdp.png  ← Logo（已存在）
```

---

## Task 1: 建立基礎檔案與 CSS 變數

**Files:**
- Create: `index.html`
- Create: `css/style.css`

- [ ] **Step 1: 建立 index.html 骨架**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title data-i18n="meta.title">智行法律地政士事務所</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <!-- Navbar -->
  <header id="navbar"></header>

  <!-- Hero -->
  <section id="hero"></section>

  <!-- About -->
  <section id="about"></section>

  <!-- Team -->
  <section id="team"></section>

  <!-- Services -->
  <section id="services"></section>

  <!-- Fees -->
  <section id="fees"></section>

  <!-- Contact -->
  <section id="contact"></section>

  <!-- Knowledge -->
  <section id="knowledge"></section>

  <!-- Footer -->
  <footer id="footer"></footer>

  <script src="js/i18n.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: 建立 css/style.css — CSS 變數與 reset**

```css
/* ===== CSS Variables ===== */
:root {
  --color-primary: #1B3A6B;
  --color-primary-dark: #122848;
  --color-gold: #C9A84C;
  --color-gold-light: #e0c06a;
  --color-bg: #F9F6F0;
  --color-white: #FFFFFF;
  --color-text: #333333;
  --color-text-light: #666666;
  --color-line: #06C755;
  --font-main: 'Noto Sans TC', sans-serif;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.12);
  --radius: 8px;
  --transition: 0.3s ease;
}

/* ===== Reset ===== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-main);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.7;
}

img {
  max-width: 100%;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

/* ===== Utility ===== */
.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  text-align: center;
  color: var(--color-text-light);
  margin-bottom: 3rem;
  font-size: 1rem;
}

.section-divider {
  width: 60px;
  height: 3px;
  background: var(--color-gold);
  margin: 0.75rem auto 1.5rem;
}

section {
  padding: 80px 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}
```

- [ ] **Step 3: 在瀏覽器開啟 index.html，確認頁面載入無錯誤，背景色為米白**

開啟方式：直接在檔案總管雙擊 `index.html`，或使用 VS Code Live Server。
預期：空白頁面，背景色 `#F9F6F0`，Console 無錯誤。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: scaffold base HTML and CSS variables"
```

---

## Task 2: 建立 i18n.js — 翻譯資料與語言切換

**Files:**
- Create: `js/i18n.js`

- [ ] **Step 1: 建立 js/i18n.js 翻譯資料與 setLang 函式**

```js
// js/i18n.js

const translations = {
  "zh-TW": {
    "meta.title": "智行法律地政士事務所",
    "nav.about": "關於我們",
    "nav.services": "服務項目",
    "nav.fees": "收費標準",
    "nav.contact": "聯絡我們",
    "hero.title": "智行法律地政士事務所",
    "hero.subtitle": "專業法律 × 不動產服務",
    "hero.cta": "立即諮詢",
    "about.title": "關於我們",
    "about.subtitle": "從107年到今天，我們在台北這座城市裡，一步步累積專業與信任。",
    "about.p1": "本所由詹連財律師與趙澤維律師共同創立，一路上有許多優秀的合署律師與法務夥伴加入，更感謝智行地政士事務所的專業支援，讓法律與不動產服務能更完善結合。",
    "about.p2": "本所由詹連財律師領軍，團隊成員包含律師、地政士與法務專業顧問，皆具豐富的司法與企業法務背景。",
    "about.p3": "我們結合法律與實務經驗，為客戶提供周全、務實且值得信賴的法律服務。",
    "team.title": "團隊介紹",
    "team.subtitle": "專業、經驗、值得信賴",
    "team.member1.name": "詹連財 律師",
    "team.member1.title": "主持律師",
    "team.member1.desc": "曾服務於法院、檢察署，歷練於金融集團與上市公司，專精民事、家事、刑事及行政訴訟。",
    "team.member2.name": "法務專業顧問",
    "team.member2.title": "資深顧問",
    "team.member2.desc": "具豐富企業法務背景，專精勞資爭議、強制執行與公司契約擬定。",
    "team.member3.name": "地政士",
    "team.member3.title": "不動產專員",
    "team.member3.desc": "專精不動產登記、遺產繼承登記，提供完善的不動產服務。",
    "services.title": "服務項目",
    "services.subtitle": "提供各種法律與不動產相關服務，歡迎免費諮詢",
    "services.civil.title": "民事訴訟",
    "services.civil.desc": "債務糾紛、侵權損害賠償、契約爭議等民事案件代理。",
    "services.family.title": "家事事件",
    "services.family.desc": "離婚、監護權、扶養費、繼承等家事案件處理。",
    "services.criminal.title": "刑事辯護",
    "services.criminal.desc": "刑事案件辯護、告訴代理、偵查階段法律諮詢。",
    "services.admin.title": "行政訴訟",
    "services.admin.desc": "行政處分撤銷、訴願、行政訴訟代理。",
    "services.labor.title": "勞資爭議",
    "services.labor.desc": "資遣費、職災補償、不當解雇等勞資糾紛處理。",
    "services.corporate.title": "公司法務與契約",
    "services.corporate.desc": "公司設立、契約撰擬審閱、股東協議、法律意見書。",
    "services.land.title": "不動產登記",
    "services.land.desc": "買賣移轉、贈與、抵押設定、地政士事務代辦。",
    "services.inheritance.title": "遺產繼承",
    "services.inheritance.desc": "遺產稅申報、遺產分割協議、繼承登記。",
    "services.ip.title": "智慧財產權",
    "services.ip.desc": "商標申請、著作權保護、專利諮詢。",
    "fees.title": "收費標準",
    "fees.subtitle": "透明收費，實際費用依個案情況而定，歡迎免費諮詢",
    "fees.type": "案件類型",
    "fees.range": "收費範圍（新台幣）",
    "fees.note": "備註",
    "fees.row1.type": "民事訴訟（一審）",
    "fees.row1.range": "NT$ 30,000 起",
    "fees.row1.note": "依訴訟標的金額調整",
    "fees.row2.type": "刑事辯護",
    "fees.row2.range": "NT$ 30,000 起",
    "fees.row2.note": "偵查/審判階段分開計算",
    "fees.row3.type": "家事事件",
    "fees.row3.range": "NT$ 20,000 起",
    "fees.row3.note": "離婚調解、監護權等",
    "fees.row4.type": "不動產登記",
    "fees.row4.range": "NT$ 5,000 起",
    "fees.row4.note": "依案件複雜度調整",
    "fees.row5.type": "遺產繼承",
    "fees.row5.range": "NT$ 15,000 起",
    "fees.row5.note": "含遺產稅申報",
    "fees.row6.type": "契約撰擬審閱",
    "fees.row6.range": "NT$ 5,000 起",
    "fees.row6.note": "依頁數與複雜度計費",
    "fees.disclaimer": "※ 以上為參考收費，實際費用依個案情況而定，歡迎來電或填寫表單預約免費諮詢。",
    "contact.title": "聯絡我們",
    "contact.subtitle": "有任何法律或不動產問題，歡迎與我們聯繫",
    "contact.line": "加入 LINE 官方帳號",
    "contact.address": "台北市中山區林森北路612號4樓",
    "contact.phone": "(02) 2707-6968",
    "contact.fax": "(02) 2707-6996",
    "contact.hours": "週一至五 09:00 ~ 18:00",
    "contact.email": "zupo64@gmail.com",
    "knowledge.title": "實用法律知識分享",
    "knowledge.subtitle": "提供各種法律與不動產實用資訊",
    "knowledge.read": "閱讀更多",
    "knowledge.article1.title": "買賣不動產前必知的五件事",
    "knowledge.article1.desc": "購買不動產前，了解產權調查、地籍謄本查詢、簽約注意事項，保障您的權益。",
    "knowledge.article2.title": "遺產繼承流程完整說明",
    "knowledge.article2.desc": "從申報遺產稅、辦理繼承登記到遺產分割，一步步說明完整流程。",
    "knowledge.article3.title": "勞資爭議處理指南",
    "knowledge.article3.desc": "遭遇不當解雇或資遣時，您的權利與申訴管道完整介紹。",
    "footer.rights": "© 2025 智行法律地政士事務所 版權所有"
  },

  "en": {
    "meta.title": "ActWise Law & Land Office",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.fees": "Fee Schedule",
    "nav.contact": "Contact",
    "hero.title": "ActWise Law & Land Office",
    "hero.subtitle": "Professional Legal × Real Estate Services",
    "hero.cta": "Consult Now",
    "about.title": "About Us",
    "about.subtitle": "Since 2018, we have been building expertise and trust step by step in Taipei.",
    "about.p1": "The firm was co-founded by Attorney Chan Lien-tsai and Attorney Chao Tse-wei, joined over time by talented co-signing attorneys and legal professionals, with strong support from the ActWise Land Office.",
    "about.p2": "Led by Attorney Chan Lien-tsai, our team includes attorneys, land registrars, and legal consultants with extensive judicial and corporate legal backgrounds.",
    "about.p3": "We combine legal expertise with practical experience to deliver comprehensive, pragmatic, and trustworthy legal services.",
    "team.title": "Our Team",
    "team.subtitle": "Professional, Experienced, Trustworthy",
    "team.member1.name": "Attorney Chan Lien-tsai",
    "team.member1.title": "Managing Attorney",
    "team.member1.desc": "Former court and prosecutor's office experience, background in financial groups and listed companies. Specializes in civil, family, criminal, and administrative litigation.",
    "team.member2.name": "Legal Consultant",
    "team.member2.title": "Senior Consultant",
    "team.member2.desc": "Extensive corporate legal background, specializing in labor disputes, enforcement, and corporate contracts.",
    "team.member3.name": "Land Registrar",
    "team.member3.title": "Real Estate Specialist",
    "team.member3.desc": "Specializes in land registration, estate inheritance registration, and real estate services.",
    "services.title": "Services",
    "services.subtitle": "Comprehensive legal and real estate services — free consultation available",
    "services.civil.title": "Civil Litigation",
    "services.civil.desc": "Debt disputes, tort compensation, contract disputes, and other civil case representation.",
    "services.family.title": "Family Matters",
    "services.family.desc": "Divorce, custody, alimony, inheritance, and other family law matters.",
    "services.criminal.title": "Criminal Defense",
    "services.criminal.desc": "Criminal defense, complaint representation, and legal consultation during investigation.",
    "services.admin.title": "Administrative Litigation",
    "services.admin.desc": "Revocation of administrative dispositions, appeals, and administrative litigation.",
    "services.labor.title": "Labor Disputes",
    "services.labor.desc": "Severance pay, occupational injury compensation, wrongful termination disputes.",
    "services.corporate.title": "Corporate Law & Contracts",
    "services.corporate.desc": "Company formation, contract drafting and review, shareholder agreements, legal opinions.",
    "services.land.title": "Land Registration",
    "services.land.desc": "Transfer by sale/gift, mortgage registration, land office services.",
    "services.inheritance.title": "Estate Inheritance",
    "services.inheritance.desc": "Estate tax filing, inheritance division agreement, inheritance registration.",
    "services.ip.title": "Intellectual Property",
    "services.ip.desc": "Trademark application, copyright protection, patent consultation.",
    "fees.title": "Fee Schedule",
    "fees.subtitle": "Transparent pricing — actual fees depend on case complexity, free consultation available",
    "fees.type": "Case Type",
    "fees.range": "Fee Range (NTD)",
    "fees.note": "Notes",
    "fees.row1.type": "Civil Litigation (First Instance)",
    "fees.row1.range": "NT$ 30,000+",
    "fees.row1.note": "Adjusted by claim amount",
    "fees.row2.type": "Criminal Defense",
    "fees.row2.range": "NT$ 30,000+",
    "fees.row2.note": "Investigation and trial calculated separately",
    "fees.row3.type": "Family Matters",
    "fees.row3.range": "NT$ 20,000+",
    "fees.row3.note": "Divorce, custody, etc.",
    "fees.row4.type": "Land Registration",
    "fees.row4.range": "NT$ 5,000+",
    "fees.row4.note": "Adjusted by case complexity",
    "fees.row5.type": "Estate Inheritance",
    "fees.row5.range": "NT$ 15,000+",
    "fees.row5.note": "Includes estate tax filing",
    "fees.row6.type": "Contract Drafting/Review",
    "fees.row6.range": "NT$ 5,000+",
    "fees.row6.note": "Charged by pages and complexity",
    "fees.disclaimer": "※ Above fees are for reference only. Actual fees vary by case. Please call or fill out the form to schedule a free consultation.",
    "contact.title": "Contact Us",
    "contact.subtitle": "For any legal or real estate questions, feel free to reach out",
    "contact.line": "Add LINE Official Account",
    "contact.address": "4F, No.612, Linsen N. Rd., Zhongshan Dist., Taipei",
    "contact.phone": "(02) 2707-6968",
    "contact.fax": "(02) 2707-6996",
    "contact.hours": "Mon–Fri 09:00–18:00",
    "contact.email": "zupo64@gmail.com",
    "knowledge.title": "Legal Knowledge Hub",
    "knowledge.subtitle": "Practical legal and real estate information",
    "knowledge.read": "Read More",
    "knowledge.article1.title": "5 Things to Know Before Buying Property",
    "knowledge.article1.desc": "Learn about title searches, land register queries, and key contract points to protect your rights.",
    "knowledge.article2.title": "Complete Guide to Estate Inheritance",
    "knowledge.article2.desc": "Step-by-step: estate tax filing, inheritance registration, and estate division.",
    "knowledge.article3.title": "Labor Dispute Handling Guide",
    "knowledge.article3.desc": "Your rights and appeal channels when facing wrongful termination or forced resignation.",
    "footer.rights": "© 2025 ActWise Law & Land Office. All Rights Reserved."
  },

  "vi": {
    "meta.title": "Văn Phòng Luật & Địa Chính ActWise",
    "nav.about": "Về Chúng Tôi",
    "nav.services": "Dịch Vụ",
    "nav.fees": "Bảng Phí",
    "nav.contact": "Liên Hệ",
    "hero.title": "Văn Phòng Luật & Địa Chính ActWise",
    "hero.subtitle": "Dịch Vụ Pháp Lý × Bất Động Sản Chuyên Nghiệp",
    "hero.cta": "Tư Vấn Ngay",
    "about.title": "Về Chúng Tôi",
    "about.subtitle": "Từ năm 2018 đến nay, chúng tôi từng bước tích lũy chuyên môn và uy tín tại Taipei.",
    "about.p1": "Văn phòng được đồng sáng lập bởi Luật sư Chan và Luật sư Chao, cùng với sự tham gia của nhiều luật sư và chuyên gia pháp lý xuất sắc.",
    "about.p2": "Đội ngũ bao gồm luật sư, chuyên viên địa chính và cố vấn pháp lý với kinh nghiệm phong phú về tư pháp và pháp lý doanh nghiệp.",
    "about.p3": "Chúng tôi kết hợp kiến thức pháp lý với kinh nghiệm thực tiễn để cung cấp dịch vụ pháp lý toàn diện, thực tế và đáng tin cậy.",
    "team.title": "Đội Ngũ Của Chúng Tôi",
    "team.subtitle": "Chuyên Nghiệp, Kinh Nghiệm, Đáng Tin Cậy",
    "team.member1.name": "Luật sư Chan Lien-tsai",
    "team.member1.title": "Luật Sư Điều Hành",
    "team.member1.desc": "Kinh nghiệm tại tòa án và viện kiểm sát, có nền tảng tại tập đoàn tài chính và công ty niêm yết.",
    "team.member2.name": "Cố Vấn Pháp Lý",
    "team.member2.title": "Cố Vấn Cao Cấp",
    "team.member2.desc": "Nền tảng pháp lý doanh nghiệp phong phú, chuyên về tranh chấp lao động và hợp đồng công ty.",
    "team.member3.name": "Chuyên Viên Địa Chính",
    "team.member3.title": "Chuyên Gia Bất Động Sản",
    "team.member3.desc": "Chuyên về đăng ký đất đai, thừa kế bất động sản và các dịch vụ địa chính.",
    "services.title": "Dịch Vụ",
    "services.subtitle": "Dịch vụ pháp lý và bất động sản toàn diện — tư vấn miễn phí",
    "services.civil.title": "Tố Tụng Dân Sự",
    "services.civil.desc": "Đại diện trong các vụ tranh chấp nợ, bồi thường thiệt hại, tranh chấp hợp đồng.",
    "services.family.title": "Vụ Việc Gia Đình",
    "services.family.desc": "Ly hôn, quyền nuôi con, cấp dưỡng, thừa kế và các vấn đề gia đình.",
    "services.criminal.title": "Bào Chữa Hình Sự",
    "services.criminal.desc": "Bào chữa hình sự, đại diện tố cáo, tư vấn pháp lý giai đoạn điều tra.",
    "services.admin.title": "Tố Tụng Hành Chính",
    "services.admin.desc": "Thu hồi quyết định hành chính, khiếu nại, tố tụng hành chính.",
    "services.labor.title": "Tranh Chấp Lao Động",
    "services.labor.desc": "Trợ cấp thôi việc, bồi thường tai nạn lao động, sa thải trái luật.",
    "services.corporate.title": "Luật Công Ty & Hợp Đồng",
    "services.corporate.desc": "Thành lập công ty, soạn thảo và rà soát hợp đồng, thỏa thuận cổ đông.",
    "services.land.title": "Đăng Ký Đất Đai",
    "services.land.desc": "Chuyển nhượng mua bán/tặng cho, đăng ký thế chấp, dịch vụ địa chính.",
    "services.inheritance.title": "Thừa Kế Di Sản",
    "services.inheritance.desc": "Khai thuế thừa kế, thỏa thuận phân chia di sản, đăng ký thừa kế.",
    "services.ip.title": "Sở Hữu Trí Tuệ",
    "services.ip.desc": "Đăng ký nhãn hiệu, bảo hộ bản quyền, tư vấn sáng chế.",
    "fees.title": "Bảng Phí",
    "fees.subtitle": "Minh bạch chi phí — phí thực tế tùy theo từng vụ việc, tư vấn miễn phí",
    "fees.type": "Loại Vụ Việc",
    "fees.range": "Mức Phí (NTD)",
    "fees.note": "Ghi Chú",
    "fees.row1.type": "Tố Tụng Dân Sự (Sơ Thẩm)",
    "fees.row1.range": "NT$ 30,000+",
    "fees.row1.note": "Điều chỉnh theo giá trị tranh chấp",
    "fees.row2.type": "Bào Chữa Hình Sự",
    "fees.row2.range": "NT$ 30,000+",
    "fees.row2.note": "Giai đoạn điều tra/xét xử tính riêng",
    "fees.row3.type": "Vụ Việc Gia Đình",
    "fees.row3.range": "NT$ 20,000+",
    "fees.row3.note": "Ly hôn, quyền nuôi con, v.v.",
    "fees.row4.type": "Đăng Ký Đất Đai",
    "fees.row4.range": "NT$ 5,000+",
    "fees.row4.note": "Điều chỉnh theo độ phức tạp",
    "fees.row5.type": "Thừa Kế Di Sản",
    "fees.row5.range": "NT$ 15,000+",
    "fees.row5.note": "Bao gồm khai thuế thừa kế",
    "fees.row6.type": "Soạn Thảo/Rà Soát Hợp Đồng",
    "fees.row6.range": "NT$ 5,000+",
    "fees.row6.note": "Tính theo số trang và độ phức tạp",
    "fees.disclaimer": "※ Phí trên chỉ mang tính tham khảo. Phí thực tế tùy theo từng vụ việc. Vui lòng gọi điện hoặc điền form để đặt lịch tư vấn miễn phí.",
    "contact.title": "Liên Hệ Với Chúng Tôi",
    "contact.subtitle": "Mọi thắc mắc về pháp lý hoặc bất động sản, hãy liên hệ chúng tôi",
    "contact.line": "Thêm Tài Khoản LINE Chính Thức",
    "contact.address": "Tầng 4, Số 612, Đường Linsen Bắc, Q.Zhongshan, Taipei",
    "contact.phone": "(02) 2707-6968",
    "contact.fax": "(02) 2707-6996",
    "contact.hours": "Thứ Hai–Sáu 09:00–18:00",
    "contact.email": "zupo64@gmail.com",
    "knowledge.title": "Kiến Thức Pháp Lý Hữu Ích",
    "knowledge.subtitle": "Thông tin thực tế về pháp lý và bất động sản",
    "knowledge.read": "Đọc Thêm",
    "knowledge.article1.title": "5 Điều Cần Biết Trước Khi Mua Bất Động Sản",
    "knowledge.article1.desc": "Tìm hiểu về kiểm tra quyền sở hữu, truy vấn sổ địa chính và các điểm quan trọng trong hợp đồng.",
    "knowledge.article2.title": "Hướng Dẫn Thừa Kế Di Sản Đầy Đủ",
    "knowledge.article2.desc": "Từng bước: khai thuế thừa kế, đăng ký thừa kế và phân chia di sản.",
    "knowledge.article3.title": "Hướng Dẫn Xử Lý Tranh Chấp Lao Động",
    "knowledge.article3.desc": "Quyền lợi và kênh khiếu nại khi bị sa thải trái luật hoặc bị ép nghỉ việc.",
    "footer.rights": "© 2025 Văn Phòng Luật & Địa Chính ActWise. Bản quyền thuộc về công ty."
  }
};

/**
 * Apply translations to all [data-i18n] elements.
 * @param {string} lang - Language code: 'zh-TW' | 'en' | 'vi'
 */
function setLang(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // Update <html lang> and <title>
  document.documentElement.lang = lang;
  if (dict['meta.title']) document.title = dict['meta.title'];

  // Highlight active language button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Persist preference
  localStorage.setItem('lang', lang);
}

// Init on load
(function () {
  const saved = localStorage.getItem('lang') || 'zh-TW';
  setLang(saved);
})();
```

- [ ] **Step 2: 開啟 index.html，開啟 Console，執行 `setLang('en')` 確認函式可呼叫**

預期：Console 無錯誤，`setLang` 為 function。

- [ ] **Step 3: Commit**

```bash
git add js/i18n.js
git commit -m "feat: add i18n translation data and setLang function"
```

---

## Task 3: 導覽列 HTML 與 CSS

**Files:**
- Modify: `index.html`（`<header id="navbar">` 區塊）
- Modify: `css/style.css`（加入 navbar 樣式）

- [ ] **Step 1: 替換 index.html 的 `<header>` 為完整 Navbar**

```html
<header id="navbar">
  <div class="container nav-container">
    <!-- Logo -->
    <a href="#hero" class="nav-logo">
      <img src="img/Gemini_Generated_Image_afdpbtafdpbtafdp.png" alt="智行法律地政士事務所 Logo" />
      <span data-i18n="hero.title">智行法律地政士事務所</span>
    </a>

    <!-- Hamburger (mobile) -->
    <button class="hamburger" id="hamburger" aria-label="開啟選單">
      <span></span><span></span><span></span>
    </button>

    <!-- Nav Links + Lang Switcher -->
    <nav class="nav-menu" id="nav-menu">
      <ul class="nav-links">
        <li><a href="#about" data-i18n="nav.about">關於我們</a></li>
        <li><a href="#services" data-i18n="nav.services">服務項目</a></li>
        <li><a href="#fees" data-i18n="nav.fees">收費標準</a></li>
        <li><a href="#contact" data-i18n="nav.contact">聯絡我們</a></li>
      </ul>
      <div class="lang-switcher">
        <button class="lang-btn active" data-lang="zh-TW" onclick="setLang('zh-TW')">繁中</button>
        <button class="lang-btn" data-lang="en" onclick="setLang('en')">EN</button>
        <button class="lang-btn" data-lang="vi" onclick="setLang('vi')">VI</button>
      </div>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: 在 css/style.css 末尾加入 Navbar 樣式**

```css
/* ===== Navbar ===== */
#navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--color-primary);
  transition: box-shadow var(--transition);
}

#navbar.scrolled {
  box-shadow: var(--shadow-md);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-white);
  font-weight: 700;
  font-size: 1rem;
}

.nav-logo img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: rgba(255,255,255,0.85);
  font-size: 0.95rem;
  transition: color var(--transition);
  padding: 4px 0;
  border-bottom: 2px solid transparent;
}

.nav-links a:hover {
  color: var(--color-gold);
  border-bottom-color: var(--color-gold);
}

/* Language Switcher */
.lang-switcher {
  display: flex;
  gap: 4px;
}

.lang-btn {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.4);
  color: rgba(255,255,255,0.75);
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: var(--font-main);
  transition: all var(--transition);
}

.lang-btn:hover,
.lang-btn.active {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-primary);
  font-weight: 700;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-white);
  border-radius: 2px;
  transition: all var(--transition);
}

.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```

- [ ] **Step 3: 在瀏覽器確認 Navbar 顯示正常**

預期：深海軍藍背景、Logo 圖片＋文字靠左、導覽連結靠右、語言切換按鈕、目前選中「繁中」為金色。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add navbar with logo, nav links, and language switcher"
```

---

## Task 4: Hero 區塊

**Files:**
- Modify: `index.html`（`<section id="hero">` 區塊）
- Modify: `css/style.css`（加入 hero 樣式）

- [ ] **Step 1: 替換 `<section id="hero">` 內容**

```html
<section id="hero">
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <h1 data-i18n="hero.title">智行法律地政士事務所</h1>
    <p data-i18n="hero.subtitle">專業法律 × 不動產服務</p>
    <a href="#contact" class="btn-hero" data-i18n="hero.cta">立即諮詢</a>
  </div>
</section>
```

- [ ] **Step 2: 在 css/style.css 末尾加入 Hero 樣式**

```css
/* ===== Hero ===== */
#hero {
  position: relative;
  min-height: 560px;
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, #2a4a8a 100%);
  display: flex;
  align-items: center;
  padding: 100px 0 80px;
  overflow: hidden;
}

/* 裝飾性背景紋理 */
#hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 40px,
    rgba(201,168,76,0.04) 40px,
    rgba(201,168,76,0.04) 41px
  );
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(27,58,107,0.3);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
}

.hero-content h1 {
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 12px rgba(0,0,0,0.3);
}

.hero-content p {
  font-size: clamp(1rem, 2.5vw, 1.35rem);
  margin-bottom: 2.5rem;
  color: rgba(255,255,255,0.88);
  letter-spacing: 0.08em;
}

.btn-hero {
  display: inline-block;
  background: var(--color-gold);
  color: var(--color-primary-dark);
  padding: 14px 44px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  transition: all var(--transition);
  box-shadow: 0 4px 16px rgba(201,168,76,0.4);
}

.btn-hero:hover {
  background: var(--color-gold-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(201,168,76,0.5);
}
```

- [ ] **Step 3: 在瀏覽器確認 Hero 區塊**

預期：深藍漸層背景、白色標題與副標題置中、金色「立即諮詢」圓形按鈕，點擊後跳至聯絡區塊。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add hero section with CTA button"
```

---

## Task 5: 關於我們區塊

**Files:**
- Modify: `index.html`（`<section id="about">` 區塊）
- Modify: `css/style.css`

- [ ] **Step 1: 替換 `<section id="about">` 內容**

```html
<section id="about">
  <div class="container about-grid">
    <div class="about-text">
      <h2 class="section-title" data-i18n="about.title">關於我們</h2>
      <div class="section-divider"></div>
      <p class="about-lead" data-i18n="about.subtitle">從107年到今天，我們在台北這座城市裡，一步步累積專業與信任。</p>
      <p data-i18n="about.p1">本所由詹連財律師與趙澤維律師共同創立，一路上有許多優秀的合署律師與法務夥伴加入，更感謝智行地政士事務所的專業支援，讓法律與不動產服務能更完善結合。</p>
      <p data-i18n="about.p2">本所由詹連財律師領軍，團隊成員包含律師、地政士與法務專業顧問，皆具豐富的司法與企業法務背景。</p>
      <p data-i18n="about.p3">我們結合法律與實務經驗，為客戶提供周全、務實且值得信賴的法律服務。</p>
    </div>
    <div class="about-logo">
      <img src="img/Gemini_Generated_Image_afdpbtafdpbtafdp.png" alt="智行法律地政士事務所" />
    </div>
  </div>
</section>
```

- [ ] **Step 2: 在 css/style.css 末尾加入 About 樣式**

```css
/* ===== About ===== */
#about {
  background: var(--color-white);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 60px;
  align-items: center;
}

.about-text .section-title {
  text-align: left;
}

.about-text .section-divider {
  margin: 0.75rem 0 1.5rem;
}

.about-lead {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 1.25rem;
  line-height: 1.8;
}

.about-text p {
  color: var(--color-text-light);
  margin-bottom: 1rem;
  line-height: 1.9;
}

.about-logo {
  display: flex;
  justify-content: center;
}

.about-logo img {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(27,58,107,0.18);
  border: 4px solid var(--color-gold);
}
```

- [ ] **Step 3: 在瀏覽器確認 About 區塊**

預期：白色背景，左側文字右側 Logo 圓形圖，標題左對齊，金色底線分隔線。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add about section"
```

---

## Task 6: 團隊介紹區塊

**Files:**
- Modify: `index.html`（`<section id="team">` 區塊）
- Modify: `css/style.css`

- [ ] **Step 1: 替換 `<section id="team">` 內容**

```html
<section id="team">
  <div class="container">
    <h2 class="section-title" data-i18n="team.title">團隊介紹</h2>
    <div class="section-divider"></div>
    <p class="section-subtitle" data-i18n="team.subtitle">專業、經驗、值得信賴</p>
    <div class="team-grid">
      <div class="team-card">
        <div class="team-avatar">⚖️</div>
        <h3 data-i18n="team.member1.name">詹連財 律師</h3>
        <p class="team-title" data-i18n="team.member1.title">主持律師</p>
        <p data-i18n="team.member1.desc">曾服務於法院、檢察署，歷練於金融集團與上市公司，專精民事、家事、刑事及行政訴訟。</p>
      </div>
      <div class="team-card">
        <div class="team-avatar">📋</div>
        <h3 data-i18n="team.member2.name">法務專業顧問</h3>
        <p class="team-title" data-i18n="team.member2.title">資深顧問</p>
        <p data-i18n="team.member2.desc">具豐富企業法務背景，專精勞資爭議、強制執行與公司契約擬定。</p>
      </div>
      <div class="team-card">
        <div class="team-avatar">🏠</div>
        <h3 data-i18n="team.member3.name">地政士</h3>
        <p class="team-title" data-i18n="team.member3.title">不動產專員</p>
        <p data-i18n="team.member3.desc">專精不動產登記、遺產繼承登記，提供完善的不動產服務。</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 在 css/style.css 末尾加入 Team 樣式**

```css
/* ===== Team ===== */
#team {
  background: var(--color-bg);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.team-card {
  background: var(--color-white);
  border-radius: var(--radius);
  padding: 36px 28px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  border-top: 4px solid var(--color-gold);
  transition: transform var(--transition), box-shadow var(--transition);
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.team-avatar {
  font-size: 3rem;
  margin-bottom: 1rem;
  width: 80px;
  height: 80px;
  background: var(--color-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  border: 3px solid var(--color-gold);
}

.team-card h3 {
  font-size: 1.1rem;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.team-card .team-title {
  color: var(--color-gold);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.team-card p:last-child {
  color: var(--color-text-light);
  font-size: 0.9rem;
  line-height: 1.7;
}
```

- [ ] **Step 3: 在瀏覽器確認 Team 區塊**

預期：3 欄卡片，頂部金色邊條，hover 時卡片上移，emoji 頭像在金色圓框內。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add team section"
```

---

## Task 7: 服務項目區塊

**Files:**
- Modify: `index.html`（`<section id="services">` 區塊）
- Modify: `css/style.css`

- [ ] **Step 1: 替換 `<section id="services">` 內容**

```html
<section id="services">
  <div class="container">
    <h2 class="section-title" data-i18n="services.title">服務項目</h2>
    <div class="section-divider"></div>
    <p class="section-subtitle" data-i18n="services.subtitle">提供各種法律與不動產相關服務，歡迎免費諮詢</p>
    <div class="services-grid">
      <div class="service-card"><div class="service-icon">⚖️</div><h3 data-i18n="services.civil.title">民事訴訟</h3><p data-i18n="services.civil.desc">債務糾紛、侵權損害賠償、契約爭議等民事案件代理。</p></div>
      <div class="service-card"><div class="service-icon">👨‍👩‍👧</div><h3 data-i18n="services.family.title">家事事件</h3><p data-i18n="services.family.desc">離婚、監護權、扶養費、繼承等家事案件處理。</p></div>
      <div class="service-card"><div class="service-icon">🔨</div><h3 data-i18n="services.criminal.title">刑事辯護</h3><p data-i18n="services.criminal.desc">刑事案件辯護、告訴代理、偵查階段法律諮詢。</p></div>
      <div class="service-card"><div class="service-icon">🏛️</div><h3 data-i18n="services.admin.title">行政訴訟</h3><p data-i18n="services.admin.desc">行政處分撤銷、訴願、行政訴訟代理。</p></div>
      <div class="service-card"><div class="service-icon">👷</div><h3 data-i18n="services.labor.title">勞資爭議</h3><p data-i18n="services.labor.desc">資遣費、職災補償、不當解雇等勞資糾紛處理。</p></div>
      <div class="service-card"><div class="service-icon">🏢</div><h3 data-i18n="services.corporate.title">公司法務與契約</h3><p data-i18n="services.corporate.desc">公司設立、契約撰擬審閱、股東協議、法律意見書。</p></div>
      <div class="service-card"><div class="service-icon">🏠</div><h3 data-i18n="services.land.title">不動產登記</h3><p data-i18n="services.land.desc">買賣移轉、贈與、抵押設定、地政士事務代辦。</p></div>
      <div class="service-card"><div class="service-icon">📜</div><h3 data-i18n="services.inheritance.title">遺產繼承</h3><p data-i18n="services.inheritance.desc">遺產稅申報、遺產分割協議、繼承登記。</p></div>
      <div class="service-card"><div class="service-icon">💡</div><h3 data-i18n="services.ip.title">智慧財產權</h3><p data-i18n="services.ip.desc">商標申請、著作權保護、專利諮詢。</p></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 在 css/style.css 末尾加入 Services 樣式**

```css
/* ===== Services ===== */
#services {
  background: var(--color-white);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-card {
  background: var(--color-bg);
  border-radius: var(--radius);
  padding: 32px 24px;
  text-align: center;
  border: 1px solid rgba(27,58,107,0.08);
  transition: all var(--transition);
}

.service-card:hover {
  background: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.service-card:hover h3 {
  color: var(--color-gold);
}

.service-card:hover p {
  color: rgba(255,255,255,0.85);
}

.service-icon {
  font-size: 2.4rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
  transition: color var(--transition);
}

.service-card p {
  font-size: 0.88rem;
  color: var(--color-text-light);
  line-height: 1.7;
  transition: color var(--transition);
}
```

- [ ] **Step 3: 在瀏覽器確認 Services 區塊**

預期：3×3 的服務卡片 Grid，hover 時卡片變深藍色、標題變金色。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add services section with 9 service cards"
```

---

## Task 8: 收費標準區塊

**Files:**
- Modify: `index.html`（`<section id="fees">` 區塊）
- Modify: `css/style.css`

- [ ] **Step 1: 替換 `<section id="fees">` 內容**

```html
<section id="fees">
  <div class="container">
    <h2 class="section-title" data-i18n="fees.title">收費標準</h2>
    <div class="section-divider"></div>
    <p class="section-subtitle" data-i18n="fees.subtitle">透明收費，實際費用依個案情況而定，歡迎免費諮詢</p>
    <div class="fees-table-wrap">
      <table class="fees-table">
        <thead>
          <tr>
            <th data-i18n="fees.type">案件類型</th>
            <th data-i18n="fees.range">收費範圍（新台幣）</th>
            <th data-i18n="fees.note">備註</th>
          </tr>
        </thead>
        <tbody>
          <tr><td data-i18n="fees.row1.type">民事訴訟（一審）</td><td data-i18n="fees.row1.range">NT$ 30,000 起</td><td data-i18n="fees.row1.note">依訴訟標的金額調整</td></tr>
          <tr><td data-i18n="fees.row2.type">刑事辯護</td><td data-i18n="fees.row2.range">NT$ 30,000 起</td><td data-i18n="fees.row2.note">偵查/審判階段分開計算</td></tr>
          <tr><td data-i18n="fees.row3.type">家事事件</td><td data-i18n="fees.row3.range">NT$ 20,000 起</td><td data-i18n="fees.row3.note">離婚調解、監護權等</td></tr>
          <tr><td data-i18n="fees.row4.type">不動產登記</td><td data-i18n="fees.row4.range">NT$ 5,000 起</td><td data-i18n="fees.row4.note">依案件複雜度調整</td></tr>
          <tr><td data-i18n="fees.row5.type">遺產繼承</td><td data-i18n="fees.row5.range">NT$ 15,000 起</td><td data-i18n="fees.row5.note">含遺產稅申報</td></tr>
          <tr><td data-i18n="fees.row6.type">契約撰擬審閱</td><td data-i18n="fees.row6.range">NT$ 5,000 起</td><td data-i18n="fees.row6.note">依頁數與複雜度計費</td></tr>
        </tbody>
      </table>
    </div>
    <p class="fees-disclaimer" data-i18n="fees.disclaimer">※ 以上為參考收費，實際費用依個案情況而定，歡迎來電或填寫表單預約免費諮詢。</p>
  </div>
</section>
```

- [ ] **Step 2: 在 css/style.css 末尾加入 Fees 樣式**

```css
/* ===== Fees ===== */
#fees {
  background: var(--color-primary);
}

#fees .section-title {
  color: var(--color-white);
}

#fees .section-subtitle {
  color: rgba(255,255,255,0.75);
}

#fees .section-divider {
  background: var(--color-gold);
}

.fees-table-wrap {
  overflow-x: auto;
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
}

.fees-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-white);
  font-size: 0.95rem;
}

.fees-table thead {
  background: var(--color-gold);
}

.fees-table th {
  padding: 16px 20px;
  text-align: left;
  font-weight: 700;
  color: var(--color-primary-dark);
  letter-spacing: 0.03em;
}

.fees-table td {
  padding: 14px 20px;
  color: var(--color-text);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.fees-table tr:last-child td {
  border-bottom: none;
}

.fees-table tr:nth-child(even) td {
  background: var(--color-bg);
}

.fees-table tr:hover td {
  background: rgba(201,168,76,0.08);
}

.fees-disclaimer {
  margin-top: 1.5rem;
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  text-align: center;
}
```

- [ ] **Step 3: 在瀏覽器確認 Fees 區塊**

預期：深藍背景，金色表頭，白色表格，交替行背景，hover 淡金色。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add fees section with pricing table"
```

---

## Task 9: 聯絡我們區塊

**Files:**
- Modify: `index.html`（`<section id="contact">` 區塊）
- Modify: `css/style.css`

- [ ] **Step 1: 替換 `<section id="contact">` 內容**

```html
<section id="contact">
  <div class="container">
    <h2 class="section-title" data-i18n="contact.title">聯絡我們</h2>
    <div class="section-divider"></div>
    <p class="section-subtitle" data-i18n="contact.subtitle">有任何法律或不動產問題，歡迎與我們聯繫</p>
    <div class="contact-grid">
      <!-- Google Form iframe -->
      <div class="contact-form-wrap">
        <iframe
          src="YOUR_GOOGLE_FORM_URL"
          width="100%"
          height="520"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="Contact Form">
          載入中…
        </iframe>
      </div>
      <!-- Contact Info + LINE -->
      <div class="contact-info">
        <a href="https://line.me/R/ti/p/YOUR_LINE_ID" target="_blank" rel="noopener" class="btn-line">
          <span class="line-icon">LINE</span>
          <span data-i18n="contact.line">加入 LINE 官方帳號</span>
        </a>
        <ul class="contact-details">
          <li>
            <span class="contact-icon">📍</span>
            <span data-i18n="contact.address">台北市中山區林森北路612號4樓</span>
          </li>
          <li>
            <span class="contact-icon">📞</span>
            <a href="tel:+886227076968" data-i18n="contact.phone">(02) 2707-6968</a>
          </li>
          <li>
            <span class="contact-icon">📠</span>
            <span data-i18n="contact.fax">(02) 2707-6996</span>
          </li>
          <li>
            <span class="contact-icon">🕐</span>
            <span data-i18n="contact.hours">週一至五 09:00 ~ 18:00</span>
          </li>
          <li>
            <span class="contact-icon">✉</span>
            <a href="mailto:zupo64@gmail.com" data-i18n="contact.email">zupo64@gmail.com</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 在 css/style.css 末尾加入 Contact 樣式**

```css
/* ===== Contact ===== */
#contact {
  background: var(--color-bg);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 48px;
  align-items: start;
}

.contact-form-wrap {
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  background: var(--color-white);
}

.contact-form-wrap iframe {
  display: block;
}

/* LINE Button */
.btn-line {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--color-line);
  color: var(--color-white);
  padding: 14px 24px;
  border-radius: var(--radius);
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: all var(--transition);
  box-shadow: 0 4px 12px rgba(6,199,85,0.3);
}

.btn-line:hover {
  background: #05b34f;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(6,199,85,0.4);
}

.line-icon {
  background: var(--color-white);
  color: var(--color-line);
  font-weight: 900;
  font-size: 0.75rem;
  padding: 3px 6px;
  border-radius: 4px;
  letter-spacing: -0.02em;
}

/* Contact Details */
.contact-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-details li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.95rem;
  color: var(--color-text);
  line-height: 1.5;
}

.contact-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.contact-details a {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

- [ ] **Step 3: 在瀏覽器確認 Contact 區塊**

預期：左側 Google 表單 iframe 佔位（顯示「載入中...」，需替換真實 URL）、右側 LINE 綠色按鈕 + 聯絡資訊清單。

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add contact section with Google Form iframe and LINE OA"
```

---

## Task 10: 知識分享區塊與 Footer

**Files:**
- Modify: `index.html`（`<section id="knowledge">` 與 `<footer>` 區塊）
- Modify: `css/style.css`

- [ ] **Step 1: 替換 `<section id="knowledge">` 內容**

```html
<section id="knowledge">
  <div class="container">
    <h2 class="section-title" data-i18n="knowledge.title">實用法律知識分享</h2>
    <div class="section-divider"></div>
    <p class="section-subtitle" data-i18n="knowledge.subtitle">提供各種法律與不動產實用資訊</p>
    <div class="knowledge-grid">
      <article class="knowledge-card">
        <div class="knowledge-icon">🏘️</div>
        <div class="knowledge-body">
          <h3 data-i18n="knowledge.article1.title">買賣不動產前必知的五件事</h3>
          <p data-i18n="knowledge.article1.desc">購買不動產前，了解產權調查、地籍謄本查詢、簽約注意事項，保障您的權益。</p>
          <span class="btn-read" data-i18n="knowledge.read">閱讀更多</span>
        </div>
      </article>
      <article class="knowledge-card">
        <div class="knowledge-icon">📋</div>
        <div class="knowledge-body">
          <h3 data-i18n="knowledge.article2.title">遺產繼承流程完整說明</h3>
          <p data-i18n="knowledge.article2.desc">從申報遺產稅、辦理繼承登記到遺產分割，一步步說明完整流程。</p>
          <span class="btn-read" data-i18n="knowledge.read">閱讀更多</span>
        </div>
      </article>
      <article class="knowledge-card">
        <div class="knowledge-icon">👷</div>
        <div class="knowledge-body">
          <h3 data-i18n="knowledge.article3.title">勞資爭議處理指南</h3>
          <p data-i18n="knowledge.article3.desc">遭遇不當解雇或資遣時，您的權利與申訴管道完整介紹。</p>
          <span class="btn-read" data-i18n="knowledge.read">閱讀更多</span>
        </div>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 替換 `<footer id="footer">` 內容**

```html
<footer id="footer">
  <div class="container footer-inner">
    <div class="footer-logo">
      <img src="img/Gemini_Generated_Image_afdpbtafdpbtafdp.png" alt="Logo" />
      <span data-i18n="hero.title">智行法律地政士事務所</span>
    </div>
    <div class="footer-info">
      <p>📍 <span data-i18n="contact.address">台北市中山區林森北路612號4樓</span></p>
      <p>📞 <span data-i18n="contact.phone">(02) 2707-6968</span></p>
      <p>🕐 <span data-i18n="contact.hours">週一至五 09:00 ~ 18:00</span></p>
    </div>
    <p class="footer-rights" data-i18n="footer.rights">© 2025 智行法律地政士事務所 版權所有</p>
  </div>
</footer>
```

- [ ] **Step 3: 在 css/style.css 末尾加入 Knowledge 與 Footer 樣式**

```css
/* ===== Knowledge ===== */
#knowledge {
  background: var(--color-white);
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.knowledge-card {
  background: var(--color-bg);
  border-radius: var(--radius);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid rgba(27,58,107,0.08);
  transition: all var(--transition);
}

.knowledge-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.knowledge-icon {
  font-size: 2rem;
}

.knowledge-body h3 {
  font-size: 1rem;
  color: var(--color-primary);
  margin-bottom: 8px;
  font-weight: 700;
}

.knowledge-body p {
  font-size: 0.88rem;
  color: var(--color-text-light);
  line-height: 1.7;
  margin-bottom: 12px;
}

.btn-read {
  display: inline-block;
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 600;
  border-bottom: 2px solid var(--color-gold);
  padding-bottom: 1px;
  cursor: pointer;
  transition: color var(--transition);
}

.btn-read:hover {
  color: var(--color-gold);
}

/* ===== Footer ===== */
#footer {
  background: var(--color-primary-dark);
  color: rgba(255,255,255,0.8);
  padding: 40px 0;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-white);
  font-weight: 700;
  font-size: 1rem;
}

.footer-logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold);
}

.footer-info {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.88rem;
}

.footer-info p {
  color: rgba(255,255,255,0.7);
}

.footer-rights {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.45);
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 16px;
  width: 100%;
  text-align: center;
}
```

- [ ] **Step 4: 在瀏覽器確認 Knowledge 與 Footer**

預期：3 欄文章卡片，hover 上浮陰影；Footer 深藍背景，Logo + 聯絡資訊橫排，版權聲明最底部。

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add knowledge section and footer"
```

---

## Task 11: JavaScript — main.js 互動功能

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: 建立 js/main.js**

```js
// js/main.js

// ===== Navbar scroll shadow =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== Hamburger menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a nav link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ===== Intersection Observer — fade-in on scroll =====
const fadeEls = document.querySelectorAll(
  '.team-card, .service-card, .knowledge-card, .about-grid, #fees .fees-table-wrap'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
```

- [ ] **Step 2: 在 css/style.css 末尾加入 fade-in 動畫樣式**

```css
/* ===== Scroll Fade-in ===== */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 3: 在瀏覽器確認互動功能**

預期：
- 滾動後 Navbar 出現陰影
- 縮小視窗至手機尺寸（< 768px），漢堡按鈕出現，點擊後選單展開
- 選單連結點擊後選單收合
- 滾動頁面時卡片淡入出現

- [ ] **Step 4: Commit**

```bash
git add js/main.js css/style.css
git commit -m "feat: add JS interactions - hamburger menu, scroll effects, fade-in"
```

---

## Task 12: RWD 響應式樣式

**Files:**
- Modify: `css/style.css`（加入 media query 區塊）

- [ ] **Step 1: 在 css/style.css 末尾加入完整 RWD 樣式**

```css
/* ===== RWD — Mobile (≤ 768px) ===== */
@media (max-width: 768px) {
  /* Navbar */
  .hamburger {
    display: flex;
  }

  .nav-menu {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--color-primary-dark);
    padding: 16px 24px 24px;
    box-shadow: var(--shadow-md);
  }

  .nav-menu.open {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    gap: 0;
    width: 100%;
  }

  .nav-links a {
    display: block;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .lang-switcher {
    margin-top: 16px;
  }

  #navbar {
    position: sticky;
  }

  /* Hero */
  #hero {
    min-height: 420px;
    padding: 80px 0 60px;
  }

  /* About */
  .about-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .about-logo {
    order: -1;
  }

  .about-logo img {
    width: 180px;
    height: 180px;
    margin: 0 auto;
  }

  .about-text .section-title,
  .about-text .section-divider {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  /* Team */
  .team-grid {
    grid-template-columns: 1fr;
  }

  /* Services */
  .services-grid {
    grid-template-columns: 1fr;
  }

  /* Fees table */
  .fees-table th,
  .fees-table td {
    padding: 10px 12px;
    font-size: 0.85rem;
  }

  /* Contact */
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-form-wrap iframe {
    height: 480px;
  }

  /* Knowledge */
  .knowledge-grid {
    grid-template-columns: 1fr;
  }

  /* Footer */
  .footer-info {
    flex-direction: column;
    gap: 8px;
  }

  /* Section padding */
  section {
    padding: 60px 0;
  }
}
```

- [ ] **Step 2: 用 Chrome DevTools 的 Device Toolbar（F12 → Toggle Device Toolbar）切換至 iPhone 12 Pro（390px）確認**

預期：
- Navbar 顯示漢堡按鈕，點擊後出現下拉選單
- 所有 Grid 區塊變為單欄堆疊
- About 的 Logo 移至文字上方
- 表格橫向可滾動
- 整體佈局無橫向溢出

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add responsive styles for mobile (<=768px)"
```

---

## Task 13: 語言切換整合測試與最終收尾

**Files:**
- Modify: `index.html`（確認所有 data-i18n 屬性已標記）
- Modify: `js/i18n.js`（確認 setLang 在 DOM 載入後執行）

- [ ] **Step 1: 確認 i18n.js 的初始化在 DOM 就緒後執行**

確認 `js/i18n.js` 底部的 IIFE 如下（若 script 在 `</body>` 前，DOM 已就緒，無需 DOMContentLoaded）：

```js
// 確認此行在 i18n.js 底部（已在 Task 2 實作）
(function () {
  const saved = localStorage.getItem('lang') || 'zh-TW';
  setLang(saved);
})();
```

確認 `index.html` 的 script 載入順序（i18n.js 在 main.js 之前）：

```html
<script src="js/i18n.js"></script>
<script src="js/main.js"></script>
```

- [ ] **Step 2: 逐一點擊語言按鈕，確認所有區塊文字正確切換**

測試步驟：
1. 點擊「EN」→ 確認 Navbar 連結、Hero 標題、所有卡片文字皆變為英文
2. 點擊「VI」→ 確認所有文字變為越南文
3. 點擊「繁中」→ 確認恢復中文
4. 重新整理頁面（F5）→ 確認維持最後選擇的語言（localStorage 功能）

- [ ] **Step 3: 替換 Google 表單佔位符說明**

在 `index.html` 的 Google Form iframe 附近加入替換說明註解：

```html
<!-- 
  TODO: 替換 YOUR_GOOGLE_FORM_URL 為實際 Google 表單嵌入連結
  取得方式：
  1. 開啟 Google 表單
  2. 點擊右上角「傳送」
  3. 選擇「<>」（嵌入）分頁
  4. 複製 src="" 中的 URL 貼到下方
-->
<iframe
  src="YOUR_GOOGLE_FORM_URL"
  ...
```

同樣為 LINE OA 加入說明：

```html
<!-- 
  TODO: 替換 YOUR_LINE_ID 為實際 LINE OA ID
  取得方式：LINE Official Account Manager → 帳號設定 → 基本設定 → LINE ID
-->
<a href="https://line.me/R/ti/p/YOUR_LINE_ID" ...>
```

- [ ] **Step 4: 最終全頁瀏覽檢查**

在桌機瀏覽器全頁滾動確認：
- [ ] Navbar 置頂固定，Logo 顯示正確
- [ ] Hero 深藍漸層，標題、副標題、CTA 按鈕均正確
- [ ] About：左文字右 Logo，排版整齊
- [ ] Team：3 欄卡片，金色頂部邊條
- [ ] Services：3×3 卡片 Grid，hover 效果
- [ ] Fees：深藍背景，金色表頭
- [ ] Contact：左 iframe 右聯絡資訊，LINE 按鈕顯示
- [ ] Knowledge：3 欄文章卡片
- [ ] Footer：深藍背景，版權聲明

- [ ] **Step 5: Final commit**

```bash
git add index.html js/i18n.js
git commit -m "feat: finalize i18n integration and placeholder comments"
```

---

## 佔位符替換清單（待上線前完成）

| 項目 | 位置 | 替換方式 |
|------|------|----------|
| Google 表單 URL | `index.html` `<iframe src="">` | Google 表單 → 傳送 → 嵌入 → 複製 src URL |
| LINE OA ID | `index.html` `<a href="...YOUR_LINE_ID">` | LINE OA Manager → 帳號設定 → LINE ID |
| 團隊成員照片 | 將 emoji 替換為 `<img>` | 準備照片後替換 `.team-avatar` 內容 |
