class search {
    constructor(data) {
        this.data = data;
        new util().drawList(this.data);
        this.search = document.querySelector('#search')
        console.log(this.search);
        this.searchBtn = document.querySelector('#searchBtn')
        this.addEvent();
    }

    addEvent() {
        this.searchBtn.addEventListener('click', this.sort)
    }
    
    sort = () => {
        new util().removeList();
        this.data.forEach(e=> {
            if(e.product_name.includes(this.search.value) || 
            new util().cho_hangul(e.product_name).includes(this.search.value)) {
                new util().searchList(e);
            }
        })
    }

    
    
}