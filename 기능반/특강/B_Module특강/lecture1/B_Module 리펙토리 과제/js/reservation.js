import { calender } from "./calender.js";
export class reservation {

    constructor() {
        this.accoData = ""

        this.name = document.querySelector('#rName');
        this.call = document.querySelector('#rCall');

        this.sign();
        this.getJson();
        
        setTimeout(()=> {
            this.addEvnet();
        },100)

        this.cal = new calender;

    }

    addEvnet = () => {
        document.querySelector('#ok').addEventListener('click', (e)=>this.listUp(e))
    }

    // acco json
    getJson = () => {
        fetch("./resources/json/accommodations.json")
            .then(response => {
                return response.json();
            })
            .then(jsondata => {
                this.accoData = jsondata
            });
    }

    // 사인 하기
    sign = () => {
        this.sign_area = document.querySelector('#sign_area');
        this.context = this.sign_area.getContext('2d');
        this.painting = false;

        this.sign_area.addEventListener('mousemove', this.onMouseMove)
        this.sign_area.addEventListener('mousedown', this.startPainting)
        this.sign_area.addEventListener('mouseup', this.stopPainting)
        this.sign_area.addEventListener('mouseleave', this.stopPainting)

    }

    onMouseMove = (e) => {
        const x = e.offsetX 

        if (!this.painting) {
            return;
        }

        this.context.lineTo(x, y);
        this.context.stroke();
    }

    startPainting = (e) => {
        const x = e.offsetX;
        const y = e.offsetY;

        this.context.beginPath();
        this.context.moveTo(x, y);
        this.painting = true;
    }

    stopPainting = () => {
        this.context.closePath();
        this.painting = false;
    }


    // 예약 내역에 추가
    listUp = (e) => {
        let room_name = document.querySelector('#room').value;
        let reservation_list = document.querySelector('#reservation_list');
        let data = this.accoData[e.target.dataset.idx-1]

        if(this.call.value == "" || this.name.value == "") {
            alert("예약자 정보가 누락 되었습니다.")
            return;
        }

        reservation_list.innerHTML += `
            <div>
                <img src="./resources/imgs/C_images/${data.photo}" alt="">
                <div>${data.name}</div>
                <div>${this.name.value}</div>
                <div>${this.total(Number(data.price[room_name]))}원</div>
            </div>
        `
        

        $('#modal').fadeOut()
    }

    // 총금액 계산
    total = (price) => {
        let term = Number(this.cal.term) + 1;
        return price * term;
    }

    // 예약증
    
    

}