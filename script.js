import {
  animate,
  createTimeline,
  stagger,
  utils,
  svg,
  onScroll,
} from "https://cdn.jsdelivr.net/npm/animejs@4/+esm";

import {
  prepare,
  prepareWithSegments,
  layout,
  walkLineRanges,
  measureLineStats,
  measureNaturalWidth,
} from "https://esm.sh/@chenglou/pretext@latest";

/* ------------------------------------------------------------------ */
/* 1. wind streaks                                                    */
/* ------------------------------------------------------------------ */

const wind = document.querySelector(".wind");
const WIND_LINES = 36;
const xmlns = "http://www.w3.org/2000/svg";
for (let i = 0; i < WIND_LINES; i++) {
  const y = (i / WIND_LINES) * 900 + Math.random() * 16;
  const len = 40 + Math.random() * 260;
  const line = document.createElementNS(xmlns, "line");
  // each streak lives in -len..0 in viewBox coords; we slide it via CSS transform
  line.setAttribute("x1", -len);
  line.setAttribute("x2", 0);
  line.setAttribute("y1", y);
  line.setAttribute("y2", y);
  line.setAttribute("opacity", 0.25 + Math.random() * 0.55);
  line.style.transformBox = "fill-box";
  wind.appendChild(line);
}

animate(".wind line", {
  // viewBox is 1600 wide; translate by ~2000 to clear the longest streak
  translateX: [
    { from: 0, to: 2000 },
  ],
  duration: () => 3500 + Math.random() * 5500,
  delay: stagger(120, { from: "random" }),
  ease: "linear",
  loop: true,
});

/* ------------------------------------------------------------------ */
/* 2. floating kite                                                   */
/* ------------------------------------------------------------------ */

const kite = document.querySelector(".kite");

createTimeline({ loop: true, defaults: { ease: "inOutSine" } })
  .add(kite, { translateX: "0vw",  translateY: "0vh",  rotate:  -6, duration: 4200 })
  .add(kite, { translateX: "-12vw", translateY: "4vh",  rotate:   8, duration: 5200 })
  .add(kite, { translateX: "-22vw", translateY: "-2vh", rotate: -12, duration: 4800 })
  .add(kite, { translateX: "-6vw",  translateY: "6vh",  rotate:   4, duration: 5400 })
  .add(kite, { translateX: "0vw",   translateY: "0vh",  rotate:  -6, duration: 4400 });

// gentle scale "breathing" so it never sits still
animate(kite, {
  scale: [1, 1.05, 1],
  duration: 3200,
  ease: "inOutQuad",
  loop: true,
});

/* ------------------------------------------------------------------ */
/* 3. nav + hero reveal                                               */
/* ------------------------------------------------------------------ */

animate(".nav-links a", {
  opacity: [0, 0.75],
  translateY: [-6, 0],
  delay: stagger(60, { start: 200 }),
  duration: 600,
  ease: "outCubic",
});

animate(".nav-wind", {
  opacity: [0, 1],
  translateX: [12, 0],
  duration: 700,
  delay: 600,
  ease: "outCubic",
});

/* hero title — split into characters for stagger reveal */
document.querySelectorAll(".hero-line").forEach((line) => {
  const text = line.textContent;
  line.textContent = "";
  for (const ch of text) {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? " " : ch;
    line.appendChild(span);
  }
});

animate(".hero-line .char", {
  translateY: ["110%", "0%"],
  duration: 900,
  delay: stagger(40, { start: 300 }),
  ease: "outExpo",
});

animate(".hero-sub, .hero-cta .btn", {
  opacity: [0, 1],
  translateY: [16, 0],
  delay: stagger(80, { start: 900 }),
  duration: 800,
  ease: "outCubic",
});

/* waves */
animate(".wave", {
  translateX: ["0px", "-400px"],
  duration: (el, i) => 8000 + i * 2400,
  ease: "linear",
  loop: true,
});

/* ------------------------------------------------------------------ */
/* 4. PRETEXT — shrinkwrap the hero subtitle to a balanced layout     */
/* ------------------------------------------------------------------ */
/*
 * Strategy: measure the paragraph's natural width with Pretext, then
 * binary-search for the smallest max-width that still produces the
 * same line count as the current layout. That's the "balanced" width
 * where every line is as full as it can be — no orphan word on a line.
 */

function balanceParagraph(el) {
  const cs = getComputedStyle(el);
  const fontPx = parseFloat(cs.fontSize);
  const font = `${cs.fontWeight} ${fontPx}px ${cs.fontFamily.split(",")[0].replace(/['"]/g, "")}`;
  const lineHeight = parseFloat(cs.lineHeight) || fontPx * 1.5;
  const currentWidth = el.getBoundingClientRect().width;
  const text = el.textContent.trim();

  let prep;
  try {
    prep = prepareWithSegments(text, font);
  } catch (e) {
    console.warn("pretext prepare failed", e);
    return;
  }

  const natural = measureNaturalWidth(prep);
  const { lineCount: targetLines } = measureLineStats(prep, currentWidth);

  if (targetLines <= 1) return; // nothing to balance

  // binary search smallest width that still produces targetLines
  let lo = Math.max(80, natural / targetLines);
  let hi = currentWidth;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    const { lineCount } = measureLineStats(prep, mid);
    if (lineCount <= targetLines) hi = mid;
    else lo = mid;
  }

  // hi now produces targetLines; we want the *widest line* tightness
  let widest = 0;
  walkLineRanges(prep, hi, (line) => {
    if (line.width > widest) widest = line.width;
  });

  el.style.maxWidth = `${Math.ceil(widest + 2)}px`;
  el.dataset.pretextLines = targetLines;
  el.dataset.pretextWidth = Math.ceil(widest);
}

function balanceAll() {
  document
    .querySelectorAll("[data-pretext-shrinkwrap]")
    .forEach(balanceParagraph);
}

// run after fonts load so measurements are right
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(balanceAll);
} else {
  window.addEventListener("load", balanceAll);
}
let resizeT;
window.addEventListener("resize", () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => {
    // reset and re-balance
    document
      .querySelectorAll("[data-pretext-shrinkwrap]")
      .forEach((el) => (el.style.maxWidth = ""));
    balanceAll();
  }, 120);
});

/* ------------------------------------------------------------------ */
/* 5. PRETEXT — overflow guard on palmarès event titles               */
/* ------------------------------------------------------------------ */
/*
 * Use Pretext to detect (without DOM reflow) any .event whose text
 * would wrap into 2+ lines, and shrink its font-size until it fits in 1.
 */

function fitOneLine(el) {
  const cs = getComputedStyle(el);
  const family = cs.fontFamily.split(",")[0].replace(/['"]/g, "");
  const weight = cs.fontWeight;
  const text = el.textContent.trim();
  const width = el.getBoundingClientRect().width;
  if (width === 0) return;

  let size = parseFloat(cs.fontSize);
  const minSize = 14;

  for (let i = 0; i < 8 && size > minSize; i++) {
    const prep = prepare(text, `${weight} ${size}px ${family}`);
    const { lineCount } = layout(prep, width, size * 1.2);
    if (lineCount <= 1) break;
    size = Math.max(minSize, size * 0.92);
    el.style.fontSize = `${size}px`;
  }
}

window.addEventListener("load", () => {
  document.querySelectorAll("[data-pretext-fit]").forEach(fitOneLine);
});

/* ------------------------------------------------------------------ */
/* 6. stat counters                                                   */
/* ------------------------------------------------------------------ */

document.querySelectorAll("[data-count-to]").forEach((el) => {
  const target = +el.dataset.countTo;
  const unit = el.querySelector(".stat-unit");
  const unitHTML = unit ? unit.outerHTML : "";
  const obj = { v: 0 };
  let started = false;

  const start = () => {
    if (started) return;
    started = true;
    animate(obj, {
      v: target,
      duration: 1800,
      ease: "outExpo",
      onUpdate: () => {
        el.innerHTML = Math.round(obj.v) + unitHTML;
      },
    });
  };

  new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          start();
        }
      });
    },
    { threshold: 0.4 }
  ).observe(el);
});

/* ------------------------------------------------------------------ */
/* 7. scroll-triggered reveals                                        */
/* ------------------------------------------------------------------ */

const revealGroups = [
  { sel: ".section-head", props: { opacity: [0, 1], translateY: [20, 0] } },
  { sel: ".results li",   props: { opacity: [0, 1], translateX: [-24, 0] } },
  { sel: ".trick",        props: { opacity: [0, 1], translateY: [40, 0] } },
  { sel: ".spot",         props: { opacity: [0, 1], translateY: [40, 0], scale: [0.97, 1] } },
  { sel: ".reel-player",  props: { opacity: [0, 1], scale: [0.96, 1] } },
  { sel: ".reel-episodes li", props: { opacity: [0, 1], translateX: [16, 0] } },
  { sel: ".sponsor",      props: { opacity: [0, 0.7], scale: [0.94, 1] } },
  { sel: ".book label, .book-submit", props: { opacity: [0, 1], translateY: [12, 0] } },
];

revealGroups.forEach(({ sel, props }) => {
  document.querySelectorAll(sel).forEach((el, i, list) => {
    utils.set(el, Object.fromEntries(
      Object.entries(props).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    ));
  });
});

revealGroups.forEach(({ sel, props }) => {
  const els = Array.from(document.querySelectorAll(sel));
  els.forEach((el, i) => {
    new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(el, {
            ...props,
            duration: 800,
            delay: (i % 8) * 60,
            ease: "outCubic",
          });
          obs.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    ).observe(el);
  });
});

/* ------------------------------------------------------------------ */
/* 8. tricks — draw the kite-line path                                */
/* ------------------------------------------------------------------ */

document.querySelectorAll(".trick").forEach((card) => {
  const path = card.querySelector(".trick-path");
  const rider = card.querySelector(".trick-rider");
  const kiteDot = card.querySelector(".trick-kite");
  if (!path) return;

  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  let played = false;
  const play = () => {
    if (played) return;
    played = true;
    animate(path, {
      strokeDashoffset: [length, 0],
      duration: 1600,
      ease: "inOutQuad",
    });
    animate(kiteDot, {
      scale: [0, 1.4, 1],
      duration: 1000,
      delay: 600,
      ease: "outBack",
    });
    animate(rider, {
      scale: [0, 1.4, 1],
      duration: 800,
      delay: 200,
      ease: "outBack",
    });
  };

  new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && play()),
    { threshold: 0.4 }
  ).observe(card);

  // re-draw on hover
  card.addEventListener("mouseenter", () => {
    animate(path, {
      strokeDashoffset: [length, 0],
      duration: 1200,
      ease: "inOutQuad",
    });
  });
});

/* ------------------------------------------------------------------ */
/* 9. live wind readout — fake, but charming                          */
/* ------------------------------------------------------------------ */

const readout = document.querySelector("[data-wind-readout]");
const spots = [
  ["tarifa", "NW"],
  ["cape town", "SE"],
  ["le morne", "SE"],
  ["hood river", "W"],
  ["dakhla", "NE"],
  ["klitmøller", "WNW"],
];
let ri = 0;
setInterval(() => {
  ri = (ri + 1) % spots.length;
  const [s, dir] = spots[ri];
  const kn = Math.round(18 + Math.random() * 30);
  animate(readout, {
    opacity: [1, 0, 1],
    duration: 600,
    ease: "inOutQuad",
    onUpdate: (anim) => {
      const p = anim.progress;
      if (p > 0.5 && readout.dataset.swapped !== "1") {
        readout.textContent = `${s} · ${kn} kn · ${dir}`;
        readout.dataset.swapped = "1";
      }
      if (p >= 1) readout.dataset.swapped = "0";
    },
  });
}, 3800);

/* ------------------------------------------------------------------ */
/* 10. magnetic CTA — subtle, anime.js-driven cursor follow           */
/* ------------------------------------------------------------------ */

document.querySelectorAll(".btn--solid, .reel-play").forEach((el) => {
  let target = { x: 0, y: 0 };
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    target.x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    target.y = (e.clientY - (r.top + r.height / 2)) * 0.25;
    animate(el, {
      translateX: target.x,
      translateY: target.y,
      duration: 300,
      ease: "outQuad",
    });
  });
  el.addEventListener("mouseleave", () => {
    animate(el, {
      translateX: 0,
      translateY: 0,
      duration: 500,
      ease: "outElastic(1, .6)",
    });
  });
});
