(function(){
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
	
	$("#save").click(function () {
	    var bookTitle = $("#bookTitle").val();
	    var firstName = $("firstName").val();
	    var lastName = $("lastName").val();
	    var gender = $("gender").val();
	});

	var book = new Book(bookTitle, firstName, lastName, gender);
    
	$.ajax({
		url: baseUrl,
		data: book,
		success: function(msg){
			toastr.success("Success " + msg) 
		},
		error: function(error){
			toastr.error("Error " + error)
		},
		type: "POST"
	});
	
	
	
	
	
	
}());
