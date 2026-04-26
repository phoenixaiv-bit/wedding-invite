// Плавный скролл к якорям
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));

  const targetDate = new Date('2026-08-15T16:00:00+03:00');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');

  if (daysEl && hoursEl && minutesEl) {
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        daysEl.textContent = '0';
        hoursEl.textContent = '0';
        minutesEl.textContent = '0';
        const title = document.querySelector('.countdown-title');
        if (title) title.textContent = 'Сегодня мы празднуем!';
        return;
      }

      const totalMinutes = Math.floor(diff / 60000);
      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;

      daysEl.textContent = String(days);
      hoursEl.textContent = String(hours);
      minutesEl.textContent = String(minutes);
    };

    updateCountdown();
    setInterval(updateCountdown, 60000);
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Обработка формы (без перезагрузки)
const form = document.getElementById('rsvp-form');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button');
  btn.textContent = 'Отправка...';
  btn.disabled = true;

  const data = new FormData(form);
  const res = await fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (res.ok) {
    form.style.display = 'none';
    document.querySelector('.success-msg').style.display = 'block';
  } else {
    alert('Ошибка отправки. Попробуйте позже.');
    btn.textContent = 'Отправить';
    btn.disabled = false;
  }
});