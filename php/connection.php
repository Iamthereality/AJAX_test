<?php 

    require 'connection_data.php';

	try {	 	

		//create connection to the mySQl server
		$conn = new PDO("mysql:host=$host", $user, $password);
		
		//create database 
		$conn->exec("CREATE DATABASE IF NOT EXISTS $db DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci");

		//create connection to the database
		$conn = new PDO("mysql:host=$host;dbname=$db", $user, $password, $options);

		//create table
		$conn->exec("CREATE TABLE IF NOT EXISTS $table (
					  	id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
					  	Name VARCHAR(50) NOT NULL,
					  	Phone VARCHAR(20) NOT NULL,
					 	Comment VARCHAR(500) NOT NULL
					) ENGINE = MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci");
    //connection errors handler
	} catch (Exception $error) {

		die('Ошибка подключения к базе данных: ' . $error->getMessage());
	}
	
?>