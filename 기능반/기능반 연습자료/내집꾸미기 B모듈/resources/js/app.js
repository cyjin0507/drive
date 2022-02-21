class app {
    constructor() {
        this.getJson()
    }

    getJson() {
        fetch('./resources/store.json')
            .then((response)=> response.json())
                .then((data) => {
                    new search(data)
                    new drop(data);
                })
    }

}

window.onload = function() {
    new app();
}