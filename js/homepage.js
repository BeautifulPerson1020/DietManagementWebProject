let date = new Date();
let thisMonthDates = [];
const today = new Date();
const fetchedDataArr = [];
let totalCalories = 0;
let totalCost = 0;
let totalSugars = 0;
let viewYear;
let viewMonth;
let isDailySwitchOn = false;
let monthlyAverageIntakeCalories = 0;
let monthlyAverageIntakeSugars = 0;
let monthlyAverageCost = 0;
let dailyIntakeCalories = 0;
let dailyIntakeSugars = 0;
let dailyCost = 0;

const button = document.querySelector('.monthly');
button.style.backgroundColor = '#d3d3d3'; // 클릭된 버튼의 색상으로 변경합니다.


const renderCalender = () => {
    viewYear = date.getFullYear();
    viewMonth = date.getMonth();

    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const pLDate = prevLast.getDate();
    const pLDay = prevLast.getDay();

    const tLDate = thisLast.getDate();
    const tLDay = thisLast.getDay();

    const prevDates = [];
    thisMonthDates = [...Array(tLDate + 1).keys()].slice(1);
    const nextDates = [];
    // console.log("thisDates: "+

    if (pLDay !== 6) {
        for (let i = 0; i < pLDay + 1; i++) {
            prevDates.unshift(pLDate - i);
        }
    }

    for (let i = 1; i < 7 - tLDay; i++) {
        nextDates.push(i);
    }


    // console.log("prevDates: "+ prevDates);
    // console.log("nextDates: "+nextDates);
    const dates = prevDates.concat(thisMonthDates, nextDates);

    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(tLDate);

    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
            ? 'this'
            : 'other';
        dates[i] = `<div class="date" onclick="popup()"><span class=${condition}>${date}</span></div>`;
    })

    document.querySelector('.dates').innerHTML = dates.join('');

    // const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }
    fetchMonthlyAverageData();
    updateMonthlyDataOnScreen();
    // console.log(today.getDate());
}

renderCalender();

const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalender();
}

const nextMonth = () => {
    date.setMonth((date.getMonth() + 1));
    renderCalender();
}

const goToday = () => {
    date = new Date();
    renderCalender();
}


let popupInitialized = false;
const popup = () => {
    // 이벤트 핸들러가 이미 연결되어 있다면 함수를 종료
    console.log(popupInitialized);
    if (popupInitialized) {
        return;
    }

    document.querySelectorAll('.date').forEach(function (dateDiv) {
        dateDiv.addEventListener('click', function () {
            // 클릭된 div.date의 하위 span 요소 선택
            let span = dateDiv.querySelector('span');

            // console.log(span.innerHTML.toString());
            console.log(fetchedDataArr);
            // span 요소의 클래스에 따라 다른 동작 수행
            // 버튼클릭시 JSON 을 fetch함
            if (span.classList.contains('this')) {
                console.log(isDailySwitchOn);
                fetchedDataArr.length = 0;
                totalCalories = 0;
                totalSugars = 0;
                totalCost = 0;
                monthlyAverageIntakeCalories = 0;
                monthlyAverageIntakeSugars = 0;
                monthlyAverageCost = 0;
                dailyIntakeCalories = 0;
                dailyIntakeSugars = 0;
                dailyCost = 0;
                fetch('../json/dailyreport.json')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(item => {
                            // json에서 추출한걸 Date 객체로 변환
                            const itemDate = new Date(item.date);

                            let obj = {
                                date: item.date,
                                daily_calories_amount: item.daily_calories_amount,
                                daily_cost_amount: item.daily_cost_amount,
                                daily_sugars_amount: item.daily_sugars_amount,
                            }

                            // if( json에서 추출한 item.date의 year 과 month가 today의 year과 month와 같을 경우)
                            // (
                            // (  여기에 유저 아이디와 일치하는 데이터만 받아오게하는 조건문이 필요함                )
                            // (
                            // (
                            if (viewYear === itemDate.getFullYear() && viewMonth + 1 === itemDate.getMonth() + 1) {
                                // fetchedDataArr.length = 0; 나중에 이거 해야한다.
                                fetchedDataArr.push(obj);
                            }

                        });

                        // 데이터를 처리하는 부분을 이곳으로 이동
                        fetchedDataArr.forEach(item => {
                            totalCalories += item.daily_calories_amount;
                            totalSugars += item.daily_sugars_amount;
                            totalCost += item.daily_cost_amount;
                        });

                        // 여기에 선택한 월/ 일 정보 받아와야함.

                        for (const item of fetchedDataArr) {
                            const itemDate = new Date(item.date);
                            if (viewYear === itemDate.getFullYear()
                                && viewMonth === itemDate.getMonth()
                                && span.innerHTML.toString() === itemDate.getDate().toString()) {
                                console.log(item.daily_calories_amount);
                                dailyIntakeCalories = item.daily_calories_amount;
                                dailyIntakeSugars = item.daily_sugars_amount;
                                dailyCost = item.daily_cost_amount;
                            }
                            console.log(date);
                            console.log(itemDate);
                        }

                        // 저번 달 일일 평균 섭치 칼로리 계산
                        if (today.getFullYear() !== date.getFullYear() && today.getMonth() !== date.getMonth()) {
                            monthlyAverageIntakeCalories = totalCalories / thisMonthDates.length;
                            monthlyAverageIntakeSugars = totalSugars / thisMonthDates.length;
                            monthlyAverageCost = totalCost / thisMonthDates.length;
                        } else { // 이번 달 일일 평균 섭취 칼로리 계산
                            monthlyAverageIntakeCalories = totalCalories / today.getDate();
                            monthlyAverageIntakeSugars = totalSugars / today.getDate();
                            monthlyAverageCost = totalCost / today.getDate();
                        }
                        if (!isDailySwitchOn) {
                            fetchMonthlyAverageData();
                        } else {
                            // 일간 세부 사항
                            console.log("일섭취칼: " + dailyIntakeCalories);
                            let $averageIntakeCalories = document.getElementById('output-average-kcal');

                            if ($averageIntakeCalories) {
                                $averageIntakeCalories.textContent = dailyIntakeCalories.toString();
                            } else {
                                console.error('output-average-kcal 요소를 찾을 수 없습니다.');
                            }

                            console.log("일섭취당: " + dailyIntakeSugars);
                            let $averageIntakeSugars = document.getElementById('output-nutrition-status');

                            if (roundToTwoDecimalPlaces(monthlyAverageIntakeSugars) > 50) {
                                $averageIntakeSugars.textContent = "과당 상태";
                            } else if (roundToTwoDecimalPlaces(monthlyAverageIntakeSugars) < 0) {
                                $averageIntakeSugars.textContent = "저당 상태";
                            } else {
                                $averageIntakeSugars.textContent = "영향 상태 좋음";
                            }

                            console.log("일돈쓴거: " + dailyCost);
                            let $averageCost = document.getElementById('output-average-expense');

                            if ($averageCost) {
                                $averageCost.textContent = roundToTwoDecimalPlaces(dailyCost.toString());
                            } else {
                                console.error('output-average-expense 요소를 찾을 수 없습니다.');
                            }
                        }
                    })
                    .catch(error => {
                        console.error('데이터를 가져오는 도중 오류가 발생했습니다.', error);
                    });

                return;

            } else if (span.classList.contains('other')) {
                // other 클래스가 지정된 경우 아무 작업도 수행하지 않음
                // 여기에 필요한 추가 동작을 추가할 수 있음
            }

            // 여기에 필요한 추가 동작을 추가할 수 있음
        });
    });

    // 이벤트 핸들러가 한 번만 연결되었음을 표시
    popupInitialized = true;
}
popup();

function fetchMonthlyAverageData() {
    // 데이터 초기화
    fetchedDataArr.length = 0;
    totalCalories = 0;
    totalSugars = 0;
    totalCost = 0;
    monthlyAverageIntakeCalories = 0;
    monthlyAverageIntakeSugars = 0;
    monthlyAverageCost = 0;
    dailyIntakeCalories = 0;
    dailyIntakeSugars = 0;
    dailyCost = 0;

    // fetch 함수로 데이터를 가져옵니다.
    fetch('../json/dailyreport.json')
        .then(response => response.json())
        .then(data => {
            // 가져온 데이터를 처리합니다.
            data.forEach(item => {
                const itemDate = new Date(item.date);

                // 현재 년도와 월에 해당하는 데이터만 필터링합니다.
                if (viewYear === itemDate.getFullYear() && viewMonth + 1 === itemDate.getMonth() + 1) {
                    fetchedDataArr.push(item);
                    totalCalories += item.daily_calories_amount;
                    totalSugars += item.daily_sugars_amount;
                    totalCost += item.daily_cost_amount;
                }
            });

            // 저번 달 일일 평균 섭카 칼로리 계산
            if (today.getFullYear() !== date.getFullYear() && today.getMonth() !== date.getMonth()) {
                monthlyAverageIntakeCalories = totalCalories / thisMonthDates.length;
                monthlyAverageIntakeSugars = totalSugars / thisMonthDates.length;
                monthlyAverageCost = totalCost / thisMonthDates.length;
            } else { // 이번 달 일일 평균 섭취 칼로리 계산
                monthlyAverageIntakeCalories = totalCalories / today.getDate();
                monthlyAverageIntakeSugars = totalSugars / today.getDate();
                monthlyAverageCost = totalCost / today.getDate();
            }

            // 화면에 월간 데이터를 업데이트합니다.
            updateMonthlyDataOnScreen();
        })
        .catch(error => {
            console.error('데이터를 가져오는 도중 오류가 발생했습니다.', error);
        });
}

// 화면에 월간 데이터를 업데이트하는 함수
function updateMonthlyDataOnScreen() {
    console.log("MonthlyAverageCalories : " + roundToTwoDecimalPlaces(monthlyAverageIntakeCalories));
    let $averageIntakeCalories = document.getElementById('output-average-kcal');
    if ($averageIntakeCalories) {
        $averageIntakeCalories.textContent = roundToTwoDecimalPlaces(monthlyAverageIntakeCalories.toString());
    } else {
        console.error('output-average-kcal 요소를 찾을 수 없습니다.');
    }

    console.log("MonthlyAverageSugars : " + roundToTwoDecimalPlaces(monthlyAverageIntakeSugars));
    let $averageIntakeSugars = document.getElementById('output-nutrition-status');
    if (roundToTwoDecimalPlaces(monthlyAverageIntakeSugars) > 50) {
        $averageIntakeSugars.textContent = "과당 상태";
    } else if (roundToTwoDecimalPlaces(monthlyAverageIntakeSugars) < 0) {
        $averageIntakeSugars.textContent = "저당 상태";
    } else {
        $averageIntakeSugars.textContent = "영향 상태 좋음";
    }

    console.log("MonthlyAverageCost : " + roundToTwoDecimalPlaces(monthlyAverageCost));
    let $averageCost = document.getElementById('output-average-expense');
    if ($averageCost) {
        $averageCost.textContent = roundToTwoDecimalPlaces(monthlyAverageCost.toString());
    } else {
        console.error('output-average-expense 요소를 찾을 수 없습니다.');
    }
}

function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
}

// 월간 기록 종합 버튼 클릭 시 실행될 함수
function showMonthlyRecords() {
    isDailySwitchOn = false;
    const summarySquares = document.querySelectorAll('.summary_square > div');

    summarySquares.forEach(function (square, index) {
        switch (index) {
            case 0:
                square.querySelector('h2').innerHTML = '월간 섭취 칼로리 &nbsp&nbsp:';
                break;
            case 1:
                square.querySelector('h2').innerHTML = '월간 영양 상태 &nbsp&nbsp&nbsp&nbsp&nbsp:';
                break;
            case 2:
                square.querySelector('h2').innerHTML = '월평균 지출  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:';
                break;
            default:
                break;
        }
    });
}

// 일간 세부 기록 버튼 클릭 시 실행될 함수
function showDailyRecords() {
    isDailySwitchOn = true;
    const summarySquares = document.querySelectorAll('.summary_square > div');

    summarySquares.forEach(function (square, index) {
        switch (index) {
            case 0:
                square.querySelector('h2').innerHTML = '일간 섭취 칼로리 &nbsp&nbsp:';
                break;
            case 1:
                square.querySelector('h2').innerHTML = '일간 영양 상태 &nbsp&nbsp&nbsp&nbsp&nbsp:';
                break;
            case 2:
                square.querySelector('h2').innerHTML = '일간 지출  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:';
                break;
            default:
                break;
        }
    });
}

// 버튼 요소 가져오기
const monthlyBtn = document.querySelector('.ch-btn.monthly');
const dailyBtn = document.querySelector('.ch-btn.daily');

// 버튼 클릭 시 해당 함수 실행
monthlyBtn.addEventListener('click', showMonthlyRecords);
dailyBtn.addEventListener('click', showDailyRecords);

