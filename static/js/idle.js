(function () {
  var overlay = document.getElementById("bsod-overlay");
  if (!overlay) return;

  var pctSpan = document.getElementById("bsod-pct");
  var fillBar = document.getElementById("bsod-fill");
  var idleTime = 0;
  var idleLimit = 300;
  var timer = null;
  var progressTimer = null;
  var pct = 0;

  function resetIdle() {
    idleTime = 0;
    if (overlay.classList.contains("open")) return;
  }

  function hideBsod() {
    overlay.classList.remove("open");
    idleTime = 0;
    pct = 0;
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
    if (fillBar) fillBar.style.width = "0%";
    if (pctSpan) pctSpan.textContent = "0% complete";
  }

  function startProgress() {
    if (progressTimer) return;
    progressTimer = setInterval(function () {
      if (pct < 42) {
        pct += Math.random() * 5 + 1;
        if (pct > 42) pct = 42;
        if (fillBar) fillBar.style.width = pct + "%";
        if (pctSpan) pctSpan.textContent = Math.floor(pct) + "% complete";
      }
    }, 200);
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      idleTime++;
      if (idleTime >= idleLimit) {
        overlay.classList.add("open");
        startProgress();
      }
    }, 1000);
  }

  var events = ["mousemove", "mousedown", "scroll", "touchstart"];
  events.forEach(function (ev) {
    document.addEventListener(ev, resetIdle);
  });

  overlay.addEventListener("click", hideBsod);
  document.addEventListener("keydown", hideBsod);

  startTimer();
})();
