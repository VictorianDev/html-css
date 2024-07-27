document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    document.getElementById('username').textContent = username;
});
