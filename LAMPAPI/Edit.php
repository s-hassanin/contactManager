<?php

	$inData = getRequestInfo();
	
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331?", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else 
	{
		$stmt = $conn->prepare("UPDATE * FROM Contacts SET firstName=? OR lastName=? OR phone=? OR email=? WHERE ID=?");
		$stmt->bind_param("ssssd", $inData["firstName"], $inData["lastName"], $inData["phone"], $inData["email"], $inData["userId"]);
		
		//if condition might need to be something like $conn->query($stmt) === TRUE if that doesn't work
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
