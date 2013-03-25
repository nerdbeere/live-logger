<?php

function loggerConfigProvider() {
    $config = array();
    $config['host'] = 'localhost';
    $config['vhost'] = '/';
    $config['port'] = 5672;
    $config['user'] = 'root';
    $config['password'] = 'root';

    $exchange = array();

    $exchange['name'] = 'debug';
    $exchange['type'] = 'fanout';
    $exchange['passive'] = 'false';
    $exchange['durable'] = 'true';
    $exchange['autoDelete'] = 'false';

    $config['exchange'] = $exchange;

    return $config;
}