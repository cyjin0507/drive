function getTimeString(sec) {
    let hour = parseInt(sec / 3600);
    let min = parseInt(sec / 60) % 60;
    sec = parseInt(sec % 60);

    hour = String(hour).padStart(2, "0");
    min = String(min).padStart(2, "0");
    sec = String(sec).padStart(2, "0");

    return [hour, min, sec].join(":");

}