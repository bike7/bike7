window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bg");

  if (!canvas) return; // safety guard

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const plants = [];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // create layered plant field
  for (let i = 0; i < 18; i++) {
    plants.push({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      scale: rand(0.6, 1.8),
      sway: rand(0, Math.PI * 2),
      speed: rand(0.002, 0.01),
      hue: rand(90, 140)
    });
  }

  function drawPlant(p, t) {
    const sway = Math.sin(t * p.speed + p.sway) * 12;

    ctx.save();
    ctx.translate(p.x + sway, p.y);
    ctx.scale(p.scale, p.scale);

    ctx.fillStyle = `hsl(${p.hue}, 35%, 78%)`;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(20, -40, 40, 0);
    ctx.quadraticCurveTo(20, 40, 0, 0);
    ctx.fill();

    ctx.restore();
  }

  function animate(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // soft pastel gradient background
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#f5f1ea");
    grad.addColorStop(1, "#e9efe7");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const p of plants) {
      drawPlant(p, t);
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});