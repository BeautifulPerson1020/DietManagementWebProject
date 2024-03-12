const searchInput = document.getElementById("searchInput");
const searchBnt = document.getElementById("searchBnt");
const searchResult = document.getElementById("searchResult");
const eatTime = document.getElementById("eatTime");
const foodAmount = document.getElementById("foodAmount");
const foodCost = document.getElementById("foodCost");
const searchTable = document.getElementById("searchTable");

fetch('../json/food.json')
    .then(res => res.json()) // .json() 메서드는 json 응답을 JavaScript 객체 리터럴로 구문분석합니다.
    .then(data => food=data)
    .then(food => {
        for(i=0;i<10;i++){
            let newTr = document.createElement('tr');
            newTr.insertAdjacentHTML('beforeend', `<td>${food[i].식품코드}</td>`);
            newTr.insertAdjacentHTML('beforeend', `<td>${food[i].식품명}</td>`);
            newTr.insertAdjacentHTML('beforeend', `<td>${food[i].에너지}</td>`);
            newTr.insertAdjacentHTML('beforeend', `<td>${food[i].당류}</td>`);
            newTr.addEventListener('click', selectFood = () => {
                /*저장 함수*/
                console.log("id: " + newTr.cells[0].innerText);
            });
            searchResult.appendChild(newTr)
        }
    })

/*console.log(food); 이거 왜 food가 정의되지 않았다고 나오지 (질문해라)*/
function searchFood(){
    if(!searchInput.value){
        alert("음식이름을 입력하세요");
    }
    else {
        let result = food.filter((value) => value.식품명 == searchInput.value);
        if(result.length != 0) {
            searchResult.replaceChildren();
            for(i=0;i<result.length;i++){
                let newTr = document.createElement('tr');
                newTr.insertAdjacentHTML('beforeend', `<td>${result[i].식품코드}</td>`);
                newTr.insertAdjacentHTML('beforeend', `<td>${result[i].식품명}</td>`);
                newTr.insertAdjacentHTML('beforeend', `<td>${result[i].에너지}</td>`);
                newTr.insertAdjacentHTML('beforeend', `<td>${result[i].당류}</td>`);
                newTr.addEventListener('click', selectFood = () => {
                    /*저장 함수*/
                    console.log("id: " + newTr.cells[0].innerText);
                });
                searchResult.appendChild(newTr);
            }
            /*for (i = 0; i < result.length; i++) {
                const newHtml = document.createElement("h5");
                newHtml.className = 'm-0 p-3 border-bottom';
                const newText = document.createTextNode(result[i].food_name + " 칼로리(kcal)" + result[i].food_calories + " 당류(g)" + result[i].food_sugars);
                newHtml.append(newText);
                newHtml.addEventListener('click', selectFood = () => {
                    /!*저장 함수*!/
                    console.log(newHtml.innerText);
                });
                searchResult.appendChild(newHtml);
            }*/
        }
        else {
            if(confirm("검색결과가 없습니다. 직접 입력하시겠습니까?")){
                location.href="../html/record_user_create.html";
            }
        }
    }
}

function recordFood(){
    if(eatTime.value == 0){
        alert("시점을 선택하세요");
    }
    else if(!foodAmount.value){
        alert("양(g)을 입력하세요");
    }
    else if(!foodCost.value){
        alert("가격을 입력하세요");
    }
    else {
        if(confirm("저장하시겠습니까?")){
            /*저장 코드*/
            console.log("저장")
        }
    }
}

function recordCancle(){
    location.href="../html/record_main.html";
}

/*const selectFood = (newHtml) => { /!*따로 만들고 넣으면 클릭 안했는데 실행됨 (질문하자)*!/
    /!*저장함수*!/
    console.log(newHtml.innerText);
}*/
