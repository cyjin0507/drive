class Map {
    constructor() {
        this.canvas = document.querySelector('#mycanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.currentPhase = 0;
        this.PHASE_SIZE = [450, 900, 1800, 3600];
        this.DRAW_SIZE = [3.6, 7.2, 14.4, 28.8];
        this.LOOK_SIZE = [5.7, 11, 22, 44];
        this.isDragging = false;
        this.cameraPos = {x:0, y:0};

        this.init();

        this.mapData = "";
        this.festivalData = "";

        this.getJson();
    }

    init = () => {
        this.canvas.width = 450;
        this.canvas.height = 450;

        this.setEventHandlers();
        setTimeout(()=>this.render(),100);
    }

    setTimeout = () => {
        
    }

}