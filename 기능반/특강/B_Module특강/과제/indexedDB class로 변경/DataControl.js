export class DataControl {
  dataAdd(objectStore, name, age) {
    objectStore.add({
      name: name,
      age: age,
    });
  }

  dataRemove(objectStore, id) {
    objectStore.delete(id);
  }

  dataSearch(objectStore, id) {
    const req = objectStore.get(id);
    req.onsuccess = () => {
      console.log(req.result);
    };
  }

  dataModify(objectStore, id, name, age) {
    objectStore.put({
      idx: id,
      name: name,
      age: age,
    });
  }

  dataAllSearch1(objectStore) {
    const req = objectStore.getAll();
    req.onsuccess = function () {
      console.log(req.result);
    };
  }

  dataAllSearch2(objectStore) {
    const cur = objectStore.openCursor();
    cur.onsuccess = (ev) => {
        const cursor = ev.target.result;
        if(cursor) {
            cursor.value; // 현재 값
            console.log(cursor.value);
            cursor.continue(); // 다음 데이터로 이동
        }
    }
  }
}
