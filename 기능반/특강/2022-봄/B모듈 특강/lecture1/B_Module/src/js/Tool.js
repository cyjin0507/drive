class Tool {
    constructor(app, canvas) {
        this.app = app;
        this.$canvas = canvas;
        this.$svg = null;

        this.style = {
            'font-size' : "16px",
            'stroke-width' : 3,
            stroke : "gray",
            fill : "gray"
        }
    }

    down(e) {
        if(this.constructor.name === 'Text' && this.is_creating) {
            this.created(e)
            return;
        }
        this.startCreate(e)
    }
    move(e) {
        if(!this.is_creating) {
            return;
        }
        this.creating(e)
    }
    up(e) {
        if(!this.is_creating) {
            return;
        }
        if(this.constructor.name === 'text') {
            return;
        }
        this.created(e)
    }

    createSVG(type) {
        const ns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(ns, type)
        this.$svg = $(svg);
        this.$canvas.append(this.$svg);
    }

    getMouseXY(e) {
        return [e.offsetX, e.offsetY];
    }

    createAfter(e) {
        const [start, end] = this.app.video_time;
        this.id = this.app.getCreateID();
        this.$svg.attr('data-id', this.id);
        this.$svg.attr('data-start', start);
        this.$svg.attr('data-end', end);
        this.app.createTrack(this.id);
    }

    setStyle(color, stroke_width, font_size) {
        this.style['stroke'] = color
        this.style['fill'] = color
        this.style['stroke-width'] = stroke_width
        this.style['font-size'] = font_size
    }


}