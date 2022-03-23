<div class="title mb-4">
    <h4 class="bg-light shadow-sm p-3 font-weight-bold">이벤트</h4>
</div>

<form id="eventForm">
    <input type="hidden" name="score" value="1">

    <div class="form-group">
        <label for="name">이름</label>
        <input type="text" class="form-control" id="name" name="name" value="테스트">
    </div>

    <div class="form-group">
        <label for="phone">전화번호</label>
        <input type="tel" class="form-control" id="phone" name="phone" value="010-0000-0001">
    </div>

    <div class="text-right">
        <button type="button" class="btn btn-primary" id="eventBtn">등록</button>
    </div>

</form>

<div class="title my-4">
    <h4 class="bg-light shadow-sm p-3 font-weight-bold">출석체크</h4>
</div>
<div class="stamp-title d-none">
    <h3>축하합니다. 3일연속 출석하여 경품선정 대상자가 되었습니다.</h3>
</div>
<div class="stampList d-flex"></div>

<script>
    $("#eventBtn").on("click", function() {
        const formdata = new FormData($("#eventForm")[0]);
        const phone = $("#phone").val();

        ajax("/api/event/applicants", 'POST', formdata, function(res) {
            res = JSON.parse(res);
            alert(res.message);
            getStampList(phone);
        }, function(res) {
            res = JSON.parse(res.responseText);
            alert(res.message);
        });
    });

    function getStampList(phone) {
        $(".stampList").empty();
        ajax("/api/event/" + phone + "/stamps", 'GET', [], function(res) {
            res = JSON.parse(res);
            for (let index = 0; index < res['stamps'].length; index++) {
                const data = res['stamps'][index];
                let div = $("<div></div>");
                div.html(`<img src="/image/stamp.jpg" alt="" class="stamp mr-3" style="width:100px;">`);
                $(".stampList").append(div);
            }

            if (res['stamps'].length == 3) {
                $(".stamp-title").removeClass("d-none");
            }
        });
    }
</script>