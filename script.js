// ============================================================
// 全站互動腳本
// 功能包含：中英切換、首頁 Showreel 彈窗、專案圖片 Lightbox、底部聯絡區光暈互動
// ============================================================

const langToggle = document.querySelector(".lang-toggle");

// 讀取上次使用者選擇的語言；沒有紀錄時預設英文。
let currentLang = localStorage.getItem("siteLang") || "en";

// 首頁固定區塊翻譯字典。
// 新增大段 HTML 時，若該元素有 data-en / data-zh，會由 setDataLanguage() 自動處理。
const translations = {
  en: {
    navHome: "Home",
    navWork: "Work",
    navServices: "Services",
    navAbout: "About",
    navContact: "Contact",
    resume: "Resume ↓",
    eyebrow: "3D & Interactive Designer",
    heroTitle:
      "Translating product value<br />into visual <span>experiences.</span>",
    heroDesc:
      "I specialize in product visualization, motion design, and interactive experiences, helping brands translate product features, technical highlights, and key selling points into intuitive, persuasive visual content.",
    viewWork: "View My Work →",
    playShowreel: "▶ Play Showreel",
    experience: "Experience Across",
    selectedWork: "Featured Work",
    viewAll: "View More Works →",
    aboutTitle: "About Me",
    aboutText:
      "I’m a 3D & Interactive Designer specializing in product visualization, motion design, and real-time interactive experiences. My work combines cinematic visuals, Unity development, WebGL, and product storytelling.",
    servicesTitle: "What I Do",
    contactTitle: "Let’s Work Together",
    contactText:
      "Open to full-time opportunities, freelance projects, and collaborations.",
    getInTouch: "Get In Touch →",
    langButton: "中文",
  },
  zh: {
    navHome: "首頁",
    navWork: "作品",
    navServices: "服務",
    navAbout: "關於",
    navContact: "聯絡",
    resume: "履歷 ↓",
    eyebrow: "3D 與互動設計師",
    heroTitle: "將產品價值<br />轉化為視覺<span>體驗</span>",
    heroDesc:
      "我專注於產品視覺化、動態設計與互動體驗，協助品牌將產品特性、技術亮點與核心賣點，轉化為更直覺、更具說服力的視覺內容。",
    viewWork: "查看作品 →",
    playShowreel: "▶ 播放作品集",
    experience: "跨域經驗",
    selectedWork: "精選作品",
    viewAll: "查看更多作品 →",
    aboutTitle: "關於我",
    aboutText:
      "我是一名 3D 與互動設計師，專注於產品視覺化、動態設計與即時互動體驗，擅長將產品特性轉化為具備質感與敘事性的視覺內容。",
    servicesTitle: "我能做什麼",
    contactTitle: "一起合作",
    contactText: "目前開放全職機會、自由接案與專案合作。",
    getInTouch: "聯絡我 →",
    langButton: "EN",
  },
};

// 安全設定一般文字內容。
function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element && text !== undefined) {
    element.textContent = text;
  }
}

// 安全設定 HTML 內容；目前主要用在 Hero 標題內含 <br> 與 <span>。
function setHTML(selector, html) {
  const element = document.querySelector(selector);
  if (element && html !== undefined) {
    element.innerHTML = html;
  }
}

// 首頁主要固定區塊語言切換。
function setHomeLanguage(lang) {
  const t = translations[lang];

  setText(".nav a:nth-child(1)", t.navHome);
  setText(".nav a:nth-child(2)", t.navWork);
  setText(".nav a:nth-child(3)", t.navServices);
  setText(".nav a:nth-child(4)", t.navAbout);
  setText(".nav a:nth-child(5)", t.navContact);

  setText(".resume-button", t.resume);
  setText(".eyebrow", t.eyebrow);
  setHTML(".hero h1", t.heroTitle);
  setText(".hero-description", t.heroDesc);
  setText(".hero-actions .primary-button", t.viewWork);
  setText(".showreel-button", t.playShowreel);

  setText(".experience-strip span", t.experience);
  setText(".section-heading h2", t.selectedWork);
  setText(".section-heading a", t.viewAll);

  setText(".about-block h2", t.aboutTitle);
  setText(".about-block p", t.aboutText);

  setText(".services-block h2", t.servicesTitle);

  setText(".contact-block h2", t.contactTitle);
  setText(".contact-block > p", t.contactText);
  setText(".contact-block .primary-button", t.getInTouch);
}

// 專案頁語言切換：讀取 data-project-en / data-project-zh。
function setProjectPageLanguage(lang) {
  const projectElements = document.querySelectorAll("[data-project-en]");

  projectElements.forEach(function (element) {
    const text =
      lang === "zh"
        ? element.getAttribute("data-project-zh")
        : element.getAttribute("data-project-en");

    if (text) {
      element.textContent = text;
    }
  });
}

// 通用語言切換：讀取 data-en / data-zh。
// 之後若在 HTML 新增文字，只要加這兩個屬性，就會自動切換。
function setDataLanguage(lang) {
  const dataElements = document.querySelectorAll("[data-en][data-zh]");

  dataElements.forEach(function (element) {
    const text =
      lang === "zh"
        ? element.getAttribute("data-zh")
        : element.getAttribute("data-en");

    if (text) {
      element.textContent = text;
    }
  });
}

// 套用目前語言到首頁、專案頁與通用 data 屬性。
function setLanguage(lang) {
  setHomeLanguage(lang);
  setProjectPageLanguage(lang);
  setDataLanguage(lang);

  if (langToggle) {
    langToggle.textContent = translations[lang].langButton;
  }

  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
}

setLanguage(currentLang);

// 語言切換按鈕：切換後寫入 localStorage，讓換頁後維持同一語言。
if (langToggle) {
  langToggle.addEventListener("click", function () {
    currentLang = currentLang === "en" ? "zh" : "en";
    localStorage.setItem("siteLang", currentLang);
    setLanguage(currentLang);
  });
}

// ============================================================
// 首頁 Showreel 彈窗
// ============================================================
const showreelButton = document.querySelector(".showreel-button");
const showreelModal = document.querySelector(".showreel-modal");
const showreelClose = document.querySelector(".showreel-close");
const showreelFrame = document.querySelector(".showreel-frame");

const youtubeUrl = "https://www.youtube.com/embed/ukjgSUlNkuw?autoplay=1";

function openShowreel() {
  if (!showreelModal || !showreelFrame) return;

  showreelModal.classList.add("is-open");
  showreelFrame.src = youtubeUrl;
  document.body.style.overflow = "hidden";
}

function closeShowreel() {
  if (!showreelModal || !showreelFrame) return;

  showreelModal.classList.remove("is-open");
  showreelFrame.src = "";
  document.body.style.overflow = "";
}

if (showreelButton && showreelModal && showreelClose && showreelFrame) {
  showreelButton.addEventListener("click", function (event) {
    event.preventDefault();
    openShowreel();
  });

  showreelClose.addEventListener("click", closeShowreel);

  showreelModal.addEventListener("click", function (event) {
    if (event.target === showreelModal) {
      closeShowreel();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeShowreel();
    }
  });
}

// ============================================================
// 專案圖片 Lightbox 放大瀏覽
// ============================================================
const galleryImages = Array.from(
  document.querySelectorAll(".project-gallery-grid img, .workflow-item img")
);

const imageLightbox = document.querySelector(".image-lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const lightboxCounter = document.querySelector(".lightbox-counter");

let currentLightboxIndex = 0;

function updateLightboxImage() {
  if (!galleryImages.length || !lightboxImage || !lightboxCounter) return;

  const currentImage = galleryImages[currentLightboxIndex];

  lightboxImage.src = currentImage.src;
  lightboxImage.alt = currentImage.alt || "Project visual";
  lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${
    galleryImages.length
  }`;
}

function openImageLightbox(index) {
  if (!imageLightbox || !lightboxImage) return;

  currentLightboxIndex = index;
  updateLightboxImage();

  imageLightbox.classList.add("is-open");
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeImageLightbox() {
  if (!imageLightbox || !lightboxImage) return;

  imageLightbox.classList.remove("is-open");
  imageLightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

function showPrevImage() {
  if (!galleryImages.length) return;

  currentLightboxIndex =
    (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;

  updateLightboxImage();
}

function showNextImage() {
  if (!galleryImages.length) return;

  currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;

  updateLightboxImage();
}

if (
  galleryImages.length &&
  imageLightbox &&
  lightboxImage &&
  lightboxClose &&
  lightboxPrev &&
  lightboxNext
) {
  galleryImages.forEach(function (image, index) {
    image.addEventListener("click", function () {
      openImageLightbox(index);
    });
  });

  lightboxClose.addEventListener("click", closeImageLightbox);
  lightboxPrev.addEventListener("click", showPrevImage);
  lightboxNext.addEventListener("click", showNextImage);

  imageLightbox.addEventListener("click", function (event) {
    if (event.target === imageLightbox) {
      closeImageLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!imageLightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeImageLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPrevImage();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }
  });
}

// ============================================================
// 底部聯絡區光暈吸引效果
// 滑鼠越靠近「聯絡我」按鈕，光團與按鈕光暈越強。
// ============================================================
const bottomSection = document.querySelector(".bottom-section");
const contactButton = document.querySelector(".contact-block .primary-button");

if (bottomSection && contactButton) {
  bottomSection.addEventListener("mousemove", function (event) {
    const sectionRect = bottomSection.getBoundingClientRect();
    const buttonRect = contactButton.getBoundingClientRect();

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const xPercent = ((mouseX - sectionRect.left) / sectionRect.width) * 100;
    const yPercent = ((mouseY - sectionRect.top) / sectionRect.height) * 100;

    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const distance = Math.hypot(mouseX - buttonCenterX, mouseY - buttonCenterY);
    const maxDistance = 600;

    const power = Math.max(0, 1 - distance / maxDistance);

    bottomSection.style.setProperty("--glow-x", `${xPercent}%`);
    bottomSection.style.setProperty("--glow-y", `${yPercent}%`);
    bottomSection.style.setProperty("--glow-power", power.toFixed(3));

    if (power > 0.42) {
      contactButton.classList.add("is-attracting");
    } else {
      contactButton.classList.remove("is-attracting");
    }
  });

  bottomSection.addEventListener("mouseleave", function () {
    bottomSection.style.setProperty("--glow-x", "88%");
    bottomSection.style.setProperty("--glow-y", "50%");
    bottomSection.style.setProperty("--glow-power", "0");
    contactButton.classList.remove("is-attracting");
  });
}
