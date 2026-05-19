async function initSearch() {
  const response = await fetch("/index.json");
  const articles = await response.json();

  const input = document.getElementById("search-input");
  const results = document.getElementById("results");

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
                <a class="result-title" href="${article.url}" data-redirect="${article.redirect || ''}">
                    ${article.title}
                </a>
                <div class="result-url">${article.redirect ? article.redirect : window.location.origin + article.url}</div>
                
                <div class="result-description">
                    ${article.description || 'No description available'}
                </div>
                ${
                  article.tags && article.tags.length
                    ? `<div class="result-tags">
                        ${article.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
                       </div>`
                    : ''
                }
            </div>
        `,
      )
      .join("");

    document.querySelectorAll('.result-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 50);
    });
  }

  results.addEventListener('click', (e) => {
    const link = e.target.closest('.result-title');
    if (link) {
      const redirect = link.getAttribute('data-redirect');
      if (redirect) {
        e.preventDefault();
        window.location.href = redirect;
      }
    }
  });

  render(articles, false);

  input.addEventListener("input", () => {
    clearTimeout(currentTimeout);
    
    currentTimeout = setTimeout(() => {
      const keyword = input.value.toLowerCase();

      const filtered = articles.filter((article) => {
        return (
          article.title.toLowerCase().includes(keyword) ||
          (article.description && article.description.toLowerCase().includes(keyword)) ||
          (article.tags && article.tags.join(" ").toLowerCase().includes(keyword))
        );
      });

      render(filtered, keyword.length > 0);
    }, 150);
  });
}

initSearch();