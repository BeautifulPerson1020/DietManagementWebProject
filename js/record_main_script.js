function showDay() {
    const currentDate = new Date();
    const today = document.getElementById("today");
    const msg = (currentDate.getMonth() + 1) + "월 " + currentDate.getDate() + "일";
    today.innerText = msg;
}

function goAddSearch(){
    location.href="../html/record_add_search.html";
}
