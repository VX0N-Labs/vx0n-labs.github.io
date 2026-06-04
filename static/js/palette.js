(function () {
  var overlay = document.getElementById("cmd-palette-overlay");
  var input = document.getElementById("cmd-input");
  var results = document.getElementById("cmd-results");
  if (!overlay || !input || !results) return;

  var navCommands = [
    { label: "Home", path: "/", cmd: "/home" },
    { label: "Team", path: "/team", cmd: "/team" },
    { label: "Vxon", path: "/vxon", cmd: "/vxon" },
    { label: "Contribute", path: "/posts/contribute_to_vxon/", cmd: "/contribute" },
  ];

  var themeCommands = [
    { label: "Theme: dark", action: "theme", value: "dark", cmd: "/theme dark" },
    { label: "Theme: light", action: "theme", value: "light", cmd: "/theme light" },
    { label: "Theme: cyberpunk", action: "theme", value: "cyberpunk", cmd: "/theme cyberpunk" },
    { label: "Theme: matrix", action: "theme", value: "matrix", cmd: "/theme matrix" },
    { label: "Theme: sepia", action: "theme", value: "sepia", cmd: "/theme sepia" },
  ];

  var mainCommands = navCommands.concat([
    { label: "Change Theme", cmd: "/theme", group: "theme" },
  ]);

  var currentGroup = null;

  function getCurrentList() {
    if (currentGroup === "theme") return themeCommands;
    return mainCommands.slice();
  }

  function openPalette() {
    currentGroup = null;
    overlay.classList.add("open");
    input.value = "";
    results.innerHTML = "";
    renderCommands(getCurrentList());
    setTimeout(function () { input.focus(); }, 50);
  }

  function closePalette() {
    overlay.classList.remove("open");
    currentGroup = null;
  }

  function navigate(cmd) {
    if (cmd.group === "theme") {
      currentGroup = "theme";
      input.value = "";
      renderCommands(themeCommands);
      highlightedIndex = 0;
      return;
    }
    closePalette();
    if (cmd.action === "theme") {
      if (window.__applyTheme) window.__applyTheme(cmd.value);
      localStorage.setItem("theme", cmd.value);
      return;
    }
    window.location.href = cmd.path;
  }

  function renderCommands(list) {
    results.innerHTML = "";
    list.forEach(function (cmd, i) {
      var div = document.createElement("div");
      div.className = "cmd-result-item" + (i === 0 ? " highlighted" : "");
      div.innerHTML = '<span class="path">' + cmd.cmd + '</span><span>' + cmd.label + "</span>";
      div.addEventListener("click", function () { navigate(cmd); });
      div.addEventListener("mouseenter", function () {
        results.querySelectorAll(".highlighted").forEach(function (el) { el.classList.remove("highlighted"); });
        div.classList.add("highlighted");
      });
      results.appendChild(div);
    });
  }

  function filterCommands(query) {
    var q = (query || "").toLowerCase();
    var all = getCurrentList();
    if (!query) {
      if (currentGroup) {
        currentGroup = null;
        return getCurrentList();
      }
      return all;
    }

    if (currentGroup === "theme") {
      return all.filter(function (cmd) {
        return cmd.label.toLowerCase().includes(q) || cmd.cmd.toLowerCase().includes(q);
      });
    }

    var filtered = all.filter(function (cmd) {
      return cmd.label.toLowerCase().includes(q) || cmd.cmd.toLowerCase().includes(q);
    });

    if (filtered.length === 1 && filtered[0].group === "theme") {
      currentGroup = "theme";
      return themeCommands;
    }

    return filtered;
  }

  var highlightedIndex = 0;

  input.addEventListener("input", function () {
    var filtered = filterCommands(this.value);
    renderCommands(filtered);
    highlightedIndex = 0;
  });

  input.addEventListener("keydown", function (e) {
    var items = results.querySelectorAll(".cmd-result-item");
    if (e.key === "Enter") {
      e.preventDefault();
      var hl = results.querySelector(".highlighted");
      if (hl) {
        var idx = Array.prototype.indexOf.call(items, hl);
        var filtered = filterCommands(input.value);
        if (filtered[idx]) navigate(filtered[idx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      items.forEach(function (el) { el.classList.remove("highlighted"); });
      highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
      if (items[highlightedIndex]) items[highlightedIndex].classList.add("highlighted");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items.forEach(function (el) { el.classList.remove("highlighted"); });
      highlightedIndex = Math.max(highlightedIndex - 1, 0);
      if (items[highlightedIndex]) items[highlightedIndex].classList.add("highlighted");
    } else if (e.key === "Escape") {
      if (currentGroup) {
        currentGroup = null;
        input.value = "";
        renderCommands(getCurrentList());
        highlightedIndex = 0;
      } else {
        closePalette();
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      var filtered = filterCommands(input.value);
      if (filtered.length > 1) {
        var prefix = filtered[0].cmd;
        for (var i = 1; i < filtered.length; i++) {
          while (filtered[i].cmd.indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
          }
        }
        prefix = prefix.trim();
        input.value = prefix;
        highlightedIndex = 0;
        var reFiltered = filterCommands(prefix);
        renderCommands(reFiltered);
      } else if (filtered.length === 1) {
        input.value = filtered[0].cmd;
        renderCommands(filtered);
        highlightedIndex = 0;
      }
    }
  });

  var gCount = 0;
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      if (overlay.classList.contains("open")) { closePalette(); } else { openPalette(); }
      return;
    }
    if (overlay.classList.contains("open")) return;
    var tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.key === "/" || (e.key === "?" && e.shiftKey)) {
      e.preventDefault();
      var si = document.getElementById("search-input");
      if (si) { si.focus(); return; }
    }
    if (e.key === "?") { e.preventDefault(); openPalette(); return; }
    if (e.key === "j") { e.preventDefault(); window.scrollBy(0, 50); return; }
    if (e.key === "k") { e.preventDefault(); window.scrollBy(0, -50); return; }
    if (e.key === "u") { e.preventDefault(); window.scrollBy(0, -window.innerHeight / 2); return; }
    if (e.key === "d") { e.preventDefault(); window.scrollBy(0, window.innerHeight / 2); return; }
    if (e.key === "h") { e.preventDefault(); window.history.back(); return; }
    if (e.key === "l") { e.preventDefault(); window.history.forward(); return; }
    if (e.key === "g") { e.preventDefault(); gCount++; if (gCount === 2) { window.scrollTo(0, 0); gCount = 0; } setTimeout(function () { gCount = 0; }, 400); return; }
    if (e.key === "G") { e.preventDefault(); window.scrollTo(0, document.body.scrollHeight); return; }
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePalette();
  });
})();