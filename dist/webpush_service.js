/**
 * Attention! Change the URL below to your backend service.
 */
const BACKEND_URL = "http://localhost:3000/push";

const urlB64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async subscription => {
  const response = await fetch(`${BACKEND_URL}/subscribe`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription)
  });
  return response.json();
};

const getApplicationServerKey = async () => {
  const response = await fetch(`${BACKEND_URL}/web`, {
    method: "get",
    headers: { "Content-Type": "application/json" }
  });
  return response.json();
}


self.addEventListener("install", async () => {
  try {
    const serverKey = await getApplicationServerKey();
    const applicationServerKey = urlB64ToUint8Array(serverKey.publicKey);
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription);
  } catch (err) {
    console.log("Error", err);
  }
});

self.addEventListener("push", function(event) {
  if (event.data) {
    const data = event.data.json();

    if (Notification.permission === "granted") {
      // show notification
      self.registration.showNotification(data.title, data);
    }
  } else {
    console.log("Push event but no data");
  }
});


self.addEventListener('notificationclick', function (event) {
  const FRONTEND_URL = location.origin;

  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];

        // If so, just focus it.
        if (client.url.indexOf(FRONTEND_URL) >= 0 && 'focus' in client) {
          return client.focus();
        }
      }

      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(FRONTEND_URL);
      }
    })
  );
});
