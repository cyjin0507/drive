class Element {
    static createImage(base64) {
        return new Promise((res, rej) => {
            const img = new Image();
            img.src = base64;
            img.onload = () => {
                res(img);
            };
            img.onerror = () => {
                rej();
            };
        });
    }
}