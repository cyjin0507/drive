export class calender {
    
    constructor() {
        this.cal1 = document.querySelector('#cal1');
        this.cal2 = document.querySelector('#cal2');
        this.cal3 = document.querySelector('#cal3');

        this.checkIn = false;
        this.checkOut = false;

        this.checkInMonth = ""
        this.checkInDate = ""
        this.checkOutMonth = ""
        this.checkOutDate = ""

        this.term = 0

        this.festivalData = "";
        this.getJson()

        this.addEvent()
        setTimeout(()=> {
            this.draw()
        },10)
    }

    // getJson
    getJson = () => {
        fetch("./resources/json/festivals.json")
            .then((response) => response.json())
            .then((data) => {
                this.festivalData = data
            });
    };

    addEvent = () => {
        this.cal1.addEventListener('click', (e)=>this.checkDate(e));
        this.cal2.addEventListener('click', (e)=>this.checkDate(e));
        this.cal3.addEventListener('click', (e)=>this.checkDate(e));
    }

    checkDate = (e) => {
        if(this.checkOut) {
            this.term = 0;
            this.checkIn = false;
            this.checkOut = false;

            document.querySelectorAll('#cal1 > div').forEach((e)=> {
                e.style.backgroundColor = "white";
            })

            document.querySelectorAll('#cal2 > div').forEach((e)=> {
                e.style.backgroundColor = "white";
            })

            document.querySelectorAll('#cal3 > div').forEach((e)=> {
                e.style.backgroundColor = "white";
            })

            this.checkDate(e);
        }
    
        if(this.checkIn && !this.checkOut) {
            if(Number(this.checkInMonth) < Number(e.target.dataset.month)) {
               e.target.style.backgroundColor = "red"
               this.checkOut = true;
               this.checkOutMonth = Number(e.target.dataset.month);
               this.checkOutDate = Number(e.target.dataset.date);
               this.drawDate("another");
            }

            if(this.checkInMonth == Number(e.target.dataset.month) && this.checkInDate < Number(e.target.dataset.date)) {
                e.target.style.backgroundColor = "red"
                this.checkOut = true;
                this.checkOutMonth = Number(e.target.dataset.month);
                this.checkOutDate = Number(e.target.dataset.date);
                this.drawDate("same");
            }
        }

        if(!this.checkIn) {
            this.checkIn = true;
            e.target.style.backgroundColor = "red"
            this.checkInMonth = Number(e.target.dataset.month);
            this.checkInDate = Number(e.target.dataset.date);
        }
    }

    drawDate = (type) => {
        let In = "#cal" + this.checkInMonth + " > div"
        let cal = document.querySelectorAll(In);
        if(type == "another") {
            cal.forEach(e=> {
                if(Number(e.dataset.date) > Number(this.checkInDate)) {
                    e.style.backgroundColor = "red";
                    this.term++;
                }
            })

            let In2 = "#cal" + this.checkOutMonth + " > div"
            let cal2 = document.querySelectorAll(In2);
            cal2.forEach(e=> {
                if(Number(e.dataset.date) < Number(this.checkOutDate)) {
                    e.style.backgroundColor = "red";
                    this.term++;
                }
            })

            if(this.checkInMonth == "1" && this.checkOutMonth == "3") {
                document.querySelectorAll('#cal2 > div').forEach(e=> {
                    e.style.backgroundColor = "red"
                    this.term++;
                })
            }

        } else {
            cal.forEach(e=> {
                if(Number(e.dataset.date) > Number(this.checkInDate) && Number(e.dataset.date) < Number(this.checkOutDate)) {
                    e.style.backgroundColor = "red";
                    this.term++;
                }
            })
        }

    }

    draw = () => {
        for(let i=1; i<=31; i++) {
            if(i>=6 && i<=8)  {
                this.cal1.innerHTML += `<div data-date=${i} data-month=1>${i}<div class="f1"></div></div>`
            } else {
                this.cal1.innerHTML += `<div data-date=${i} data-month=1>${i}</div>`
            }
        }

        for(let i=1; i<=30; i++) {
            if(i>=16 && i<=20) {
                if(i>=18 && i<=20) {
                    this.cal2.innerHTML += `<div data-date=${i} data-month=2>${i}<div class="f3"></div> <div class="f4"></div></div>`
                } else {
                    this.cal2.innerHTML += `<div data-date=${i} data-month=2>${i} <div class="f3"></div></div>`
                }
            } else {
                this.cal2.innerHTML += `<div data-date=${i} data-month=2>${i}</div>`
            }
        }

        for(let i=1; i<=31; i++) {
            if(i>=8 && i<=11) {
                this.cal3.innerHTML += `<div data-date=${i} data-month=3>${i} <div class="f2"></div></div>`
            } else {
                this.cal3.innerHTML += `<div data-date=${i} data-month=3>${i}</div>`
            }
        }

    }

    
    stayLength = () => {
        console.log(this.term);
        // console.log(this.checkInMonth+7, this.checkInDate);
        // console.log(this.checkOutMonth+7, this.checkOutDate);
    }
    

}