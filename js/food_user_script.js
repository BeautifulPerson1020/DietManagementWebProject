const foodName = document.getElementById("foodName");
const foodCalories = document.getElementById("foodCalories");
const foodSugars = document.getElementById("foodSugars");
const saveUserFood = document.getElementById("saveUserFood");
const cancleCreate = document.getElementById("cancleCreate");

/*const fs = require('fs');   //fs(file system)라는 패키지를 사용

const foodData = fs.readFileSync('../json/food.json');

console.log(foodData);  //Node.js 쓰고싶다*/

import userFood from "../json/user_created_food.json" assert{ type: "json"};

let userCreatedFood = {
    "user_food_id" : 1,
    "user_food_name" : "유저음식",
    "user_food_calories" : 10.2,
    "user_food_sugars" : 1.2
}

saveUserFood.addEventListener('click', createFood);
cancleCreate.addEventListener('click', createCancle);

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
            userCreatedFood.user_food_id = userFood.length+1;
            userCreatedFood.user_food_name = foodName.value;
            userCreatedFood.user_food_calories = foodCalories.value;
            userCreatedFood.user_food_sugars = foodSugars.value;
            userFood.push(userCreatedFood);
            console.log(userFood)
            alert("저장되었습니다")
            location.href="../html/record_add_search.html";
        }
    }
}

/*
function saveFood(userFood){
    let fileSysObj = new ActiveXObject('Scripting.FileSystemObject')
    let fileSavePath = fileSysObj.CreateTextFile("../json/user_created_food.json", true);
    fileSavePath.write(JSON.stringify(userFood))
    fileSavePath.close();
}
*/


function createCancle(){
    location.href="../html/record_add_search.html";
}


/* //업데이트 안되고 다운로드만 됨
const obj = { content: 'hello' }

const str = JSON.stringify(obj);
const blob = new Blob([str], {
    type: 'application/json;charset=utf-8',
});

const blobURL = window.URL.createObjectURL(blob);
const tempLink = document.createElement('a');
tempLink.style.display = 'none';
tempLink.href = blobURL;
tempLink.setAttribute('download', `filename.txt`);
document.body.appendChild(tempLink);
tempLink.click();
document.body.removeChild(tempLink);
window.URL.revokeObjectURL(blobURL);*/
