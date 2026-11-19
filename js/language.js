
const translations = {
  bn: {
    welcome: "স্বাগতম!",
    user: "SUPER HUB ব্যবহারকারী",
    categories: "সব বিভাগ",
    trending: "🔥 আজকের জনপ্রিয়",
    daily: "🎯 আজকের চ্যালেঞ্জ",
    search: "যেকোনো কিছু খুঁজুন...",
    challenge: "আজকের চ্যালেঞ্জ",
    challengeText: "প্রতিদিন নতুন কিছু শিখুন এবং নিজের জ্ঞান বাড়ান।",
    start: "শুরু করুন",
    coming: "খুব শীঘ্রই আসছে!",
    noNotification: "এখনো কোনো নতুন নোটিফিকেশন নেই",
    home: "হোম",
    explore: "এক্সপ্লোর",
    create: "তৈরি করুন",
    community: "কমিউনিটি",
    profile: "প্রোফাইল",
    searchEmpty: "কিছু লিখে সার্চ করুন",
    notFound: "কোনো বিভাগ পাওয়া যায়নি",
    ai: "AI স্টুডিও",
    social: "সোশ্যাল",
    love: "ভালোবাসা ও স্ট্যাটাস",
    islamic: "ইসলামিক",
    learn: "শিখুন ও উপার্জনের দক্ষতা",
    quiz: "কুইজ জোন",
    video: "বিনোদন",
    tools: "স্মার্ট টুলস",
    premium: "প্রিমিয়াম",
    admin: "অ্যাডমিন"
  },

  en: {
    welcome: "Welcome!",
    user: "SUPER HUB User",
    categories: "Explore Categories",
    trending: "🔥 Trending Today",
    daily: "🎯 Daily Challenge",
    search: "Search anything...",
    challenge: "Today's Challenge",
    challengeText: "Learn something new every day and grow your knowledge.",
    start: "Start Challenge",
    coming: "Coming Soon!",
    noNotification: "No new notifications",
    home: "Home",
    explore: "Explore",
    create: "Create",
    community: "Community",
    profile: "Profile",
    searchEmpty: "Please enter something",
    notFound: "No category found",
    ai: "AI Studio",
    social: "Social",
    love: "Love & Status",
    islamic: "Islamic",
    learn: "Learn & Earn Skills",
    quiz: "Quiz Zone",
    video: "Entertainment",
    tools: "Smart Tools",
    premium: "Premium",
    admin: "Admin"
  },

  hi: {
    welcome: "स्वागत है!",
    user: "SUPER HUB उपयोगकर्ता",
    categories: "सभी श्रेणियां",
    trending: "🔥 आज के लोकप्रिय",
    daily: "🎯 आज की चुनौती",
    search: "कुछ भी खोजें...",
    challenge: "आज की चुनौती",
    challengeText: "हर दिन कुछ नया सीखें और अपना ज्ञान बढ़ाएं।",
    start: "शुरू करें",
    coming: "जल्द आ रहा है!",
    noNotification: "अभी कोई नई सूचना नहीं है",
    home: "होम",
    explore: "एक्सप्लोर",
    create: "बनाएं",
    community: "कम्युनिटी",
    profile: "प्रोफाइल",
    searchEmpty: "कृपया कुछ लिखें",
    notFound: "कोई श्रेणी नहीं मिली",
    ai: "AI स्टूडियो",
    social: "सोशल",
    love: "प्यार और स्टेटस",
    islamic: "इस्लामिक",
    learn: "सीखें और कमाई के कौशल",
    quiz: "क्विज़ ज़ोन",
    video: "मनोरंजन",
    tools: "स्मार्ट टूल्स",
    premium: "प्रीमियम",
    admin: "एडमिन"
  }
};

let currentLanguage = "bn";

export function t(key) {
  return translations[currentLanguage]?.[key]
    || translations.bn[key]
    || key;
}

export function changeLanguage(language) {
  if (!translations[language]) return;

  currentLanguage = language;

  localStorage.setItem("superhub_language", language);

  applyTranslations();
}

export async function initLanguage() {
  const savedLanguage =
    localStorage.getItem("superhub_language") || "bn";

  currentLanguage = translations[savedLanguage]
    ? savedLanguage
    : "bn";

  applyTranslations();
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;

  const $ = (id) => document.getElementById(id);

  if ($("welcomeText")) {
    $("welcomeText").textContent = t("welcome");
  }

  if ($("userName")) {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

    $("userName").textContent =
      user?.first_name || t("user");
  }

  if ($("categoryTitle")) {
    $("categoryTitle").textContent = t("categories");
  }

  if ($("trendingTitle")) {
    $("trendingTitle").textContent = t("trending");
  }

  if ($("dailyTitle")) {
    $("dailyTitle").textContent = t("daily");
  }

  if ($("searchInput")) {
    $("searchInput").placeholder = t("search");
  }

  const categoryKeys = {
    ai: "ai",
    social: "social",
    community: "community",
    love: "love",
    islamic: "islamic",
    learn: "learn",
    quiz: "quiz",
    video: "video",
    tools: "tools",
    profile: "profile",
    premium: "premium",
    admin: "admin"
  };

  document.querySelectorAll(".category-card").forEach((card) => {
    const key = categoryKeys[card.dataset.category];
    const label = card.querySelector("b");

    if (key && label) {
      label.textContent = t(key);
    }
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    const key = item.dataset.page;
    const label = item.querySelector("small");

    if (label && translations[currentLanguage][key]) {
      label.textContent = t(key);
    }
  });

  if ($("quizBtn")) {
    $("quizBtn").textContent = t("start");
  }
      }
    
