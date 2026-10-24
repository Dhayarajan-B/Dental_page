/* Grand opening welcome screen — shown on the homepage on 25 Oct 2026 (IST) only.
   Visitors click, tap, scroll or press any key to cut the ribbon; the screen
   then splits from the centre and slides away to reveal the site.
   Add ?opening to the URL to preview it on any other day.
   Loaded synchronously in <head> so the page is covered before it paints. */
(function () {
    var OPENING_DAY = '2026-10-25';
    var IST_OFFSET_MIN = 330;

    var forced = /[?&]opening(=|&|$)/.test(location.search);
    var istDay = new Date(Date.now() + IST_OFFSET_MIN * 60000).toISOString().slice(0, 10);
    if (!forced && istDay !== OPENING_DAY) return;

    var root = document.documentElement;
    root.classList.add('go-active');

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function bail() {
        root.classList.remove('go-active', 'go-mounted');
        var el = document.getElementById('grand-opening');
        if (el) el.parentNode.removeChild(el);
        setInert(false);
    }

    function setInert(state) {
        Array.prototype.forEach.call(document.body ? document.body.children : [], function (el) {
            if (el.id === 'grand-opening' || el.tagName === 'SCRIPT') return;
            if (state) { el.setAttribute('inert', ''); el.inert = true; }
            else { el.removeAttribute('inert'); el.inert = false; }
        });
    }

    /* ------------------------------------------------------------------ markup */

    var STAR = 'M50 4 L62 37 L97 38 L69 59 L79 93 L50 73 L21 93 L31 59 L3 38 L38 37 Z';

    // [x%, y%, size px, delay s, rotate deg] — two columns of stars framing the title
    var STARS = [
        [5, 9, 46, 0.3, -12], [12, 28, 34, 0.5, 14], [4, 47, 52, 0.4, 6], [13, 66, 38, 0.6, -18], [5, 85, 48, 0.35, 10],
        [22, 14, 20, 0.8, 20], [24, 80, 22, 0.9, -8],
        [95, 9, 46, 0.35, 12], [88, 28, 34, 0.55, -14], [96, 47, 52, 0.45, -6], [87, 66, 38, 0.65, 18], [95, 85, 48, 0.4, -10],
        [78, 14, 20, 0.85, -20], [76, 80, 22, 0.95, 8]
    ];
    var GLINTS = [[18, 40, 18, 1.2], [30, 22, 14, 2.1], [70, 24, 16, 1.6], [82, 42, 18, 2.6], [34, 74, 14, 3.0], [66, 72, 16, 0.9], [50, 8, 12, 2.4], [8, 66, 12, 3.4], [92, 66, 12, 1.9]];

    function starsHtml() {
        var h = '';
        STARS.forEach(function (s) {
            h += '<svg class="go-star" viewBox="0 0 100 100" style="left:calc(' + s[0] + '% - ' + s[2] / 2 + 'px);top:calc(' + s[1] + '% - ' + s[2] / 2 +
                'px);--s:' + s[2] + 'px;--d:' + s[3] + 's;--r:' + s[4] + 'deg;--t:' + (2.8 + (s[0] * 7 % 17) / 10) + 's">' +
                '<path d="' + STAR + '" fill="url(#go-star-fill)" stroke="url(#go-star-edge)" stroke-width="2" stroke-linejoin="round"/>' +
                '<path d="' + STAR + '" fill="url(#go-star-shine)"/></svg>';
        });
        GLINTS.forEach(function (g) {
            h += '<svg class="go-glint" viewBox="0 0 40 40" style="left:' + g[0] + '%;top:' + g[1] + '%;--s:' + g[2] + 'px;--d:' + g[3] + 's;--t:' + (2.4 + g[3] / 2) + 's">' +
                '<path d="M20 0 L23 17 L40 20 L23 23 L20 40 L17 23 L0 20 L17 17 Z" fill="#fff6dc"/></svg>';
        });
        return h;
    }

    function sceneHtml(hidden) {
        var letters = 'OPENING'.split('').map(function (c, i) {
            return '<span style="--i:' + i + '">' + c + '</span>';
        }).join('');
        return '<div class="go-scene"' + (hidden ? ' aria-hidden="true"' : '') + '>' +
            '<div class="go-bg"></div><div class="go-rays"></div><div class="go-vignette"></div>' +
            '<div class="go-stars">' + starsHtml() + '</div>' +
            '<div class="go-content">' +
                '<div class="go-ribbon-slot"></div>' +
                '<img class="go-logo" src="assets/img/logo-transparent.png" alt="" width="205" height="173">' +
                '<p class="go-kicker">You are cordially invited to the</p>' +
                '<h1 class="go-title"' + (hidden ? '' : ' id="go-title"') + '>' +
                    '<span class="go-grand">GRAND</span><span class="go-opening" aria-label="Opening">' + letters + '</span>' +
                '</h1>' +
                '<div class="go-divider" aria-hidden="true"><i></i><b></b><i></i></div>' +
                '<p class="go-name">Revathy Dentistree</p>' +
                '<p class="go-date">Sunday &middot; 25 October 2026 &middot; Villupuram</p>' +
            '</div>' +
        '</div>';
    }

    var SCISSORS =
        '<svg viewBox="0 0 220 120" aria-hidden="true">' +
            '<defs>' +
                '<linearGradient id="go-gold-metal" x1="0" y1="0" x2="0" y2="1">' +
                    '<stop offset="0" stop-color="#fff6d6"/><stop offset=".35" stop-color="#e6c27a"/>' +
                    '<stop offset=".6" stop-color="#b58c44"/><stop offset=".85" stop-color="#7a5a22"/><stop offset="1" stop-color="#e9cf92"/>' +
                '</linearGradient>' +
                '<linearGradient id="go-blade-steel" x1="0" y1="0" x2="1" y2="0">' +
                    '<stop offset="0" stop-color="#b58c44"/><stop offset=".45" stop-color="#fff8e1"/><stop offset="1" stop-color="#d9b46a"/>' +
                '</linearGradient>' +
            '</defs>' +
            '<g class="go-blade go-blade--a">' +
                '<path d="M106 56 C 140 50, 182 52, 216 59 C 186 63, 144 64, 106 64 Z" fill="url(#go-blade-steel)" stroke="#8a6a2e" stroke-width="1"/>' +
                '<path d="M110 61 L 64 80" stroke="url(#go-gold-metal)" stroke-width="10" stroke-linecap="round"/>' +
                '<ellipse cx="44" cy="86" rx="23" ry="16" fill="none" stroke="url(#go-gold-metal)" stroke-width="9"/>' +
            '</g>' +
            '<g class="go-blade go-blade--b">' +
                '<path d="M106 64 C 140 70, 182 68, 216 61 C 186 57, 144 56, 106 56 Z" fill="url(#go-blade-steel)" stroke="#8a6a2e" stroke-width="1"/>' +
                '<path d="M110 59 L 64 40" stroke="url(#go-gold-metal)" stroke-width="10" stroke-linecap="round"/>' +
                '<ellipse cx="44" cy="34" rx="23" ry="16" fill="none" stroke="url(#go-gold-metal)" stroke-width="9"/>' +
            '</g>' +
            '<circle cx="110" cy="60" r="7" fill="url(#go-gold-metal)" stroke="#7a5a22" stroke-width="1.5"/>' +
            '<circle cx="108" cy="58" r="2" fill="#fffaf0"/>' +
        '</svg>';

    var DEFS =
        '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
            '<linearGradient id="go-star-fill" x1="0" y1="0" x2="1" y2="1">' +
                '<stop offset="0" stop-color="#fff4cc"/><stop offset=".45" stop-color="#e6c27a"/><stop offset="1" stop-color="#9a7434"/>' +
            '</linearGradient>' +
            '<linearGradient id="go-star-edge" x1="0" y1="0" x2="0" y2="1">' +
                '<stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#8a6a2e"/>' +
            '</linearGradient>' +
            '<radialGradient id="go-star-shine" cx=".35" cy=".3" r=".45">' +
                '<stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>' +
            '</radialGradient>' +
        '</defs></svg>';

    function build() {
        var el = document.createElement('div');
        el.id = 'grand-opening';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-modal', 'true');
        el.setAttribute('aria-labelledby', 'go-title');
        el.innerHTML = DEFS +
            '<div class="go-stage">' +
                '<div class="go-door go-door--l">' + sceneHtml(false) + '</div>' +
                '<div class="go-door go-door--r">' + sceneHtml(true) + '</div>' +
                '<div class="go-ribbon" aria-hidden="true"><div class="go-ribbon__half go-ribbon__half--l"></div><div class="go-ribbon__half go-ribbon__half--r"></div></div>' +
                '<div class="go-scissors"><div class="go-scissors__float">' + SCISSORS + '</div></div>' +
                '<div class="go-flash"></div><div class="go-ring"></div><div class="go-ring go-ring--2"></div><div class="go-streak"></div><div class="go-seam"></div>' +
                '<div class="go-hint" aria-hidden="true"><span class="go-hint__pulse"></span>' +
                    '<span class="go-hint__text"><span class="go-hint__mouse">Click anywhere or press any key to cut the ribbon</span>' +
                    '<span class="go-hint__touch">Tap anywhere to cut the ribbon</span></span></div>' +
            '</div>' +
            '<canvas class="go-fx" aria-hidden="true"></canvas>' +
            '<button type="button" class="go-sr">Cut the ribbon and enter the website</button>';
        return el;
    }

    /* --------------------------------------------------------------- particles */

    var GOLDS = ['#e6c27a', '#f4ead7', '#fff6dc', '#d4ab5c', '#b58c44'];
    var CONFETTI = ['#e6c27a', '#fff6dc', '#d4ab5c', '#f4ead7', '#d42a45', '#ff6a7d', '#2f7a62', '#ffffff', '#b58c44'];

    function rand(a, b) { return a + Math.random() * (b - a); }
    function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }

    function Fx(canvas) {
        var ctx = canvas.getContext('2d');
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var w = 0, h = 0;
        var small = Math.min(window.innerWidth, window.innerHeight) < 600;
        var dust = [], parts = [], running = true, ambient = true, last = 0;

        function resize() {
            w = window.innerWidth; h = window.innerHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        window.addEventListener('resize', resize);

        var DUST_N = small ? 45 : 90;
        for (var i = 0; i < DUST_N; i++) {
            dust.push({ x: Math.random(), y: Math.random(), r: rand(0.6, 2.2), vy: rand(0.006, 0.022), vx: rand(-0.004, 0.004), ph: rand(0, 6.28), sp: rand(1, 3), c: pick(GOLDS) });
        }

        function sparkle(x, y, n, speed, life) {
            for (var i = 0; i < n; i++) {
                var a = rand(0, Math.PI * 2), v = rand(speed * 0.3, speed);
                parts.push({ k: 'spark', x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 120, drag: 2.2, life: rand(life * 0.6, life), age: 0, r: rand(1, 2.6), c: pick(GOLDS) });
            }
        }
        function confetti(x, y, n, dir, spread, speed) {
            for (var i = 0; i < n; i++) {
                var a = dir + rand(-spread, spread), v = rand(speed * 0.45, speed);
                parts.push({
                    k: Math.random() < 0.18 ? 'streamer' : 'conf', x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
                    g: rand(380, 520), drag: rand(1.2, 2), life: rand(3.2, 5), age: 0,
                    w: rand(6, 11), h: rand(10, 18), rot: rand(0, 6.28), vr: rand(-9, 9), flip: rand(0, 6.28), vf: rand(6, 14),
                    sway: rand(20, 60), c: pick(CONFETTI)
                });
            }
        }
        function firework(x, y) {
            var n = small ? 50 : 80, col = pick(['#e6c27a', '#fff6dc', '#ff8a9a', '#e6c27a']);
            for (var i = 0; i < n; i++) {
                var a = (i / n) * Math.PI * 2 + rand(-0.05, 0.05), v = rand(220, 340);
                parts.push({ k: 'fw', x: x, y: y, px: x, py: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 90, drag: 2.4, life: rand(1.1, 1.6), age: 0, r: rand(1.2, 2.2), c: col });
            }
            sparkle(x, y, 14, 90, 0.6);
        }

        function step(t) {
            if (!running) return;
            var dt = last ? Math.min((t - last) / 1000, 0.05) : 0.016;
            last = t;
            ctx.clearRect(0, 0, w, h);

            if (ambient) {
                ctx.globalCompositeOperation = 'lighter';
                for (var i = 0; i < dust.length; i++) {
                    var d = dust[i];
                    d.y -= d.vy * dt; d.x += d.vx * dt; d.ph += d.sp * dt;
                    if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); }
                    var a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(d.ph));
                    ctx.globalAlpha = a;
                    ctx.fillStyle = d.c;
                    ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r, 0, 6.283); ctx.fill();
                }
                ctx.globalCompositeOperation = 'source-over';
            }

            for (var j = parts.length - 1; j >= 0; j--) {
                var p = parts[j];
                p.age += dt;
                if (p.age >= p.life || p.y > h + 60) { parts.splice(j, 1); continue; }
                var k = Math.exp(-p.drag * dt);
                p.vx *= k; p.vy = p.vy * k + p.g * dt;
                if (p.px !== undefined) { p.px = p.x; p.py = p.y; }
                p.x += p.vx * dt; p.y += p.vy * dt;
                var fade = Math.min(1, (p.life - p.age) / 0.6);

                if (p.k === 'conf' || p.k === 'streamer') {
                    p.rot += p.vr * dt; p.flip += p.vf * dt;
                    var sx = p.x + Math.sin(p.age * 3 + p.flip) * p.sway * dt * 6;
                    ctx.save();
                    ctx.globalAlpha = fade;
                    ctx.translate(sx, p.y);
                    ctx.rotate(p.rot);
                    ctx.scale(1, Math.cos(p.flip));
                    ctx.fillStyle = p.c;
                    if (p.k === 'streamer') {
                        ctx.beginPath();
                        ctx.moveTo(-2, -p.h * 1.2);
                        ctx.quadraticCurveTo(6, -p.h * 0.4, -2, 0);
                        ctx.quadraticCurveTo(-8, p.h * 0.4, 0, p.h * 1.2);
                        ctx.lineWidth = 3; ctx.strokeStyle = p.c; ctx.stroke();
                    } else {
                        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    }
                    ctx.restore();
                } else {
                    ctx.globalCompositeOperation = 'lighter';
                    ctx.globalAlpha = fade;
                    if (p.k === 'fw') {
                        ctx.strokeStyle = p.c; ctx.lineWidth = p.r;
                        ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
                    }
                    ctx.fillStyle = p.c;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (p.k === 'trail' ? fade : 1), 0, 6.283); ctx.fill();
                    ctx.globalCompositeOperation = 'source-over';
                }
            }
            ctx.globalAlpha = 1;
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);

        return {
            trail: function (x, y) {
                parts.push({ k: 'trail', x: x, y: y, vx: rand(-30, 30), vy: rand(-40, 10), g: 60, drag: 3, life: rand(0.5, 0.9), age: 0, r: rand(1, 2.4), c: pick(GOLDS) });
            },
            cut: function (x, y) {
                sparkle(x, y, small ? 60 : 110, 620, 1.1);
                confetti(x, y, small ? 110 : 200, -Math.PI / 2, Math.PI, 900);
            },
            cannons: function () {
                var n = small ? 70 : 130;
                confetti(-10, h + 10, n, -Math.PI / 2 + 0.55, 0.32, 1500);
                confetti(w + 10, h + 10, n, -Math.PI / 2 - 0.55, 0.32, 1500);
            },
            firework: function () { firework(rand(w * 0.15, w * 0.85), rand(h * 0.12, h * 0.42)); },
            stopAmbient: function () { ambient = false; },
            idle: function () { return parts.length === 0; },
            destroy: function () { running = false; window.removeEventListener('resize', resize); }
        };
    }

    /* ---------------------------------------------------------------- behaviour */

    function mount() {
        if (!document.body) return bail();
        var el = build();
        document.body.appendChild(el);
        root.classList.add('go-mounted');
        setInert(true);

        var slot = el.querySelector('.go-door--l .go-ribbon-slot');
        function placeRibbon() {
            var r = slot.getBoundingClientRect();
            el.style.setProperty('--rib-y', Math.max(28, r.top + r.height / 2) + 'px');
        }
        placeRibbon();
        window.addEventListener('resize', placeRibbon);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeRibbon);

        var fx = reduced ? null : new Fx(el.querySelector('.go-fx'));
        var srBtn = el.querySelector('.go-sr');
        try { srBtn.focus({ preventScroll: true }); } catch (e) { srBtn.focus(); }

        var lastTrail = 0;
        function onMove(e) {
            if (reduced) return;
            el.style.setProperty('--px', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
            el.style.setProperty('--py', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
            var now = performance.now();
            if (fx && e.pointerType === 'mouse' && now - lastTrail > 16) { lastTrail = now; fx.trail(e.clientX, e.clientY); fx.trail(e.clientX, e.clientY); }
        }
        el.addEventListener('pointermove', onMove);

        var triggered = false;
        function trigger(e) {
            if (triggered) return;
            if (e && e.type === 'keydown' && e.repeat) return;
            triggered = true;
            if (e && e.type !== 'pointerdown' && e.cancelable) e.preventDefault();
            detach();
            open();
        }
        function onWheel(e) { if (e.cancelable) e.preventDefault(); trigger(e); }
        function detach() {
            el.removeEventListener('pointerdown', trigger);
            document.removeEventListener('keydown', trigger, true);
            el.removeEventListener('wheel', onWheel);
        }
        el.addEventListener('pointerdown', trigger);
        document.addEventListener('keydown', trigger, true);
        el.addEventListener('wheel', onWheel, { passive: false });

        function finish() {
            window.removeEventListener('resize', placeRibbon);
            el.removeEventListener('pointermove', onMove);
            if (fx) fx.destroy();
            if (el.parentNode) el.parentNode.removeChild(el);
        }

        function open() {
            if (reduced) {
                el.classList.add('is-opening');
                root.classList.remove('go-active');
                setInert(false);
                setTimeout(finish, 600);
                return;
            }

            var cutX = window.innerWidth / 2;
            var cutY = parseFloat(el.style.getPropertyValue('--rib-y')) || window.innerHeight * 0.22;

            // 0ms: blades snap shut · 170ms: the cut — flash, rings, confetti
            el.classList.add('is-cut');
            setTimeout(function () { fx.cut(cutX, cutY); }, 170);
            setTimeout(function () { fx.cannons(); }, 380);

            // light opens along the seam, then the two halves part
            setTimeout(function () { el.classList.add('is-seam'); }, 900);
            setTimeout(function () {
                el.classList.add('is-opening');
                fx.stopAmbient();
                root.classList.remove('go-active');   // releases scroll and starts the hero entrance
                setInert(false);
            }, 1300);

            // celebration fireworks over the revealed site
            [1700, 2150, 2600, 3200].forEach(function (t) { setTimeout(function () { fx.firework(); }, t); });

            // tidy up once the last confetti has fallen
            var started = Date.now();
            (function waitForCalm() {
                var elapsed = Date.now() - started;
                if (elapsed > 9000 || (elapsed > 4200 && fx.idle())) {
                    el.classList.add('is-done');
                    setTimeout(finish, 650);
                } else {
                    setTimeout(waitForCalm, 250);
                }
            })();
        }
    }

    function safeMount() {
        try { mount(); } catch (e) { bail(); }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', safeMount);
    else safeMount();
})();
