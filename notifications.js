
let notifications = [];

export function addNotification(title, message) {
  const notification = {
    id: Date.now(),
    title,
    message,
    createdAt: new Date().toISOString(),
    read: false
  };

  notifications.unshift(notification);

  document.dispatchEvent(
    new CustomEvent("superhub:notification-added", {
      detail: notification
    })
  );

  return notification;
}

export function getNotifications() {
  return [...notifications];
}

export function markAsRead(id) {
  notifications = notifications.map((item) => {
    return item.id === id
      ? { ...item, read: true }
      : item;
  });
}

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    return "unsupported";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  return await Notification.requestPermission();
}

export async function showBrowserNotification(title, message) {
  const permission = await requestNotificationPermission();

  if (permission !== "granted") {
    return false;
  }

  new Notification(title, {
    body: message,
    icon: "/favicon.ico"
  });

  return true;
}

export function initNotifications() {
  const button = document.getElementById("notificationBtn");

  if (!button) return;

  button.addEventListener("click", () => {
    const items = getNotifications();

    document.dispatchEvent(
      new CustomEvent("superhub:notifications-open", {
        detail: { notifications: items }
      })
    );

    if (items.length === 0) {
      alert("এখনো কোনো নতুন নোটিফিকেশন নেই।");
    } else {
      alert(
        items
          .map((item) => `${item.title}\n${item.message}`)
          .join("\n\n")
      );
    }
  });
  }
                            
