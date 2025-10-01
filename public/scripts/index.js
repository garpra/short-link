document.addEventListener("DOMContentLoaded", async () => {
  const userNav = document.getElementById("user-nav");
  const tableContainer = document.getElementById("table-container");

  const response = await fetch("/user/status");
  const data = await response.json();

  if (data.loggedIn) {
    userNav.innerHTML = `
              <li class="nav-item">
                <span class="nav-link">Welcome, ${data.user.name.split(" ")[0]}</span>
              </li>
              <li class="nav-item ms-lg-2">
                <button class="btn btn-outline-danger rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</button>
              </li>
            `;
    tableContainer.hidden = !tableContainer.hidden;

    const logoutBtn = document.getElementById("logout-button");
    logoutBtn.addEventListener("click", async () => {
      await fetch("/auth/logout");
      window.location.reload();
    });
  }
});

let deleteId = null;

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-btn");
  if (btn) deleteId = btn.dataset.id;
});

document.getElementById("delete-button").addEventListener("click", async () => {
  if (!deleteId) return;

  const response = await fetch(`/delete/url/${deleteId}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (result.success) {
    window.location.href = "/";
  }
});
