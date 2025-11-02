// Meme template drawing functions in strict black & white style
// Each template exposes: { id, name, draw(ctx, w, h) }

export const memeTemplates = [
  {
    id: 'blank',
    name: 'Blank Classic',
    draw: (ctx, w, h) => {
      // background white
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      // border
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(4, Math.floor(w * 0.006));
      ctx.strokeRect(0, 0, w, h);
    }
  },
  {
    id: 'two-buttons',
    name: 'Two Buttons',
    draw: (ctx, w, h) => {
      // background white
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      // header bar
      ctx.fillStyle = '#F3F3F3';
      ctx.fillRect(0, 0, w, h * 0.18);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(3, Math.floor(w * 0.004));
      ctx.strokeRect(0, 0, w, h);
      // two rounded buttons
      const pad = w * 0.08;
      const btnW = (w - pad * 3) / 2;
      const btnH = h * 0.22;
      const y = h * 0.35;

      const drawRounded = (x, y, rw, rh, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + rw - r, y);
        ctx.quadraticCurveTo(x + rw, y, x + rw, y + r);
        ctx.lineTo(x + rw, y + rh - r);
        ctx.quadraticCurveTo(x + rw, y + rh, x + rw - r, y + rh);
        ctx.lineTo(x + r, y + rh);
        ctx.quadraticCurveTo(x, y + rh, x, y + rh - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
      };

      // Left button
      ctx.fillStyle = '#FFFFFF';
      drawRounded(pad, y, btnW, btnH, Math.min(btnW, btnH) * 0.2);
      ctx.fill();
      ctx.stroke();

      // Right button
      ctx.fillStyle = '#FFFFFF';
      drawRounded(pad * 2 + btnW, y, btnW, btnH, Math.min(btnW, btnH) * 0.2);
      ctx.fill();
      ctx.stroke();

      // subtle divider line
      ctx.beginPath();
      ctx.moveTo(pad + btnW + pad / 2, y - pad * 0.4);
      ctx.lineTo(pad + btnW + pad / 2, y + btnH + pad * 0.4);
      ctx.lineWidth = Math.max(1, Math.floor(w * 0.002));
      ctx.stroke();
    }
  },
  {
    id: 'galaxy-brain',
    name: 'Galaxy Brain',
    draw: (ctx, w, h) => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(4, Math.floor(w * 0.006));
      ctx.strokeRect(0, 0, w, h);
      // four horizontal panels
      const panelH = (h - 5) / 4;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, panelH * i);
        ctx.lineTo(w, panelH * i);
        ctx.lineWidth = Math.max(2, Math.floor(w * 0.003));
        ctx.stroke();
      }
      // add simple geometric "brain" progression markers (circles increasing)
      const cx = w * 0.85;
      const radii = [w*0.02, w*0.035, w*0.05, w*0.07];
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, panelH * (i + 0.5), radii[i], 0, Math.PI * 2);
        ctx.lineWidth = Math.max(2, Math.floor(w * 0.003));
        ctx.stroke();
      }
    }
  },
  {
    id: 'wojak-minimal',
    name: 'Wojak (Minimal)',
    draw: (ctx, w, h) => {
      // Minimal face line-art over white
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(3, Math.floor(w * 0.004));
      ctx.strokeRect(0, 0, w, h);

      // Head outline (simplified)
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(2, Math.floor(w * 0.003));
      ctx.beginPath();
      const cx = w * 0.35;
      const cy = h * 0.55;
      const rx = w * 0.22;
      const ry = h * 0.28;
      // approximate ellipse
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Eyes
      const eyeY = cy - ry * 0.1;
      const eyeR = w * 0.02;
      ctx.beginPath(); ctx.arc(cx - rx * 0.4, eyeY, eyeR, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + rx * 0.4, eyeY, eyeR, 0, Math.PI * 2); ctx.stroke();

      // Mouth
      ctx.beginPath();
      ctx.moveTo(cx - rx * 0.4, cy + ry * 0.25);
      ctx.quadraticCurveTo(cx, cy + ry * 0.35, cx + rx * 0.4, cy + ry * 0.25);
      ctx.stroke();

      // Shoulder line
      ctx.beginPath();
      ctx.moveTo(cx - rx * 0.9, cy + ry * 0.9);
      ctx.lineTo(cx + rx * 1.1, cy + ry * 0.9);
      ctx.stroke();
    }
  }
];

export function drawMeme(ctx, w, h, template, topText, bottomText) {
  // 1) Draw template background
  template.draw(ctx, w, h);

  // 2) Draw top and bottom text in classic meme style
  const maxWidth = w * 0.92;
  const baseFontSize = Math.floor(w * 0.07);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.lineJoin = 'round';

  const drawTextBlock = (text, y, align) => {
    const lines = wrapText(ctx, text.toUpperCase(), maxWidth, `${baseFontSize}px Inter, Helvetica, Arial, sans-serif`);
    const totalHeight = lines.length * (baseFontSize + 10);
    let offsetY = y;
    if (align === 'bottom') {
      offsetY = y - totalHeight;
    }
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      ctx.font = `bold ${baseFontSize}px Inter, Helvetica, Arial, sans-serif`;
      // stroke for contrast
      ctx.lineWidth = Math.max(6, Math.floor(w * 0.01));
      ctx.strokeStyle = '#000000';
      ctx.strokeText(line, w / 2, offsetY + i * (baseFontSize + 10));
      // fill
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(line, w / 2, offsetY + i * (baseFontSize + 10));
    }
  };

  if (topText) drawTextBlock(topText, 16, 'top');
  if (bottomText) drawTextBlock(bottomText, h - 16, 'bottom');

  // 3) Watermark: semi-transparent white "NOTH" bottom-right
  const wm = 'NOTH';
  ctx.font = `700 ${Math.floor(w * 0.035)}px Inter, Helvetica, Arial, sans-serif`;
  const metrics = ctx.measureText(wm);
  const wmPadding = Math.floor(w * 0.02);
  const wmX = w - metrics.width - wmPadding;
  const wmY = h - Math.floor(w * 0.02) - Math.floor(w * 0.01);
  ctx.globalAlpha = 0.6; // semi-transparent
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(wm, wmX, wmY);
  ctx.globalAlpha = 1;
}

function wrapText(ctx, text, maxWidth, font) {
  ctx.font = `bold ${font}`;
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line ? line + ' ' + words[n] : words[n];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      lines.push(line);
      line = words[n];
    } else {
      line = testLine;
    }
  }
  if (line) lines.push(line);
  return lines;
}
