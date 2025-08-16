// extension/src/background/service_worker.js

let activeTab = null;
let startTime = null;
let sessionTimer = null;

// Get backend API URL from env or hardcode during dev
const API_URL = "http://localhost:5000/api";  // 🔥 change if hosted

// Listen when tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  handleTabChange(tab);
});

// Listen when URL of current tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    handleTabChange(tab);
  }
});

// Handle tab change (track & block)
async function handleTabChange(tab) {
  if (!tab || !tab.url || !tab.url.startsWith("http")) return;

  const domain = extractDomain(tab.url);

  // Save old session time
  if (activeTab && startTime) {
    const duration = Math.floor((Date.now() - startTime) / 1000); // seconds
    if (duration > 5) {
      await saveSession(activeTab, duration);
    }
  }

  // Check if site is blocked
  const isBlocked = await checkIfBlocked(domain);
  if (isBlocked) {
    chrome.tabs.update(tab.id, { url: "chrome://newtab" }); // redirect to new tab
    return;
  }

  // Start new tracking
  activeTab = domain;
  startTime = Date.now();
}

// Extract domain name from URL
function extractDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace("www.", "");
  } catch (err) {
    return url;
  }
}

// Check if site is blocked from backend
async function checkIfBlocked(domain) {
  try {
    const res = await fetch(`${API_URL}/sites`);
    const data = await res.json();
    return data.some(site => site.domain === domain);
  } catch (err) {
    console.error("Error checking blocked sites:", err);
    return false;
  }
}

// Save session to backend
async function saveSession(domain, duration) {
  try {
    await fetch(`${API_URL}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site: domain, duration })
    });
    console.log(`Saved session: ${domain} - ${duration}s`);
  } catch (err) {
    console.error("Error saving session:", err);
  }
}

// When browser closes or extension unloads → save session
self.addEventListener("beforeunload", async () => {
  if (activeTab && startTime) {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    if (duration > 5) {
      await saveSession(activeTab, duration);
    }
  }
});
