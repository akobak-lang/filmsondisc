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
  // Wide screens: the layouts give every column a pixel width, so browsers
  // stretch all of them, dividers included, and the main column drifts off
  // centre. Let only the widest column stretch; the rest keep their size.
  var cols = document.getElementsByTagName('table');
  for (i = 0; i < cols.length; i++) {
    if (!/fod-cols/.test(cols[i].className)) continue;
    if (cols[i].getAttribute('width') !== '100%' && px(cols[i]) < 500) continue;
    // Only when one column is clearly the main one: much wider than the
    // rest, and no %-width cells (a 100% spacer would take all the room in
    // fixed layout). Photo grids, with equal columns, don't qualify.
    var best = null, bw = 0, second = 0, pct = false, cs = cols[i].rows[0].cells;
    for (j = 0; j < cs.length; j++) {
      var cw = px(cs[j]);
      if (/%/.test(cs[j].getAttribute('width') || '')) pct = true;
      if (cw > bw) { second = bw; bw = cw; best = cs[j]; } else if (cw > second) second = cw;
    }
    if (best && !pct && bw >= 150 && bw >= second * 1.5 && best.textContent.length > 100) {
      best.removeAttribute('width');
      cols[i].className += ' fod-flex';
    }
  }
  // A fixed column whose picture or text is wider than its width attribute
  // used to get pushed wider by the browser; do that explicitly now.
  function fitFixed() {
    for (var k = 0; k < cols.length; k++) {
      if (!/fod-flex/.test(cols[k].className)) continue;
      var cc = cols[k].rows[0].cells;
      for (var m = 0; m < cc.length; m++) {
        if (px(cc[m]) && cc[m].scrollWidth > cc[m].clientWidth + 1) cc[m].setAttribute('width', cc[m].scrollWidth);
      }
    }
  }
  fitFixed();
  window.addEventListener('load', fitFixed);
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
