class Track {
    constructor(id) {
        this.id = id;
        this.$track = null;
        this.$bar = null;

        this.MAX_WIDTH = 0;
        this.MIN_WIDTH = 100;

        this.current_handle = null;
        this.is_handling = false;
        this.mousedownX = 0; // 마우스가 down 된 시점의 x 좌표
        this.bar_position = [0, 0]; // bar left, bar width
    }

    // 트랙을 parent에 생성해줌.
    createAt(parent) {
        this.$track = $(this.getDOM());
        parent.append(this.$track);

        this.$bar = this.$track.find('.bar');

        this.MAX_WIDTH = this.$track.width();
        this.setEventHandlers();
    }

    destory() {
        this.$track.remove();
    }

    getDOM() {
        return `
            <div class="track" data-id="${this.id}">
                <input type="checkbox" />
                <div class="bar">
                    <div class="bar-left-handle"></div>
                    <div class="bar-body"></div>
                    <div class="bar-right-handle"></div>
                </div>
            </div>
        `;
    }

    setEventHandlers() {
        this.$track.on('mousedown', (e) => this.down(e));
        this.$track.on('mousemove', (e) => this.move(e));
        this.$track.on('mouseup', (e) => this.up(e));
    }

    down(e) {
        const handle = $(e.target).attr('class');
        this.current_handle = handle;

        this.is_handling = true;
        this.bar_position = [this.$bar.position().left, this.$bar.width()];
        this.mousedownX = this.getMouseX(e);
    }

    move(e) {
        if (!this.is_handling) {
            return;
        }

        if (this.current_handle === "bar-left-handle") this.leftHandleMove(e);
        if (this.current_handle === "bar-body") this.bodyMove(e);
        if (this.current_handle === "bar-right-handle") this.rightHandleMove(e);
    }

    up(e) {
        if (!this.is_handling) {
            return;
        }
        
        this.current_handle = null;
        this.is_handling = false;
        this.bar_position[0, 0];
    }

    // bar width, left 가 변화함으로 offsetX 로는 기대하는 offset을 구할 수 없음.
    // fix 되어 있는 track width, left를 참조하여 bar의 offsetX를 구하는 메서드
    getMouseX(e) {
        let width = this.$track.width();
        let left = this.$track.position().left;

        let x = e.pageX - left; // track 시작 부분에서 부터의 x 좌표
        x = x < 0  ? 0 : x > width ? width : x;

        return x;
    }

    leftHandleMove(e) {
        const mx = this.getMouseX(e);
        const [bar_x, bar_w] = this.bar_position;

        let left = mx;
        let width = bar_w + (bar_x - left);

        if (width < this.MIN_WIDTH) {
            width = this.MIN_WIDTH;
            left = this.MAX_WIDTH - this.MIN_WIDTH + bar_x;
        }

        this.updateBar({ left, width });
    }

    bodyMove(e) {
        const mx = this.getMouseX(e);
        const [bar_x, bar_w] = this.bar_position;

        let left = bar_x + mx - this.mousedownX;

        if (left < 0) {
            left = 0;
        }

        if (left + bar_w > this.MAX_WIDTH) {
            left = this.MAX_WIDTH - bar_w;
        }

        this.updateBar({ left });
    }

    rightHandleMove(e) {
        const mx = this.getMouseX(e); // 현재 (실시간) 마우스 x 좌표
        const [bar_x, bar_w] = this.bar_position;

        let width = mx - bar_x;

        if (width < this.MIN_WIDTH) {
            width = this.MIN_WIDTH;
        }

        this.updateBar({ width });
    }

    updateBar(style) {
        this.$bar.css(style);
    }
}