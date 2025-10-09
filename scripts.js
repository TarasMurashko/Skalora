// SKALORA SLU — Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Contact form validation and submission
  const form = document.getElementById('contactForm');
  const thankYou = document.getElementById('thankYouMessage');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Validate fields
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();
      let valid = true;
      // Name required
      if (!name) {
        valid = false;
        form.name.classList.add('input-error');
      } else {
        form.name.classList.remove('input-error');
      }
      // Email required + format
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!email || !emailPattern.test(email)) {
        valid = false;
        form.email.classList.add('input-error');
      } else {
        form.email.classList.remove('input-error');
      }
      // Subject required
      if (!subject) {
        valid = false;
        form.subject.classList.add('input-error');
      } else {
        form.subject.classList.remove('input-error');
      }
      // Message required + min 30 chars
      if (!message || message.length < 30) {
        valid = false;
        form.message.classList.add('input-error');
      } else {
        form.message.classList.remove('input-error');
      }
      if (!valid) return;
      // Send via mailto
      const mailto = `mailto:info@skalora-ad.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
      window.location.href = mailto;
      // Hide form, show thank you
      form.style.display = 'none';
      thankYou.style.display = 'block';
    });
  }
});

// === BLOG LOGIC ===
document.addEventListener('DOMContentLoaded', function() {
  const blogContainer = document.getElementById('blogPosts');
  if (!blogContainer) return;
  fetch('blog/index.json')
    .then(r => r.json())
    .then(posts => {
      blogContainer.innerHTML = '';
      posts.forEach(post => {
        // Build file name for html page from .md filename (remove .md, add .html)
        const htmlFile = post.filename.replace(/\.md$/, '.html');
        const el = document.createElement('div');
        el.className = 'blog-post-preview';
        el.innerHTML = `
          <h3>${post.title}</h3>
          <div class="blog-summary">${window.renderSimpleMarkdown(post.summary)}</div>
          <a class="btn btn-accent" href="blog/${htmlFile}">Read</a>
        `;
        blogContainer.appendChild(el);
      });
    });
});

// Optional: highlight input error
const style = document.createElement('style');
style.innerHTML = `.input-error { border: 1.5px solid #ff4d4f !important; }`;
document.head.appendChild(style);

