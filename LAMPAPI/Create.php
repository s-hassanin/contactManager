<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$ID = $inData["userId"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331?", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, Phone, Email, ID) VALUES(?,?,?,?,?)");
		$stmt->bind_param("ssssd", $firstName, $lastName, $phone, $email, $ID);
		if($stmt->execute())
		{
			returnWithInfo("success");
		}
		else
		{
			returnWithError("failure");
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

	function returnWithInfo( $obj)
	{
		$retValue = '{"status":"' . $obj .'"}';
		sendResultInfoAsJson( $retValue );
	}
	
	
?>