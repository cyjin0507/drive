class visual {
    constructor() {
        this.imgs = document.querySelectorAll('.visual-img')
        this.idx = 0;

        this.slide()
        // setInterval(()=> {
        //     this.slide()
        // },1000)
    }

    slide = () => {
        let beforeImg = this.imgs[this.idx - 1]
        let currentImg = this.imgs[this.idx]

        if (this.idx == 3) {
            this.idx = 0
            currentImg = this.imgs[0]
            beforeImg = this.imgs[2]            
        }

        currentImg.style.zIndex = "1";
        // currentImg.style.transition = "all .5s";
        currentImg.style.left = "0%";
        
        this.pageNum(this.idx+1)
        if (beforeImg != undefined) {
            beforeImg.style.zIndex = "-1";
            setTimeout(() => {
                beforeImg.style.left = "-100%";
                // beforeImg.style.transition = "all .5s";
            }, 1000)


        }

        this.idx++;


        setTimeout(() => {
            this.slide()
        }, 3000)
    }

    pageNum = (idx) => {
        let pageNum = document.querySelector('#page-num');
        if(idx==1) {
            pageNum.innerHTML = `${idx} · ·`;
        } else if(idx==2) {
            pageNum.innerHTML = `· ${idx} ·`;
        } else {
            pageNum.innerHTML = `· · ${idx}`;
        }
    }

}

new visual