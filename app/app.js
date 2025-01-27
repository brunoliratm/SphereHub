const socket = io("ws://localhost:4200");
let userId;

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input");
  if (input.value) {
    socket.emit("message", { id: userId, text: input.value });
    input.value = "";
  }
  input.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

socket.on("message", (data) => {
  const li = document.createElement("li");
  li.classList.add(data.id === userId ? "user-message" : "other-message");
  li.textContent = data.text;
  document.querySelector("ul").appendChild(li);
});

socket.on("system-message", (data) => {
  const li = document.createElement("li");
  li.classList.add("system-message");
  li.textContent = data.text;
  document.querySelector("ul").appendChild(li);
});

socket.on("user-id", (id) => {
  userId = id;
  document.querySelector(".user-id").textContent = `User ID: ${id.substring(0, 5)}`;
});

const ul = document.querySelector("ul");
const observer = new MutationObserver(() => {
  ul.scrollTop = ul.scrollHeight;
});
observer.observe(ul, { childList: true });

document.querySelector(".dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = document.querySelector(".dark-mode-toggle i");
  if (document.body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});
