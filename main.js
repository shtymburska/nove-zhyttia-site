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
