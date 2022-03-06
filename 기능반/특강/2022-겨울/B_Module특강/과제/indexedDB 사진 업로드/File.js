class File {
    static loadImage(file) {
        return new Promise((res, rej) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = (rs) => {
                res(rs.target.result);
            };
        });
    }
}