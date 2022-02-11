class app {
    constructor() {
        this.init();
    }

    init() {
        this.money = $('#money');
        this.grade = $('#grade');
        this.room = $('#room');
        this.room_cnt = $('#room_cnt');
        this.reset = $('#reset');
        this.getLocal();
        
        this.datas = "";
        this.getJson();

        setTimeout(()=>this.setEventHandlers(),100);
    }

    getLocal() {
        if(localStorage.getItem("money") != null) this.money.val(localStorage.getItem("money"));
        if(localStorage.getItem("grade") != null) this.grade.val(localStorage.getItem("grade"));
        if(localStorage.getItem("room") != null) this.room.val(localStorage.getItem("room"));
        if(localStorage.getItem("room_cnt") != null) this.room_cnt.val(localStorage.getItem("room_cnt"));
    }

    getJson() {
        fetch("./resources/json/accommodations.json")
            .then((response)=>response.json())
                .then((data)=> {
                    this.datas = data;
                })
    }

    setEventHandlers() {
        this.reset.click(()=>this.inputReset());
        this.money.change(()=>this.setLocal());
        this.grade.change(()=>this.setLocal());
        this.room.change(()=>this.setLocal());
        this.room_cnt.change(()=>this.setLocal());

        this.search();
    }

    setLocal() {
        localStorage.setItem("money", this.money.val())
        localStorage.setItem("grade", this.grade.val())
        localStorage.setItem("room", this.room.val())
        localStorage.setItem("room_cnt", this.room_cnt.val())
        this.search();
    }

    inputReset() {
        this.money.val("");
        this.grade.val("all");
        this.room.val("single");
        this.room_cnt.val(1);
        this.search();
        this.setLocal();
    }

    search() {
        this.removeList();
        let grade = this.grade.val();
        if(grade == "all") grade = 1;

        this.datas.forEach(e=> {
            if(grade <= e.rating) {
                if(this.room_cnt.val() <= e.rooms[this.room.val()]) {
                    if(this.money.val() >= e.price[this.room.val()]) {
                        this.drawList(e);
                    }
                }
            }
        })
    }

    removeList() {
        $('#list-main').html("")
    }

    drawList(e) {
        document.querySelector('#list-main').innerHTML += `
        <div class="row mt-5">
            <div class="col-2">
                <img src="./resources/imgs/C_images/${e.photo}" width=100 alt="">
            </div>
            <div class="col-2">${e.name}</div>
            <div class="col-2">${e.rating}</div>
            <div class="col-2">${this.room.val()}</div>
            <div class="col-2">${e.rooms[this.room.val()]}</div>
            <div class="col-2">${e.rooms[this.room.val()] * e.price[this.room.val()]}</div>
        </div>
        `
    }

}

$('document').ready(new app())