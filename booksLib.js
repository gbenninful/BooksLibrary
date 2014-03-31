$(function () {
    "use strict";

    var MobileServiceClient = WindowsAzure.MobileServiceClient,
        client = new MobileServiceClient("https://georgeslibrary.azure-mobile.net/", "HleVTiVmsNsfQNEIXAMdRjfnnhudBg11"),
        authorInfoTable = client.getTable("authorInfo");

    $("#bookform").submit(function (e) {

        var bookTitle = $("#bookTitle").val(),
            firstName = $("#firstName").val(),
            lastName = $("#lastName").val(),
            gender = $("#gender").val();

        authorInfoTable.insert({
            BookTitle: bookTitle,
            FirstName: firstName,
            LastName: lastName,
            Gender: gender
        })
            .then(function (data) {
                //console.log(data);
                toastr.success("Your post was successful");
            }, function (error) {
                //console.log("The error is: " + error);
                toastr.error("Your error is " + error);
            })
        .then($("#display").click(function () {

            refreshauthorInfo();
        }));

        e.preventDefault();
    });

    function refreshauthorInfo() {

        var query = authorInfoTable;
        query.read().then(function (authors) {
            var listAuthorInfo = $.map(authors, function (author) {
                return $("<tr>")
                    .attr("data-author-id", author.id)
                    .append($("<td>").html(author.bookTitle))
                    .append($("<td>").html(author.firstName))
                    .append($("<td>").html(author.lastName))
                    .append($("<td>").html(author.gender));
            });

            $("#authors").empty().append(listAuthorInfo);
            $("#authors").prepend($("<th>Book Title</th> <th>First Name</th> <th>Last Name</th> <th>Gender</th>"));


        })
    }

}());
