export class DataControl {

    dataAdd(objectStore, name, age) {
        objectStore.add({
            name : name,
            age : age
        });
    }

    dataRemove(id) {
        objectStore.delete(id);
    }

    dataSearch() {

    }

    dataModify() {

    }

    dataAllSearch() {

    }



}