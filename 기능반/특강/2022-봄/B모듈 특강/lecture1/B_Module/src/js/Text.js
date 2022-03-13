class Text extends Tool {
    constructor() {
        super(...arguments)

        this.is_creating = false;
        this.mousedown = [0,0];
    }

    startCreate(e) {
        this.is_creating = true;
        this.mousedown = this.getMouseXY(e);
        const [x,y] = this.mousedown;

        this.createInput(x,y);
    }
    creating(e) {}
    created(e) {
        this.createText();
        this.is_creating = false;
        this.createAfter()

    }

    createInput(x,y) {
        this.createSVG('foreignObject')
        this.$svg.append(
            `<span class="canvas-input" contentEditable="true"></span>`
        )
        this.$svg.attr({x,y})
        this.$svg.attr(this.style);
        this.$svg.find('.canvas-input').css('color', this.style.fill);

        setTimeout(()=> {
            this.$svg.find('.canvas-input').focus()
        })
    }

    removeInput() {
        this.$svg.remove()
    }

    createText() {
        const $input = this.$svg.find('.canvas-input');
        const text = $input.text();
        let [x,y] = this.mousedown;
        y = y+$input.height();

        this.removeInput();

        this.createSVG('text');
        this.$svg.text(text);
        this.$svg.attr({x,y})
        this.style.stroke = "none";
        this.$svg.attr(this.style);
    }

}