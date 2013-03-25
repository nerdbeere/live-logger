<?php
print '<pre>';
include './config.php';
require_once '../libs/bootstrap.php';


$time;
while(true) {
    logger::log('a.b.c', array('yay!'));

    if($time%15 === 0) {
        logger::log('a.b.c', array('yay!'));
    }

    if($time%8 === 0) {
        logger::log('e.h.b', array('a' => array('a', 'b', 'c')));
    }

    sleep(1);
    $time++;
}