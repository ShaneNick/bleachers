const socket = io("http://localhost:3000");

const messagesContainer = document.getElementById("text");
const submit = document.getElementById("submit");
const roomName = window.location.pathname.split("/").pop();

function createMessageElement(sender, text, isReceived) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(
    "alert",
    isReceived ? "alert-success" : "alert-info",
    "text",
    isReceived ? "received" : "sent",
    "d-flex"
  );

  //gets nickname from db
  async function getNickname(userId) {
    const response = await fetch(`/api/getNickname/${userId}`);
    const data = await response.json();
    return data.nickname;
  }

  const senderP = document.createElement("p");
  senderP.textContent = isReceived ? `${sender}:` : "Me: ";
  messageDiv.appendChild(senderP);

  const textP = document.createElement("p");
  textP.textContent = text;
  messageDiv.appendChild(textP);

  return messageDiv;
}

submit.addEventListener("click", () => {
  const input = document.getElementById("message-input");
  const message = input.value;

  input.value = "";

  // Emit the 'message' event to the server with the message data
  socket.emit("message", { sender: socket.id, text: message, room: roomName });

  const messageElement = createMessageElement("ME: ", message, false);
  messagesContainer.appendChild(messageElement);
});

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("message", (data) => {
  const { sender, text, room } = data;
  if (room === roomName) {
    const messageElement = createMessageElement(sender, text, true);
    messagesContainer.appendChild(messageElement);
  }
});
