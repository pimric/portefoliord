// flow-stats.js — récupère les chiffres live du pipeline flow. et les affiche
// à la place des valeurs statiques, si le fetch réussit. Sinon, rien ne bouge :
// les chiffres déjà présents dans le HTML restent affichés.
(function () {
  var STATS_URL = "https://stats.databyric.fr/flow-stats.json";
  var container = document.getElementById("flow-stats");
  var dateEl = document.getElementById("flow-stats-date");
  if (!container) return;

  function formatNumber(n) {
    if (typeof n !== "number") return null;
    return n.toLocaleString("fr-FR").replace(/ /g, " ");
  }

  function formatDate(iso) {
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
    } catch (e) {
      return null;
    }
  }

  fetch(STATS_URL, { mode: "cors" })
    .then(function (res) {
      if (!res.ok) throw new Error("bad status");
      return res.json();
    })
    .then(function (data) {
      container.querySelectorAll("[data-stat]").forEach(function (el) {
        var key = el.getAttribute("data-stat");
        var formatted = formatNumber(data[key]);
        if (formatted) el.textContent = formatted;
      });
      if (dateEl && data.measured_at) {
        var d = formatDate(data.measured_at);
        if (d) dateEl.textContent = "Mesuré le " + d + ", base de production";
      }
    })
    .catch(function () {
      // Silencieux : les valeurs statiques du HTML restent affichées.
    });
})();
