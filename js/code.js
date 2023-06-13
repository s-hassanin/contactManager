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
		window.location.href = "Login.html";
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
function validatePassword() {
	document.getElementById("registerResult").innerHTML = "";
    var p = document.getElementById('registerPassword').value,
        errors = [];
    if (p.length < 8) {
        errors.push("Your password must be at least 8 characters."); 
    }
    if (p.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit."); 
    }
	if (p.search(/[.*!@#$%^&*]/) < 0)
		errors.push("Your password must contain at least 1 special character.")
    if (errors.length > 0) {
		
        document.getElementById("registerResult").innerHTML = "Password specifications not met.";
        return false;
    }
    return true;
}
function doRegister()
{
	userId = 0;
	let firstName = document.getElementById("registerFirstName").value;
	let lastName = document.getElementById("registerLastName").value;
	let login = document.getElementById("registerUsername").value;
	let password = document.getElementById("registerPassword").value;
	let confirmPassword = document.getElementById("confirmPassword").value;
	document.getElementById("registerResult").innerHTML = "";
	if(/^[a-z]{2,15}$/im.test(firstName)){}
	else
	{
		document.getElementById("registerResult").innerHTML = "Not a valid first name";
		return;
	}
	if(/^[a-z]{2,15}$/im.test(lastName)){}
	else
	{
		document.getElementById("registerResult").innerHTML = "Not a valid last name";
		return;
	}
	if(/[^\s]{2,15}/.test(login)){}
	else
	{
		document.getElementById("registerResult").innerHTML = "Not a valid username";
		return;
	}
	
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
					if(jsonObject.error == "Login Exists")
					{
						document.getElementById("registerResult").innerHTML = jsonObject.error;
						test = 1;
					}
					else
					{
						window.location.href = "Login.html";
					}
				}
			};
			xhr.send(jsonPayload);
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

	if(/^[a-z]{2,15}$/im.test(firstName))
	{
	}
	else
	{
		document.getElementById("contactAddResult").innerHTML = "Not a valid pet name";
		return;
	}
	if(/^[a-z]{2,15}$/im.test(lastName))
	{
	}
	else
	{
		document.getElementById("contactAddResult").innerHTML = "Not a valid last name";
		return;
	}
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/im.test(email))
	{
	}
	else 
	{
		document.getElementById("contactAddResult").innerHTML = "Not a valid email";
		return;
	}
	if (phone.length == 10)
	{
	}
	else
	{
		document.getElementById("contactAddResult").innerHTML = "Not a valid phone number";
		return;
	}
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
				searchContact();
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
	
}
function searchContact()
{
	let search = document.getElementById("searchContact").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	let contactList = 
	'<tr>' + 
	'<th> Pet Name</th>' + 
	'<th> Family Name</th>' + 
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
				document.getElementById("contactSearchResult").innerHTML = "";
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
					contactList += "<td>" + '<button class="buttons" onclick="editContact(this);"><i class="mdi mdi-pencil"></i><span>Edit</span></button>' + "</td>";
					contactList += "<td>" + '<button class="btn btn-delete" onclick="deleteContact(this);"><span class="mdi mdi-delete mdi-24px"></span> <span class="mdi mdi-delete-empty mdi-24px"></span></button>' + "</td>";
					contactList += '<td style="display: none;">' + jsonObject.results[i].ContactID + "</td>";
					contactList += "</tr>";
				}
			}
			catch(Error)
			{
				document.getElementById("contactSearchResult").innerHTML = "";
			}
				document.getElementById("contactList").innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
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
			if(/^[a-z]{2,15}$/im.test(firstNameUpdate)){}
			else
			{
				document.getElementById("deleteContactResult").innerHTML = "Not a valid pet name";
				return;
			}
			if(/^[a-z]{2,15}$/im.test(lastNameUpdate)){}
			else
			{
				document.getElementById("deleteContactResult").innerHTML = "Not a valid last name";
				return;
			}
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/im.test(email)){}
			else 
			{
				document.getElementById("deleteContactResult").innerHTML = "Not a valid email";
				return;
			}
			if (phone.length==10){}
			else
			{
				document.getElementById("deleteContactResult").innerHTML = "Not a valid phone number";
				return;
			}
		
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
						document.getElementById("deleteContactResult").innerHTML = "";
					}
				}
				xhr.send(jsonPayload);
			}
			catch(err)
			{
				document.getElementById("deleteContactResult").innerHTML = err.message;
			}
				
	for (let i = 0; i < row.cells.length - 3; i++)
	{
		row.cells[i].contentEditable = false;
	}
		
		button.children[1].textContent = "Edit";
	}
	else
	{
	button.children[1].textContent = "Save";
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