class drop {
    constructor(data) {
        this.data = data;
        this.dropZone = document.querySelector('#drop_area');
        this.goods = document.querySelectorAll('#goods_list > div');
        this.basketList = document.querySelector('#basket_list');
        this.addEvent();
    }

    addEvent() {
        this.goods.forEach(item=> {
            item.addEventListener('dragstart', (e)=> {
                e.dataTransfer.setData('id', item.dataset.id);
            })
        })
        this.dropZone.addEventListener('dragover',(e)=>e.preventDefault());
        this.dropZone.addEventListener('drop',(e)=> {
            let item = e.dataTransfer.getData("id")
            this.basket(item);
        });
    }

    basket(item) {
        this.data.forEach(e=> {
            // console.log(e.id, item);
            if(e.id == item) {
                this.basketList.innerHTML += `
                    <div class="row text-center mt-2 align-items-center border-top pt-2">
                        <div class="col"><img src="./resources/images/${e.photo}" width="60px" alt=""></div>
                        <div class="col">${e.product_name}</div>
                        <div class="col">${e.brand}</div>
                        <div class="col">${e.price}</div>
                        <div class="col"><input type="number" value="1" style="width: 50px;"></div>
                    </div>
                `
            }
        })
    }

}