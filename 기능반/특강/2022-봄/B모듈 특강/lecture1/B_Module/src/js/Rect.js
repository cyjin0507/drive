class Rect extends Tool {
    constructor() {
        super(...arguments)

        this.is_creating = false;
        this.mousedown = [0,0];
    }

    startCreate(e) {
        this.is_creating = true;
        const [x,y] = this.getMouseXY(e);
        this.mousedown = [x,y]

        this.createSVG('rect');

        this.$svg.attr(this.style);
        this.$svg.attr({x, y});
    }
    creating(e) {
        const [mx, my] = this.getMouseXY(e);
        const [dx, dy] = this.mousedown;

        const x = Math.min(mx, dx);
        const y = Math.min(my, dy);
        const width = Math.max(mx, dx) - x;
        const height = Math.max(my, dy) - y;

        this.$svg.attr({x,y,width,height})

    }
    created(e) {
        this.is_creating = false;
        this.createAfter(e)
    }
}