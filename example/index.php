<?php
print '<pre>';
include './config.php';
require_once '../libs/bootstrap.php';



while(true) {
    logger::log('a.b.c', array('yay!'));
    sleep(10);
}