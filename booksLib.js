$(function () {
    "use strict";

    var MobileServiceClient = WindowsAzure.MobileServiceClient,
        client = new MobileServiceClient("https://georgeslibrary.azure-mobile.net/", "HleVTiVmsNsfQNEIXAMdRjfnnhudBg11"),
        authorInfoTable = client.getTable("authorInfo");

    var title = $("#bookTitle"),
        fName = $("#firstName"),
        lName = $("#lastName"),
        gen = $("#gender");

    function clearForm() {
        title.val("").focus();
        fName.val("");
        lName.val("");
        gen.val("");
    };

    $("#bookform").submit(function (e) {
       var  bookTitle = title.val(),
            firstName = fName.val(),
            lastName = lName.val(),
            gender = gen.val();

        authorInfoTable.insert({
            bookTitle: bookTitle,
            firstName: firstName,
            lastName: lastName,
            gender: gender
        })
            .then(function (data) {
                toastr.success("Your post was successful");
            }, function (error) {
                toastr.error("Your error is " + error);
            });

        clearForm();

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
                    .append($("<td>").html(author.firstName).attr("class", "row-fname"))
                    .append($("<td>").html(author.lastName).attr("class", "row-lname"))
                    .append($("<td>").html(author.gender).attr("class", "row-gen"))
                    .append($("<button class='btn btn-danger author-delete'>Delete</button>"))
                    .append($("<button class='btn btn-warning author-edit'>Edit</button>"));
            });

            $("#authors").empty().append(listAuthorInfo);
            $("#summary").html("Total number of Books in George's Library: <strong>" + authors.length + '</strong>');
            $("#authors").prepend($("<th>Shelf</th> <th>Book Title</th> <th>First Name</th> <th>Last Name</th> <th>Gender</th>"));

        }).then($("#display").click(function () {

            refreshAuthorInfo();
        })

        );
    }

    //Getting id for Update & Delete
    function getAuthorInfoId(formElement) {
        return $(formElement).closest("tr").attr("data-author-id");
    };

    //Delete
    $(document.body).on("click", ".author-delete", function () {
        authorInfoTable.del({ id: getAuthorInfoId(this) }).then(refreshAuthorInfo);
    });

    $("#display").click(function () {
        refreshAuthorInfo();
    })

    //Updates
    var idToUpdate;
    $(document.body).on('click', '.author-edit', function () {
        //get the id, title, etc from that row
        idToUpdate = getAuthorInfoId(this);
        console.log(idToUpdate);
        var titleToUpdate = $(this).closest("tr").find(".row-title").html();
        var fNameToUpdate = $(this).closest("tr").find(".row-fname").html();
        var lNameToUpdate = $(this).closest("tr").find(".row-lname").html();
        var genToUpdate = $(this).closest("tr").find(".row-gen").html();

        //populate the text boxes with that data
        title.val(titleToUpdate);
        fName.val(fNameToUpdate);
        lName.val(lNameToUpdate);
        gen.val(genToUpdate);

        //post/update
        $(document.body).on('click', '#btn-update', function () {
            console.log(idToUpdate);
            authorInfoTable.update({
                id: idToUpdate,
                bookTitle: title.val(),
                firstName: fName.val(),
                lastName: lName.val(),
                gender: gen.val()
            }).then(refreshAuthorInfo);

            clearForm();

        });
    })

}());
