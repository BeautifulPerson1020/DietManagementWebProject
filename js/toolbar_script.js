function redirectToMain() {
    window.location.href = 'toolbar.html';
}
function logout() {
    window.location.href = 'login.html';
}
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show-mobile');
}