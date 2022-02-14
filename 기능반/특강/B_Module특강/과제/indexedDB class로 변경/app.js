import { openDB } from "./OpenDB.js";

export class app {
    constructor() {
        new openDB().open();
    }

}


window.addEventListener('onload',new app());