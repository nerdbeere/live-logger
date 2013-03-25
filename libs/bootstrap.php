<?php

spl_autoload_register(function($class) {
    $d = DIRECTORY_SEPARATOR;
    $path = implode($d, explode('\\', $class));
    $absolutePath = __DIR__ . $d . 'external' . $d . $path . '.php';
    require_once $absolutePath;
});

require_once __DIR__ . '/logger.php';