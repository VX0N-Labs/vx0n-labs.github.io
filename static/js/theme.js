(function () {
  var html = document.documentElement;
  var trigger = document.getElementById("theme-trigger");
  var menu = document.getElementById("theme-menu");
  var currentLabel = document.getElementById("theme-current");

  function applyTheme(theme) {
    if (theme === "dark") {
      html.removeAttribute("data-theme");
    } else {
      html.setAttribute("data-theme", theme);
    }
    currentLabel.textContent = theme === "light" ? "make me blind" : theme;
  }

  var saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);

  if (trigger) {
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("open");
    });
  }

  if (menu) {
    menu.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var theme = this.dataset.value;
        applyTheme(theme);
        localStorage.setItem("theme", theme);
        menu.classList.remove("open");
      });
    });
  }

  document.addEventListener("click", function () {
    if (menu) menu.classList.remove("open");
  });

  window.__applyTheme = applyTheme;
})();
