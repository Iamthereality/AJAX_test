<?php

	require 'connection.php';

	//if fetch data with POST method
	if ($_POST){

		//create variables with form data
		$name = $_POST['name'];	    
		$phone = $_POST['phone'];
		$comment = $_POST['comment'];

		//checking variables
		if (!empty($name) && !empty($phone)) {

			//add variables data to the database
			try {

				$sql = "INSERT INTO feedback (id, Name, Phone, Comment)
	            VALUES (null, '$name', '$phone', '$comment')";

	            $conn->prepare($sql);

			    $conn->exec($sql);
			//errors handler
			} catch (Exception $error) {

				die('Ошибка записи данных!');
				
			}
		}
	    
	}
?>


