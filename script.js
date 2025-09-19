// LearnHive basic interactivity: nav toggle, theme toggle, smooth scroll, reveal on scroll
document.addEventListener('DOMContentLoaded', function(){
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const themeToggle = document.getElementById('theme-toggle');

  navToggle && navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Theme: toggle a "light" or "dark" theme using class on documentElement
  const userTheme = localStorage.getItem('learnhive_theme');
  if(userTheme === 'light') document.documentElement.classList.add('light-mode');

  themeToggle && themeToggle.addEventListener('click', () => {
    if(document.documentElement.classList.contains('light-mode')){
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('learnhive_theme', 'dark');
      themeToggle.textContent = '🌗';
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('learnhive_theme', 'light');
      themeToggle.textContent = '🌞';
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close nav on mobile
        if(nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // simple reveal on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.card, .hero-text, .roadmap-card').forEach(el=>{
    observer.observe(el);
  });

  // contact form: show simple success message (Formspree will redirect or handle response)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      // Let the form submit normally to Formspree; show tiny feedback immediately
      const btn = form.querySelector('button[type="submit"]');
      if(btn){
        btn.disabled = true;
        btn.textContent = 'Sending...';
      }
      // No preventDefault here — keep simple to work with Formspree or normal backend
    });
  }
});
