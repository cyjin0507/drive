class App {
    constructor() {
        this.$clip_area = $('.clip-area');
        this.$canvas = $('#canvas');
        this.$video = $('#workspace video');
        this.$video_duration = $('.time-area .video-time');
        this.$track_duration = $('.time-area .track-time');

        // const
        this.tool_list = {
            pen: new Pen(this, this.$canvas),
            rect: new Rect(this, this.$canvas),
            text: new Text(this, this.$canvas)
        }

        this.video_time = [0, 0];
        this.object_ids = [];

        this.setEventHandlers();
    }

    get current_tool() {
        const selected = $('.btn-tool.active');
        return selected.data('tool');
    }

    get color() {
        return $("#selectColor").val();
    }

    get stroke_width() {
        return $("selectWidth").val();
    }

    get font_size() {
        return $("#selectSize").val();
    }

    setEventHandlers() {
        $('.btn-tool').on('click', this.setTool.bind(this));
        $("#selectColor, #selectWidth, #selectSize")
         .on('change', this.setStyle.bind(this));
        $('.btn-merge').on('click', this.doTest.bind(this));

        this.$canvas.on('mousedown', this.down.bind(this));
        this.$canvas.on('mousemove', this.move.bind(this));
        this.$canvas.on('mouseup', this.up.bind(this));

        this.$video.on('timeupdate', this.timeupdate.bind(this));

        $('.movie-area img').on('click', this.setVideo.bind(this));
        $('.btn-play').on('click', this.play.bind(this));
        $('.btn-pause').on('click', this.pause.bind(this));
    }

    doTest() {
        console.log(this.current_tool);
    }

    createTrack() {
        const id = 1;
        const track = new Track(id);
        track.createAt(this.$clip_area);
    }

    setTool(e) {
        $('.btn-tool').removeClass('active');
        $(e.target).addClass('active');
    }

    // tool에 변화된 스타일을 적용 시켜 줌.
    setStyle() {
        this.tool_list[this.current_tool].setStyle(
            this.color, this.stroke_width, this.font_size
        )
    }

    down(e) {
        this.tool_list[this.current_tool].down(e);
    }

    move(e) {
        this.tool_list[this.current_tool].move(e);
    }
    
    up(e) {
        this.tool_list[this.current_tool].up(e);
    }

    setVideo(e) {
        const source = $(e.target).data('src');
        this.$video.attr('src', source);

        this.$video[0].onloadedmetadata = () => {
            this.setVideoDurationLabel();
        }
    }

    // 영상 시간 라벨을 업데이트 해줌
    setVideoDurationLabel() {
        const current = this.$video[0].currentTime;
        const duration = this.$video[0].duration;

        if (!duration) {
            return;
        }

        this.video_time = [current, duration];
        const startString = getTimeString(current);
        const endString = getTimeString(duration);

        this.$video_duration.text(`영상 시간 : ${startString} / ${endString}`);
    }

    setTimeCursor() {
        const cursor = $('.clip-area #cursor');
        const [current, duration] = this.video_time;
        cursor.css('left', `${current/duration*100}%`);
    }

    play() {
        this.$video[0].play();
    }

    pause() {
        this.$video[0].pause();
    }

    timeupdate() {
        this.setVideoDurationLabel();
        this.setTimeCursor();
        this.checkObjectDuration();
    }

    // 랜덤 아이디를 생성함
    getCreateID() {
        const id = Math.random().toString(36).substr(2, 16); // 36진수, '0.' 2글자를 짤라
        if (this.object_ids.indexOf(id) !== -1) {
            this.getCreateID();
        }

        this.object_ids.push(id);
        return id;
    }

    // 새로운 트랙을 생성함
    createTrack(id) {
        const track = new Track(this, id);
        track.createAt(this.$clip_area);
    }

    checkObjectDuration() {
        const [current, _] = this.video_time;
        this.object_ids.forEach(id => {
            const $object = this.$canvas.find(`[data-id='${id}']`);
            const start = parseFloat($object.attr('data-start'));
            const end = parseFloat($object.attr('data-end'));

            if (start <= current && current <= end) {
                $object.css('display', 'block');
                return;
            }
            $object.css('display', 'none');
        });
    }

    updateTrackBar(id, start, end) {
        const [_, duration] = this.video_time;
        start = start * duration;
        end = end * duration;
        this.setObjectDuration(id, start, end);
    }

    setObjectDuration(id, start, end) {
        const $object = this.$canvas
        .find(`[data-id='${id}']`);
        $object.attr('data-start', start);
        $object.attr('data-end', end);
    }
}

window.onload = () => {
    new App();
}