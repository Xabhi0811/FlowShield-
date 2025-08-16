
// extension/src/content/contentScript.js

(async function () {
  try {
    // Call backend API to get blocked sites for the logged-in user
    const response = await fetch("http://localhost:5000/api/sites", {
      credentials: "include", // send cookies if you're using JWT or sessions
    });

    if (!response.ok) return;
    const blockedSites = await response.json(); // Array of site URLs

    const currentUrl = window.location.href;

    // Check if current site is in blocked list
    const isBlocked = blockedSites.some((site) =>
      currentUrl.startsWith(site.origin)
    );

    if (isBlocked) {
      document.documentElement.innerHTML = `
        <div style="
          display:flex;
          justify-content:center;
          align-items:center;
          height:100vh;
          font-family:sans-serif;
          background:#111;
          color:#fff;
          text-align:center;
        ">
          <div>
            <h1 style="font-size:2rem;">🚫 Site Blocked</h1>
            <p style="margin-top:1rem;">This site is blocked for productivity reasons.</p>
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.error("Error in content script:", err);
  }
})();
