const S = window.SAMPLES;
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c;
  if (h !== undefined) e.innerHTML = h; return e; };
const audio = src => { const a = el("audio"); a.controls = true; a.preload = "none"; a.src = src; return a; };
const pair = r => `<span class="pair"><b>${r.source}</b><span class="arrow">&rarr;</span><b>${r.target}</b>`
  + `<br><span class="g">${r.gender} voice</span></span>`;

function build(tbodyId, rows, keys) {
  const tb = document.getElementById(tbodyId);
  rows.forEach(r => {
    const tr = el("tr");
    tr.appendChild(el("td", null, pair(r)));
    tr.appendChild(el("td", "txt", r.text));
    keys.forEach(k => {
      const td = el("td", k.ours ? "ours" : null);
      td.appendChild(audio(`audio/${r.id}_${k.file}.wav`));
      tr.appendChild(td);
    });
    tb.appendChild(tr);
  });
}

build("compare-body", S.compare, [
  { file: "prompt" }, { file: "accent_ref" }, { file: "f5tts" }, { file: "cascade" },
  { file: "accentbridge", ours: true },
]);

const wkeys = S.ladder_weights.map((w, i) => ({ file: `w${w}`, ours: i === S.ladder_weights.length - 1 }));
document.getElementById("ladder-head").innerHTML =
  '<th>Accent</th><th>Text</th><th>Voice prompt</th>'
  + S.ladder_weights.map((w, i) => `<th class="${i === S.ladder_weights.length - 1 ? "ours" : ""}">w = ${w}</th>`).join("");
build("ladder-body", S.ladder, [{ file: "prompt" }].concat(wkeys));

document.querySelectorAll("audio").forEach(a =>
  a.addEventListener("play", () => document.querySelectorAll("audio").forEach(o => { if (o !== a) o.pause(); })));
