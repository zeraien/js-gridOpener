<?php
require('inc.php');

$i = $_GET['i'];
$item = $list[$i];
?>
<div class="row">
    <div class="col-xs-12">
        <div class="row">
            <div class="col-xs-12">
                <img class='img-responsive' src="<?=$item['image']?>"/>
            </div>
        </div>
    </div>
</div>
