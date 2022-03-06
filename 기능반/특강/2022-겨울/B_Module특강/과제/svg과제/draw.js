class draw {
    constructor() {
        this.svg = document.querySelector('#svg');
        this.drawing = false;

        this.addEvent();
        // 도형
        this.line = document.querySelector('#line')
        this.rectangle = document.querySelector('#rectangle')
        this.triangle = document.querySelector('#triangle')
        this.circle = document.querySelector('#circle')
        // 색상
        this.borderColor = document.querySelector('#border_color');
        this.backgroundColor = document.querySelector('#background_color');
        this.lineWidth = document.querySelector('#line_width');
    }

    addEvent() {
        this.svg.addEventListener('click', (e) => {
            if (!this.drawing) {
                this.drawing = true
            } else {
                this.drawing = false;
            }
            this.draw(e);
        })

    }

    draw(e) {
        if (this.line.checked) {
            this.lineDraw(e);
        } else if (this.rectangle.checked) {
            this.rectangleDraw(e);
        } else if (this.circle.checked) {
            this.circleDraw(e);
        } else if (this.triangle.checked) {
            this.triangleDraw(e)
        }
    }


    lineDraw(e) {
        if (this.drawing) {
            this.x1 = e.offsetX;
            this.y1 = e.offsetY;
        } else {
            let x2 = e.offsetX;
            let y2 = e.offsetY;
            this.svg.innerHTML += `
                <line x1="${this.x1}" y1="${this.y1}" x2="${x2}" y2="${y2}" style="stroke-width:${this.lineWidth.value}" stroke="${this.borderColor.value}"></line>
            `
        }
    }

    rectangleDraw(e) {
        if (this.drawing) {
            this.x1 = e.offsetX;
            this.y1 = e.offsetY;
        } else {
            let x2 = e.offsetX;
            let y2 = e.offsetY;

            let x3; let y3;

            if(this.x1 > x2) {
                x3 = this.x1; this.x1 = x2; x2 = x3;
            }
            if(this.y1 > y2) {
                y3 = this.y1; this.y1 = y2; y2 = y3;
            }

            this.svg.innerHTML += `
                <rect x="${this.x1}" y="${this.y1}" width="${Math.abs(x2 - Number(this.x1))}" height="${Math.abs(y2 - Number(this.y1))}"
                style="fill:${this.backgroundColor.value};stroke-width:${this.lineWidth.value};stroke:${this.borderColor.value}"></rect>
            `
        }
    }

    triangleDraw(e) {
        if(this.drawing) {
            console.log(this.drawing)
        } else {
            console.log(this.drawing)
        }
    }

    circleDraw(e) {
        if(this.drawing) {
            this.x1 = e.offsetX;
            this.y1 = e.offsetY;
        } else {
            let x2 = e.offsetX;
            let y2 = e.offsetY;
            let x3; let y3;

            if(this.x1 > x2) {
                x3 = this.x1; this.x1 = x2; x2 = x3;
            }
            if(this.y1 > y2) {
                y3 = this.y1; this.y1 = y2; y2 = y3;
            }
            let rx = x2 - this.x1;
            let ry = y2 - this.y1;
            this.svg.innerHTML += `
                <ellipse cx="${this.x1}" cy="${this.y1}" rx="${rx}" ry="${ry}"
                style="fill:${this.backgroundColor.value};stroke-width:${this.lineWidth.value};stroke:${this.borderColor.value}"></ellipse>   
            `
        }
    }

    



}

window.onload = function () {
    new draw();
}