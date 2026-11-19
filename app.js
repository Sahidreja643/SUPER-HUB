
import { APP_CONFIG } from "./config.js";
import { initLanguage, changeLanguage, t } from "./js/language.js";

const telegram = window.Telegram?.WebApp;

if (telegram) {
  telegram.ready();
  telegram.expand();
  telegram.setHeaderColor("#100d1d");
  telegram.setBackgroundColor("#100d1d");
}

const $ = (selector) => document.querySelector(selector);

function showToast(message) {
  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function updateUser() {
  const user = telegram?.initDataUnsafe?.user;

  if (user) {
    $("#userName").textContent =
      user.first_name || "SUPER HUB User";
  }
}

function setupCategories() {
  document.querySelectorAll(".category-card").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      openCategory(category);
    });
  });
}

function openCategory(category) {
  const messages = {
    ai: "AI Studio খুব শীঘ্রই আসছে!",
    social: "Social বিভাগ খুব শীঘ্রই আসছে!",
    community: "Community খুব শীঘ্রই আসছে!",
    love: "Love & Status খুব শীঘ্রই আসছে!",
    islamic: "Islamic Corner খুব শীঘ্রই আসছে!",
    learn: "Learn & Earn খুব শীঘ্রই আসছে!",
    quiz: "Quiz Zone খুব শীঘ্রই আসছে!",
    video: "Entertainment খুব শীঘ্রই আসছে!",
    tools: "Smart Tools খুব শীঘ্রই আসছে!",
    profile: "Profile খুব শীঘ্রই আসছে!",
    premium: "Premium খুব শীঘ্রই আসছে!",
    admin: "Admin Panel খুব শীঘ্রই আসছে!"
  };

  showToast(messages[category] || "Coming Soon!");
}

function setupNavigation() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.dataset.page;

      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      if (page === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const messages = {
          explore: "Explore বিভাগ শীঘ্রই আসছে!",
          create: "Create বিভাগ শীঘ্রই আসছে!",
          community: "Community বিভাগ শীঘ্রই আসছে!",
          profile: "Profile বিভাগ শীঘ্রই আসছে!"
        };

        showToast(messages[page] || "Coming Soon!");
      }
    });
  });
}

function setupSearch() {
  const input = $("#searchInput");
  const button = $("#searchBtn");

  function search() {
    const query = input.value.trim();

    if (!query) {
      showToast("কিছু লিখে সার্চ করুন");
      return;
    }

    const cards = [...document.querySelectorAll(".category-card")];

    const matches = cards.filter((card) =>
      card.textContent.toLowerCase().includes(query.toLowerCase())
    );

    cards.forEach((card) => {
      card.style.display = matches.includes(card) ? "flex" : "none";
    });

    showToast(
      matches.length
        ? matches.length + "টি বিভাগ পাওয়া গেছে"
        : "কোনো বিভাগ পাওয়া যায়নি"
    );
  }

  button.addEventListener("click", search);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") search();
  });

  input.addEventListener("input", () => {
    if (!input.value.trim()) {
      document.querySelectorAll(".category-card").forEach((card) => {
        card.style.display = "flex";
      });
    }
  });
}

function setupLanguage() {
  const button = $("#languageBtn");

  button.addEventListener("click", () => {
    const languages = ["bn", "en", "hi"];

    const current = localStorage.getItem("superhub_language")
      || APP_CONFIG.DEFAULT_LANGUAGE;

    const next = languages[
      (languages.indexOf(current) + 1) % languages.length
    ];

    changeLanguage(next);
    button.textContent = next === "bn" ? "বাংলা"
      : next === "en" ? "English" : "हिन्दी";

    showToast("Language changed");
  });
}

function setupNotifications() {
  $("#notificationBtn").addEventListener("click", () => {
    showToast("এখনো কোনো নতুন নোটিফিকেশন নেই");
  });
}

function setupChallenge() {
  $("#quizBtn").addEventListener("click", () => {
    openCategory("quiz");
  });
}

async function startApp() {
  await initLanguage();

  updateUser();
  setupCategories();
  setupNavigation();
  setupSearch();
  setupLanguage();
  setupNotifications();
  setupChallenge();

  console.log(APP_CONFIG.NAME + " started successfully");
}

startApp().catch((error) => {
  console.error("App startup error:", error);
  showToast("অ্যাপ চালু করতে সমস্যা হয়েছে");
});
