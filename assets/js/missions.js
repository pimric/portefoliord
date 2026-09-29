(function () {
  var EMAIL = "richard.dufaur@gmail.com";
  var groups = document.querySelectorAll(".picker-group");
  var summary = document.getElementById("picker-summary");
  var cta = document.getElementById("picker-cta");
  if (!groups.length || !summary || !cta) return;

  var state = {};

  function render() {
    var need = state.need;
    var horizon = state.horizon;
    if (!need) {
      summary.textContent = "Cliquez sur ce qui correspond à votre besoin pour préparer le message.";
      cta.href = "mailto:" + EMAIL;
      cta.textContent = "Me contacter par e-mail";
      return;
    }
    var text = "Besoin repéré : " + need + ".";
    if (horizon) text += " Horizon : " + horizon.toLowerCase() + ".";
    summary.textContent = text;

    var subject = "Mission : " + need;
    var lines = [
      "Bonjour Richard,",
      "",
      "Je vous contacte pour : " + need + ".",
    ];
    if (horizon) lines.push("Horizon : " + horizon + ".");
    lines.push("", "Contexte du projet : ");
    cta.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
    cta.textContent = "Envoyer ce message";
  }

  groups.forEach(function (group) {
    var key = group.getAttribute("data-group");
    group.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      group.querySelectorAll(".chip").forEach(function (c) {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      state[key] = btn.getAttribute("data-value");
      render();
    });
  });

  render();
})();
