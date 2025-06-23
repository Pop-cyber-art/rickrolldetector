const backendURL = "https://script.google.com/macros/s/AKfycbwIyylzf_tVtG9yqkBgXJk2ePO3TOa-nez8QcgLOx3EStnLiSII3KlFxZIJqm6suAM/exec"; // e.g. https://script.google.com/macros/s/XXXXX/exec

document.getElementById("urlForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("urlInput").value.trim();
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "🔍 Checking...";

  try {
    const res = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (data.error) {
      resultDiv.innerHTML = `⚠️ Error: ${data.error}`;
      return;
    }

    if (data.rickroll) {
      resultDiv.innerHTML = `🚨 <strong>Rickroll detected!</strong><br><strong>Title:</strong> ${data.title}<br><strong>Channel:</strong> ${data.channel}`;
    } else {
      resultDiv.innerHTML = `✅ <strong>Safe to watch!</strong><br><strong>Title:</strong> ${data.title}<br><strong>Channel:</strong> ${data.channel}`;
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "⚠️ Failed to check the link.";
  }
});
