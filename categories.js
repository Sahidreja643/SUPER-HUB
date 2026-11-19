
export const categories = [
  {
    id: "ai",
    name: "AI Studio",
    icon: "🤖",
    description: "AI দিয়ে লেখা ও সৃজনশীল কাজ"
  },
  {
    id: "social",
    name: "Social",
    icon: "🌐",
    description: "পোস্ট, লাইক ও কমেন্ট"
  },
  {
    id: "community",
    name: "Community",
    icon: "👥",
    description: "সবার সঙ্গে আলোচনা"
  },
  {
    id: "love",
    name: "Love & Status",
    icon: "❤️",
    description: "শায়রি ও সুন্দর স্ট্যাটাস"
  },
  {
    id: "islamic",
    name: "Islamic",
    icon: "🕌",
    description: "কুরআন, হাদিস ও দোয়া"
  },
  {
    id: "learn",
    name: "Learn & Earn",
    icon: "📚",
    description: "নতুন দক্ষতা শেখা"
  },
  {
    id: "quiz",
    name: "Quiz Zone",
    icon: "🧠",
    description: "প্রশ্ন ও জ্ঞান যাচাই"
  },
  {
    id: "video",
    name: "Entertainment",
    icon: "🎬",
    description: "ভিডিও ও বিনোদন"
  },
  {
    id: "tools",
    name: "Smart Tools",
    icon: "🛠️",
    description: "দৈনন্দিন কাজের দরকারি টুলস"
  },
  {
    id: "profile",
    name: "My Profile",
    icon: "👤",
    description: "নিজের অ্যাকাউন্ট"
  },
  {
    id: "premium",
    name: "Premium",
    icon: "💎",
    description: "অতিরিক্ত সুবিধা"
  },
  {
    id: "admin",
    name: "Admin",
    icon: "⚙️",
    description: "নিরাপদ প্রশাসনিক নিয়ন্ত্রণ"
  }
];

// সব বিভাগ পাওয়া
export function getAllCategories() {
  return categories;
}

// ID দিয়ে বিভাগ খোঁজা
export function getCategoryById(id) {
  return categories.find(category => category.id === id) || null;
}

// নাম দিয়ে বিভাগ খোঁজা
export function findCategories(query) {
  const searchText = query.trim().toLowerCase();

  if (!searchText) return [];

  return categories.filter(category =>
    category.name.toLowerCase().includes(searchText) ||
    category.description.toLowerCase().includes(searchText)
  );
      }
    
