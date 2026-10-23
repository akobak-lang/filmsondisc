// dvdmia.js — Client-side rendering for DVD Missing In Action pages.
// Fetches dvdmia_data.json and renders a filtered/sorted table based on
// data-* attributes on the #dvdmia-results container element.
//
// Usage: add data attributes to the container div:
//   data-decade="1950"   → filter records where Year is 1950-1959
//   data-decade="1910"   → filter records where Year is 1910-1949
//   data-sort="alpha"    → sort by MovieTitle
//   data-sort="submitter"→ sort by LastName
//   data-announced       → show records where Announced field is non-empty
//   (no attributes)      → show all records sorted by timestamp

(function () {
  'use strict';

  var DECADE_RANGES = {
    '1910': [1910, 1949],
    '1950': [1950, 1959],
    '1960': [1960, 1969],
    '1970': [1970, 1979],
    '1980': [1980, 1989],
    '1990': [1990, 9999]
  };

  function esc(s) {
    return (s == null ? '' : String(s))
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function applyFilter(records, decade, sort, announced) {
    var result = records.slice();

    if (announced) {
      result = result.filter(function (r) {
        return r.announced === true;
      });
    }

    if (decade && DECADE_RANGES[decade]) {
      var range = DECADE_RANGES[decade];
      result = result.filter(function (r) {
        var y = parseInt(r.year, 10);
        return !isNaN(y) && y >= range[0] && y <= range[1];
      });
    }

    if (sort === 'alpha') {
      result.sort(function (a, b) {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      });
    } else if (sort === 'submitter') {
      result.sort(function (a, b) {
        return a.last.toLowerCase().localeCompare(b.last.toLowerCase());
      });
    } else if (sort === 'decade') {
      result.sort(function (a, b) {
        var ay = parseInt(a.year, 10) || 0;
        var by = parseInt(b.year, 10) || 0;
        if (ay !== by) return ay - by;
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      });
    }
    // default order (timestamp+title) is already applied at export time

    return result;
  }

  function renderMasterTable(records, container) {
    var html = '<table width="100%" cellspacing="0" cellpadding="0">';
    html += '<thead><tr>';
    html += '<td width="27%"><b><font size="1" face="Arial">MovieTitle</font></b></td>';
    html += '<td width="9%"><b><font size="1" face="Arial">Year</font></b></td>';
    html += '<td width="10%"><b><font size="1" face="Arial">FirstName</font></b></td>';
    html += '<td width="12%"><b><font size="1" face="Arial">LastName</font></b></td>';
    html += '<td width="18%"><p align="center"><b><font size="1" face="Arial">CityState</font></b></p></td>';
    html += '<td width="23%"><b><font size="1" face="Arial">Timestamp</font></b></td>';
    html += '</tr></thead><tbody>';
    if (records.length === 0) {
      html += '<tr><td colspan="6" align="left" width="100%"><font face="Arial" size="1">No records returned.</font></td></tr>';
    }
    records.forEach(function (r) {
      html += '<tr>';
      html += '<td align="left" width="27%"><p align="left"><font size="1" face="Arial">' + esc(r.title) + '</font></p></td>';
      html += '<td align="center" width="9%"><font size="1" face="Arial">' + esc(r.year) + '</font></td>';
      html += '<td align="right" width="10%"><p align="right"><font size="1" face="Arial">' + esc(r.first) + '</font></p></td>';
      html += '<td align="left" width="12%"><p align="left"><font size="1" face="Arial">' + esc(r.last) + '</font></p></td>';
      html += '<td align="center" width="18%"><font size="1" face="Arial">' + esc(r.city) + '</font></td>';
      html += '<td align="left" width="23%"><p align="left"><font size="1" face="Arial">' + esc(r.ts && !r.ts.startsWith('1899') ? r.ts : '') + '</font></p></td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  function renderDecadeTable(records, container) {
    var html = '<table width="100%" cellspacing="0" cellpadding="0">';
    html += '<thead><tr>';
    html += '<td bgcolor="#FFFF00"><font face="Arial" color="#FF0000" size="2">MovieTitle</font></td>';
    html += '<td bgcolor="#FFFF00"><font face="Arial" color="#FF0000" size="2">Year</font></td>';
    html += '<td bgcolor="#FFFF00"><font face="Arial" color="#FF0000" size="2">FirstName</font></td>';
    html += '<td bgcolor="#FFFF00"><font face="Arial" color="#FF0000" size="2">LastName</font></td>';
    html += '<td bgcolor="#FFFF00"><font face="Arial" color="#FF0000" size="2">CityState</font></td>';
    html += '</tr></thead><tbody>';
    if (records.length === 0) {
      html += '<tr><td colspan="5" align="left" width="100%"><font face="Arial" size="1">No records returned.</font></td></tr>';
    }
    records.forEach(function (r) {
      html += '<tr>';
      html += '<td><font face="Arial" size="1">' + esc(r.title) + '</font></td>';
      html += '<td><font face="Arial" size="1">' + esc(r.year) + '</font></td>';
      html += '<td><font face="Arial" size="1">' + esc(r.first) + '</font></td>';
      html += '<td><font face="Arial" size="1">' + esc(r.last) + '</font></td>';
      html += '<td><font face="Arial" size="1">' + esc(r.city) + '</font></td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  function renderAlphaTable(records, container) {
    var html = '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
    html += '<thead><tr>';
    html += '<td><b>MovieTitle</b></td>';
    html += '<td><b>Year</b></td>';
    html += '<td><b>FirstName</b></td>';
    html += '<td><b>LastName</b></td>';
    html += '</tr></thead><tbody>';
    if (records.length === 0) {
      html += '<tr><td colspan="4" align="left" width="100%">No records returned.</td></tr>';
    }
    records.forEach(function (r) {
      html += '<tr>';
      html += '<td>' + esc(r.title) + '</td>';
      html += '<td>' + esc(r.year) + '</td>';
      html += '<td>' + esc(r.first) + '</td>';
      html += '<td>' + esc(r.last) + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  function renderSubmitterTable(records, container) {
    var html = '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
    html += '<thead><tr>';
    html += '<td><b><font size="1" face="Arial">LastName</font></b></td>';
    html += '<td><b><font size="1" face="Arial">FirstName</font></b></td>';
    html += '<td><b><font size="1" face="Arial">MovieTitle</font></b></td>';
    html += '<td><b><font size="1" face="Arial">Year</font></b></td>';
    html += '<td><b><font size="1" face="Arial">CityState</font></b></td>';
    html += '</tr></thead><tbody>';
    if (records.length === 0) {
      html += '<tr><td colspan="5" align="left">No records returned.</td></tr>';
    }
    records.forEach(function (r) {
      html += '<tr>';
      html += '<td><font size="1" face="Arial">' + esc(r.last) + '</font></td>';
      html += '<td><font size="1" face="Arial">' + esc(r.first) + '</font></td>';
      html += '<td><font size="1" face="Arial">' + esc(r.title) + '</font></td>';
      html += '<td><font size="1" face="Arial">' + esc(r.year) + '</font></td>';
      html += '<td><font size="1" face="Arial">' + esc(r.city) + '</font></td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  function init() {
    var container = document.getElementById('dvdmia-results');
    if (!container) return;

    var decade     = container.getAttribute('data-decade')     || '';
    var sort       = container.getAttribute('data-sort')       || '';
    var style      = container.getAttribute('data-style')      || 'decade';
    var announced  = container.hasAttribute('data-announced');

    // Fetch relative to this script's location
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'dvdmia_data.json', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        var records;
        try { records = JSON.parse(xhr.responseText); }
        catch (e) {
          container.innerHTML = '<font face="Arial" size="1" color="red">Error loading data.</font>';
          return;
        }

        var filtered = applyFilter(records, decade, sort, announced);

        if (style === 'master') {
          renderMasterTable(filtered, container);
        } else if (style === 'alpha') {
          renderAlphaTable(filtered, container);
        } else if (style === 'submitter') {
          renderSubmitterTable(filtered, container);
        } else {
          renderDecadeTable(filtered, container);
        }
      } else {
        container.innerHTML = '<font face="Arial" size="1"><i>Data not available.</i></font>';
      }
    };
    xhr.onerror = function () {
      container.innerHTML = '<font face="Arial" size="1"><i>Unable to load data.</i></font>';
    };
    xhr.send();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
