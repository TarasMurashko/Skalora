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
        const el = document.createElement('div');
        el.className = 'blog-post-preview';
        el.innerHTML = `
          <h3>${post.title}</h3>
          <div class="blog-summary">${renderSimpleMarkdown(post.summary)}</div>
          <button class="btn btn-accent" onclick="openBlogPost('${post.filename}','${post.title.replace(/'/g, "&apos;")}')">Read</button>
        `;
        blogContainer.appendChild(el);
      });
    });

  // Basic modal for full blog post
  const modal = document.createElement('div');
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.inset = '0';
  modal.style.background = 'rgba(0,0,0,0.25)';
  modal.style.zIndex = '9999';
  modal.style.overflow = 'auto';
  modal.innerHTML = `
    <div id="blogModalContent" style="background:#fff;max-width:650px;margin:5vh auto;padding:2rem 2.5rem;border-radius:18px;position:relative;box-shadow:0 4px 32px 0 rgba(33,37,41,0.10);">
      <a id="closeBlogModal" style="position:absolute;right:1rem;top:1rem;font-size:1.7rem;font-weight:700;line-height:1;cursor:pointer;">&times;</a>
      <h2 id="blogModalTitle"></h2>
      <div id="blogModalBody"></div>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('closeBlogModal').onclick = () => modal.style.display = 'none';

  window.openBlogPost = (filename, title) => {
    fetch('blog/' + filename)
      .then(r => r.text())
      .then(md => {
        // find post in index.json for meta info
        fetch('blog/index.json').then(r=>r.json()).then(posts => {
          const post = posts.find(p => p.filename === filename);
          document.getElementById('blogModalTitle').innerText = post ? post.title : title;
        });
        // Skip markdown title and date if present (when showing in modal)
        const split = md.split('\n');
        if (split[0].startsWith('# ') && split[2] && split[2].startsWith('**Date:**')) {
          md = split.slice(4).join('\n');
        }
        document.getElementById('blogModalBody').innerHTML = renderSimpleMarkdown(md);
        modal.style.display = 'block';
      })
  };

  function renderSimpleMarkdown(md) {
    // Minimal markdown rendering: support h1/h2/h3, **bold**, *italic*, [link](url), paragraphs, code blocks.
    // Handle triple backtick code block (multi-line)
    md = md.replace(/```([\s\S]*?)```/g, function(match, code) {
      return '<pre><code>' +
        code.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])) +
        '</code></pre>';
    });
    // Inline code: `...`
    md = md.replace(/`([^`]+?)`/g, function(match, code) {
      return '<code>' +
        code.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])) +
        '</code>';
    });
    let html = md
      .replace(/^### (.*)$/gim, '<h3>$1</h3>')
      .replace(/^## (.*)$/gim, '<h2>$1</h2>')
      .replace(/^# (.*)$/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*?)\*/gim, '<i>$1</i>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    html = '<p>' + html + '</p>';
    return html;
  }
});

// Optional: highlight input error
const style = document.createElement('style');
style.innerHTML = `.input-error { border: 1.5px solid #ff4d4f !important; }`;
document.head.appendChild(style);

