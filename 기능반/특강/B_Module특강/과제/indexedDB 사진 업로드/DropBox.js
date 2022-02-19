class DropBox {
    constructor({ elem }, objectStore) {
        this.elem = elem;
        this.objectStore = objectStore;
        this.list = [];

        this.init();
    }

    async init() {
        this.loadList();
        await this.setList();
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

    async onDrop(ev) {
        const { elem, list } = this;
 
        ev.preventDefault();
        elem.classList.remove("dragover");
        const files = ev.dataTransfer.files;

        for (const file of files) {
            try {
                if (file.name.match(/(jpeg|jpg|gif|png)/)) {
                    const base64 = await File.loadImage(file);
                    list.push(base64);
                }
            } catch (e) {
                console.log(e);
            }
        }

        await this.setList();
        await this.saveList();
    }

    async setList() {
        const { list, elem } = this;

        elem.innerHtml = ''

        for (const base64 of list) {
            const img = await Element.createImage(base64);
            elem.appendChild(img);
        }
    }

    loadList() {
        const images = localStorage.getItem("DropBox_images");
        // console.log(images);
        
        this.list = images ? JSON.parse(images) : [];
        // new openDB().dataControl();
        console.log(new DataControl().dataSearch(this.objectStore, 3));;
        // new DataControl().dataAdd(this.objectStore, this.list);
        
    }
    
    async saveList() {
        // console.log(this.list[0]);
        // localStorage.setItem("DropBox_images", JSON.stringify(this.list));

        // new DataControl().dataSearch(this.objectStore, 1);
    }
}