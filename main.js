window.addEventListener('load', (event) => {
    document.getElementById('phoneNumber').value = null;
});
function changeStep() {
    const listStep = document.querySelector('.tour-step').children;
    listStep[0].classList.remove("active-step");
    listStep[1].classList.add("active-step");
}
function toggleGetLink() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const errorPhone = document.getElementById('errorPhone');
    const output = document.querySelector('.tour-result');
    // console.log(selectDate);

    if (phoneNumber) {
        const regexPhoneNumber = /^((\+)33|0)[1-9](\d{2}){4}$/;
        if (phoneNumber.match(regexPhoneNumber)) {
            errorPhone.innerHTML = '';
            errorPhone.style.display = 'none';
        } else {
            output.innerHTML = '';
            errorPhone.innerHTML = 'Số điện thoại không hợp lệ, vui lòng nhập lại!'
            errorPhone.style.display = 'block';
            return;
        }
        errorPhone.innerHTML = '';
        errorPhone.style.display = 'none';
    }
    else {
        output.innerHTML = '';
        errorPhone.innerHTML = 'Chưa nhập số điện thoại khách hàng!'
        errorPhone.style.display = 'block';
        return;
    }
    // console.log(monthAndYear);
    // handleAuthClick();
    const url = 'https://docs.google.com/spreadsheets/d/';
    const ssid = '15anzDS0qs9MQPjGq--2Ht1v8W3_TxChCl5bPsQLQVy4';
    const q1 = `/gviz/tq?`;
    const q2 = 'tqx=out:json';
    const query1 = `select A,B,C,D,E,F,G,H,I,J,K,L,M`;
    const q4 = encodeURIComponent(query1);
    // console.log(q4);

    var tourTitle = document.getElementById('tourDate');
    tourTitle.innerHTML = `TOUR KHÁCH ${phoneNumber}`;

    const endpoint1 = `${url}${ssid}${q1}&${q2}&tq=${q4}`;
    // console.log(endpoint1);
    fetch(endpoint1)
        .then(res => res.text())
        .then(data => {
            var dataList = [];
            const temp = data.substr(47).slice(0, -2);
            const json = JSON.parse(temp);
            const rows = json.table.rows;
            // console.log(json);
            // console.log(rows);
            const output = document.querySelector('.tour-result');
            rows.shift();
            rows2 = rows.filter(row => row.c[0].v == `${phoneNumber}`);
            console.log(rows2);
            output.innerHTML = '';
            for (let index = 0; index < rows2.length; index++) {
                const temp1 = rows2[index].c;
                temp1.shift();
                // console.log(temp1);
                for (let index = 0; index < temp1.length; index += 2) {
                    const div = document.createElement('div');
                    div.classList.add("tour-result-wrapper");
                    const div2 = document.createElement('div');
                    div2.classList.add("tour-result-item");
                    // console.log(index);
                    if (temp1[index + 1] === null || temp1[index + 1].v === null) {
                        continue;
                    }
                    const folderName = temp1[index] !== null ? temp1[index].v : '';
                    const linkValue = temp1[index + 1] !== null ? temp1[index + 1].v : '';

                    var linkContent = `${folderName !== null ? folderName : ''} <br> <a href="${linkValue !== null ? linkValue : ''}" id="link1">${linkValue !== null ? linkValue : ''}</a>`
                    div2.innerHTML = linkContent;
                    div.append(div2);
                    output.append(div);

                }
                changeStep();

            }
        })


    const el = document.querySelector('.tour-result');
    el.style.display = 'block';
}