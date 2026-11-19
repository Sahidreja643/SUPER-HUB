
const PAGE_NAMES = [
  "home",
  "explore",
  "create",
  "community",
  "profile"
];

let currentPage = "home";

export function getCurrentPage() {
  return currentPage;
}

export function navigateTo(page) {
  if (!PAGE_NAMES.includes(page)) {
    console.warn("Unknown page:", page);
    return false;
  }

  currentPage = page;

  document.querySelectorAll(".nav-item").forEach((button) => {
    const isActive = button.dataset.page === page;

    button.classList.toggle("active", isActive);
    button.setAttribute(
      "aria-current",
      isActive ? "page" : "false"
    );
  });

  document.dispatchEvent(
    new CustomEvent("superhub:navigate", {
      detail: { page }
    })
  );

  return true;
}

export function initNavigation() {
  const buttons = document.querySelectorAll(".nav-item");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      navigateTo(button.dataset.page);
    });
  });

  navigateTo("home");
  }
