const form = document.querySelector("form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMessage.textContent = "";

  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    errorMessage.textContent = result.message;
    return;
  }

  window.location.href = "/";
});
