function redirectToMain() {
    window.location.href = 'homepage.html';
}
function redirectToMyPage() {
    window.location.href = 'my_page.html';
}
function redirectToGoal() {
    window.location.href = 'user_object.html';
}
function redirectToRecord() {
    window.location.href = 'record_main.html';
}
function redirectToFeedback() {
    window.location.href = 'feedback.html';
}
function logout() {
    window.location.href = 'login.html';
}
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show-mobile');
}