const foodName = document.getElementById("foodName");
const foodCalories = document.getElementById("foodCalories");
const foodSugars = document.getElementById("foodSugars");

const fs = require('fs');   /*fs(file system)라는 패키지를 사용*/

const foodData = fs.readFileSync('../json/food.json');

console.log(foodData);

function createFood(){
    if(!foodName.value){
        alert("음식 이름을 입력하세요");
    }
    else if(!foodCalories.value){
        alert("칼로리(kcal)를 입력하세요");
    }
    else if(!foodSugars.value){
        alert("당류(g)를 입력하세요");
    }
    else {
        if(confirm("저장하시겠습니까?")){
            /*저장 코드*/

            console.log("저장")
        }
    }
}

function createCancle(){
    location.href="../html/record_add_search.html";
}

