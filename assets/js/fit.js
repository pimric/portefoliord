// fit.js — les titres .fit occupent toute la largeur de la colonne.
// La taille est calculée pour que la ligne la plus longue remplisse la largeur ;
// les retours à la ligne voulus sont des <br> dans le HTML.
(function () {
  var titles = document.querySelectorAll('.fit');
  if (!titles.length) return;

  function fit() {
    titles.forEach(function (el) {
      el.style.whiteSpace = 'nowrap';
      el.style.fontSize = '100px';
      el.style.width = '';
      var avail = el.clientWidth;
      el.style.width = 'max-content';
      var natural = el.getBoundingClientRect().width;
      el.style.width = '';
      if (natural > 0 && avail > 0) {
        el.style.fontSize = (100 * avail / natural * 0.995) + 'px';
      }
    });
  }

  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(fit, 80);
  });
})();
