import { Animator } from "@/app/_components/Animator";

export default function Home() {
	return (
		<>
			<Animator />

			{/* wind streaks layer (Animator populates lines) */}
			<svg
				className="wind"
				aria-hidden="true"
				preserveAspectRatio="none"
				viewBox="0 0 1600 900"
			/>

			{/* floating kite */}
			<svg className="kite" aria-hidden="true" viewBox="-60 -60 120 120">
				<g className="kite-body">
					<polygon points="0,-50 44,0 0,50 -44,0" />
					<line x1="0" y1="50" x2="-22" y2="120" />
					<line x1="0" y1="50" x2="22" y2="120" />
					<line x1="-22" y1="120" x2="22" y2="120" />
				</g>
			</svg>

			{/* nav */}
			<header className="nav">
				<a href="#top" className="brand">
					<span className="brand-mark">◢◣</span>
					<span>igor</span>
					<span className="brand-handle">sacrumpluto</span>
				</a>
				<nav className="nav-links">
					<a href="#o-igorze">o mnie</a>
					<a href="#chalupy">chałupy / malayka</a>
					<a href="#tricki">tricki</a>
					<a href="#kitesafari">kitesafari</a>
					<a href="#galeria">galeria</a>
					<a href="#droga">moja droga</a>
					<a href="#book" className="nav-cta">
						zarezerwuj
					</a>
				</nav>
				<div className="nav-wind">
					<span className="dot" />
					<span data-wind-readout>chałupy · 22 kn · W</span>
				</div>
			</header>

			{/* hero */}
			<section className="hero hero--video" id="top">
				<div className="hero-bg" aria-hidden="true">
					<video
						className="hero-video"
						autoPlay
						muted
						loop
						playsInline
						preload="auto"
						poster="/hero-poster.jpg"
					>
						<source src="/hero.mp4" type="video/mp4" />
						<source src="/hero.webm" type="video/webm" />
					</video>
					<div className="hero-overlay" />
					<span className="hero-vid-tag">
						[ /public/hero.mp4 — drop file here · loop · muted · &lt; 10 mb ]
					</span>
				</div>

				<div className="hero-meta">
					<span>chałupy · hel · zimą gdzie powieje</span>
					<span>
						instruktor · rider · operator kamery
					</span>
				</div>

				<h1 className="hero-title">
					<span className="hero-line">IGOR</span>
					<span className="hero-line hero-line--handle">sacrumpluto</span>
					<span className="hero-line hero-line--alt">KITEBOARDING</span>
				</h1>

				<p className="hero-sub" data-pretext-shrinkwrap>
					Kiteboarder z Półwyspu Helskiego. Latem uczę w Chałupach pod szyldem
					Malayka, zimą gonię termik po Egipcie i Brazylii. Lubię uczyć
					ludzi pierwszego waterstartu i nagrywać kumpli z drona w cieple
					popołudniowego wiatru.
				</p>

				<div className="hero-cta">
					<a className="btn btn--solid" href="#book">
						zarezerwuj sesję →
					</a>
					<a className="btn btn--ghost" href="#galeria">
						zobacz galerię
					</a>
				</div>

				<div className="hero-horizon">
					<svg
						viewBox="0 0 1600 80"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<path
							className="wave wave-1"
							d="M0,40 Q200,10 400,40 T800,40 T1200,40 T1600,40"
						/>
						<path
							className="wave wave-2"
							d="M0,55 Q200,30 400,55 T800,55 T1200,55 T1600,55"
						/>
						<path
							className="wave wave-3"
							d="M0,68 Q200,52 400,68 T800,68 T1200,68 T1600,68"
						/>
					</svg>
				</div>
			</section>

			{/* stats */}
			<section className="stats" aria-label="igor w liczbach">
				<div className="stat">
					<span className="stat-num" data-count-to="9">
						0<span className="stat-unit">lat</span>
					</span>
					<span className="stat-label">na desce</span>
				</div>
				<div className="stat">
					<span className="stat-num" data-count-to="6">
						0
					</span>
					<span className="stat-label">sezonów w malayce</span>
				</div>
				<div className="stat">
					<span className="stat-num" data-count-to="180">
						0<span className="stat-unit">+</span>
					</span>
					<span className="stat-label">wyszkolonych kursantów</span>
				</div>
				<div className="stat">
					<span className="stat-num" data-count-to="14">
						0<span className="stat-unit">m</span>
					</span>
					<span className="stat-label">najwyższy skok</span>
				</div>
				<div className="stat">
					<span className="stat-num" data-count-to="318">
						0<span className="stat-unit">d</span>
					</span>
					<span className="stat-label">na wodzie / 2025</span>
				</div>
			</section>

			{/* O IGORZE */}
			<section className="section" id="o-igorze">
				<header className="section-head">
					<span className="section-num">01</span>
					<h2>o igorze</h2>
					<span className="section-rule" />
				</header>

				<div className="about">
					<div className="about-body">
						<p data-pretext-shrinkwrap>
							Wychowany w Chałupach, na cieniutkim pasku Półwyspu Helskiego
							między płytką zatoką a otwartym morzem. Pierwsza deska
							w 2016, pierwszy kiteloop dwa sezony później — pod oknami
							szkółki Malayka, gdzie dziś sam uczy.
						</p>
						<p>
							Nie startuję na World Tour, nie zbieram pucharów. Trenuję,
							żeby latać wyżej w przyszłym roku niż w tym, i żeby kursanci
							wychodzili z plaży z szerszym uśmiechem niż przy wejściu.
							Resztę robi wiatr.
						</p>
						<p>
							Instruktor IKO, sternik motorowodny, ratownik WOPR. W sezonie
							Chałupy / Malayka. Poza sezonem — kitesafari, kamera w plecaku,
							jedna walizka, dwie deski, trzy bary.
						</p>
					</div>
					<aside className="about-facts">
						<dl>
							<dt>imię</dt>
							<dd>Igor Sacrumpluto</dd>
							<dt>rocznik</dt>
							<dd>1997 / Gdynia</dd>
							<dt>baza</dt>
							<dd>Chałupy / Hel</dd>
							<dt>stance</dt>
							<dd>regular · 145 / 44</dd>
							<dt>kite quiver</dt>
							<dd>7 / 9 / 11 / 13 / 15 m</dd>
							<dt>licencje</dt>
							<dd>IKO L1 · jet-ski · WOPR</dd>
							<dt>języki</dt>
							<dd>pl · en · es · ein bisschen de</dd>
						</dl>
					</aside>
				</div>
			</section>

			{/* CHAŁUPY / MALAYKA */}
			<section className="section section--dark" id="chalupy">
				<header className="section-head">
					<span className="section-num">02</span>
					<h2>chałupy & szkółka malayka</h2>
					<span className="section-rule" />
				</header>

				<div className="chalupy">
					<div
						className="chalupy-photo"
						data-img-label="chałupy / zatoka pucka — sesja popołudniowa"
					/>
					<div className="chalupy-meta">
						<h3>spot domowy</h3>
						<p>
							Płytka zatoka po stronie zatokowej, woda do bioder przez
							pierwsze 200 metrów. Idealne miejsce na pierwszy water-start
							i na progresję do skoków bez ryzyka twardego lądowania.
							Otwarte morze po drugiej stronie półwyspu — tam pracuję nad
							big-air, kiedy wiatr przekracza 25 węzłów.
						</p>
						<dl className="chalupy-dl">
							<dt>sezon</dt>
							<dd>maj — październik (woda 12–22°C)</dd>
							<dt>wiatry</dt>
							<dd>W, SW, NW · 15–35 kn · termik popołudniowy</dd>
							<dt>dojazd</dt>
							<dd>Hel 188 — ostatni zjazd na lewo, parking 50 m od plaży</dd>
							<dt>poziom</dt>
							<dd>★★☆☆☆ → ★★★★☆ (płytko ↔ otwarte morze)</dd>
						</dl>
					</div>

					<div className="malayka">
						<div className="malayka-head">
							<h3>szkółka malayka</h3>
							<span>by igor sacrumpluto</span>
						</div>
						<ul className="malayka-courses">
							<li>
								<span className="course-name">pierwszy raz na desce</span>
								<span className="course-meta">2 dni · 1-on-1 · sprzęt w cenie</span>
								<span className="course-price">1 290 zł</span>
							</li>
							<li>
								<span className="course-name">progresja — water-start do jazdy</span>
								<span className="course-meta">3 dni · max 2 osoby · radio-helmet</span>
								<span className="course-price">1 690 zł</span>
							</li>
							<li>
								<span className="course-name">skoki & transitions</span>
								<span className="course-meta">2 dni · od poziomu jazdy w obu kierunkach</span>
								<span className="course-price">1 490 zł</span>
							</li>
							<li>
								<span className="course-name">big-air bootcamp</span>
								<span className="course-meta">5 dni · video-analiza · jet-ski safety</span>
								<span className="course-price">3 290 zł</span>
							</li>
							<li>
								<span className="course-name">freestyle / unhooked</span>
								<span className="course-meta">3 dni · barek + S-Bend, Raley, Backmobe</span>
								<span className="course-price">2 190 zł</span>
							</li>
						</ul>
						<a className="btn btn--solid malayka-cta" href="#book">
							zapisz się →
						</a>
					</div>
				</div>
			</section>

			{/* TRICKI */}
			<section className="section" id="tricki">
				<header className="section-head">
					<span className="section-num">03</span>
					<h2>lista ulubionych tricków</h2>
					<span className="section-rule" />
				</header>

				<div className="tricks">
					<article className="trick">
						<svg className="trick-svg" viewBox="0 0 320 220" aria-hidden="true">
							<path
								className="trick-path"
								d="M40,200 C 60,120 120,40 180,40 C 240,40 280,100 220,160 C 180,200 80,210 40,200"
							/>
							<circle className="trick-rider" cx="40" cy="200" r="4" />
							<circle className="trick-kite" cx="180" cy="40" r="6" />
						</svg>
						<h3>Megaloop Late Backroll</h3>
						<p>
							Kite 11 m, loop zainicjowany w apogeum, deska wraca trzy uderzenia
							serca po tym, jak grawitacja przejmuje stery.
						</p>
						<ul className="trick-tags">
							<li>big air</li>
							<li>30+ kn</li>
							<li>signature</li>
						</ul>
					</article>

					<article className="trick">
						<svg className="trick-svg" viewBox="0 0 320 220" aria-hidden="true">
							<path
								className="trick-path"
								d="M30,180 C 80,80 160,40 200,90 C 240,140 200,180 140,170 C 80,160 60,120 30,180"
							/>
							<circle className="trick-rider" cx="30" cy="180" r="4" />
							<circle className="trick-kite" cx="200" cy="90" r="6" />
						</svg>
						<h3>Double Heart Attack</h3>
						<p>
							Dwa pełne pass-y, board-off w środku rotacji, re-grab na drugim
							handle pass przed wejściem do wody.
						</p>
						<ul className="trick-tags">
							<li>freestyle</li>
							<li>unhooked</li>
							<li>technical</li>
						</ul>
					</article>

					<article className="trick">
						<svg className="trick-svg" viewBox="0 0 320 220" aria-hidden="true">
							<path
								className="trick-path"
								d="M40,190 C 110,150 130,30 220,60 C 290,80 280,180 200,200 C 120,210 80,200 40,190"
							/>
							<circle className="trick-rider" cx="40" cy="190" r="4" />
							<circle className="trick-kite" cx="220" cy="60" r="6" />
						</svg>
						<h3>KGB Board-Off</h3>
						<p>
							Kite-loop board-off, deska wraca do nogi podczas drugiego łuku
							w dół. Margines błędu: zero.
						</p>
						<ul className="trick-tags">
							<li>big air</li>
							<li>board-off</li>
							<li>kgb</li>
						</ul>
					</article>
				</div>

				<ol className="trick-list">
					<li>
						<span className="t-no">01</span>
						<span className="t-name" data-pretext-fit>S-Bend to Blind</span>
						<span className="t-meta">unhooked · pass · backside landing</span>
						<span className="t-diff">★★★★☆</span>
					</li>
					<li>
						<span className="t-no">02</span>
						<span className="t-name" data-pretext-fit>Slim Chance</span>
						<span className="t-meta">unhooked · double pass</span>
						<span className="t-diff">★★★★★</span>
					</li>
					<li>
						<span className="t-no">03</span>
						<span className="t-name" data-pretext-fit>Backmobe 5</span>
						<span className="t-meta">freestyle · 540° z handle pass</span>
						<span className="t-diff">★★★★☆</span>
					</li>
					<li>
						<span className="t-no">04</span>
						<span className="t-name" data-pretext-fit>313 (S-Mobe)</span>
						<span className="t-meta">freestyle · technicznie czysty</span>
						<span className="t-diff">★★★★☆</span>
					</li>
					<li>
						<span className="t-no">05</span>
						<span className="t-name" data-pretext-fit>Boogie Loop</span>
						<span className="t-meta">big air · kite-loop z dolnym handle pass</span>
						<span className="t-diff">★★★★★</span>
					</li>
					<li>
						<span className="t-no">06</span>
						<span className="t-name" data-pretext-fit>Front Roll Board-Off</span>
						<span className="t-meta">big air · grab przed kontaktem</span>
						<span className="t-diff">★★★☆☆</span>
					</li>
					<li>
						<span className="t-no">07</span>
						<span className="t-name" data-pretext-fit>Strapless Big Air Mobe</span>
						<span className="t-meta">strapless · deska w powietrzu cały czas</span>
						<span className="t-diff">★★★★★</span>
					</li>
					<li>
						<span className="t-no">08</span>
						<span className="t-name" data-pretext-fit>Crow Mobe</span>
						<span className="t-meta">freestyle · 360° unhooked invert</span>
						<span className="t-diff">★★★★☆</span>
					</li>
					<li>
						<span className="t-no">09</span>
						<span className="t-name" data-pretext-fit>Kite Loop Late Board-Off</span>
						<span className="t-meta">big air · obowiązkowa polisa</span>
						<span className="t-diff">★★★★★</span>
					</li>
					<li>
						<span className="t-no">10</span>
						<span className="t-name" data-pretext-fit>Darkslide → exit pop</span>
						<span className="t-meta">flat water · płaska zatoka, dobry pretekst</span>
						<span className="t-diff">★★★☆☆</span>
					</li>
				</ol>
			</section>

			{/* KITESAFARI */}
			<section className="section section--dark" id="kitesafari">
				<header className="section-head">
					<span className="section-num">04</span>
					<h2>wyjazdy kitesafari</h2>
					<span className="section-rule" />
				</header>

				<p className="safari-lede" data-pretext-shrinkwrap>
					Małe grupy (max 8 osób), własna łódź lub bus, lokalni przewodnicy.
					Wieczorami video-analiza, rano forecast, w południe rozpisany
					plan A / B / C. Płacisz raz, jeździsz aż wyjdzie.
				</p>

				<div className="safaris">
					<article className="safari">
						<div
							className="safari-photo"
							data-img-label="hurghada → safaga"
						/>
						<div className="safari-body">
							<header>
								<h3>Egipt — El Gouna → Safaga</h3>
								<span className="safari-when">
									18 — 27 stycznia 2026
								</span>
							</header>
							<dl>
								<dt>typ</dt>
								<dd>flat water + downwinder</dd>
								<dt>wiatr</dt>
								<dd>NW · 18–28 kn · 9 dni gwarancji</dd>
								<dt>dla kogo</dt>
								<dd>jazda w obu kierunkach +</dd>
								<dt>w cenie</dt>
								<dd>hotel 4★, transport, coaching, foto-pakiet</dd>
								<dt>cena</dt>
								<dd>od 6 990 zł / osoba</dd>
							</dl>
						</div>
					</article>

					<article className="safari">
						<div className="safari-photo" data-img-label="cumbuco / cauipe" />
						<div className="safari-body">
							<header>
								<h3>Brazylia — Cumbuco & Cauípe</h3>
								<span className="safari-when">
									8 — 22 listopada 2026
								</span>
							</header>
							<dl>
								<dt>typ</dt>
								<dd>lagoon strapless · downwinder · big-air</dd>
								<dt>wiatr</dt>
								<dd>E · 22–32 kn · niemal pewniak</dd>
								<dt>dla kogo</dt>
								<dd>średniozaawansowani → pro</dd>
								<dt>w cenie</dt>
								<dd>buggy + driver, pousada, jet-ski safety</dd>
								<dt>cena</dt>
								<dd>od 14 900 zł / osoba</dd>
							</dl>
						</div>
					</article>

					<article className="safari">
						<div className="safari-photo" data-img-label="dakhla / lagoon" />
						<div className="safari-body">
							<header>
								<h3>Maroko — Dakhla Lagoon</h3>
								<span className="safari-when">
									6 — 13 kwietnia 2026
								</span>
							</header>
							<dl>
								<dt>typ</dt>
								<dd>flat water · freestyle bootcamp</dd>
								<dt>wiatr</dt>
								<dd>NE · 20–32 kn · stabilny termik</dd>
								<dt>dla kogo</dt>
								<dd>od pierwszych skoków +</dd>
								<dt>w cenie</dt>
								<dd>kite-camp, transport z Agadiru, full board</dd>
								<dt>cena</dt>
								<dd>od 5 490 zł / osoba</dd>
							</dl>
						</div>
					</article>

					<article className="safari">
						<div
							className="safari-photo"
							data-img-label="zanzibar / paje"
						/>
						<div className="safari-body">
							<header>
								<h3>Zanzibar — Paje & Jambiani</h3>
								<span className="safari-when">
									1 — 12 lutego 2026
								</span>
							</header>
							<dl>
								<dt>typ</dt>
								<dd>kasaa, fala na rafie, długie laguny</dd>
								<dt>wiatr</dt>
								<dd>NE / SE · 16–24 kn</dd>
								<dt>dla kogo</dt>
								<dd>jazda samodzielna +</dd>
								<dt>w cenie</dt>
								<dd>bungalow, śniadania, masaż po sesji</dd>
								<dt>cena</dt>
								<dd>od 9 200 zł / osoba</dd>
							</dl>
						</div>
					</article>

					<article className="safari">
						<div
							className="safari-photo"
							data-img-label="cape town / dolphin beach"
						/>
						<div className="safari-body">
							<header>
								<h3>RPA — Kapsztad / Big Air</h3>
								<span className="safari-when">
									10 — 24 grudnia 2026
								</span>
							</header>
							<dl>
								<dt>typ</dt>
								<dd>big-air bootcamp · King of the Air watch</dd>
								<dt>wiatr</dt>
								<dd>cape doctor · 28–48 kn</dd>
								<dt>dla kogo</dt>
								<dd>zaawansowani — wymagana rozmowa kwalifikacyjna</dd>
								<dt>w cenie</dt>
								<dd>villa, jet-ski safety, video, fotograf</dd>
								<dt>cena</dt>
								<dd>od 18 500 zł / osoba</dd>
							</dl>
						</div>
					</article>

					<article className="safari safari--soon">
						<div className="safari-photo" data-img-label="???" />
						<div className="safari-body">
							<header>
								<h3>Filipiny — Boracay & Seco Island</h3>
								<span className="safari-when">listopad 2026 / wkrótce</span>
							</header>
							<dl>
								<dt>typ</dt>
								<dd>downwinder, wild kemp na Seco</dd>
								<dt>status</dt>
								<dd>zapis na waitlistę</dd>
							</dl>
						</div>
					</article>
				</div>
			</section>

			{/* GALERIA */}
			<section className="section" id="galeria">
				<header className="section-head">
					<span className="section-num">05</span>
					<h2>galeria — filmy & zdjęcia</h2>
					<span className="section-rule" />
				</header>

				<div className="gallery">
					<figure className="g-tile g-tile--xl g-tile--video">
						<div className="g-img" data-img-label="reel · sezon 4 / trailer" />
						<button type="button" className="g-play" aria-label="play">
							<svg viewBox="0 0 64 64" aria-hidden="true">
								<polygon points="22,16 50,32 22,48" />
							</svg>
						</button>
						<figcaption>
							<span>e00</span> the season that wouldn&apos;t start · 2:47
						</figcaption>
					</figure>

					<figure className="g-tile g-tile--m">
						<div className="g-img" data-img-label="megaloop · cape town 2024" />
						<figcaption>
							<span>foto</span> kite-line tension @ 38 kn
						</figcaption>
					</figure>

					<figure className="g-tile g-tile--m g-tile--video">
						<div className="g-img" data-img-label="chałupy / piątek wieczór" />
						<button type="button" className="g-play" aria-label="play">
							<svg viewBox="0 0 64 64" aria-hidden="true">
								<polygon points="22,16 50,32 22,48" />
							</svg>
						</button>
						<figcaption>
							<span>e02</span> levante / 1:18
						</figcaption>
					</figure>

					<figure className="g-tile g-tile--s">
						<div className="g-img" data-img-label="cumbuco / strapless" />
						<figcaption>
							<span>foto</span> cauípe, late grab
						</figcaption>
					</figure>

					<figure className="g-tile g-tile--s">
						<div className="g-img" data-img-label="hel / przekładka" />
						<figcaption>
							<span>foto</span> z Helu na Chałupy w 9 min
						</figcaption>
					</figure>

					<figure className="g-tile g-tile--m g-tile--video">
						<div className="g-img" data-img-label="dakhla / freestyle ses." />
						<button type="button" className="g-play" aria-label="play">
							<svg viewBox="0 0 64 64" aria-hidden="true">
								<polygon points="22,16 50,32 22,48" />
							</svg>
						</button>
						<figcaption>
							<span>e03</span> dakhla raw / 3:51
						</figcaption>
					</figure>

					<figure className="g-tile g-tile--l">
						<div className="g-img" data-img-label="zanzibar / sunset session" />
						<figcaption>
							<span>foto</span> paje, h-14, kite 13
						</figcaption>
					</figure>

					<figure className="g-tile g-tile--s">
						<div className="g-img" data-img-label="kgb · raw" />
						<figcaption>
							<span>foto</span> board-off frame 0023
						</figcaption>
					</figure>

					<figure className="g-tile g-tile--s g-tile--video">
						<div className="g-img" data-img-label="malayka / dziecięcy obóz" />
						<button type="button" className="g-play" aria-label="play">
							<svg viewBox="0 0 64 64" aria-hidden="true">
								<polygon points="22,16 50,32 22,48" />
							</svg>
						</button>
						<figcaption>
							<span>e04</span> malayka kids / 0:58
						</figcaption>
					</figure>

					<figure className="g-tile g-tile--m">
						<div className="g-img" data-img-label="kapsztad / koth heat 4" />
						<figcaption>
							<span>foto</span> king of the air, 2024
						</figcaption>
					</figure>
				</div>
			</section>

			{/* MOJA DROGA — track log */}
			<section className="section section--dark" id="droga">
				<header className="section-head">
					<span className="section-num">06</span>
					<h2>moja droga</h2>
					<span className="section-rule" />
				</header>

				<p className="droga-lede" data-pretext-shrinkwrap>
					Bez podium World Cupu, bez kontraktów na miliony. Tylko sesje,
					błędy, kursanci, miejsca, ludzie i sprzęt który się rozpadał.
					Tak to wygląda od środka.
				</p>

				<ol className="droga" data-droga>
					<li data-year="2014">
						<span className="d-year" data-year-to="2014">2014</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								pierwsza deska, windsurfing w Jastarni
							</h3>
							<p className="d-note">
								lato u dziadków, jeden bom, dwa pęcherze
							</p>
						</div>
					</li>
					<li data-year="2016">
						<span className="d-year" data-year-to="2016">2016</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								pierwszy kurs kite w Chałupach
							</h3>
							<p className="d-note">
								kite szkolny 9 m, woda do bioderka, jedna fascynacja na całe życie
							</p>
						</div>
					</li>
					<li data-year="2018">
						<span className="d-year" data-year-to="2018">2018</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								pierwszy kiteloop, otwarte morze, Hel
							</h3>
							<p className="d-note">
								25 kn, kite 9 m, lądowanie tyłkiem, ale liczy się próba
							</p>
						</div>
					</li>
					<li data-year="2019">
						<span className="d-year" data-year-to="2019">2019</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								egzamin IKO L1 — Tarifa
							</h3>
							<p className="d-note">
								pierwszy sezon za granicą, pierwsi kursanci po hiszpańsku
							</p>
						</div>
					</li>
					<li data-year="2020">
						<span className="d-year" data-year-to="2020">2020</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								dołączam do ekipy Malayka jako młodszy instruktor
							</h3>
							<p className="d-note">
								cały sezon w Chałupach, 64 dni na wodzie, pierwsze video z drona
							</p>
						</div>
					</li>
					<li data-year="2021">
						<span className="d-year" data-year-to="2021">2021</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								pierwsze kitesafari — Dakhla, Maroko
							</h3>
							<p className="d-note">
								3 tygodnie laguny, kite 7 m, pierwsze próby unhooked
							</p>
						</div>
					</li>
					<li data-year="2022">
						<span className="d-year" data-year-to="2022">2022</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								współprowadzę big-air bootcamp w Malayce
							</h3>
							<p className="d-note">
								10 kursantów, 5 dni, każdy pierwszy skok ponad 3 m — efekt podstawiony
							</p>
						</div>
					</li>
					<li data-year="2023">
						<span className="d-year" data-year-to="2023">2023</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								pierwszy wyjazd do Cumbuco / Brazylia
							</h3>
							<p className="d-note">
								downwinder Cumbuco → Taíba, pierwsza próba S-Bend to Blind, 13°C w nocy
							</p>
						</div>
					</li>
					<li data-year="2024">
						<span className="d-year" data-year-to="2024">2024</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								pełny sezon Malayki — coach programu big-air
							</h3>
							<p className="d-note">
								pierwsza Boogie Loop wylądowana w Kapsztadzie podczas urlopu
							</p>
						</div>
					</li>
					<li data-year="2025">
						<span className="d-year" data-year-to="2025">2025</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								start własnych kitesafari pod marką sacrumpluto
							</h3>
							<p className="d-note">
								Egipt + Brazylia, 18 osób, zero kontuzji, jedna złamana deska (autora)
							</p>
						</div>
					</li>
					<li className="d-future" data-year="2026">
						<span className="d-year" data-year-to="2026">2026</span>
						<svg
							className="d-tick"
							viewBox="0 0 200 2"
							preserveAspectRatio="none"
							aria-hidden="true"
						>
							<line x1="0" y1="1" x2="200" y2="1" />
						</svg>
						<div className="d-body">
							<h3 className="d-title" data-pretext-shrinkwrap>
								w planach: pierwszy start w Mistrzostwach Polski Big Air
							</h3>
							<p className="d-note">
								trening zima Egipt / Brazylia, próba 18 m skoku do wakacji
							</p>
						</div>
					</li>
				</ol>
			</section>

			{/* PARTNERZY / sprzęt */}
			<section className="section" id="sponsors">
				<header className="section-head">
					<span className="section-num">07</span>
					<h2>partnerzy & sprzęt</h2>
					<span className="section-rule" />
				</header>

				<p className="sponsors-lede" data-pretext-shrinkwrap>
					Bez wielkich kontraktów — kilka marek i ludzi, którzy
					regularnie wspierają sesje, kursy i wyjazdy. Otwarty na
					rozmowy o współpracy.
				</p>

				<div className="sponsors">
					<div className="sponsor">malayka / szkółka</div>
					<div className="sponsor">north / kite local</div>
					<div className="sponsor">mystic / harness</div>
					<div className="sponsor">deska własna</div>
					<div className="sponsor">wopr hel</div>
					<div className="sponsor">tu mógłbyś być ty →</div>
				</div>
			</section>

			{/* BOOK */}
			<section className="section" id="book">
				<header className="section-head">
					<span className="section-num">08</span>
					<h2>zarezerwuj sesję lub wyjazd</h2>
					<span className="section-rule" />
				</header>

				<form className="book">
					<label>
						<span>imię i nazwisko</span>
						<input type="text" placeholder="ada lovelace" />
					</label>
					<label>
						<span>email</span>
						<input type="email" placeholder="ada@analytical.engine" />
					</label>
					<label>
						<span>co cię interesuje?</span>
						<select>
							<option>chałupy — lekcja indywidualna</option>
							<option>chałupy — szkółka malayka, kurs</option>
							<option>kitesafari — egipt</option>
							<option>kitesafari — brazylia</option>
							<option>kitesafari — dakhla</option>
							<option>kitesafari — zanzibar</option>
							<option>kitesafari — kapsztad / big air</option>
							<option>big-air coaching · video-analiza</option>
						</select>
					</label>
					<label>
						<span>poziom</span>
						<select>
							<option>pierwszy raz na desce</option>
							<option>jazda na płaskiej wodzie</option>
							<option>skoki & transitions</option>
							<option>kiteloop & big air</option>
							<option>coaching zawodniczy</option>
						</select>
					</label>
					<label className="book-msg">
						<span>opowiedz, co chciałbyś wylądować</span>
						<textarea
							rows={4}
							placeholder="trzy zdania. wiatr, deska, jeden trick za który byś zabił."
						/>
					</label>
					<button type="submit" className="btn btn--solid book-submit">
						wyślij do igora →
					</button>
				</form>
			</section>

			<footer className="foot">
				<div className="foot-row">
					<span>© 2026 igor sacrumpluto · chałupy / hel</span>
					<span>built on wind · wireframe v0.2</span>
				</div>
				<div className="foot-row">
					<a href="#">instagram</a>
					<a href="#">youtube</a>
					<a href="#">strava</a>
					<a href="#">email</a>
				</div>
			</footer>
		</>
	);
}
