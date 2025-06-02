// Handle blog read more button click
document.addEventListener('DOMContentLoaded', () => {
    const readMoreBtn = document.querySelector('.custom-btn.btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/blog.html';
        });
    }
});