class util {
    constructor() {
        this.list = document.querySelector('#goods_list')
    }

    drawList(data) {
        this.removeList();
        data.forEach(e=> {
            this.list.innerHTML += `
            <div class="row text-center mt-2 align-items-center border-top pt-2">
                <div class="col"><img src="./resources/images/${e.photo}" width="100px" alt=""></div>
                <div class="col">${e.product_name}</div>
                <div class="col">${e.brand}</div>
                <div class="col">${e.price}</div>
            </div>
            `
        })
    }

    removeList() {
        this.list.innerHTML = ""
    }

}