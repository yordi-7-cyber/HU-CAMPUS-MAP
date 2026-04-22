// ── TRANSLATIONS ──
const i18n = {
  en: {
    appName: "Wanderlust",
    tagline: "Haramaya University",
    title: "Welcome Back",
    subtitle: "Explore your campus, find your way",
    slogan: "No more afraid to go somewhere.",
    signin: "Sign In",
    or: "or",
    guest: "Continue as Guest",
    noAccount: "Don't have an account?",
    createOne: "Create one",
  },
  am: {
    appName: "ዋንደርለስት",
    tagline: "ሐረማያ ዩኒቨርሲቲ",
    title: "እንኳን ደህና መጡ",
    subtitle: "ካምፓስዎን ያስሱ፣ መንገድዎን ያግኙ",
    slogan: "ወደ ትኛውም ቦታ መሄድ አይፈሩ።",
    signin: "ግባ",
    or: "ወይም",
    guest: "እንደ እንግዳ ቀጥል",
    noAccount: "መለያ የለዎትም?",
    createOne: "ይፍጠሩ",
  },
  om: {
    appName: "Wanderlust",
    tagline: "Yunivarsiitii Haraamayaa",
    title: "Baga Nagaan Deebittan",
    subtitle: "Kaampaasii kee saagi, karaa kee argadhu",
    slogan: "Bakka deemuu sodaachuu hin qabdu.",
    signin: "Seeni",
    or: "ykn",
    guest: "Keessummaatti Itti Fufi",
    noAccount: "Herrega hin qabduu?",
    createOne: "Uumi",
  },
  so: {
    appName: "Wanderlust",
    tagline: "Jaamacadda Haramaaya",
    title: "Ku soo dhawoow",
    subtitle: "Sahmin xaruntaada, hel jidkaaga",
    slogan: "Hadda kama cabsanaysid meel aad tagtid.",
    signin: "Gal",
    or: "ama",
    guest: "Sii wad Martida",
    noAccount: "Akoon ma lihid?",
    createOne: "Samee",
  },
};

let currentLang = "en";

function applyTranslations(lang) {
  const t = i18n[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.documentElement.lang = lang;
}

// ── LANGUAGE SELECTOR ──
const langSelector = document.getElementById("langSelector");
const langToggle = document.getElementById("langToggle");
const langDropdown = document.getElementById("langDropdown");
const currentLangEl = document.getElementById("currentLang");

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  langSelector.classList.toggle("open");
});

langDropdown.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", () => {
    const lang = li.dataset.lang;
    currentLang = lang;
    currentLangEl.textContent = lang.toUpperCase();
    langDropdown.querySelectorAll("li").forEach((l) => l.classList.remove("active"));
    li.classList.add("active");
    langSelector.classList.remove("open");
    applyTranslations(lang);
  });
});

document.addEventListener("click", () => langSelector.classList.remove("open"));

// ── THEME TOGGLE ──
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const html = document.documentElement;

themeToggle.addEventListener("click", () => {
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  themeIcon.textContent = isDark ? "🌙" : "☀️";
});

// ── SLIDESHOW ──
const slides = document.querySelectorAll(".slide");
const indicatorsContainer = document.getElementById("indicators");
let current = 0;
let timer;

// Build indicators
slides.forEach((_, i) => {
  const btn = document.createElement("button");
  btn.className = "indicator" + (i === 0 ? " active" : "");
  btn.setAttribute("aria-label", `Slide ${i + 1}`);
  btn.addEventListener("click", () => goTo(i));
  indicatorsContainer.appendChild(btn);
});

function getIndicators() {
  return document.querySelectorAll(".indicator");
}

function goTo(index) {
  slides[current].classList.remove("active");
  getIndicators()[current].classList.remove("active");
  current = index;
  slides[current].classList.add("active");
  getIndicators()[current].classList.add("active");
  resetTimer();
}

function next() {
  goTo((current + 1) % slides.length);
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(next, 5500);
}

// Start
resetTimer();
