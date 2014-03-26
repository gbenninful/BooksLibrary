$(function(){
    "use strict";
	var Book = function (bookTitle, firstName, lastName, gender) {
	    this.title = bookTitle;
	    this.firstName = firstName;
	    this.lastName = lastName;
	    this.gender = gender;
	};
	var baseUrl = "https://georgeslibrary.azure-mobile.net/tables/authorInfo",
		client = new WindowsAzure.MobileServiceClient(
    					"https://georgeslibrary.azure-mobile.net/",
    					"HleVTiVmsNsfQNEIXAMdRjfnnhudBg11");
	
	var book = {
	    bookTitle: "Animal Farm",
	    firstName: "George",
	    lastName: "Orwell",
        gender: "Male"
	};
	client.getTable("authorInfo").insert(book);


	//$("#save").click(function (event) {
	//    var bookTitle = $("#bookTitle").val();
	//    var firstName = $("firstName").val();
	//    var lastName = $("lastName").val();
	//    var gender = $("gender").val();

	//    event.preventDefault();
	//});

	//var book = new Book(bookTitle, firstName, lastName, gender);
    
	//client.getTable("authorInfo").insert(book);
	    
	
	
	
	
}());
