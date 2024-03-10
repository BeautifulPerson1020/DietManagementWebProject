const searchInput = document.getElementById("searchInput");
const searchBnt = document.getElementById("searchBnt");
const searchResult = document.getElementById("searchResult");
const eatTime = document.getElementById("eatTime");
const foodAmount = document.getElementById("foodAmount");
const foodCost = document.getElementById("foodCost");

let food
fetch('../json/food.json')
    .then(res => res.json()) // .json() 메서드는 json 응답을 JavaScript 객체 리터럴로 구문분석합니다.
    .then(data => food=data);

function searchFood(){
    if(!searchInput.value){
        alert("음식이름을 입력하세요");
    }
    else if(food.filter((value) => value.food_name == searchInput.value) != 0){
        let result = food.filter((value) => value.food_name == searchInput.value);
        console.log(result)
        searchResult.replaceChildren();
        const newHtml = document.createElement("div");
        const newText = document.createTextNode("AppendChild");
        newHtml.append(newText);
        searchResult.appendChild(newHtml);
    }
    else {
        let choice =  confirm("검색결과가 없습니다. 직접 입력하시겠습니까?");
        if(choice){
            location.href="../html/record_user_create.html";
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
        /*저장할 함수*/
    }
}

function recordCancle(){
    location.href="../html/record_main.html";
}

