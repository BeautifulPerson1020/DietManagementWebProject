/*검색 및 저장*/
const searchInput = document.getElementById("searchInput");
const searchBnt = document.getElementById("searchBnt");
const searchResult = document.getElementById("searchResult");
const eatTime = document.getElementById("eatTime");
const foodAmount = document.getElementById("foodAmount");
const foodCost = document.getElementById("foodCost");
/*유저가 직접 입력하는 모달*/
const modalPopUp = document.getElementById("modalPopUp");
const foodName = document.getElementById("foodName");
const foodCalories = document.getElementById("foodCalories");
const foodSugars = document.getElementById("foodSugars");
const saveUserFood = document.getElementById("saveUserFood");
const cancleCreate = document.getElementById("cancleCreate");
/*검색 결과 페이지 전환*/
const pagination = document.getElementById('pagination');   //페이지 전환용 버튼 생성 필드
const searchBtn = document.getElementById("searchBtn");
const recordSaveBtn = document.getElementById("recordSaveBtn");
const recordCancleBtn = document.getElementById("recordCancleBtn");
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let selectedFood = null;
const pageSize = 10; // Number of items per page
let currentPage = 1;

import food from "../json/../json/food.json" assert{ type: "json"};
/*fetch('../json/food.json')
    .then(res => res.json()) // .json() 메서드는 json 응답을 JavaScript 객체 리터럴로 구문분석합니다.
    .then(data => food=data);*/

let resultFood = food;

/*검색결과 페이징*/
function renderTable(page) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const tbody = searchResult;
    tbody.innerHTML = ''; // Clear table body
    for (let i = start; i < Math.min(end, resultFood.length); i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${resultFood[i].식품코드}</td>
                <td>${resultFood[i].식품명}</td>
                <td>${resultFood[i].에너지}</td>
                <td>${resultFood[i].당류}</td>
            `;
        row.addEventListener('click', () => {
            /*저장 함수*/
            searchInput.value = row.cells[1].innerText;
            selectedFood = row.cells[0].innerText;
            console.log("id: " + row.cells[0].innerText);
        });
        row.addEventListener('mouseenter', () => {
            row.classList.add('table-active');
        })
        row.addEventListener('mouseleave', () => {
            row.classList.remove('table-active');
        })
        tbody.appendChild(row);
    }
}

function renderPagination() {
    pagination.innerHTML = ''; // Clear pagination

    const totalPages = Math.ceil(resultFood.length / pageSize);

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
        }
    });
    pagination.appendChild(prevButton);

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable(currentPage);
        }
    });
    /*.className = "btn px-1 ms-1"
      .className = "btn px-1 ms-1 disabled"*/
    pagination.appendChild(nextButton);
}

renderTable(currentPage);
renderPagination();
/*검색 결과 페이징 끝*/

/*검색 및 저장*/
searchBtn.addEventListener('click', searchFood);
recordSaveBtn.addEventListener('click', recordFood);
recordCancleBtn.addEventListener('click', recordCancle);
searchInput.addEventListener('keyup', () => {
    if (event.keyCode === 13) {
        searchFood();
    }
})

function recordCancle(){
    location.href="../html/record_main.html";
}

/*console.log(food); 이거 왜 food가 정의되지 않았다고 나오지 (질문해라)*/

function searchFood(){
    if(!searchInput.value){
        alert("음식이름을 입력하세요");
    }
    else {
        /*let searchWord = new RegExp(searchInput.value); //exec()함수 사용하려 만든 변수
        let result = food.filter((value) => value.식품명.exec(searchWord));    //식품명.exec is not a function 오류*/
        /*exec()함수와 mathc()함수의 차이?*/
        resultFood = food.filter((value) => value.식품명.match(searchInput.value));
        if(resultFood.length != 0) {
            renderTable(1);
            renderPagination();
        }
        else {
            if(confirm("검색결과가 없습니다. 직접 입력하시겠습니까?")){
                modalPopUp.classList.add('on');
                /*location.href="../html/record_user_create.html";*/
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
    else if(selectedFood == null){
        alert("음식을 선택하세요")
    }
    else {
        if(confirm("식단을 저장하시겠습니까?")){
            /*저장 코드*/
            alert("저장되었습니다");
            console.log("저장");
            location.href="../html/record_main.html";
        }
    }
}
/*const selectFood = (newHtml) => { /!*따로 만들고 넣으면 클릭 안했는데 실행됨 (질문하자)*!/
    /!*저장함수*!/
    console.log(newHtml.innerText);
}*/
/*검색 및 저장 끝*/

/*모달 관련*/
saveUserFood.addEventListener('click', createFood);
cancleCreate.addEventListener('click', createCancle);

let userCreatedFood = {
    "user_food_id" : 1,
    "user_food_name" : "유저음식",
    "user_food_calories" : 10.2,
    "user_food_sugars" : 1.2
}

function createFood(){
    if(!foodName.value){
        alert("음식이름을 입력하세요");
    }
    else if(!foodCalories.value){
        alert("칼로리(kcal)를 입력하세요");
    }
    else if(!foodSugars.value){
        alert("당류(g)를 입력하세요");
    }
    else {
        if(confirm("음식을 저장하시겠습니까?")){
            /*저장 코드*/
            userCreatedFood.user_food_id = 1;
            userCreatedFood.user_food_name = foodName.value;
            userCreatedFood.user_food_calories = foodCalories.value;
            userCreatedFood.user_food_sugars = foodSugars.value;
            searchInput.value = userCreatedFood.user_food_name;
            selectedFood=userCreatedFood;
            console.log(selectedFood)
            alert("저장되었습니다");
            modalPopUp.classList.remove('on');
            /*location.href="../html/record_add_search.html";*/
        }
    }
}

function createCancle(){
    modalPopUp.classList.remove('on');
    /*location.href="../html/record_add_search.html";*/
}
/*모달 끝*/