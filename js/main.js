(() => {
  const cfg = window.TSUJI_CONFIG || {};

  function applyLinks() {
    document.querySelectorAll("[data-pump-link]").forEach((el) => {
      el.href = cfg.pumpUrl || "https://swap.pump.fun/";
    });
    document.querySelectorAll("[data-chart-link]").forEach((el) => {
      el.href = cfg.chartUrl || "https://dexscreener.com/solana";
    });
    document.querySelectorAll("[data-x-link]").forEach((el) => {
      el.href = cfg.xUrl || "https://x.com/TsujicoinSol";
    });

    const frame = document.getElementById("dexFrame");
    if (frame && cfg.chartEmbed) {
      frame.src = cfg.chartEmbed;
    }

    const ca = (cfg.contractAddress || "").trim();
    const caBox = document.getElementById("caBox");
    const caValue = document.getElementById("caValue");
    if (ca && caBox && caValue) {
      caBox.hidden = false;
      caValue.textContent = ca;
    }
  }

  function setupCopy() {
    const btn = document.getElementById("caCopy");
    const value = document.getElementById("caValue");
    if (!btn || !value) return;

    btn.addEventListener("click", async () => {
      const text = value.textContent.trim();
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied";
        setTimeout(() => {
          btn.textContent = "Copy";
        }, 1600);
      } catch {
        btn.textContent = "Failed";
        setTimeout(() => {
          btn.textContent = "Copy";
        }, 1600);
      }
    });
  }

  function setupNav() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    const header = document.querySelector(".site-header");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    const onScroll = () => {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    nodes.forEach((n) => io.observe(n));
  }

  function setupPaws() {
    const field = document.getElementById("pawField");
    if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const count = window.innerWidth < 720 ? 8 : 14;
    for (let i = 0; i < count; i += 1) {
      const paw = document.createElement("span");
      paw.className = "paw";
      paw.style.left = `${Math.random() * 100}%`;
      paw.style.animationDelay = `${Math.random() * 12}s`;
      paw.style.animationDuration = `${12 + Math.random() * 10}s`;
      paw.style.width = `${18 + Math.random() * 16}px`;
      paw.style.height = paw.style.width;
      field.appendChild(paw);
    }
  }

  function setupSparks() {
    const canvas = document.getElementById("sparkCanvas");
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let raf = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.min(70, Math.floor((width * height) / 28000));
      particles = Array.from({ length: count }, () => spawn(true));
    }

    function spawn(randomY) {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + Math.random() * 40,
        r: 0.6 + Math.random() * 2.2,
        speed: 0.15 + Math.random() * 0.55,
        drift: (Math.random() - 0.5) * 0.35,
        alpha: 0.15 + Math.random() * 0.55,
        twinkle: Math.random() * Math.PI * 2,
      };
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        p.twinkle += 0.03;
        if (p.y < -10 || p.x < -20 || p.x > width + 20) {
          Object.assign(p, spawn(false));
        }
        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.twinkle));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(255, 232, 170, ${a})`);
        g.addColorStop(0.4, `rgba(224, 176, 74, ${a * 0.55})`);
        g.addColorStop(1, "rgba(224, 176, 74, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
  }

  function setupParallax() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const orbit = document.querySelector(".logo-orbit");
    const video = document.querySelector(".hero-video-shell");
    if (!orbit && !video) return;

    window.addEventListener(
      "pointermove",
      (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        if (orbit) orbit.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        if (video) video.style.transform = `translate(${x * -0.25}px, ${y * -0.25}px)`;
      },
      { passive: true }
    );
  }

  applyLinks();
  setupCopy();
  setupNav();
  setupReveal();
  setupPaws();
  setupSparks();
  setupParallax();
})();
const target=document.getElementById("target");
const area=document.getElementById("gameArea");

const scoreText=document.getElementById("score");
const timeText=document.getElementById("time");

const start=document.getElementById("startGame");

let score=0;
let time=30;
let timer;
let move;

function randomMove(){

    const maxX=area.clientWidth-90;
    const maxY=area.clientHeight-90;

    target.style.left=Math.random()*maxX+"px";
    target.style.top=Math.random()*maxY+"px";

}

start.onclick=()=>{

startSound.currentTime = 0;
startSound.play();
    score=0;
    time=30;

    scoreText.innerText=score;
    timeText.innerText=time;

    target.style.display="block";

    randomMove();

    clearInterval(move);
    clearInterval(timer);

    move=setInterval(randomMove,700);

    timer=setInterval(()=>{

        time--;

        timeText.innerText=time;

        if(time<=0){

            clearInterval(move);
            clearInterval(timer);

            target.style.display="none";

            if(score >= 30){

    winSound.currentTime = 0;
    winSound.play();

    alert("🏆 YOU WIN!\n\nScore: " + score);

}else{

    loseSound.currentTime = 0;
    loseSound.play();

    alert("💀 GAME OVER!\n\nScore: " + score);

}

        }

    },1000);

}

target.onclick=()=>{

    score++;

    scoreText.innerText=score;

    randomMove();

}
const startSound = document.getElementById("startSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
