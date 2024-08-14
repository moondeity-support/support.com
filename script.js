document
  .getElementById("messageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const discordName = document.getElementById("discordName").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const fileInput = document.getElementById("file");
    const webhookUrl =
      "https://discord.com/api/webhooks/1263256486356975716/HmYRQLcpDBzS-abphLDb_QG7yJKcpzw6_gx7lPz5VfP-iOB79Eo2nN_sFRdBEhd8KHo3";

    const formData = new FormData();

    const embed = {
      title: "Új Üzenet",
      description: message,
      color: 5814783,
    };

    if (email) {
      embed.fields = [{ name: "E-mail", value: email }];
    }

    formData.append("username", discordName);
    formData.append("embeds", JSON.stringify([embed]));

    if (fileInput.files[0]) {
      formData.append("file", fileInput.files[0]);
    }

    fetch(webhookUrl, {
      method: "POST",
      body: formData,
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
