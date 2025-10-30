// 年份
document.getElementById('year').textContent = new Date().getFullYear();

// 主题切换（含持久化）
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}
document.getElementById('themeToggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// 返回顶部按钮显示/隐藏与滚动
const backToTop = document.getElementById('backToTop');
const onScroll = () => {
  if (window.scrollY > 300) backToTop.classList.add('active');
  else backToTop.classList.remove('active');
};
window.addEventListener('scroll', onScroll, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 表单模拟提交（纯前端，不实际发送网络请求）
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // 简单校验
  if (!name || !email || !message) {
    statusEl.textContent = '请完整填写信息。';
    return;
  }

  statusEl.textContent = '已收到留言（本页本地模拟），感谢！';
  form.reset();
});

// 导航高亮（基于可见段落）
const sections = [
  { id: 'about' },
  { id: 'projects' },
  { id: 'contact' },
];
const navLinks = Array.from(document.querySelectorAll('.nav a'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0.1 });

sections.forEach(({ id }) => {
  const el = document.getElementById(id);
  if (el) io.observe(el);
});


