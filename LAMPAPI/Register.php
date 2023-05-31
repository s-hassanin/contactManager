<?php
	$inData = getRequestInfo();

	// data collected for API call
	
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["login"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331?", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT Login FROM Users WHERE Login=?");
		$stmt->bind_param("s", $login);
		$stmt->execute();
		$result = $stmt->get_result();
		if( mysqli_num_rows($result) == 0  )
		{
			$stmt1 = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
		    $stmt1->bind_param("ssss", $firstName, $lastName, $login, $password);
            $stmt1->execute();
            $id = $conn->insert_id;
		    $stmt1->close();
		    returnWithInfo($id);
		}
		else
		{
            returnWithError("Login Exists");
		}
		$stmt->close();
		$conn->close();
		
		
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $obj )
	{
		$retValue = '{"status":"' . $obj .'"}';
		sendResultInfoAsJson( $retValue );
	}
	
	
?>