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

    const fetchUrls = await fetch("/user/urls");
    const urls = await fetchUrls.json();

    const tableBody = document.getElementById("urls-table-body");
    tableBody.innerHTML = "";

    urls.forEach((url) => {
      const date = new Date(url.created_at);

      const tableRow = `
                <tr>
                  <td class="px-4 py-3 border-secondary">
                    <a
                      href="/${url.short_code}"
                      target="_blank"
                      class="text-decoration-none text-primary fw-medium d-block mb-1"
                    >
                      <i class="bi bi-link-45deg"></i> sho.rt/${url.short_code}
                    </a>
                    <span class="text-secondary" style="font-size: 0.8rem">
                      Added ${date.toLocaleDateString()}
                    </span>
                  </td>

                  <td class="py-3 border-secondary text-truncate" style="max-width: 250px">
                    <span class="text-light">${url.original_url}</span>
                  </td>

                  <td class="text-center py-3 border-secondary">
                    <span class="badge bg-dark border border-secondary text-light">
                      ${url.click_count}
                    </span>
                  </td>

                  <td class="text-end px-4 py-3 border-secondary">
                    <button
                      class="btn btn-sm btn-outline-secondary rounded-circle me-1"
                      title="Copy"
                    >
                      <i class="bi bi-clipboard"></i>
                    </button>

                    <button
                      class="btn btn-sm btn-outline-secondary rounded-circle me-1 delete-btn"
                      title="Delete"
                      data-id="${url.id}"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                `;

      tableBody.insertAdjacentHTML("beforeend", tableRow);
    });

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
