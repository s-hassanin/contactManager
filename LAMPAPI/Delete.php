<?php
	$inData = getRequestInfo();

	// data collected for API call
	
	$contactId = $inData["contactId"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331?", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("DELETE from Contacts WHERE ContactID=? AND UserID=?");
		$stmt->bind_param("dd",$contactId, $userId);
		if($stmt->execute())
        {
            returnWithInfo("deleted");
        }
        else
        {
            returnWithError("not deleted");
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