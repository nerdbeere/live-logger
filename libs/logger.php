<?php
class logger
{
    private static $instance;

    private $amqpConnection;
    private $amqpChannel;
    private $amqpExchange;

    private function __construct()
    {
        $this->amqpConnection = new AMQPConnection(array(
            'host' => 'example.host',
            'vhost' => '/',
            'port' => 5763,
            'login' => 'user',
            'password' => 'password'
        ));

        $this->amqpChannel = new AMQPChannel($this->amqpConnection);
        $this->amqpExchange = new AMQPExchange($this->amqpChannel);
    }

    private function __clone(){}

    private static function getInstance()
    {
        if(self::$instance === null) {
            self::$instance = new debug();
        }
        return self::$instance;
    }

    public static function log($route, $message)
    {
        $self = self::getInstance();
    }
}