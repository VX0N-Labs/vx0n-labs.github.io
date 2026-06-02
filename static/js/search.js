async function initSearch() {
  const input = document.getElementById("search-input");
  const results = document.getElementById("results");
  if (!input || !results) return;

  let articles;
  try {
    const response = await fetch("/index.json");
    articles = await response.json();
  } catch {
    results.innerHTML = "<p style='color:var(--text-secondary);padding:1rem;'>Failed to load articles. Please refresh.</p>";
    return;
  }

  let currentTimeout;

  function render(items, show) {
    if (!show || items.length === 0) {
      results.innerHTML = "";
      return;
    }

    results.innerHTML = items
      .map(
        (article, index) => `
            <div class="result-card" style="animation-delay: ${index * 50}ms">
                <a class="result-title" href="${article.url}" data-redirect="${article.redirect || ""}">
                    ${article.title}
                </a>
                <div class="result-url">${article.redirect ? article.redirect : window.location.origin + article.url}</div>
                
                <div class="result-author">${article.author ? "by " + article.author : ""}</div>
                <div class="result-description">
                    ${article.description || "No description available"}
                </div>
                ${
                  article.tags && article.tags.length
                    ? `<div class="result-tags">
                        ${article.tags.map((tag) => `<span class="result-tag">${tag}</span>`).join("")}
                       </div>`
                    : ""
                }
            </div>
        `,
      )
      .join("");

    document.querySelectorAll(".result-card").forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(10px)";
      setTimeout(() => {
        card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 50);
    });
  }

  results.addEventListener("click", (e) => {
    const link = e.target.closest(".result-title");
    if (link) {
      const redirect = link.getAttribute("data-redirect");
      if (redirect) {
        e.preventDefault();
        window.location.href = redirect;
      }
    }
  });

  render(articles, true);

  input.addEventListener("input", () => {
    clearTimeout(currentTimeout);

    currentTimeout = setTimeout(() => {
      const raw = input.value;
      const keyword = raw.toLowerCase();
      const isTagSearch = keyword.startsWith("#");

      const filtered = articles.filter((article) => {
        if (isTagSearch) {
          const tagQuery = keyword.slice(1).trim();
          if (!tagQuery) return false;
          return (
            article.tags &&
            article.tags.some((t) => t.toLowerCase().includes(tagQuery))
          );
        }
        return (
          article.title.toLowerCase().includes(keyword) ||
          (article.description &&
            article.description.toLowerCase().includes(keyword)) ||
          (article.tags &&
            article.tags.join(" ").toLowerCase().includes(keyword)) ||
          (article.author &&
            article.author.toLowerCase().includes(keyword))
        );
      });

      render(filtered, true);
    }, 150);
  });
}

initSearch();
