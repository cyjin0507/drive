<div class="title mb-4">
    <h4 class="bg-light shadow-sm p-3 font-weight-bold">이벤트</h4>
</div>

<form method="GET">
    <div class="mb-3">
        <input type="date" class="form-control" id="date" name="date" value="<?= $_GET['date'] ?? "" ?>">
    </div>
    <div class="text-right">
        <button type="submit" class="btn btn-primary">날짜조회</button>
    </div>
</form>

<div class="row justify-content-start">

    <?php foreach ($datas as $key => $data) { ?>

        <div class="card m-3" style="width: 18rem;">
            <?php if (count($data->stamps) == 3) { ?>
                <span class="badge badge-primary">당첨 대상자</span>
            <?php } ?>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        이름: <?= $data->name ?>
                    </li>
                    <li class="list-group-item">
                        휴대폰번호: <?= $data->phone ?>
                    </li>
                    <li class="list-group-item">
                        점수(찾은 카드 수): <?= $data->score ?>
                    </li>
                    <li class="list-group-item">
                        참여일: <?= $data->create_dt ?>
                    </li>
                    <li class="list-group-item">
                        연속출석일수: <?php foreach ($data->stamps as $key => $stamp) { ?>
                            <?= $stamp->create_dt ?>
                        <?php } ?>
                    </li>
                </ul>
            </div>
        </div>

    <?php
    }
    ?>

</div>