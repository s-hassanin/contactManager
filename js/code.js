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
let contactFirstName;
let contactLastName;
function editContact(button)
{
	row = button.parentNode.parentNode;

	for (let i = 0; i < row.cells.length - 2; i++)
	{
		row.cells[i].contentEditable = true;
	}
	if(button.textContent === 'Save')
		{
			let firstNameUpdate = row.cells[0].textContent;
			let lastNameUpdate = row.cells[1].textContent;
			let email = row.cells[2].textContent;
			let phone = row.cells[3].textContent;
			let firstName = contactFirstName;
			let lastName = contactLastName;
		
			let tmp = {firstName, lastName, firstNameUpdate, lastNameUpdate, phone, email, userId};
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
				
	for (let i = 0; i < row.cells.length - 2; i++)
	{
		row.cells[i].contentEditable = false;
	}
		
		button.textContent = "Edit";
		searchContact();
	}
	else
	{
	contactFirstName = row.cells[0].textContent;
	contactLastName = row.cells[1].textContent;
	button.textContent = "Save";
	}
}
function deleteContact(button)
{
	document.getElementById("deleteContactResult").innerHTML = "";
	let row = button.parentNode.parentNode;
	let firstName = row.cells[0].textContent;
	let lastName = row.cells[1].textContent;
	let tmp = {firstName,lastName,userId};
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