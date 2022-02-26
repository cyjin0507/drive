class App {
  constructor() {}

  async init() {
    // Album
    await Album.load();
    Album.setItems(Album.items);
    // Menu
    Menu.init();
    Menu.setItems();

    $("#main-menu li").on("click", function (ev) {
      const elem = $(ev.target).parents("li");
      const category = elem.data("category");
      if (category) {
        Album.filterItems(category);
      }

      $("#main-menu li a").removeClass("active-menu");
      elem.find("a").addClass("active-menu");
    });

    $("#findInput").on("keyup", (ev) => {
      const elem = $(ev.target);
      const keyword = elem.val();
      Album.searchItems(keyword);
    });
  }
}
