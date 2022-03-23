<div class="title mb-4">
    <h4 class="bg-light shadow-sm p-3 font-weight-bold">특상품 수정</h4>
</div>

<div class="row justify-content-center">

    <form action="/admin/modifySpecialityGoods" method="post" enctype="multipart/form-data">
        <input type="hidden" name="idx" value="<?= $specialityGoods->idx ?>">

        <div class="form-group">
            <label for="image">대표특상품 사진</label>
            <div class="small-thumbnail mb-3">
                <img src="/upload/specialityGoods/<?= $specialityGoods->image ?>">
            </div>
            <input type="file" class="form-control" name="image" id="image">
        </div>

        <div class="form-group">
            <label for="city">시군명</label>
            <input type="text" class="form-control" name="city" id="city" value="<?= $specialityGoods->city ?>">
        </div>

        <div class="form-group">
            <label for="title">대표농특산품</label>
            <select class="custom-select" name="title">
                <?php foreach (explode(",", $specialityGoods->list) as $key => $data) { ?>
                    <option value="<?= $data ?>" <?= $data == $specialityGoods->title ? "selected" : "" ?>><?= $data ?></option>
                <?php } ?>
            </select>
        </div>

        <div class="form-group">
            <label for="list">특상품</label>
            <input type="text" class="form-control" name="list" id="list" value="<?= $specialityGoods->list ?>">
        </div>

        <div class="text-right">
            <button type="submit" class="btn btn-primary">수정</button>
        </div>

    </form>

</div>