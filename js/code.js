const urlBase = 'http://pegasuspetfinder.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "PetManager.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}
function doRegister()
{
	let firstName = document.getElementById("registerFirstName").value;
	let lastName = document.getElementById("registerLastName").value;
	let login = document.getElementById("registerUsername").value;
	let password = document.getElementById("registerPassword").value;
	let confirmPassword = document.getElementById("confirmPassword").value;
	document.getElementById("registerResult").innerHTML = "";
	let tmp = {firstName,lastName,login,password};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Register.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	if (password === confirmPassword)
	{
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					let jsonObject = JSON.parse( xhr.responseText );
					document.getElementById("registerResult").innerHTML = jsonObject.data;
				}
			};
			xhr.send(jsonPayload);
			window.location.href = "PetManager.html";
		}
		catch(err)
		{
			document.getElementById("registerResult").innerHTML = err.message;
		}
	}
	else
	{
		document.getElementById("registerResult").innerHTML = "Passwords do not match.";
	}
}

function addContact()
{
	let firstName = document.getElementById("contactFirstName").value;
	let lastName = document.getElementById("contactLastName").value;
	let email = document.getElementById("contactEmail").value;
	let phone = document.getElementById("contactPhone").value;
	document.getElementById("contactAddResult").innerHTML = "";

	let tmp = {firstName,lastName,email,phone,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Create.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	document.getElementById("contactFirstName").value = "";
	document.getElementById("contactLastName").value = "";
	document.getElementById("contactEmail").value = "";
	document.getElementById("contactPhone").value = "";
	searchContact();
	
}
function searchContact()
{
	let search = document.getElementById("searchContact").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	let contactList = 
	'<tr>' + 
	'<th> First Name</th>' + 
	'<th> Last Name</th>' + 
	'<th> Email</th>' + 
	'<th> Phone</th>' + 
	'<th>Edit</th>' + 
	'<th>Delete</th>' + 
	'<th style="display: none;">ID</th>' + 
	'</tr>';

	let tmp = {search,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Search.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) have been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
			try
			{
			 	for ( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += "<tr>";
						
					contactList += "<td>" + jsonObject.results[i].FirstName + "</td>";
					contactList += "<td>" + jsonObject.results[i].LastName + "</td>";
					contactList += "<td>" + jsonObject.results[i].Email + "</td>";
					contactList += "<td>" + jsonObject.results[i].Phone + "</td>";
					contactList += "<td>" + '<button onclick="editContact(this);">Edit</button>' + "</td>";
					contactList += "<td>" + '<button onclick="deleteContact(this);">Delete</button>' + "</td>";
					contactList += '<td style="display: none;">' + jsonObject.results[i].ContactID + "</td>";
					contactList += "</tr>";
				}
			}
			catch(Error)
			{
				document.getElementById("contactSearchResult").innerHTML = "Could not find matching contact";
			}
				document.getElementById("contactList").innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(Error)
	{
		document.getElementById("contactSearchResult").innerHTML = Error.message;
	}
	
}
function editContact(button)
{
	row = button.parentNode.parentNode;

	for (let i = 0; i < row.cells.length - 3; i++)
	{
		row.cells[i].contentEditable = true;
	}
	if(button.textContent === 'Save')
		{
			let firstNameUpdate = row.cells[0].textContent;
			let lastNameUpdate = row.cells[1].textContent;
			let email = row.cells[2].textContent;
			let phone = row.cells[3].textContent;
			let contactId = row.cells[6].textContent;
			let tmp = {contactId, firstNameUpdate, lastNameUpdate, phone, email, userId};
			let jsonPayload = JSON.stringify( tmp );
		
			let url = urlBase + '/Edit.' + extension;
		
			let xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
			try
			{
				xhr.onreadystatechange = function() 
				{
					if (this.readyState == 4 && this.status == 200) 
					{
						let jsonObject = JSON.parse( xhr.responseText );
						document.getElementById("contactSearchResult").innerHTML = jsonObject.results;
					}
				}
				xhr.send(jsonPayload);
			}
			catch(err)
			{
				document.getElementById("contactSearchResult").innerHTML = err.message;
			}
				
	for (let i = 0; i < row.cells.length - 3; i++)
	{
		row.cells[i].contentEditable = false;
	}
		
		button.textContent = "Edit";
	}
	else
	{
	button.textContent = "Save";
	}
}
function deleteContact(button)
{
	document.getElementById("deleteContactResult").innerHTML = "";
	let row = button.parentNode.parentNode;
	contactId = row.cells[6].textContent;
	let tmp = {contactId,userId};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Delete.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					let jsonObject = JSON.parse( xhr.responseText );
					document.getElementById("deleteContactResult").innerHTML = "Delete Success";
					
					row.parentNode.removeChild(row);
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("deleteContactResult").innerHTML = err.message;
		}
}