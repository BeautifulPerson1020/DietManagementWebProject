// verication.html 팝업창
function openVerificationPopup() {
    var popupWidth = 400;
    var popupHeight = 330;

    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var leftPosition = (screenWidth - popupWidth) / 2;
    var topPosition = (screenHeight - popupHeight) / 2;

    window.open('verification.html', 'Verification', 'width='+popupWidth +',height=' + popupHeight + ', left=' + leftPosition + ', top=' + topPosition);
}

function verifyPhoneNumber() {
    // 여기에 실제 인증 로직을 구현하고 인증이 성공하면 아래의 코드를 실행
    document.getElementById("verifyButton").classList.add("verified");
    document.getElementById("verificationStatus").textContent = "인증됨";
}

function validateForm() {
    // 나이, 체중, 키가 정수인지 확인
    var ageInput = document.getElementById('age');
    var weightInput = document.getElementById('weight');
    var heightInput = document.getElementById('height');

    if (!isInteger(ageInput.value)) {
        alert('유효한 나이(정수)를 입력해주세요.');
        return false;
    }
    if (!isInteger(weightInput.value)) {
        alert('유효한 체중(정수)을 입력해주세요.');
        return false;
    }
    if (!isInteger(heightInput.value)) {
        alert('유효한 키(정수)를 입력해주세요.');
        return false;
    }
    return true;
}

function validateForm1() {
    // 나이, 체중, 키가 정수인지 확인
    var idInput = document.getElementById('id');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirmPassword');
    var emailInput = document.getElementById('email');

    // ID 규칙 확인
    if (!validateId(idInput.value)) {
        alert('유효한 ID를 입력해주세요.');
        return false;
    }

    // 비밀번호 규칙 확인
    if (!validatePassword(passwordInput.value)) {
        alert('유효한 비밀번호를 입력해주세요.');
        return false;
    }

    // 비밀번호 확인
    if (passwordInput.value !== confirmPasswordInput.value) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }

    // 이메일 규칙 확인
    if (!validateEmail(emailInput.value)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        return false;
    }
    return true;
}
function redirectToRegister_detail() {
    if (validateForm1()) {
        // 만약 폼이 유효하다면, homepage.html 로 이동
        window.location.href = 'register_detail.html';
    }
}

function validateFormAndRedirect() {
    // 폼 필드 유효성 검사
    if (validateForm()) {
        // 만약 폼이 유효하다면, homepage.html 로 이동
        window.location.href = 'homepage.html';
    }
}
function isInteger(value) {
    return /^\d+$/.test(value);         // 문자열이 숫자로만 이루어져 있고, 문자열의 처음부터 끝까지가 숫자로만 구성
}

// ID 규칙 확인
function validateId(id) {
    return /^[A-Za-z0-9]+$/.test(id);
}

// 비밀번호 규칙 확인
function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
}

// 이메일 규칙 확인
function validateEmail(email) {
    // 이메일 정규식은 간단하게 구현되어 있으므로 실제 프로덕션에서는 더 정교한 정규식을 사용하는 것이 좋습니다.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}



/* verification.html 의 javasciprt 문자인증 구현 추가 필요함 */
function sendVerificationCode() {
    var name = document.getElementById('name').value;
    var phoneNumber = document.getElementById('phoneNumber').value;

    // 서버에 이름과 전화번호를 보내어 SMS를 요청
    fetch('/send_verification_code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, phoneNumber: phoneNumber })
    })
        .then(response => response.json())
        .then(data => {
            alert('Verification code sent successfully!');
            // 여기에서 사용자가 받은 코드를 입력하는 입력란을 보여줄 수 있습니다.
            showVerificationInputs();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showVerificationInputs() {
    var verificationInputs = document.getElementById('verificationInputs');
    verificationInputs.style.display = 'block';
}

function verifyCode() {
    var verificationCode = document.getElementById('verificationCode').value;
    var name = document.getElementById('name').value;
    var phoneNumber = document.getElementById('phoneNumber').value;

    // 입력된 값이 모두 채워져 있는지 확인
    if (!verificationCode || !name || !phoneNumber) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    // 이름이 한글로만 구성되어 있는지 확인
    if (!/^[가-힣]+$/.test(name)) {
        alert('이름은 한글로만 입력해주세요.');
        return;
    }

    // 전화번호가 숫자로만 구성되어 있는지 확인
    if (!/^\d+$/.test(phoneNumber)) {
        alert('전화번호는 숫자로만 입력해주세요.');
        return;
    }
    // 여기에서 서버에 입력한 코드를 보내어 검증하고,
    // 검증이 성공하면 회원 가입을 완료하도록 구현 가능

    // Verification 성공 시 버튼 색상 변경
    setCookie('verified', 'true', 1);
}

// 쿠키 설정 함수
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 쿠키 가져오기 함수
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    var verified = getCookie('verified');
    if (verified === 'true') {
        // Verify 버튼 색상 변경
        var verifyButton = document.querySelector('.verify-button');
        if (verifyButton) {
            verifyButton.style.backgroundColor = 'red';
        }
    }
});