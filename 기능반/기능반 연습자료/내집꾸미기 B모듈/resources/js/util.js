class util {
    constructor() {
        this.list = document.querySelector('#goods_list')
    }

    drawList(data) {
        this.removeList();
        data.forEach(e=> {
            this.list.innerHTML += `
            <div class="row text-center mt-2 align-items-center border-top pt-2" draggable="true" data-id="${e.id}">
                <div class="col"><img src="./resources/images/${e.photo}" width="100px" alt=""></div>
                <div class="col">${e.product_name}</div>
                <div class="col">${e.brand}</div>
                <div class="col">${e.price}</div>
            </div>
            `
        })
    }

    searchList(data) {
        if(data) {
            this.list.innerHTML += `
            <div class="row text-center mt-2 align-items-center border-top pt-2" draggable="true" data-id="${e.id}">
                <div class="col"><img src="./resources/images/${data.photo}" width="100px" alt=""></div>
                <div class="col">${data.product_name}</div>
                <div class="col">${data.brand}</div>
                <div class="col">${data.price}</div>
            </div>
        `
        } else {
            this.list.innerHTML += `
                <div class="row text-center mt-2 align-items-center border-top pt-2">
                <div class="col">검색결과가 없습니다.</div>
                </div>
            `
        }
    }

    removeList() {
        this.list.innerHTML = ""
    }

    cho_hangul(str) {
        let cho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i) - 44032;
            if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
        }

        return result;
    }

}