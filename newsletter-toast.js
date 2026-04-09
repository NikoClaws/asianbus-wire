// Newsletter subscription feedback
document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('subscribed') === '1') {
    showToast('🎉 Subscribed! Check your inbox for K-Pop news.', 'success');
    window.history.replaceState({}, '', window.location.pathname);
  } else if (params.get('error') === '1') {
    showToast('❌ Something went wrong. Please try again.', 'error');
    window.history.replaceState({}, '', window.location.pathname);
  }
});

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;
  toast.style.cssText = 'position:fixed;top:20px;right:20px;padding:15px 25px;border-radius:8px;color:white;font-weight:500;z-index:9999;animation:slideIn 0.3s ease;' + 
    (type === 'success' ? 'background:#10B981;' : 'background:#EF4444;');
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}
