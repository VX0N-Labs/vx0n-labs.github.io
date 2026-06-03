(function () {
  var originalTitle = document.title;
  var messages = [
    "Come back to Vxon Team!",
    "Don't leave us!",
    "We miss you!",
    "Still here?",
    "You forgot something!",
    "We have cookies!",
    "Your team is waiting for you.",
    "It's quiet without you.",
    "Come say hi!",
    "New writeups just dropped!",
  ];
  var intervalId = null;
  var index = 0;

  function startCycling() {
    if (intervalId) return;
    index = 0;
    document.title = messages[index];
    intervalId = setInterval(function () {
      index = (index + 1) % messages.length;
      document.title = messages[index];
    }, 5000);
  }

  function stopCycling() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    document.title = originalTitle;
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      startCycling();
    } else {
      stopCycling();
    }
  });
})();
