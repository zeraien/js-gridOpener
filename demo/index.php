<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="//code.jquery.com/jquery-1.11.2.js"></script>
    <link href="//maxcdn.bootstrapcdn.com/bootswatch/3.3.4/cerulean/bootstrap.css" rel="stylesheet">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <link href="style.css" rel="stylesheet">
    <!-- open_it -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js"></script>
    <link href="../open_it/gridOpener.css" rel="stylesheet">
    <script src="../open_it/fastClick.js"></script>
    <script src="../open_it/gridOpener.js"></script>
    <!-- end open_it -->
</head>
<body>
<?php
require('inc.php');

?>

<div class="container">
    <div class="row">
        <? foreach ($list as $item): ?>
            <div class="box col-sm-4 col-md-3" data-url="<?=$item['target_url']?>">
                <a href="#<?=$item['target_url']?>" class="" role="button">
                    <div class="thumbnail">
                        <img src="<?=$item['image']?>" style="max-height: 100px;">
                        <div class="caption">
                            <h3><?=$item['title']?></h3>
                            <p><?=$item['subtitle']?></p>
                        </div>
                    </div>
                </a>
            </div>
        <? endforeach; ?>
    </div>

    <div id="templates" style="display:none;">
        <!-- EXPANDED ROW -->
        <div class="expandable" id="expandable-template">
            <a href="#" class="close">&times;</a>
            <div class="wrapper"></div>
        </div>
        <!-- END! EXPANDED ROW -->
    </div>
</div>
</body>
</html>
