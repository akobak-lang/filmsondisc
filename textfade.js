// textfade.js — Drop-in JavaScript replacement for TextFade.class Java applet
// Faithfully reproduces the original algorithm from TextFade.java / TextLink.java
// by Alec Cove. Reads identical <param> names from the <applet> element and
// replaces it with a <canvas> of the same dimensions.

(function () {
  'use strict';

  var SLEEP_MS = 80; // matches Java SLEEPTIME = 80

  function getParam(applet, name) {
    var params = applet.getElementsByTagName('param');
    for (var i = 0; i < params.length; i++) {
      if (params[i].getAttribute('name').toLowerCase() === name.toLowerCase()) {
        return params[i].getAttribute('value');
      }
    }
    return null;
  }

  function hexToRgb(hex) {
    if (!hex) return { r: 0, g: 0, b: 0 };
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    return {
      r: parseInt(hex.substring(0, 2), 16) || 0,
      g: parseInt(hex.substring(2, 4), 16) || 0,
      b: parseInt(hex.substring(4, 6), 16) || 0
    };
  }

  function cloneRgb(c) { return { r: c.r, g: c.g, b: c.b }; }

  // Faithful port of TextLink.fadeTo(Color fc, int fadeSpeed)
  // Returns true when all channels have reached the target color
  function fadeTo(current, target, speed) {
    var rDone, gDone, bDone;

    if (!(current.r >= target.r - speed && current.r <= target.r + speed)) {
      current.r = current.r < target.r ? current.r + speed : current.r - speed;
      rDone = false;
    } else { rDone = true; }

    if (!(current.g >= target.g - speed && current.g <= target.g + speed)) {
      current.g = current.g < target.g ? current.g + speed : current.g - speed;
      gDone = false;
    } else { gDone = true; }

    if (!(current.b >= target.b - speed && current.b <= target.b + speed)) {
      current.b = current.b < target.b ? current.b + speed : current.b - speed;
      bDone = false;
    } else { bDone = true; }

    if (rDone && gDone && bDone) {
      // Java snaps all channels to exact target on completion
      current.r = target.r;
      current.g = target.g;
      current.b = target.b;
      return true;
    }
    return false;
  }

  function clamp(v) { return Math.max(0, Math.min(255, Math.round(v))); }

  function rgbStr(c) {
    return 'rgb(' + clamp(c.r) + ',' + clamp(c.g) + ',' + clamp(c.b) + ')';
  }

  // Faithful port of TextLink.wrapString() which uses Java StringTokenizer semantics
  // Java measures: fm.stringWidth(tempString) + fm.stringWidth(nextWord) >= blockWidth
  // Note: tempString has a trailing space appended in Case 4, so word spacing is included.
  function wrapString(ctx, str, blockWidth) {
    var tokens = str.trim().split(/\s+/).filter(function (s) { return s.length > 0; });
    if (!tokens.length) return [''];

    var lines = [];
    var tempString = '';
    var nextWord = '';
    var eol = false;       // corresponds to Java's EOL boolean
    var tokenIdx = 0;      // simulates StringTokenizer position

    // Java: while (t.hasMoreTokens())
    while (eol || tokenIdx < tokens.length) {
      // Java: if (!EOL) nextWord = t.nextToken();
      if (!eol) {
        nextWord = tokens[tokenIdx++];
      }

      // Java: t.countTokens() — tokens remaining after last nextToken() call
      var remaining = tokens.length - tokenIdx;

      var tempW = ctx.measureText(tempString).width;
      var wordW = ctx.measureText(nextWord).width;

      // Case 1: doesn't fit + last token
      if (tempW + wordW >= blockWidth && remaining === 0) {
        lines.push(tempString);
        lines.push(nextWord);
        return lines;
      }
      // Case 2: doesn't fit, more tokens remain → set EOL, save line, reset
      else if (tempW + wordW >= blockWidth) {
        eol = true;
        lines.push(tempString);
        tempString = '';
      }
      // Case 3: fits + last token
      else if (remaining === 0) {
        lines.push(tempString + nextWord);
        return lines;
      }
      // Case 4: fits, not last → append word+space, clear EOL
      else {
        eol = false;
        tempString += nextWord + ' ';
      }
    }

    return lines;
  }

  function buildCssFont(fontFace, fontStyle, fontSize) {
    // Map Java logical font names to CSS equivalents
    var face = fontFace || 'Arial';
    var lower = face.toLowerCase();
    if (lower === 'sansserif' || lower === 'dialog' || lower === 'dialoginput') {
      face = 'Arial,sans-serif';
    } else if (lower === 'serif') {
      face = '"Times New Roman",serif';
    } else if (lower === 'monospaced') {
      face = '"Courier New",monospace';
    }
    // Map Java font styles (Plain, Bold, Italic, BoldItalic) to CSS
    var style = (fontStyle || 'plain').toLowerCase();
    var cssWeight = style.indexOf('bold')   !== -1 ? 'bold'   : 'normal';
    var cssStyle  = style.indexOf('italic') !== -1 ? 'italic' : 'normal';
    return cssStyle + ' ' + cssWeight + ' ' + fontSize + 'px ' + face;
  }

  function initApplet(applet) {
    // Read parameters — same names as Java getParameter() calls
    var linkDelay  = parseInt(getParam(applet, 'linkdelay')      || '4');
    var fadeSpeed  = parseInt(getParam(applet, 'fadespeed')      || '35');
    var fontFace   = getParam(applet, 'fontface')  || 'Arial';
    var fontStyle  = getParam(applet, 'fontstyle') || 'Plain';
    var fontSize   = parseInt(getParam(applet, 'fontsize')       || '10');
    var xStart     = parseInt(getParam(applet, 'xstart')         || '7');
    var yStart     = parseInt(getParam(applet, 'ystart')         || '10');
    var blockWidth = parseInt(getParam(applet, 'textblockwidth') || '175');
    var leading    = parseInt(getParam(applet, 'leading')        || '12');

    var textColor = hexToRgb(getParam(applet, 'textcolor') || 'ff0000');
    var rollColor = hexToRgb(getParam(applet, 'rollcolor') || '006699');
    var backColor = hexToRgb(getParam(applet, 'backcolor') || 'ffffff');

    // Collect string_N, url_N, target_N params
    var strings = [], urls = [], targets = [];
    for (var n = 1; ; n++) {
      var s = getParam(applet, 'string_' + n);
      if (!s) break;
      strings.push(s);
      urls.push(getParam(applet, 'url_' + n) || null);
      targets.push(getParam(applet, 'target_' + n) || '_parent');
    }
    if (!strings.length) return;

    var w = parseInt(applet.getAttribute('width')  || '175');
    var h = parseInt(applet.getAttribute('height') || '120');

    var canvas = document.createElement('canvas');
    canvas.width  = w;
    canvas.height = h;
    canvas.style.display = 'inline-block';
    canvas.style.cursor  = 'default';

    applet.parentNode.replaceChild(canvas, applet);

    var ctx = canvas.getContext('2d');
    ctx.font = buildCssFont(fontFace, fontStyle, fontSize);

    // Pre-compute word-wrapped lines for each string
    var wrappedLines = strings.map(function (s) {
      return wrapString(ctx, s, blockWidth);
    });

    // Each link starts at backColor (invisible) — matches Java buildTextLinks():
    //   textlinkArray[i].setTextColor(backColor)
    var linkColors = strings.map(function () { return cloneRgb(backColor); });

    var currentLink = 0;
    var highlighted = false;
    // Java: tSeconds = new Date().getTime() in start()
    var tSeconds = Date.now();

    function draw() {
      ctx.fillStyle = rgbStr(backColor);
      ctx.fillRect(0, 0, w, h);

      // When highlighted, draw in rollColor; otherwise use the fading linkColor
      ctx.fillStyle = highlighted ? rgbStr(rollColor) : rgbStr(linkColors[currentLink]);
      ctx.font = buildCssFont(fontFace, fontStyle, fontSize);

      var lines = wrappedLines[currentLink];
      for (var i = 0; i < lines.length; i++) {
        // Java: drawString(str, blockStart.x, blockStart.y + leading * i)
        ctx.fillText(lines[i], xStart, yStart + leading * i);
      }
    }

    // Faithful port of TextFade.cycleLinks(int delaySeconds)
    function cycleLinks() {
      var t = Date.now();
      if (t - tSeconds > linkDelay * 1000) {
        // Past hold period → fade out to backColor
        if (fadeTo(linkColors[currentLink], backColor, fadeSpeed)) {
          // Fully faded out → advance to next link, reset timer
          currentLink = (currentLink >= strings.length - 1) ? 0 : currentLink + 1;
          tSeconds = t;
        }
      } else {
        // Within hold period → fade in to textColor
        fadeTo(linkColors[currentLink], textColor, fadeSpeed);
      }
    }

    function tick() {
      // Java: if ( !(textlinkArray[currentLink].getHighlight()) ) cycleLinks(linkDelay)
      if (!highlighted) {
        cycleLinks();
      }
      draw();
      setTimeout(tick, SLEEP_MS);
    }

    // Mouse events
    canvas.addEventListener('mousemove', function (e) {
      highlighted = true;
      canvas.style.cursor = urls[currentLink] ? 'pointer' : 'default';
    });

    canvas.addEventListener('mouseleave', function () {
      highlighted = false;
      canvas.style.cursor = 'default';
    });

    canvas.addEventListener('click', function () {
      var url = urls[currentLink];
      if (url) {
        var target = targets[currentLink] || '_parent';
        if (target === '_blank') {
          window.open(url);
        } else if (target === '_top') {
          window.top.location.href = url;
        } else {
          window.location.href = url;
        }
      }
    });

    tick();
  }

  function init() {
    var applets = document.getElementsByTagName('applet');
    var list = [];
    for (var i = 0; i < applets.length; i++) {
      var code = (applets[i].getAttribute('code') || '').toLowerCase();
      if (code === 'TextFade.class') {
        list.push(applets[i]);
      }
    }
    list.forEach(initApplet);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
