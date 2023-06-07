<?php

	$inData = getRequestInfo();

    $contactId = $inData["contactId"];
    $firstNameUpdate = $inData["firstNameUpdate"];
    $lastNameUpdate = $inData["lastNameUpdate"];
    $phoneUpdate = $inData["phone"];
    $emailUpdate = $inData["email"];
    $userId = $inData["userId"];
	
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331?", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else 
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE UserID=? AND ContactID=?");
		$stmt->bind_param("ssssdd", $firstNameUpdate, $lastNameUpdate, $phoneUpdate, $emailUpdate, $userId, $contactId);
        if($stmt->execute())
		{
			returnWithInfo("update success");
		}
		else
		{
			returnWithError("update failure");
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
		$retValue = '{"error":"' . $err .'"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $obj )
	{
		$retValue = '{"status":"' . $obj .'"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
