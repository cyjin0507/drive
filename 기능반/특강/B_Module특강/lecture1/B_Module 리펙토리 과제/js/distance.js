export class distance {
    constructor(festivalData) {
        this.festivalData = festivalData;
        this.accoData = "";
        
        this.disArr = []

        this.getJson();

        setTimeout(()=> {
            this.distance()
        },100)
    }

    getJson = () => {
        fetch("./resources/json/accommodations.json")
            .then((response) => response.json())
            .then((data) => {
                this.accoData = data
            });
    }

    distance = () => {
        
        let dis = document.querySelector('#distance').value;
        // console.log(this.accoData.length);
        console.log("distance");
        this.accoData.forEach(e=> {
            let d1 = Math.abs(this.festivalData.location[0]-e.location[0]);
            let d2 = Math.abs(this.festivalData.location[1] - e.location[1]);
            let test3 = d1*d1 + d2*d2;
            let test4 = Math.floor(Math.sqrt(test3));

            if(test4 <= Number(dis)) {
                this.disArr.push(e.idx);
            }
        })

    }

    

}