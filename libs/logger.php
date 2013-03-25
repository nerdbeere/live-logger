<?php
class logger
{
    private static $instance;

    private $connection;
    private $channel;
    private $exchange;


    private static $enabled = true;

    private function __construct()
    {

        try {
            $config = loggerConfigProvider();
        }catch (Exception $e) {
            var_dump($e);
            self::$enabled = false;
            return;
        }

        try {

            $this->connection = new \PhpAmqpLib\Connection\AMQPSocketConnection(
                $config['host'], $config['port'], $config['user'], $config['password'], $config['vhost']
            );

            $this->channel = $this->connection->channel();

            $this->exchange = $config['exchange']['name'];

            $this->channel->exchange_declare(
                $config['exchange']['name'],
                $config['exchange']['type'],
                $config['exchange']['passive'],
                $config['exchange']['durable'],
                $config['exchange']['autoDelete']
            );

            var_dump($this->exchange);

        }catch(Exception $e) {
            var_dump($e);
            self::$enabled = false;
            return;
        }
    }

    //########## Exposed API ##########

    public static function log($route, $subject)
    {
        if(!self::$enabled) {
            return;
        }

        self::getInstance()->sendMessage($route, $subject);
    }

    public function __destruct()
    {
        $this->channel->close();
        $this->connection->close();
    }

    //########## ########### ##########

    private function __clone(){}

    private static function getInstance()
    {
        if(self::$instance === null) {
            self::$instance = new logger();
        }
        return self::$instance;
    }

    private function sendMessage($route, $subject)
    {
        try {
            $message = $this->buildMessage($subject);
            $this->channel->basic_publish($message, $this->exchange, $route);

            //var_dump($msg);
        }catch(Exception $e) {
            var_dump($e);
        }
    }

    private function buildMessage($subject)
    {
        $content = new stdClass();

        $content->head = new stdClass();
        $content->head->type = 'JSON';
        $content->body = new stdClass();
        $content->body = $subject;

        print_r(json_encode($content, JSON_FORCE_OBJECT));

        $message = new PhpAmqpLib\Message\AMQPMessage(json_encode($content, JSON_FORCE_OBJECT), array('content_type' => 'text/plain'));

        return $message;
    }
}