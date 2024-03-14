// verication.html 팝업창
function openVerificationPopup() {
    var popupWidth = 400;
    var popupHeight = 330;

    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var leftPosition = (screenWidth - popupWidth) / 2;
    var topPosition = (screenHeight - popupHeight) / 2;

    // 사용자가 입력한 데이터 가져오기
    var userId = document.getElementById('id').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;

    // 데이터를 객체로 저장
    var registerData = {
        "user_id": userId,
        "pw": password,
        "email": email
    };

    // Local Storage에 데이터 저장
    localStorage.setItem('registerData', JSON.stringify(registerData));

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
    var userData = {
        "user_id": document.getElementById('id').value,
        "pw": document.getElementById('password').value,

    };

    // JSON 데이터를 다음 페이지로 전달
    localStorage.setItem('userData', JSON.stringify(userData));

    if (validateForm1()) {
        // 만약 폼이 유효하다면, homepage.html 로 이동
        window.location.href = 'register_detail.html';
    }
}

function validateFormAndRedirect() {

    // 사용자가 입력한 데이터 수집
    var registerDetailData = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        weekly_exercise_time: document.getElementById('weekly_exercise_time').value,
        activity_level: document.getElementById('activity_level').value,
        goal: document.getElementById('goal').value
    };

    // JSON 형식으로 변환
    var jsonData = JSON.stringify(registerDetailData);

    // localStorage에서 registerData, registerDetailData, verificationData 가져오기
    var registerData = JSON.parse(localStorage.getItem('registerData'));
    var verificationData = JSON.parse(localStorage.getItem('verificationData'));

    // userData에 모든 데이터를 병합
    var userData = Object.assign({}, registerData, registerDetailData, verificationData);

    // JSON 형식으로 변환
    var userDataJson = JSON.stringify(userData);

    // localStorage에 userData 저장
    localStorage.setItem('userData', userDataJson);

    // 회원가입 완료 페이지로 이동
    location.href = '../html/homepage.html';
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
        .then(()  => {
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
    // var verificationData = JSON.parse(localStorage.getItem('userData'));
    // if (!verificationData) {
    //     alert('Please fill out the registration form first.');
    //     return;
    // }

    var verificationCode = document.getElementById('verificationCode').value;
    var name = document.getElementById('name').value;
    var phoneNumber = document.getElementById('phoneNumber').value;

    // 데이터를 객체로 저장
    var verificationData = {
        "name": name,
        "phoneNumber": phoneNumber
    };
    // Local Storage에 데이터 저장
    localStorage.setItem('verificationData', JSON.stringify(verificationData));

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

    // 가상의 검증 코드
    // 실제로는 서버에 요청을 보내고, 서버에서 검증을 수행해야 합니다.
    if (verificationCode === "1234") {
        // 검증 성공 시 localStorage 에 userData 저장하고 회원가입 완료 페이지로 이동
        localStorage.setItem('verificationData', JSON.stringify(verificationData));
        window.close(); // 팝업창 닫기
    } else {
        alert('Verification code is incorrect. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // 각 페이지에서 사용되는 데이터 키 정의
    var storageKeys = {
        register: 'registerData',
        verification: 'verificationData',
        registerDetail: 'registerDetailData'
    };

    // 현재 페이지의 URL을 기준으로 데이터 키를 선택
    var currentPage = getCurrentPage();
    var currentStorageKey = storageKeys[currentPage];

    if (currentStorageKey) {
        // 현재 페이지에서 사용되는 데이터 수집
        var currentPageData = collectData(currentPage);

        // 기존 데이터 불러오기
        var existingData = JSON.parse(localStorage.getItem(currentStorageKey)) || {};

        // 새로운 데이터와 기존 데이터 병합
        var mergedData = Object.assign({}, existingData, currentPageData);

        // 병합된 데이터를 로컬 스토리지에 저장
        localStorage.setItem(currentStorageKey, JSON.stringify(mergedData));
    }
});


// 현재 페이지의 URL을 기준으로 페이지 식별
function getCurrentPage() {
    var url = window.location.href;
    if (url.includes('register_detail.html')) {
        return 'registerDetail';
    } else if (url.includes('verification.html')) {
        return 'verification';
    } else {
        return 'register';
    }
}

// 각 페이지에서 필요한 데이터 수집
function collectData(page) {
    var data = {};
    if (page === 'register') {
        data.userData = {
            id: document.getElementById('id').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            email: document.getElementById('email').value
        };
    } else if (page === 'verification') {
        data.verificationData = {
            name: document.getElementById('name').value,
            phoneNumber: document.getElementById('phoneNumber').value
        };
    } else if (page === 'registerDetail') {
        data.registerDetailData = {
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            weight: document.getElementById('weight').value,
            height: document.getElementById('height').value,
            weekly_exercise_time: document.getElementById('weekly_exercise_time').value,
            activity_level: document.getElementById('activity_level').value,
            goal: document.getElementById('goal').value
        };
    }
    return data;
}

document.addEventListener('DOMContentLoaded', function() {
    var currentPage = getCurrentPage();
    var currentStorageKey;

    if (currentPage === 'register') {
        currentStorageKey = 'registerData';
    } else if (currentPage === 'verification') {
        currentStorageKey = 'verificationData';
    } else if (currentPage === 'registerDetail') {
        currentStorageKey = 'registerDetailData';
    }

    if (currentStorageKey) {
        var currentPageData = collectData(currentPage);
        var existingData = JSON.parse(localStorage.getItem(currentStorageKey)) || {};
        var mergedData = Object.assign({}, existingData, currentPageData);
        localStorage.setItem(currentStorageKey, JSON.stringify(mergedData));
    }
});