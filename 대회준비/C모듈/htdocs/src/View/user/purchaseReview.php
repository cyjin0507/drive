<div class="title mb-3">
    <div class="bg-light shadow-sm p-3 d-flex justify-content-between align-items-center">
        <h4 class="font-weight-bold mb-0">구매후기</h4>
        <div class="text-right">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">후기작성</button>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <form id="purchaseReviewForm" enctype="multipart/form-data">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">후기등록</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="form-group">
                        <label for="name">이름</label>
                        <input type="text" class="form-control" id="name" name="name" value="이름">
                    </div>

                    <div class="form-group">
                        <label for="product">구매품</label>
                        <input type="text" class="form-control" id="product" name="product" value="구매품">
                    </div>

                    <div class="form-group">
                        <label for="shop">구매처</label>
                        <input type="text" class="form-control" id="shop" name="shop" value="구매처">
                    </div>

                    <div class="form-group">
                        <label for="purchase_date">구매일</label>
                        <input type="date" class="form-control" id="purchase_date" name="purchase_date" value="2022-03-20">
                    </div>

                    <div class="form-group">
                        <label for="contents">내용</label>
                        <textarea class="form-control" name="contents" id="contents">후기내용 솰라솰라 테스트</textarea>
                    </div>

                    <div class="form-group">
                        <label for="score">별점</label>
                        <select class="custom-select" name="score">
                            <option>별점선택</option>
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="images">사진</label>
                        <input type="file" class="form-control" id="images" name="images[]" multiple>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                    <button type="button" class="btn btn-primary" id="purchaseReviewBtn">등록</button>
                </div>
            </div>
        </div>
    </form>
</div>

<div id="reviewList" class="row p-3"></div>

<div class="modal fade" id="reviewDetail" tabindex="-1" aria-labelledby="reviewDetailLabel" aria-hidden="true">
    <form id="purchaseReviewForm" enctype="multipart/form-data">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="reviewDetailLabel">후기상세보기</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="form-group d-flex justify-content-between">
                        <button type="button" class="btn btn-primary" id="prev_review">이전글</button>
                        <button type="button" class="btn btn-primary" id="next_review">다음글</button>
                    </div>

                    <div class="form-group">
                        <label for="name">이름</label>
                        <input type="text" class="form-control" id="name" name="name" value="" readonly>
                    </div>

                    <div class="form-group">
                        <label for="product">구매품</label>
                        <input type="text" class="form-control" id="product" name="product" value="" readonly>
                    </div>

                    <div class="form-group">
                        <label for="shop">구매처</label>
                        <input type="text" class="form-control" id="shop" name="shop" value="" readonly>
                    </div>

                    <div class="form-group">
                        <label for="purchase_date">구매일</label>
                        <input type="date" class="form-control" id="purchase_date" name="purchase_date" value="" readonly>
                    </div>

                    <div class="form-group">
                        <label for="contents">내용</label>
                        <textarea class="form-control" name="contents" id="contents" readonly></textarea>
                    </div>

                    <div class="form-group">
                        <label for="score">별점</label>
                        <input type="number" class="form-control" id="score" name="score" value="" readonly>
                    </div>

                    <div class="form-group">
                        <label for="images">사진</label>
                        <div class="images">
                            <div class="title_thumbnail img-fluid">

                            </div>
                            <div class="sub_title_thumbnail small-thumbnail">

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </form>
</div>

<script>
    let ajaxFlag = false;

    window.addEventListener('scroll', () => {
        if ((window.scrollY + window.innerHeight + 130) >= document.body.offsetHeight) {
            let last_key = $("#reviewList .card:last-child .card-link").data("idx");
            console.log(last_key);
            if (!ajaxFlag) {
                ajaxFlag = true;
                ajax("/api/reviews?last-key=" + last_key, "GET", [], function(res) {
                    let reviews = JSON.parse(res);
                    reviews.forEach(review => {
                        $("#reviewList").append(template(review));
                    });
                    ajaxFlag = false;
                });
            } else {
                return false;
            }

        }

    });

    $("#purchaseReviewBtn").on("click", function() {
        const formdata = new FormData($("#purchaseReviewForm")[0]);

        ajax("/api/reviews", 'POST', formdata,
            function(res) {
                res = JSON.parse(res);
                alert(res.message);
                $('#exampleModal').modal('hide');
                getReviews();
            },
            function(res) {
                res = JSON.parse(res.responseText);
                alert(res.message);
            });
    });

    function getReviews() {
        $("#reviewList").empty();
        ajax("/api/reviews", "GET", [], function(res) {
            let reviews = JSON.parse(res);
            reviews.forEach(review => {
                $("#reviewList").append(template(review));
            });
        });
    }

    function template(review) {
        let div = $('<div></div>');
        div.addClass("card");
        div.addClass("mb-4");
        div.addClass("mx-3");
        div.css({
            "width": "15rem"
        });
        div.html(`
        <img src="/upload/review/${review['photo']['image']}" class="card-img-top">
        <div class="card-body">
            <p class="card-text">${review['contents']}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">이름(작성자): ${review['name']}</li>
            <li class="list-group-item">구매품: ${review['product']}</li>
            <li class="list-group-item">구매처: ${review['shop']}</li>
            <li class="list-group-item">구매일: ${review['purchase-date']}</li>
            <li class="list-group-item">별점: ${review['score']}</li>
        </ul>
        <div class="card-body">
            <a href="#" class="card-link" data-idx="${review['key']}">상세보기</a>
        </div>
        `);

        div.find(".card-link").on("click", function() {
            let review_idx = parseInt($(this).data("idx"));
            getReview(review_idx);

            $("#reviewDetail").modal('show');

            $("#prev_review").on("click", function() {
                let idx = $(this).data("idx");
                getReview(idx);
            });

            $("#next_review").on("click", function() {
                let idx = $(this).data("idx");
                getReview(idx);
            });

        });

        return div;
    }

    function getReview(idx) {
        ajax("/api/reviews/" + idx, "GET", [], function(res) {
            let review = JSON.parse(res);

            $("#prev_review").data("idx", idx - 1);
            $("#next_review").data("idx", idx + 1);

            $("#reviewDetail").find("#name").val(review['name']);
            $("#reviewDetail").find("#product").val(review['product']);
            $("#reviewDetail").find("#shop").val(review['shop']);
            $("#reviewDetail").find("#purchase_date").val(review['purchase-date']);
            $("#reviewDetail").find("#contents").val(review['contents']);
            $("#reviewDetail").find("#score").val(review['score']);

            let thumbnailNumber = 0;
            getReviewThumbnail(review['photos'], thumbnailNumber);

        }, function(res) {
            res = JSON.parse(res.responseText);
            alert(res.message);
        });
    }

    function getReviewThumbnail(images, thumbnailNumber) {
        $("#reviewDetail .title_thumbnail").empty();
        $("#reviewDetail .sub_title_thumbnail").empty();

        for (let index = 0; index < images.length; index++) {
            const image = images[index];
            let imageDiv = $(`<img src="/upload/review/${image['file']}" class="img-thumbnail" data-idx="${index}">`);

            if (thumbnailNumber === index) {
                $("#reviewDetail .title_thumbnail").html(imageDiv);
            } else {
                $("#reviewDetail .sub_title_thumbnail").append(imageDiv);
            }
        }

        $(".img-thumbnail").on("click", function() {
            let chanageThumbnailNumber = parseInt($(this).data("idx"));
            if (thumbnailNumber == chanageThumbnailNumber) return;
            thumbnailNumber = chanageThumbnailNumber;
            getReviewThumbnail(images, thumbnailNumber);
        });
    }

    getReviews();
</script>