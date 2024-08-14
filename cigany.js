document
  .getElementById("messageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const discordName = document.getElementById("discordName").value;
    const message = document.getElementById("message").value;
    const webhookUrl =
      "https://discord.com/api/webhooks/1263256486356975716/HmYRQLcpDBzS-abphLDb_QG7yJKcpzw6_gx7lPz5VfP-iOB79Eo2nN_sFRdBEhd8KHo3";

    const payload = {
      username: discordName,
      content: message,
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById("responseMessage").textContent =
            "Üzenet sikeresen elküldve!";
        } else {
          response.json().then((data) => {
            document.getElementById(
              "responseMessage"
            ).textContent = `Hiba történt: ${data.message}`;
          });
        }
      })
      .catch((error) => {
        document.getElementById("responseMessage").textContent =
          "Hiba történt: " + error.message;
      });
  });
