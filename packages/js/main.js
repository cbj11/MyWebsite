/* Theme handling: apply saved choice immediately (avoids a flash), then wire up the toggle. */
(function () {
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (e) {}

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("theme");
    var media = matchMedia("(prefers-color-scheme:dark)");
    if (!button) return;

    function current() {
      return root.dataset.theme || (media.matches ? "dark" : "light");
    }
    function render() {
      var dark = current() === "dark";
      button.textContent = dark ? "Light theme" : "Dark theme";
      button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    }

    button.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      render();
    });
    render();
  });
})();
