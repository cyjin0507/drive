
class openDB {

    constructor() {
        this.open();
    }
    
    open() {
        const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        this.req = indexedDB.open("20220212dbImage",2);


        this.req.onsuccess = (ev) => {
            console.log("DB 오픈 성공");
            this.db = ev.target.result;
            const transaction = this.db.transaction("iamges", "readwrite")
            this.objectStore = transaction.objectStore("iamges");

            new DropBox({elem : document.getElementById("drop-box")}, this.objectStore)
        }

        this.req.onerror = (ev) => {
            console.log("DB 오픈 실패");
        }

        this.req.onupgradeneeded = (ev) => {
            console.log("DB최초생성");
            this.db = ev.target.result; // IDBDatabase 객체
            
            const stores = ["iamges"];
            stores.forEach(storeName => {
                
                // 기존 객체 저장소가 존재할 경우
                if (this.db.objectStoreNames.contains("iamges")) {
                    // 기존 객체 저장소 삭제
                    this.db.deleteObjectStore("iamges");
                }
                
                // 객체 저장소 생성
                this.db.createObjectStore("iamges", {
                    keyPath: "idx",
                    autoIncrement: true
                })
                
            })

        }
        
        
    }
    
    dataControl() {
        

        new DataControl().dataAdd(this.objectStore, "asd")
        // setTimeout(()=> {
        //     console.log(this.objectStore);
        //     console.log("df");
        // },1000)
        // new DataControl().dataRemove(this.objectStore, 1);
        // new DataControl().dataAdd(this.objectStore, "iamges")


        // 데이터 추가
        // new DataControl().dataAdd(this.objectStore, "sdsd홍길동", "23");

        //데이터 삭제
        // new DataControl().dataRemove(this.objectStore, 4);
        
        // 데이터 수정
        // let idx = 8; let name = "아아아"; let age = 110;
        // new DataControl().dataModify(this.objectStore, idx, name, age);

        //데이터 하나 조회
        // new DataControl().dataSearch(this.objectStore, 8);

        // 모든 데이터 조회1
        // new DataControl().dataAllSearch1(this.objectStore);

        // 모든 데이터 조회2
        // new DataControl().dataAllSearch2(this.objectStore);

        
    }

    iamges() {
        
    }
    
}
