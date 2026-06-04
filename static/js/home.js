document.getElementById("surprise-btn").addEventListener("click", async function () {
  try {
    var res = await fetch("/index.json");
    var articles = await res.json();
    if (!articles.length) return;
    var pick = articles[Math.floor(Math.random() * articles.length)];
    window.location.href = pick.redirect || pick.url;
  } catch (e) {
    console.error("Surprise me failed:", e);
  }
});

(function () {
  var el = document.getElementById("logo");
  if (!el) return;

  if (localStorage.getItem("logo-anim-played")) {
    el.textContent = "VXON";
    return;
  }

  var chars = "0123456789";
  var start = Date.now();
  var ticks = [3, 7, 1, 9];

  function scrollChar(i) {
    ticks[i] = (ticks[i] + 1) % chars.length;
    return chars[ticks[i]];
  }

  function animate() {
    var elapsed = Date.now() - start;
    if (elapsed < 1200) {
      var r = "";
      for (var i = 0; i < 4; i++) r += scrollChar(i);
      el.textContent = r;
      requestAnimationFrame(animate);
    } else {
      el.textContent = "1337";
      setTimeout(function () { el.textContent = "VXON"; }, 400);
      localStorage.setItem("logo-anim-played", "1");
    }
  }

  animate();
})();
