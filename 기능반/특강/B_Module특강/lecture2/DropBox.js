class DropBox {
    constructor(elem) {
        this.elem = elem;
        this.addEvent();
    }
    
    addEvent() {
        const { elem } = this;

        // 해당 요소에 드래그를 하고 있는 중일 때
        elem.addEventListener("dragover", (ev) => this.onDragOver(ev));

        // 해당 요소를 드랍할 때
        elem.addEventListener("drop", (ev) => this.onDrop(ev));

        // 해당 요소에서 벗어났을 때
        elem.addEventListener("dragleave", (ev) => this.onDragLeave(ev));
    }

    onDragOver(ev) {
        ev.preventDefault();
        this.elem.classList.add("dragover");
    }

    onDragLeave(ev) {
        this.elem.classList.remove("dragover");
    }

    onDrop(ev) {
        ev.preventDefault();
        console.log(ev);
    }
}