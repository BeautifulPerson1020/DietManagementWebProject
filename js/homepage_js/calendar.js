let date = new Date();

const renderCalender = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const pLDate = prevLast.getDate();
    const pLDay = prevLast.getDay();

    const tLDate = thisLast.getDate();
    const tLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(tLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (pLDay !== 6) {
        for (let i = 0; i < pLDay + 1; i++) {
            prevDates.unshift(pLDate - i);
        }
    }

    for (let i = 1; i < 7 - tLDay; i++) {
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);

    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(tLDate);

    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
            ? 'this'
            : 'other';
        dates[i] = `<div class="date" onclick="popup()"><span class=${condition}>${date}</span></div>`;
    })

    document.querySelector('.dates').innerHTML = dates.join('');

    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }
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

    document.querySelectorAll('.date').forEach(function(dateDiv) {
        dateDiv.addEventListener('click', function() {
            // 클릭된 div.date의 하위 span 요소 선택
            var span = dateDiv.querySelector('span');

            console.log(span.innerHTML.toString());
            // span 요소의 클래스에 따라 다른 동작 수행
            if (span.classList.contains('this')) {
                alert("1");
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

