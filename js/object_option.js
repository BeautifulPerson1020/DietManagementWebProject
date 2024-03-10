function redirectToGoalAdd() {
    const currentGoalContent = document.getElementById('current-goal').innerHTML.trim();

    if (currentGoalContent !== '') {
        alert('이미 목표가 존재합니다.');
    } else {
        const newGoal = prompt('새로운 목표를 입력하세요.');
        if (newGoal !== null && newGoal !== '') {
            document.getElementById('current-goal').innerHTML = `<p>${newGoal}</p>`;
        }
    }
}
