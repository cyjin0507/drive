import { Map } from "./map.js"
import { search } from "./search.js";

class app {
    constructor() {
        this.map = new Map();
        this.search = new search();
    }
}


$('document').ready(new app())
