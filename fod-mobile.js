// Marks the page's layout tables (side-by-side columns) so responsive.css can
// stack them on phones. Grids of posters, review lists etc. are left alone.
(function () {
  function px(el) {
    var w = el.getAttribute('width');
    return w && /^\d+$/.test(w) ? parseInt(w, 10) : 0;
  }
  var tables = document.getElementsByTagName('table');
  for (var i = 0; i < tables.length; i++) {
    var t = tables[i];
    var row = t.rows[0];
    if (!row || row.cells.length < 2) continue;
    var wide = 0, cells = row.cells;
    for (var j = 0; j < cells.length; j++) {
      if (px(cells[j]) >= 150 || cells[j].getAttribute('width') === '1%' || cells[j].getAttribute('width') === '50%') wide++;
    }
    var tw = t.getAttribute('width');
    var big = tw === '100%' || px(t) >= 500 || (t.textContent || '').length > 1500;
    if (wide >= 1 && big && (t.textContent || '').length > 300) {
      t.className += ' fod-cols';
      for (j = 0; j < cells.length; j++) {
        if (px(cells[j]) && px(cells[j]) <= 50 || !cells[j].textContent.trim() && !cells[j].getElementsByTagName('img').length) {
          cells[j].className += ' fod-gap';
        }
      }
    }
  }
  // Real data tables (many rows, 4+ columns) keep their columns and scroll
  // sideways inside their own box instead of widening the page.
  for (i = 0; i < tables.length; i++) {
    t = tables[i];
    if (/fod-cols/.test(t.className) || t.rows.length < 10 || !t.rows[0] || t.rows[0].cells.length < 4) continue;
    if (/fod-scroll/.test(t.parentNode.className || '')) continue;
    var box = document.createElement('div');
    box.className = 'fod-scroll';
    t.parentNode.insertBefore(box, t);
    box.appendChild(t);
  }
  // Thin empty spacer/divider cells (the grey rules between columns).
  var tds = document.getElementsByTagName('td');
  for (i = 0; i < tds.length; i++) {
    var w = px(tds[i]);
    if (w && w <= 10 && !tds[i].textContent.trim() && !tds[i].getElementsByTagName('img').length) {
      tds[i].className += ' fod-gap';
    }
  }
  // Large floated pictures squeeze text into a sliver on phones; centre them.
  var imgs = document.getElementsByTagName('img');
  for (i = 0; i < imgs.length; i++) {
    if (imgs[i].getAttribute('align') && px(imgs[i]) >= 120) imgs[i].className += ' fod-bigimg';
  }
})();
