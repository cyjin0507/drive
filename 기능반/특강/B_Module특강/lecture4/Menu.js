class Menu {
  static categories = new Set();

  static init() {
    $("#main-menu li:nth-child(2)").attr("data-category", "all");
    $("#main-menu li:nth-child(3)").remove();

    Album.items.forEach((item) => {
      const { category } = item;
      Menu.categories.add(category);
    });
  }

  static getHTML(category) {
    return `
      <li data-category=${category}>
        <a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span>${category}</span></a>
      </li>
    `;
  }

  static setItems() {
    Menu.categories.forEach((category) => {
      const html = Menu.getHTML(category);
      $("#main-menu").append(html);
    });
  }
}
