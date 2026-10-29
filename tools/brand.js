// Genera icon.png, apple-icon.png y opengraph-image.jpg en src/app
const { chromium } = require('playwright');
const icon = (s, r) => `<body style="margin:0"><div style="width:${s}px;height:${s}px;border-radius:${r}px;background:#2563EB;display:grid;place-items:center;color:#fff;font:800 ${s*0.42}px Inter,sans-serif;letter-spacing:-.04em">TP</div></body>`;
const og = `<body style="margin:0"><div style="width:1200px;height:630px;box-sizing:border-box;padding:80px 90px;background:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;justify-content:space-between;border-bottom:14px solid #2563EB">
<div style="width:72px;height:72px;border-radius:16px;background:#2563EB;color:#fff;display:grid;place-items:center;font:800 30px Inter">TP</div>
<div><div style="font-size:92px;font-weight:800;letter-spacing:-.035em;color:#0B1220;line-height:1">Thiago Paniagua</div>
<div style="font-size:44px;font-weight:600;color:#2563EB;margin-top:18px">Desarrollador Full Stack</div>
<div style="font-size:28px;color:#4B5565;margin-top:22px">React · React Native · Node.js · Proyectos con demo en vivo</div></div></div></body>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const shot = async (html, w, h, path, type = 'png') => { await p.setViewportSize({ width: w, height: h }); await p.setContent(html); await p.screenshot({ path, type, omitBackground: type === 'png', ...(type === 'jpeg' ? { quality: 90 } : {}) }); };
  await shot(icon(512, 112), 512, 512, 'src/app/icon.png');
  await shot(icon(180, 0), 180, 180, 'src/app/apple-icon.png');
  await shot(og, 1200, 630, 'src/app/opengraph-image.jpg', 'jpeg');
  await b.close();
})();
