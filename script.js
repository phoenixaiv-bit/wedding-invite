// Плавный скролл к якорям
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
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