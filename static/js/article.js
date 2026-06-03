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
})();
