<?php

    //db connection data
    $host = 'localhost';
    $user = 'root';
    $password = 'root';
    $db = 'test_db';
    $table = 'feedback';
    $port = '3306';
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

?>