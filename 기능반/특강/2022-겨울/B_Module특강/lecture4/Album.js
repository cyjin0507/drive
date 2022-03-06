class Album {
  static items = [];

  static async load() {
    Album.items = await File.loadJSON("music_data.json");
  }

  // 화면 구성
  // 유빈이가 짠 코드에서는 render 메소드
  static setItems(items = Album.items) {
    const content = $(".album-contents");
    content.empty();

    items.forEach((item) => {
      const html = Album.getHTML(item);
      content.append(html);
    });
  }

  static getHTML(item) {
    const { albumJaketImage, albumName, artist, category, price, release } =
      item;

    return `
      <div class="col-md-2 col-sm-2 col-xs-2 product-grid" data-category=${category}>
        <div class="product-items">
            <div class="project-eff">
                <img class="img-responsive" src="images/${albumJaketImage}" alt="Time for the moon night">
            </div>
            <div class="produ-cost">
                <h5>${albumName}</h5>
                <span>
                    <i class="fa fa-microphone"> 아티스트</i> 
                    <p>${artist}</p>
                </span>
                <span>
                    <i class="fa  fa-calendar"> 발매일</i> 
                    <p>${release}</p>
                </span>
                <span>
                    <i class="fa fa-money"> 가격</i>
                    <p>￦${price.comma()}</p>
                </span>
                <span class="shopbtn">
                    <button class="btn btn-default btn-xs">
                        <i class="fa fa-shopping-cart"></i> 
                        쇼핑카트담기
                    </button>
                </span>
            </div>
        </div>
      </div>
    `;
  }

  // 카테고리를 기준으로 필터링 하는 코드구나
  static filterItems(category) {
    const items =
      category === "all"
        ? Album.items
        : Album.items.filter((item) => item.category === category);
    Album.setItems(items);
  }

  // 검색어와 일치하는 앨범이름 또는 가수명의 검색키워드를 하이라이트로 표시한다.
  static searchItems(keyword) {
    const items = Album.items.filter((item) => {
      const { albumName, artist } = item;

      return albumName.match(keyword) || artist.match(keyword);
    });

    Album.setItems(items);

    if (items.length < 1) {
    }
  }
}
