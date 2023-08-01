(async () => {
  const socket = io();

  let username = null;

  if (!username) {
    Swal.fire({
      title: "Enter your username",
      input: "text",
      text: "Insert your username",
      inputPlaceholder: "Enter your username",
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) return "Your username is required";
      },
    }).then((input) => {
      username = input.value;
      socket.emit("chat:newUser", username);
    });
  }

  // const message = document.getElementById("message");
  const button = document.getElementById("send");
  const output = document.getElementById("output");
  const actions = document.getElementById("actions");
  const form = document.getElementById("chat-message-form");

  form.onsubmit = async (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    if (!message) return;

    form.message.value = "";

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          message,
          date: new Date(),
        }),
      });
    } catch (error) {
      Toastify({
        text: `🔴 Message failed`,
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          color: "#fff",
          background: "linear-gradient(to right, #c9a73d, #b00000)",
        },
      }).showToast();
    }
  };

  const renderMessage = (msg) =>
    `<p><strong>${msg.username}</strong>: ${msg.message}</p>`;

  const renderMessages = (messages) => {
    actions.innerHTML = "";
    const chatRender = messages.map(renderMessage).join(" ");
    output.innerHTML = chatRender;
  };

  socket.on("chat:messages", renderMessages);

  socket.on("chat:newUserConnected", (user) => {
    console.log("newUserConnected", user);
    Toastify({
      text: `🟢 ${user} has joined the chat`,
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  });

  message.addEventListener("keypress", () => {
    socket.emit("chat:typing", username);
  });

  socket.on("chat:typing", (username) => {
    actions.innerHTML = `<p><em>${username} is typing a message...</em></p>`;
  });
})();