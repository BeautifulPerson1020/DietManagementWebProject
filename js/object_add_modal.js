const btnOpenModal=document.querySelector('.btn-open-modal');
const modalOn = document.getElementById('modalOn');

btnOpenModal.addEventListener("click", ()=>{
    if (!isHaveContent) {
        // 현재 목표가 이미 존재하는 경우 경고창 표시
        alert("이미 목표가 존재합니다.");
    }
    else modalOn.classList.add('on');
});

let isHaveContent=true;

const exModal = document.querySelector('.exit-object-modal');
const goalContent = document.getElementById('current-goal-content');
const dDay = document.getElementById('dDay');
const goal = document.getElementById('goal');
const targetKcal = document.getElementById('targetKcal');
const usedMoney = document.getElementById('usedMoney');

exModal.addEventListener("click", () => {
    // 창 닫기
    modalOn.classList.remove('on');
    goalContent.innerText = dDay.value+'\n';
    goalContent.innerText += goal.value+'\n';
    goalContent.innerText += targetKcal.value+'\n';
    goalContent.innerText += usedMoney.value+'\n';
    isHaveContent = false;
})