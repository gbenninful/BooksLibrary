$(function () {
    "use strict";

    var MobileServiceClient = WindowsAzure.MobileServiceClient,
        client = new MobileServiceClient("https://georgeslibrary.azure-mobile.net/", "HleVTiVmsNsfQNEIXAMdRjfnnhudBg11"),
        authorInfoTable = client.getTable("authorInfo");

    var title = $("#bookTitle"),
         bookTitle = title.val(),
         fName = $("#firstName"),
          firstName = fName.val(),
         lName = $("#lastName"),
         lastName = lName.val(),
         gen = $("#gender"),
         gender = gen.val();

    $("#bookform").submit(function (e) {

        //var title = $("#bookTitle"),
        //    bookTitle = title.val(),
        //    fName = $("#firstName"),
        //     firstName = fName.val(),
        //    lName = $("#lastName"),
        //    lastName = lName.val(),
        //    gen = $("#gender"),
        //    gender = gen.val();

        authorInfoTable.insert({
            bookTitle: bookTitle,
            firstName: firstName,
            lastName: lastName,
            gender: gender
        })
            .then(function (data) {
                //console.log(data);
                toastr.success("Your post was successful");
            }, function (error) {
                //console.log("The error is: " + error);
                toastr.error("Your error is " + error);
            });
     

        title.val("").focus();
        fName.val("");
        lName.val("");
        gen.val("");

        e.preventDefault();
    });

    function refreshAuthorInfo() {

        var query = authorInfoTable;
        query.read().then(function (authors) {
            var counter = 0;
            var listAuthorInfo = $.map(authors, function (author) {
                counter += 1;

                return $("<tr>")
                    .attr("data-author-id", author.id)
                    .append($("<td>").html(counter))
                    .append($("<td>").html(author.bookTitle).attr("class", "row-title"))
                    .append($("<td>").html(author.firstName).attr("class", "fname"))
                    .append($("<td>").html(author.lastName).attr("class", "lname"))
                    .append($("<td>").html(author.gender).attr("class", "gen"))
                    .append($("<button class='btn btn-danger author-delete'>Delete</button>"))
                    .append($("<button class='btn btn-warning author-edit'>Edit</button>"));
            });

            $("#authors").empty().append(listAuthorInfo);
            $("#summary").html("Total number of Books in George's Library: <strong>" + authors.length + '</strong>');
            $("#authors").prepend($("<th>Shelf</th> <th>Book Title</th> <th>First Name</th> <th>Last Name</th> <th>Gender</th>"));
        });
    }

    //Delete
    function getAuthorInfoId(formElement) {

        return $(formElement).closest("tr").attr("data-author-id");
    };

    $(document.body).on("click", ".author-delete", function () {
        authorInfoTable.del({ id: getAuthorInfoId(this) }).then(refreshAuthorInfo);
    });

    $("#display").click(function () {

        refreshAuthorInfo();
    })

    //Updates
    $(document.body).on('click', '.author-edit', function () {
        //get the id, title, etc from that row
        var idToUpdate = getAuthorInfoId(this);
        var titleToUpdate = $(this).closest("tr").find(".row-title").html();

        title.val(titleToUpdate);

        //populate the text boxes with that data

        //post/update
        $(document.body).on('click', '#btn-update', function () {
            authorInfoTable.update({ id: idToUpdate, bookTitle: title.val() }).then(refreshAuthorInfo);
        });
    })

}());
