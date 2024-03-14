function redirectToGoalAdd() {
    const currentGoalContent = document.getElementById('current-goal-content').innerHTML.trim();

    if (currentGoalContent) {
        // 현재 목표가 이미 존재하는 경우 경고창 표시
        alert("이미 목표가 존재합니다.");
    } else {
        // 현재 목표가 존재하지 않는 경우, 추가할 내용 입력 받기
        const newGoal = document.querySelector('.object_modal_body');
        open('user_object_add.html');
        // const newGoalContent = prompt("현재 목표를 추가하세요:");
        //
        // if (newGoalContent) {
        //     // 사용자가 내용을 입력한 경우, 해당 내용을 current-goal-content 의 내용으로 설정
        //     document.getElementById('current-goal-content').innerHTML = newGoalContent;
        // }
    }
}

function showObjectOptions(index) {
    // 지난 목표를 클릭하여 옵션 표시 (예: 상세보기, 저장, 공유)

    const userOptions = prompt("옵션을 표시합니다. 1. 상세보기 2. 저장 3. 공유");
    switch (userOptions) {
        case '1':
            // 각 지난 목표에 대한 상세보기를 클릭했을 때의 이벤트 처리
            const pastGoalContent = document.getElementById(`past-goal-${index}`).innerText;
            alert(pastGoalContent); // 예시로 각 목표의 내용을 알림창으로 표시
            break;
        case '2' :
            // 컴퓨터에 탐색기가 켜지며 저장하기 방식. 저장 내용은 클릭된 div 의 컨텐츠를 .txt 형식
            const pastGoalContentToSave = document.getElementById(`past-goal-${index}`).innerText;
            saveToFile(pastGoalContentToSave); // 예시로 저장 함수 호출
            break;
        case '3' :
            // 앞서 case1 처럼 html 이 생성되어 그 html 에 대한 주소를 사용자에게 반환.
            const pastGoalAddress = `https://example.com/${index}`; // 예시로 주소 생성
            alert(`공유 주소: ${pastGoalAddress}`); // 주소를 알림창으로 표시
            break;
        default :
            alert("제대로 입력하세요!");
            break;
    }
}

function saveToFile(content) {
    // 파일 저장 함수 - 예시로 console 에 출력하는 것으로 대체
    console.log("txt 형식의 파일로 저장될 내용:");
    console.log(content);
}

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