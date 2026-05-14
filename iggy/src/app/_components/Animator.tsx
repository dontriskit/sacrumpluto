"use client";

import { animate, createTimeline, stagger, utils } from "animejs";
import {
	layout,
	measureLineStats,
	measureNaturalWidth,
	prepare,
	prepareWithSegments,
	walkLineRanges,
} from "@chenglou/pretext";
import { useEffect } from "react";

export function Animator() {
	useEffect(() => {
		const cleanups: Array<() => void> = [];

		/* ----------------------- wind streaks ----------------------- */
		const wind = document.querySelector<SVGSVGElement>(".wind");
		if (wind) {
			const xmlns = "http://www.w3.org/2000/svg";
			const lineEls: SVGLineElement[] = [];
			const N = 36;
			for (let i = 0; i < N; i++) {
				const y = (i / N) * 900 + Math.random() * 16;
				const len = 40 + Math.random() * 260;
				const line = document.createElementNS(xmlns, "line");
				line.setAttribute("x1", String(-len));
				line.setAttribute("x2", "0");
				line.setAttribute("y1", String(y));
				line.setAttribute("y2", String(y));
				line.setAttribute("opacity", String(0.25 + Math.random() * 0.55));
				wind.appendChild(line);
				lineEls.push(line);
			}
			animate(lineEls, {
				translateX: [{ from: 0, to: 2000 }],
				duration: () => 3500 + Math.random() * 5500,
				delay: stagger(120, { from: "random" }),
				ease: "linear",
				loop: true,
			});
			cleanups.push(() => lineEls.forEach((l) => l.remove()));
		}

		/* ----------------------- floating kite ----------------------- */
		const kite = document.querySelector<SVGSVGElement>(".kite");
		if (kite) {
			createTimeline({ loop: true, defaults: { ease: "inOutSine" } })
				.add(kite, { translateX: "0vw", translateY: "0vh", rotate: -6, duration: 4200 })
				.add(kite, { translateX: "-12vw", translateY: "4vh", rotate: 8, duration: 5200 })
				.add(kite, { translateX: "-22vw", translateY: "-2vh", rotate: -12, duration: 4800 })
				.add(kite, { translateX: "-6vw", translateY: "6vh", rotate: 4, duration: 5400 })
				.add(kite, { translateX: "0vw", translateY: "0vh", rotate: -6, duration: 4400 });

			animate(kite, {
				scale: [1, 1.05, 1],
				duration: 3200,
				ease: "inOutQuad",
				loop: true,
			});
		}

		/* ----------------------- nav reveal ----------------------- */
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

		/* ----------------------- hero title char split ----------------------- */
		document.querySelectorAll<HTMLElement>(".hero-line").forEach((line) => {
			if (line.dataset.split === "1") return;
			line.dataset.split = "1";
			const text = line.textContent ?? "";
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
			delay: stagger(35, { start: 300 }),
			ease: "outExpo",
		});

		animate(".hero-sub, .hero-cta .btn", {
			opacity: [0, 1],
			translateY: [16, 0],
			delay: stagger(80, { start: 900 }),
			duration: 800,
			ease: "outCubic",
		});

		animate(".wave", {
			translateX: ["0px", "-400px"],
			duration: (_el: Element, i: number) => 8000 + i * 2400,
			ease: "linear",
			loop: true,
		});

		/* ----------------------- PRETEXT: balance hero subtitle ----------------------- */
		function balanceParagraph(el: HTMLElement) {
			const cs = getComputedStyle(el);
			const fontPx = parseFloat(cs.fontSize);
			const family = cs.fontFamily.split(",")[0]?.replace(/['"]/g, "") || "Inter";
			const font = `${cs.fontWeight} ${fontPx}px ${family}`;
			const currentWidth = el.getBoundingClientRect().width;
			const text = (el.textContent ?? "").trim();
			if (!text || currentWidth < 100) return;

			let prep;
			try {
				prep = prepareWithSegments(text, font);
			} catch {
				return;
			}

			const natural = measureNaturalWidth(prep);
			const { lineCount: targetLines } = measureLineStats(prep, currentWidth);
			if (targetLines <= 1) return;

			let lo = Math.max(80, natural / targetLines);
			let hi = currentWidth;
			for (let i = 0; i < 18; i++) {
				const mid = (lo + hi) / 2;
				const { lineCount } = measureLineStats(prep, mid);
				if (lineCount <= targetLines) hi = mid;
				else lo = mid;
			}

			let widest = 0;
			walkLineRanges(prep, hi, (line) => {
				if (line.width > widest) widest = line.width;
			});
			el.style.maxWidth = `${Math.ceil(widest + 2)}px`;
		}

		function balanceAll() {
			document
				.querySelectorAll<HTMLElement>("[data-pretext-shrinkwrap]")
				.forEach(balanceParagraph);
		}

		if (document.fonts?.ready) {
			document.fonts.ready.then(balanceAll);
		} else {
			balanceAll();
		}

		let resizeT: number | undefined;
		const onResize = () => {
			if (resizeT) window.clearTimeout(resizeT);
			resizeT = window.setTimeout(() => {
				document
					.querySelectorAll<HTMLElement>("[data-pretext-shrinkwrap]")
					.forEach((el) => {
						el.style.maxWidth = "";
					});
				balanceAll();
			}, 120);
		};
		window.addEventListener("resize", onResize);
		cleanups.push(() => window.removeEventListener("resize", onResize));

		/* ----------------------- PRETEXT: one-line fit for palmarès ----------------------- */
		function fitOneLine(el: HTMLElement) {
			const cs = getComputedStyle(el);
			const family = cs.fontFamily.split(",")[0]?.replace(/['"]/g, "") || "Inter";
			const weight = cs.fontWeight;
			const text = (el.textContent ?? "").trim();
			const width = el.getBoundingClientRect().width;
			if (!text || width === 0) return;
			let size = parseFloat(cs.fontSize);
			const minSize = 14;
			for (let i = 0; i < 8 && size > minSize; i++) {
				try {
					const prep = prepare(text, `${weight} ${size}px ${family}`);
					const { lineCount } = layout(prep, width, size * 1.2);
					if (lineCount <= 1) break;
				} catch {
					return;
				}
				size = Math.max(minSize, size * 0.92);
				el.style.fontSize = `${size}px`;
			}
		}
		document.querySelectorAll<HTMLElement>("[data-pretext-fit]").forEach(fitOneLine);

		/* ----------------------- stat counters ----------------------- */
		document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
			const target = Number(el.dataset.countTo);
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
			const io = new IntersectionObserver(
				(entries) => entries.forEach((e) => e.isIntersecting && start()),
				{ threshold: 0.4 },
			);
			io.observe(el);
			cleanups.push(() => io.disconnect());
		});

		/* ----------------------- reveals ----------------------- */
		const revealGroups: Array<{ sel: string; props: Record<string, [number, number]> }> = [
			{ sel: ".section-head", props: { opacity: [0, 1], translateY: [20, 0] } },
			{ sel: ".about-body p", props: { opacity: [0, 1], translateY: [20, 0] } },
			{ sel: ".about-facts", props: { opacity: [0, 1], translateX: [24, 0] } },
			{ sel: ".chalupy-photo", props: { opacity: [0, 1], translateY: [30, 0] } },
			{ sel: ".chalupy-meta, .malayka", props: { opacity: [0, 1], translateY: [30, 0] } },
			{ sel: ".malayka-courses li", props: { opacity: [0, 1], translateX: [-16, 0] } },
			// .droga li handled separately by the bespoke track-log animator
			{ sel: ".trick", props: { opacity: [0, 1], translateY: [40, 0] } },
			{ sel: ".trick-list li", props: { opacity: [0, 1], translateX: [-16, 0] } },
			{ sel: ".safari", props: { opacity: [0, 1], translateY: [40, 0] } },
			{ sel: ".g-tile", props: { opacity: [0, 1], scale: [0.96, 1] } },
			{ sel: ".sponsor", props: { opacity: [0, 0.7] } },
			{ sel: ".book label, .book-submit", props: { opacity: [0, 1], translateY: [12, 0] } },
		];

		revealGroups.forEach(({ sel, props }) => {
			document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
				const init: Record<string, number> = {};
				Object.entries(props).forEach(([k, v]) => {
					init[k] = v[0];
				});
				utils.set(el, init);
			});
		});

		const observers: IntersectionObserver[] = [];
		revealGroups.forEach(({ sel, props }) => {
			const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
			els.forEach((el, i) => {
				const io = new IntersectionObserver(
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
					{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
				);
				io.observe(el);
				observers.push(io);
			});
		});
		cleanups.push(() => observers.forEach((o) => o.disconnect()));

		/* ----------------------- droga (track log) entrance ----------------------- */
		document.querySelectorAll<HTMLElement>(".droga li").forEach((row) => {
			const yearEl = row.querySelector<HTMLElement>(".d-year");
			const tickLine = row.querySelector<SVGLineElement>(".d-tick line");
			const titleEl = row.querySelector<HTMLElement>(".d-title");
			const noteEl = row.querySelector<HTMLElement>(".d-note");
			if (!yearEl || !tickLine || !titleEl || !noteEl) return;

			const targetYear = Number(yearEl.dataset.yearTo ?? yearEl.textContent);
			const startYear = targetYear - 4;
			yearEl.textContent = String(startYear);
			yearEl.style.opacity = "0";

			// split title into characters once (so Pretext measures the full string first)
			if (titleEl.dataset.split !== "1") {
				titleEl.dataset.split = "1";
				const original = titleEl.textContent ?? "";
				titleEl.textContent = "";
				for (const ch of original) {
					const span = document.createElement("span");
					span.className = "char";
					span.style.display = "inline-block";
					span.style.opacity = "0";
					span.style.transform = "translateY(0.5em)";
					span.textContent = ch === " " ? " " : ch;
					titleEl.appendChild(span);
				}
			}

			// initial: hide tick + note
			tickLine.style.opacity = "0.55";
			noteEl.style.opacity = "0";
			noteEl.style.transform = "translateY(8px)";

			let played = false;
			const play = () => {
				if (played) return;
				played = true;

				const yearObj = { v: startYear };
				animate(yearObj, {
					v: targetYear,
					duration: 1100,
					ease: "outExpo",
					onUpdate: () => {
						yearEl.textContent = String(Math.round(yearObj.v));
					},
				});
				animate(yearEl, {
					opacity: [0, 1],
					translateX: [-12, 0],
					duration: 700,
					ease: "outCubic",
				});

				animate(tickLine, {
					strokeDashoffset: [200, 0],
					duration: 900,
					delay: 220,
					ease: "outQuart",
				});

				const chars = titleEl.querySelectorAll<HTMLElement>(".char");
				animate(chars, {
					opacity: [0, 1],
					translateY: ["0.5em", "0em"],
					duration: 600,
					delay: stagger(18, { start: 380 }),
					ease: "outCubic",
				});

				animate(noteEl, {
					opacity: [0, 0.55],
					translateY: [8, 0],
					duration: 700,
					delay: 700,
					ease: "outCubic",
				});
			};

			const io = new IntersectionObserver(
				(entries) => entries.forEach((e) => e.isIntersecting && play()),
				{ threshold: 0.35, rootMargin: "0px 0px -40px 0px" },
			);
			io.observe(row);
			cleanups.push(() => io.disconnect());

			// hover: re-draw the tick (anime.js style scrub)
			const onHover = () => {
				animate(tickLine, {
					strokeDashoffset: [200, 0],
					duration: 600,
					ease: "outQuart",
				});
			};
			row.addEventListener("mouseenter", onHover);
			cleanups.push(() => row.removeEventListener("mouseenter", onHover));
		});

		/* ----------------------- tricks: draw kite-line path ----------------------- */
		document.querySelectorAll<HTMLElement>(".trick").forEach((card) => {
			const path = card.querySelector<SVGPathElement>(".trick-path");
			const rider = card.querySelector<SVGCircleElement>(".trick-rider");
			const kiteDot = card.querySelector<SVGCircleElement>(".trick-kite");
			if (!path) return;
			const length = path.getTotalLength();
			path.style.strokeDasharray = String(length);
			path.style.strokeDashoffset = String(length);

			let played = false;
			const play = () => {
				if (played) return;
				played = true;
				animate(path, {
					strokeDashoffset: [length, 0],
					duration: 1600,
					ease: "inOutQuad",
				});
				if (kiteDot)
					animate(kiteDot, {
						scale: [0, 1.4, 1],
						duration: 1000,
						delay: 600,
						ease: "outBack",
					});
				if (rider)
					animate(rider, {
						scale: [0, 1.4, 1],
						duration: 800,
						delay: 200,
						ease: "outBack",
					});
			};
			const io = new IntersectionObserver(
				(entries) => entries.forEach((e) => e.isIntersecting && play()),
				{ threshold: 0.4 },
			);
			io.observe(card);

			const hover = () => {
				animate(path, {
					strokeDashoffset: [length, 0],
					duration: 1200,
					ease: "inOutQuad",
				});
			};
			card.addEventListener("mouseenter", hover);
			cleanups.push(() => {
				io.disconnect();
				card.removeEventListener("mouseenter", hover);
			});
		});

		/* ----------------------- live wind readout ----------------------- */
		const readout = document.querySelector<HTMLElement>("[data-wind-readout]");
		if (readout) {
			const spots: Array<[string, string]> = [
				["tarifa", "NW"],
				["cape town", "SE"],
				["le morne", "SE"],
				["hood river", "W"],
				["dakhla", "NE"],
				["klitmøller", "WNW"],
			];
			let ri = 0;
			const id = window.setInterval(() => {
				ri = (ri + 1) % spots.length;
				const spot = spots[ri];
				if (!spot) return;
				const [s, dir] = spot;
				const kn = Math.round(18 + Math.random() * 30);
				animate(readout, {
					opacity: [1, 0, 1],
					duration: 600,
					ease: "inOutQuad",
					onUpdate: (anim) => {
						const p = (anim as { progress: number }).progress;
						if (p > 0.5 && readout.dataset.swapped !== "1") {
							readout.textContent = `${s} · ${kn} kn · ${dir}`;
							readout.dataset.swapped = "1";
						}
						if (p >= 1) readout.dataset.swapped = "0";
					},
				});
			}, 3800);
			cleanups.push(() => window.clearInterval(id));
		}

		/* ----------------------- magnetic CTA ----------------------- */
		document
			.querySelectorAll<HTMLElement>(".btn--solid, .reel-play")
			.forEach((el) => {
				const onMove = (e: Event) => {
					const me = e as MouseEvent;
					const r = el.getBoundingClientRect();
					animate(el, {
						translateX: (me.clientX - (r.left + r.width / 2)) * 0.25,
						translateY: (me.clientY - (r.top + r.height / 2)) * 0.25,
						duration: 300,
						ease: "outQuad",
					});
				};
				const onLeave = () => {
					animate(el, {
						translateX: 0,
						translateY: 0,
						duration: 500,
						ease: "outElastic(1, .6)",
					});
				};
				el.addEventListener("mousemove", onMove);
				el.addEventListener("mouseleave", onLeave);
				cleanups.push(() => {
					el.removeEventListener("mousemove", onMove);
					el.removeEventListener("mouseleave", onLeave);
				});
			});

		return () => cleanups.forEach((fn) => fn());
	}, []);

	return null;
}
