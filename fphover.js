// fphover.js — Drop-in JavaScript replacement for FrontPage fphover.class applet
// Replaces <applet code="fphover.class"> and <applet code="fphoverx.class"> with
// styled HTML anchor elements that preserve the same visual behavior.

(function () {
  'use strict';

  function getParam(applet, name) {
    var params = applet.getElementsByTagName('param');
    for (var i = 0; i < params.length; i++) {
      if (params[i].getAttribute('name').toLowerCase() === name.toLowerCase()) {
        return params[i].getAttribute('value');
      }
    }
    return null;
  }

  function initFpHover(applet) {
    var text       = getParam(applet, 'text')       || '';
    var color      = getParam(applet, 'color')      || '#000080';
    var hoverColor = getParam(applet, 'hovercolor') || '#0000FF';
    var textColor  = getParam(applet, 'textcolor')  || '#FFFFFF';
    var url        = getParam(applet, 'url')        || null;
    var target     = getParam(applet, 'target')     || '_self';
    var fontName   = getParam(applet, 'font')       || 'Arial';
    var fontStyle  = (getParam(applet, 'fontstyle') || 'regular').toLowerCase();
    var fontSize   = parseInt(getParam(applet, 'fontsize') || '14');
    var image      = getParam(applet, 'image')      || null;
    var hoverImage = getParam(applet, 'hoverimage') || null;

    var w = parseInt(applet.getAttribute('width')  || '120');
    var h = parseInt(applet.getAttribute('height') || '24');

    var el;

    if (url) {
      el = document.createElement('a');
      el.href = url;
      el.target = target;
    } else {
      el = document.createElement('span');
    }

    if (image) {
      // Image mode: render image, swap src on hover if hoverImage given
      var img = document.createElement('img');
      img.src    = image;
      img.width  = w;
      img.height = h;
      img.style.border  = '0';
      img.style.display = 'block';
      if (hoverImage) {
        el.addEventListener('mouseover', function () { img.src = hoverImage; });
        el.addEventListener('mouseout',  function () { img.src = image; });
      }
      el.appendChild(img);
      el.style.display = 'inline-block';
    } else {
      // Text button mode
      var fontWeight  = fontStyle.indexOf('bold')   !== -1 ? 'bold'   : 'normal';
      var fontItalic  = fontStyle.indexOf('italic') !== -1 ? 'italic' : 'normal';

      el.textContent = text;
      el.style.cssText = [
        'display:inline-block',
        'width:' + w + 'px',
        'height:' + h + 'px',
        'line-height:' + h + 'px',
        'text-align:center',
        'background-color:' + color,
        'color:' + textColor,
        'font-family:' + fontName + ',Arial,sans-serif',
        'font-size:' + fontSize + 'px',
        'font-weight:' + fontWeight,
        'font-style:' + fontItalic,
        'text-decoration:none',
        'border:1px solid ' + hoverColor,
        'box-sizing:border-box',
        'cursor:' + (url ? 'pointer' : 'default'),
        'overflow:hidden',
        'vertical-align:middle'
      ].join(';');

      el.addEventListener('mouseover', function () {
        el.style.backgroundColor = hoverColor;
      });
      el.addEventListener('mouseout', function () {
        el.style.backgroundColor = color;
      });
    }

    applet.parentNode.replaceChild(el, applet);
  }

  function init() {
    var applets = document.getElementsByTagName('applet');
    var list = [];
    for (var i = 0; i < applets.length; i++) {
      var code = (applets[i].getAttribute('code') || '').toLowerCase();
      if (code === 'fphover.class' || code === 'fphoverx.class') {
        list.push(applets[i]);
      }
    }
    list.forEach(initFpHover);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
