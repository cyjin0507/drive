import { DataControl } from "./DataControl.js";

export class openDB {
    
    open() {
        const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        this.req = indexedDB.open("20220212db3",2);
        this.db;

        this.req.onsuccess = (ev) => {
            console.log("DB 오픈 성공");
            this.db = ev.target.result;
            const transaction = this.db.transaction("users", "readwrite")
            const objectStore = transaction.objectStore("users");

            new DataControl().dataAdd(objectStore, "홍길동", "23");

        }
        
        
        this.req.onerror = (ev) => {
            console.log("DB 오픈 실패");
        }

        this.insertDB();

    }

    insertDB() {
        this.req.onupgradeneeded = (ev) => {
            console.log("DB최초생성");
            this.db = ev.target.result; // IDBDatabase 객체

            const stores = ["users"];
            stores.forEach(storeName => {

                // 기존 객체 저장소가 존재할 경우
                if (this.db.objectStoreNames.contains("user")) {
                    // 기존 객체 저장소 삭제
                    this.db.deleteObjectStore("users");
                }

                // 객체 저장소 생성
                this.db.createObjectStore("users", {
                    keyPath: "idx",
                    autoIncrement: true
                })

            })
        }
    }

}