import { distance } from "./distance.js";
export class search {

    constructor(festivalData) {
        this.festivalData = festivalData;

        // 검색 조건
        this.searchOption()
        this.acco_list();

        this.room = document.querySelector('#room');
        this.grade = document.querySelector('#grade');
        this.max = document.querySelector('#maxMoney')
        this.min = document.querySelector('#minMoney')
        this.slide = document.querySelector('#slide')
        this.room_cnt = document.querySelector('#room_cnt')
        this.distance = document.querySelector('#distance')
        this.searchOption()
    }

    // 검색옵션에 관한 모든 함수를 불러옴
    searchOption = () => {
        this.dista();
        this.slideRange();
        this.roomName();
        this.roomCnt();
        this.rating();
        this.reset();
    }

    // 거리
    dista = () => {
        let dis = document.querySelector('#distance');
        dis.addEventListener('change', () => this.acco_list());
    }

    // 금액
    slideRange = () => {
        let max = document.querySelector('#maxMoney')
        let min = document.querySelector('#minMoney')
        let slide = document.querySelector('#slide')
        let current_price = document.querySelector('#current_price');
        max.addEventListener('change', () => {
            if (max.value > 0) {
                slide.max = max.value;
            }
            this.acco_list()
        })

        min.addEventListener('change', () => {
            if (min.value > 0) {
                slide.min = min.value;
            }

            this.acco_list()
        })

        slide.addEventListener('change', () => {
            current_price.innerHTML = `현재가격 : ${slide.value}`;
            this.acco_list()
        })
    }

    // 숙박업소 룸 이름
    roomName = () => {
        let room = document.querySelector('#room');
        room.addEventListener('change', () => {
            this.acco_list();
        })
    }

    // 숙박업소 룸 수
    roomCnt = () => {
        let room_cnt = document.querySelector('#room_cnt');
        room_cnt.addEventListener('change', () => {
            if (room_cnt.value.indexOf(".") == 1) {
                room_cnt.value = 1;
            }
            this.acco_list();
        })
    }

    // 평점
    rating = () => {
        let grade = document.querySelector('#grade');
        grade.addEventListener('change', () => {
            this.acco_list();
        })
    }

    // 초기화
    reset = () => {
        let reset = document.querySelector('#reset');

        reset.addEventListener('click', () => {
            this.room.value = "single"
            this.grade.value = "all"
            this.max.value = 1000000
            this.min.value = 0
            this.slide.min = 0
            this.slide.max = 1000000
            this.room_cnt.value = 1
            this.distance.value = 0

            this.acco_list()
        })
    }

    // 숙박업소 리스트 가져오기
    acco_list = () => {
        console.log("search");
        let dis = document.querySelector('#distance');
        this.D = new distance(this.festivalData)
        if (dis.value > 0) {
            fetch("./resources/json/accommodations.json")
                .then(response => {
                    return response.json();
                })
                .then(jsondata => {
                    setTimeout(()=> {
                        this.acco_condition(jsondata);
                    },100)
                });
        }
    }

    // 숙박업소 검색조건에 맞게 찾기
    acco_condition = (data) => {
        this.acco_remove();
        console.log("하하하");

        
        console.log(this.D.disArr);

        data.forEach(e => {

            // 평점 거르기
            if (e.rating >= this.grade.value || this.grade.value == "all") {

                // 룸 이름에 따른 룸 수 거르기
                if (e.rooms[this.room.value] == this.room_cnt.value) {

                    // 룸에 따른 가격 거르기
                    if (e.price[this.room.value] <= this.slide.value) {
                        if (this.D.disArr.indexOf(e.idx) != -1) {
                            this.acco_draw(e);
                        }

                    }

                }
            }
        

        })

    }

    // 기존 숙박업소 지워주기
    acco_remove = () => {
        let list = document.querySelectorAll('.acco_info');
        list.forEach(e => {
            e.remove();
        })
    }

    // 조건에 맞는 숙박업소 그려주기
    acco_draw = (data) => {
        let list = document.querySelector('#acco_list');
        list.innerHTML += `
            <div class="acco_info" data-idx="${data.idx}">
                <img src="./resources/imgs/C_images/${data.photo}" alt="">
                <div>숙박업소 이름 : ${data.name}</div>
                <div>평점 : ${data.rating}</div>
                <div>방 이름 : ${this.room.value}</div>
                <div>남은 방 : ${data.rooms[this.room.value]}</div>
                <div>가격 : ${data.price[this.room.value]}</div>
                <button class="reservation_btn" data-idx="${data.idx}">예약하기</button>
            </div>
        `
        this.reservationModal()
    }

    // 예약하기 모달 띄우기
    reservationModal = () => {
        let rBtn = document.querySelectorAll('.reservation_btn');
        rBtn.forEach(e => {
            e.addEventListener('click', () => {
                document.querySelector('#ok').setAttribute('data-idx', e.dataset.idx)
                $('#modal').fadeIn();
                this.reservation();
            })
        })

    }

    // 예약하기의 모든 함수를 불러온다
    reservation = () => {

        // 모달 닫기
        document.querySelector('#close').addEventListener('click', () => {
            $('#modal').fadeOut();
        })
    }


}