export function setMinecraftColors(element, text) {
  text = text.normalize('NFKC');
  const colors = {
      '0': '#000000', '1': '#0000AA',
      '2': '#00AA00', '3': '#00AAAA',
      '4': '#AA0000', '5': '#AA00AA',
      '6': '#FFAA00', '7': '#AAAAAA',
      '8': '#555555', '9': '#5555FF',
      'a': '#55FF55', 'b': '#55FFFF',
      'c': '#FF5555', 'd': '#FF55FF',
      'e': '#FFFF55', 'f': '#FFFFFF'
  };

  element.replaceChildren();
  let currentColor = '#55FF55';
  let bold = false;
//This section detects color codes [0-9a-f] are the color code colors-->
  text.split(/(¤[0-9a-fk-or])/gi).forEach(part => {
      if (/^¤[0-9a-fk-or]$/i.test(part)) {
          const code = part[1].toLowerCase();
          if (colors[code]) {
            currentColor = colors[code];
            bold = false;
          } else if (code === 'l') {
            bold = true;
          } else if (code === 'r') {
            currentColor = '#FFFFFF';
            bold = false;
            }
          } else if (part) {
      // Use span to set the color of an element.
        const span = document.createElement('span');
        span.style.color = currentColor || '#55FF55';
        span.style.fontWeight = bold ? 'bold' : 'normal';
        span.textContent = part;
        element.appendChild(span);
      }
  });
}
