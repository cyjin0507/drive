import { distance } from "./distance.js";
import { reservation } from "./reservation.js";
import { search } from "./search_option.js";

class Map {

    constructor() {
        this.canvas = document.querySelector('#myCanvas');
        this.ctx = this.canvas.getContext("2d");

        this.currentPhase = 0;
        this.PHASE_SIZE = [450, 900, 1800, 3600];
        this.DRAW_SIZE = [3.6, 7.2, 14.4, 28.8];
        this.LOOK_SIZE_X = [5.7, 11, 22, 44];
        this.LOOK_SIZE_Y = [5.7, 11, 22, 44];
        this.isDragging = false;
        this.cameraPos = { x: 0, y: 0 };

        this.init()

        this.mapData = ""
        this.festivalData = ""
        this.getJson()

        let res = new reservation();

    }

    getJson = () => {
        fetch("./resources/json/map.json")
            .then((response) => response.json())
            .then((data) => {
                this.mapData = data
            });

        fetch("./resources/json/festivals.json")
            .then((response) => response.json())
            .then((data) => {
                this.festivalData = data
            });
    };



    init = () => {
        this.canvas.width = 450;
        this.canvas.height = 450;

        this.setEventHandlers();
        setTimeout(() => this.render(), 34);
    }

    setEventHandlers = () => {
        this.canvas.addEventListener("mousedown", () => this.mousedown());
        this.canvas.addEventListener("mousemove", (e) => this.mousemove(e));
        this.canvas.addEventListener("mouseup", () => this.mouseup());
        this.canvas.addEventListener("mouseleave", () => this.mouseup());
        this.canvas.addEventListener("mousewheel", (e) => this.mousewheel(e));

        this.canvas.addEventListener("mousemove", (e) => this.hover(e));
        this.canvas.addEventListener("click", (e) => this.click(e));
    }

    render = () => {
        this.ctx.clearRect(0, 0, 3600, 3600);
        const x = 0;
        const y = 0;

        const dx = x + this.cameraPos.x;
        const dy = y + this.cameraPos.y;
        const dw = 450 - dx;
        const dh = 450 - dy;
        this.mapData.forEach((item, index) => {

            item.forEach((item2, index2) => {
                if (item2 == 0) {
                    this.ctx.fillStyle = "white";
                } else if (item2 == 1) {
                    this.ctx.fillStyle = "black";
                } else if (item2 == 2) {
                    this.ctx.fillStyle = "green";
                } else if (item2 == 3) {
                    this.ctx.fillStyle = "red";
                }
                this.ctx.fillRect(
                    dx + index2 * this.DRAW_SIZE[this.currentPhase],
                    dy + index * this.DRAW_SIZE[this.currentPhase],
                    this.DRAW_SIZE[this.currentPhase],
                    this.DRAW_SIZE[this.currentPhase]
                );
            })
        })


        this.ctx.fillStyle = "red";
        this.ctx.font = "10px";
        if (this.currentPhase == 0) {
            this.ctx.fillRect(385, 350, 25, 5);
            this.ctx.strokeRect(410, 350.5, 25, 4.0);
            this.ctx.fillText("0", 385, 348);
            this.ctx.fillText("2km", 430, 348);
        } else if (this.currentPhase == 1) {
            this.ctx.fillRect(385, 350, 25, 5);
            this.ctx.strokeRect(410, 350.5, 25, 4.0);
            this.ctx.fillText("0", 385, 348);
            this.ctx.fillText("1km", 430, 348);
        } else if (this.currentPhase == 2) {
            this.ctx.beginPath();
            this.ctx.moveTo(390, 350);
            this.ctx.lineTo(390, 360);
            this.ctx.lineTo(430, 360);
            this.ctx.lineTo(430, 350);
            this.ctx.stroke();
            this.ctx.fillText("0", 385, 348);
            this.ctx.fillText("0.5km", 425, 348);
        } else if (this.currentPhase == 3) {
            this.ctx.beginPath();
            this.ctx.moveTo(390, 350);
            this.ctx.lineTo(390, 360);
            this.ctx.lineTo(430, 360);
            this.ctx.lineTo(430, 350);
            this.ctx.stroke();
            this.ctx.fillText("0", 385, 348);
            this.ctx.fillText("0.25km", 420, 348);
        }


    }

    mousedown = () => {
        this.isDragging = true;
    }

    mousemove = (e) => {
        if (!this.isDragging) return;
        this.cameraPos.x += e.movementX;
        this.cameraPos.y += e.movementY;
        if (this.cameraPos.x > 0) this.cameraPos.x = 0;
        if (this.cameraPos.y > 0) this.cameraPos.y = 0;
        if (this.PHASE_SIZE[this.currentPhase] - 450 < Math.abs(this.cameraPos.x))
            this.cameraPos.x = this.PHASE_SIZE[this.currentPhase] * -1 + 450;
        if (this.PHASE_SIZE[this.currentPhase] - 450 < Math.abs(this.cameraPos.y))
            this.cameraPos.y = this.PHASE_SIZE[this.currentPhase] * -1 + 450;

        this.render();
    }

    mouseup = () => {
        this.isDragging = false;
    }

    mousewheel = (e) => {
        e.preventDefault();
        if (e.wheelDelta > 0 && this.currentPhase < 3) {
            this.phaseUp(e);
        } else if (e.wheelDelta < 0 && this.currentPhase > 0) {
            this.phaseDown(e);
        }
    }

    phaseUp = (e) => {
        const prevPhase = this.currentPhase;
        this.currentPhase++;
        if (prevPhase == 0) {
            this.doZoom(prevPhase, e.offsetX, e.offsetY - 80);
        } else {
            this.doZoom(prevPhase, e.offsetX, e.offsetY - 100);
        }
    }

    phaseDown = (e) => {
        const prevPhase = this.currentPhase;

        this.currentPhase--;
        this.doZoom(prevPhase, e.offsetX - 150, e.offsetY - 100);
    }

    doZoom = (prevPhase, x, y) => {
        const norX = (x + Math.abs(this.cameraPos.x)) / this.PHASE_SIZE[prevPhase];
        const norY = (y + Math.abs(this.cameraPos.y)) / this.PHASE_SIZE[prevPhase];
        const newX = norX * this.PHASE_SIZE[this.currentPhase] * -1 + 450;
        const newY = norY * this.PHASE_SIZE[this.currentPhase] * -1 + 450;
        const limit = this.PHASE_SIZE[this.currentPhase] - 450;
        const limit2 = this.PHASE_SIZE[this.currentPhase] - 450;

        this.cameraPos.x = newX;
        this.cameraPos.y = newY;

        if (Math.abs(this.cameraPos.x) > limit) {
            this.cameraPos.x = limit * -1;
        }

        if (this.cameraPos.x > 0) {
            this.cameraPos.x = 0;
        }

        if (Math.abs(this.cameraPos.y) > limit2) {
            this.cameraPos.y = limit2 * -1;
        }

        if (this.cameraPos.y > 0) {
            this.cameraPos.y = 0;
        }

        this.render();
    }

    hover = (e) => {
        let locX = Math.ceil(e.offsetX / this.LOOK_SIZE_X[this.currentPhase])
        let locY = Math.ceil(e.offsetY / this.LOOK_SIZE_Y[this.currentPhase])
        // console.log(this.festivalCheck(locX, locY));
    }

    click = (e) => {
        let locX = Math.ceil(e.offsetX / this.LOOK_SIZE_X[this.currentPhase])
        let locY = Math.ceil(e.offsetY / this.LOOK_SIZE_Y[this.currentPhase])

        if (this.festivalCheck(locX, locY) != "") {
            let dis = new distance(this.festivalCheck(locX, locY));

            console.log("click");
            let s = new search(this.festivalCheck(locX, locY));
            setTimeout(() => {
                s.acco_list();
            }, 100)
        }
        // let dis = new distance();

    }

    // 좌표상에 축제가 있는지 확인하기
    festivalCheck(x, y) {
        let data = ""
        this.festivalData.forEach(e => {
            // console.log(e.locatiosn[0], e.location[1]);
            // console.log(e.location[0]);
            if (x == e.location[0] && y == e.location[1]) {
                data = e;
            }
        })
        return data;
    }

}

new Map;