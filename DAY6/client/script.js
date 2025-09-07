const socket = io("http://localhost:5000");

const chat = document.getElementById("chat");
const typing = document.getElementById("typing");
const usernameInput = document.getElementById("username");
const joinBtn = document.getElementById("joinBtn");
const msgInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const usersList = document.getElementById("users");

let username = "";
joinBtn.onclick = () => {
  username = usernameInput.value;
  if (username) {
    socket.emit("join", username);
    usernameInput.disabled = true;
    joinBtn.disabled = true;
  }
};

socket.on("message", (data) => {
  const p = document.createElement("p");
  p.innerHTML = `<b>${data.user}:</b> ${data.text}`;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight; 
});


sendBtn.onclick = () => {
  const msg = msgInput.value;
  if (msg) {
    socket.emit("chatMessage", msg);
    msgInput.value = "";
  }
};


msgInput.addEventListener("input", () => {
  socket.emit("typing");
});

socket.on("typing", (user) => {
  typing.innerText = `${user} is typing...`;
  setTimeout(() => (typing.innerText = ""), 2000);
});

socket.on("userList", (users) => {
  usersList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user;
    usersList.appendChild(li);
  });
});
