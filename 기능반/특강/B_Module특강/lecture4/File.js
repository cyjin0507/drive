class File {
  static loadJSON(path) {
    return new Promise(async (res, rej) => {
      const result = await $.getJSON(path);
      const { data } = result;
      res(data);
    });
  }
}
