document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.burger');
  const nav = document.querySelector('.nav-menu');
  
  // Перемикаємо клас 'active' для відкриття/закриття меню
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Закриваємо меню після натискання на посилання
  const navLinks = document.querySelectorAll('.nav-menu ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });
});

// SNOW
(function () {

  /* =================================
     USER SETTINGS
     ================================= */
  const SNOW_SETTINGS = {
    speed: "slow" // "slow" | "normal" | "fast"
  };

  /* =================================
     INTERNAL STATE
     ================================= */
  let snowEnabled = true;
  const SNOWFLAKE_INTERVAL = 500;
  let snowIntervalId = null;

  /* =================================
     STYLES (Injected CSS)
     ================================= */
  const style = document.createElement("style");
  style.innerHTML = `
    /* ================================
       Snowflake style
       ================================ */
    .snowflake {
      position: fixed;
      top: -10px; /* Start above the viewport */
      user-select: none;
      pointer-events: none; /* Do not block clicks */
      z-index: 9999;

      /* Snowflake color (visible on any background) */
      color: rgba(220, 235, 255, 0.95);

      /* Soft glow for better contrast */
      text-shadow:
        0 0 4px rgba(180, 210, 255, 0.8),
        0 0 8px rgba(120, 170, 255, 0.4);

      animation-name: fall;
      animation-timing-function: linear;
    }

    /* Falling animation */
    @keyframes fall {
      to {
        transform: translateY(110vh); /* Fall beyond screen */
      }
    }

    /* ================================
       Snow toggle button
       ================================ */
    .snow-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 10000;

      background: rgba(15, 32, 39, 0.8);
      color: white;
      border: none;
      border-radius: 20px;
      padding: 8px 14px;
      font-size: 13px;
      cursor: pointer;

      backdrop-filter: blur(6px);
    }

    .snow-toggle:hover {
      background: rgba(32, 58, 67, 0.9);
    }
  `;
  document.head.appendChild(style);

  /* =================================
     CREATE SNOWFLAKE
     ================================= */
  function createSnowflake() {
    if (!snowEnabled) return;

    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.textContent = "❄";

    // Size
    const size = Math.random() * 10 + 10;
    snowflake.style.fontSize = size + "px";

    // Horizontal position
    snowflake.style.left = Math.random() * 100 + "vw";

    // Opacity
    snowflake.style.opacity = Math.random() * 0.35 + 0.65;


    // Speed settings
    let minDuration = 18;
    let maxDuration = 30;

    if (SNOW_SETTINGS.speed === "normal") {
      minDuration = 8;
      maxDuration = 14;
    } else if (SNOW_SETTINGS.speed === "fast") {
      minDuration = 5;
      maxDuration = 9;
    }

    snowflake.style.animationDuration =
      (Math.random() * (maxDuration - minDuration) + minDuration) + "s";

    document.body.appendChild(snowflake);

    // Remove snowflake after animation
    setTimeout(() => {
      snowflake.remove();
    }, maxDuration * 1000 + 2000);
  }

  /* =================================
     SNOW CONTROL
     ================================= */
  function startSnow() {
    if (snowIntervalId) return;
    snowIntervalId = setInterval(createSnowflake, SNOWFLAKE_INTERVAL);
  }

  function stopSnow() {
    clearInterval(snowIntervalId);
    snowIntervalId = null;
  }

  /* =================================
     TOGGLE BUTTON
     ================================= */
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "snow-toggle";
  toggleBtn.textContent = "❄ Snow: ON";

  toggleBtn.addEventListener("click", () => {
    snowEnabled = !snowEnabled;
    toggleBtn.textContent = snowEnabled
      ? "❄ Snow: ON"
      : "❄ Snow: OFF";

    snowEnabled ? startSnow() : stopSnow();
  });

  document.body.appendChild(toggleBtn);

  /* =================================
     INIT
     ================================= */
  startSnow();

})();

