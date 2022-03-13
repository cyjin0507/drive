class Pen extends Tool {
    constructor() {
        super(...arguments)
        this.is_creating = false;
        this.path = [];
    }

    startCreate(e) {
        this.is_creating = true;
        this.path .push(this.getMouseXY(e));
        this.createSVG('path');

        this.style.fill = "none";
        this.style['stroke-linecap'] = "round";
        this.$svg.attr(this.style);
    }
    creating(e) {
        this.path.push(this.getMouseXY(e));
        const d = this.getPathData(this.path);

        this.$svg.attr({d});
    }
    created(e) {
        this.is_creating = false;
        this.path = []
        this.createAfter()
    }

    getPathData(path) {
        const c_sidx = 1;
        const c_eidx = path.length - ((path.length - 1) % 3);
        const curve_points = path.slice(c_sidx, c_eidx);
        const line_points = path.slice(c_eidx);

        let ret = "";
        ret += `M${this.getPathString([path[0]])}`
        if(curve_points.length) {
            ret += `C${this.getPathString(curve_points)}`
        }
        if(line_points.length) {
            ret += `L${this.getPathString(line_points)}`
        }
        return ret.trim()
    }

    getPathString(pts) {
        let ret = "";
        pts.forEach(([x,y])=> {
            ret += `${x} ${y} `
        })
        return ret;
    }
}