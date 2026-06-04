(function () {
  var bar = document.getElementById("reading-bar");
  var topBtn = document.getElementById("top-btn");
  if (!bar || !topBtn) return;

  function update() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + "%";
    topBtn.style.display = scrollTop > 300 ? "flex" : "none";
  }

  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", update);
  update();

  var tocList = document.getElementById("toc-list");
  var content = document.querySelector(".post-content");
  if (tocList && content) {
    var headings = content.querySelectorAll("h2, h3");
    if (headings.length > 0) {
      headings.forEach(function (h) {
        if (!h.id) return;
        h.style.scrollMarginTop = "5rem";
        var li = document.createElement("li");
        li.className = "toc-item toc-" + h.tagName.toLowerCase();
        var a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        tocList.appendChild(li);
      });

      var tocLinks = tocList.querySelectorAll("a");
      function updateActive() {
        var activeIdx = -1;
        var viewTop = window.scrollY + 130;
        headings.forEach(function (h, i) {
          var rect = h.getBoundingClientRect();
          if (rect.top <= 130) activeIdx = i;
        });
        var lastHeading = headings[headings.length - 1];
        if (lastHeading) {
          var lastRect = lastHeading.getBoundingClientRect();
          if (lastRect.top < window.innerHeight - 100) {
            activeIdx = headings.length - 1;
          }
        }
        tocLinks.forEach(function (link, i) {
          link.classList.toggle("toc-active", i === activeIdx);
        });
      }
      window.addEventListener("scroll", updateActive);
      updateActive();
    } else {
      document.getElementById("toc").style.display = "none";
    }
  }
})();
