// tracker.js — compteur de visites maison, sans donnée personnelle.
// N'envoie que le chemin de la page et le domaine du référent (jamais l'URL
// complète). Aucune IP, aucun user-agent, aucun cookie, aucun identifiant.
// Le service qui reçoit ça (stats.databyric.fr) chiffre chaque entrée avant
// de l'écrire sur disque ; voir la fiche KpopData/flow. ou demander à Ric
// pour le détail du fonctionnement.
(function () {
  var ENDPOINT = 'https://stats.databyric.fr/collect';
  try {
    var payload = JSON.stringify({
      p: location.pathname,
      r: document.referrer || ''
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
    } else {
      fetch(ENDPOINT, { method: 'POST', body: payload, keepalive: true, headers: { 'content-type': 'application/json' } }).catch(function () {});
    }
  } catch (e) {
    // silencieux : une erreur de tracking ne doit jamais gêner la navigation
  }
})();
