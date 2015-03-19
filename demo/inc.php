<?php
/**
 * Created by PhpStorm.
 * User: zeraien
 * Date: 2015-03-19
 * Time: 17:13
 */

$images = array(
    "http://i.imgur.com/2M3R9cw",
    "http://i.imgur.com/EWJxxq1",
    "http://i.imgur.com/vHWaQ02",
    "http://i.imgur.com/ozDZpKu",
    "http://i.imgur.com/6SqoFIx",
    "http://i.imgur.com/dlMXTmY",
);
$list = array();
for ($i  = 0; $i<6; $i++)
{
    $list[] = array(
        "target_url"=>"site.php?i=$i",
        "image"=>$images[$i]."l.jpg",
        "thumbnail"=>$images[$i]."s.jpg",
        "title"=>"Title ".$i,
        "subtitle"=>"Subtitle ".$i,
        "content"=>"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    );

}
$list = array_merge($list, $list);
