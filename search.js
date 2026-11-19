
const searchableItems = [
  { name: "AI Studio", key: "ai", keywords: ["ai", "artificial intelligence"] },
  { name: "Social", key: "social", keywords: ["post", "like", "comment"] },
  { name: "Community", key: "community", keywords: ["group", "people"] },
  { name: "Love & Status", key: "love", keywords: ["love", "shayari", "status"] },
  { name: "Islamic", key: "islamic", keywords: ["quran", "hadith", "dua"] },
  { name: "Learn & Earn", key: "learn", keywords: ["learn", "education", "skills"] },
  { name: "Quiz Zone", key: "quiz", keywords: ["quiz", "question", "test"] },
  { name: "Entertainment", key: "video", keywords: ["video", "fun", "entertainment"] },
  { name: "Smart Tools", key: "tools", keywords: ["calculator", "translate", "tools"] },
  { name: "My Profile", key: "profile", keywords: ["account", "user", "profile"] },
  { name: "Premium", key: "premium", keywords: ["premium", "subscription"] },
  { name: "Admin", key: "admin", keywords: ["admin", "control"] }
];

export function searchCategories(query) {
  const text = query.trim().toLowerCase();

  if (!text) return [];

  return searchableItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(text) ||
      item.keywords.some((word) => word.includes(text))
    );
  });
}

export function initSearch() {
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchBtn");

  if (!input) return;

  function performSearch() {
    const query = input.value.trim();

    if (!query) {
      document.dispatchEvent(
        new CustomEvent("superhub:search-empty")
      );
      return;
    }

    const results = searchCategories(query);

    document.dispatchEvent(
      new CustomEvent("superhub:search-results", {
        detail: { query, results }
      })
    );
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  if (button) {
    button.addEventListener("click", performSearch);
  }
   }
      
