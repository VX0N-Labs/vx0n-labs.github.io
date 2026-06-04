(function () {
  var canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var animId = null;
  var running = false;
  var currentEffect = null;

  /* ── Matrix Rain ── */
  var rainChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह";
  var rainDrops = [];
  var rainFontSize = 14;
  var rainFrame = 0;

  function rainResize(cols) {
    rainDrops = [];
    for (var i = 0; i < cols; i++) {
      rainDrops[i] = Math.floor(Math.random() * -canvas.height / rainFontSize);
    }
  }

  function rainDraw() {
    rainFrame++;
    if (rainFrame % 3 !== 0) return;
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f0";
    ctx.font = rainFontSize + "px monospace";
    for (var i = 0; i < rainDrops.length; i++) {
      var c = rainChars[Math.floor(Math.random() * rainChars.length)];
      ctx.fillText(c, i * rainFontSize, rainDrops[i] * rainFontSize);
      if (rainDrops[i] * rainFontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  }

  /* ── Shared ── */

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (currentEffect === "matrix") {
      rainResize(Math.floor(canvas.width / rainFontSize));
    }
  }

  function drawLoop() {
    animId = requestAnimationFrame(drawLoop);
    if (currentEffect === "matrix") rainDraw();
  }

  function start(effect) {
    if (running && currentEffect === effect) return;
    stop();
    currentEffect = effect;
    running = true;
    resize();
    drawLoop();
  }

  function stop() {
    running = false;
    currentEffect = null;
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    try { ctx.clearRect(0, 0, canvas.width, canvas.height); } catch (e) {}
  }

  window.addEventListener("resize", resize);

  var html = document.documentElement;

  function checkTheme() {
    var theme = html.getAttribute("data-theme");
    if (theme === "matrix") {
      start(theme);
    } else {
      stop();
    }
  }

  checkTheme();

  var observer = new MutationObserver(function () {
    checkTheme();
  });
  observer.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
})();