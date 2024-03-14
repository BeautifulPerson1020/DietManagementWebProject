document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 제출 동작 방지

    // 사용자가 입력한 ID와 PW 가져오기
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // 로컬 스토리지에서 회원 정보 가져오기
    var userData = JSON.parse(localStorage.getItem('userData'));

    // 회원 정보와 사용자 입력 정보 비교
    if (userData && userData.user_id === username && userData.pw === password) {
        // 로그인 성공 시 main 페이지로 이동
        window.location.href = '../html/homepage.html';
    } else {
        // 로그인 실패 시 메시지 표시
        alert('Invalid username or password. Please try again.');
    }
});