<div class="title mb-4">
    <h4 class="bg-light shadow-sm p-3 font-weight-bold">특상품 안내</h4>
</div>

<div class="row justify-content-center">

    <?php foreach ($specialityGoodsList as $key => $specialityGoods) { ?>

        <div class="card m-3" style="width: 18rem;">
            <img class="card-img-top" src="/upload/specialityGoods/<?= $specialityGoods->image ?>">
            <div class="card-body">
                <h5 class="card-title mb-0"><?= $specialityGoods->city ?> - <?= $specialityGoods->title ?></h5>
            </div>
        </div>

    <?php
    }
    ?>

</div>