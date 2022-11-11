// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(function () {

    $('#date').datepicker({
        uiLibrary: 'bootstrap4'
    });

    $('#hearingdate').datepicker({
        uiLibrary: 'bootstrap4'
    });

    $('#hearingtime').timepicker({
        uiLibrary: 'bootstrap4'
    });

    $('#result').DataTable();

    //$('#rsDlg').on('hide', function () {
    //    window.location.href = "/";
    //});


    $(".btn-approve").click(function (e) {
        e.preventDefault();
        var caseno = $(e.target).data("caseno");
        if (caseno != null) {
            $.ajax({
                type: "GET",
                url: "/Manage/CourtCase/Approve?caseno=" + caseno,
                data: caseno,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response != null) {
                        $("#rsDlg .modal-body").html(response.value);
                        $("#rsDlg").modal();
                    } else {
                        $("#rsDlg .modal-body").html("Something went wrong");
                        $("#rsDlg").modal();
                    }
                },
                failure: function (response) {
                    $("#rsDlg .modal-body").html(response.responseText);
                    $("#rsDlg").modal();
                },
                error: function (response) {
                    $("#rsDlg .modal-body").html(response.responseText);
                    $("#rsDlg").modal();
                }
            });
        }
    });

    $(".btn-upload").click(function (e) {

        e.preventDefault();

        if ($("#courtcaseno").val() == '') {
            $("#courtcaseno").siblings().addClass("b");
            $("#courtcaseno").focus();
            return;
        } else {
            $("#courtcaseno").siblings().removeClass("b");
        }

        if ($("#uploaderemail").val() == '') {
            $("#uploaderemail").siblings().addClass("b");
            $("#uploaderemail").focus();
            return;
        } else {
            $("#uploaderemail").siblings().removeClass("b");
        }

        if ($("#jurisdiction").val() == '') {
            $("#jurisdiction").siblings().addClass("b");
            $("#jurisdiction").focus();
            return;
        } else {
            $("#jurisdiction").siblings().removeClass("b");
        }

        if ($("#chamberid").val() == '') {
            $("#chamberid").siblings().addClass("b");
            $("#chamberid").focus();
            return;
        } else {
            $("#chamberid").siblings().removeClass("b");
        }

        if ($("#hearingtype").val() == '') {
            $("#hearingtype").siblings().addClass("b");
            $("#hearingtype").focus();
            return;
        } else {
            $("#hearingtype").siblings().removeClass("b");
        }

        if ($("#firstname").val() == '') {
            $("#firstname").siblings().addClass("b");
            $("#firstname").focus();
            return;
        } else {
            $("#firstname").siblings().removeClass("b");
        }

        if ($("#lastname").val() == '') {
            $("#lastname").siblings().addClass("b");
            $("#lastname").focus();
            return;
        } else {
            $("#lastname").siblings().removeClass("b");
        }

        if ($("#hearingdate").val() == '') {
            $("#hearingdate").siblings().addClass("b");
            $("#hearingdate").focus();
            return;
        } else {
            $("#hearingdate").siblings().removeClass("b");
        }

        if ($("#hearingtime").val() == '') {
            $("#hearingtime").siblings().addClass("b");
            $("#hearingtime").focus();
            return;
        } else {
            $("#hearingtime").siblings().removeClass("b");
        }

        var params = {
            courtcaseno: $("#courtcaseno").val(),
            jurisdiction: $("#jurisdiction").val(),
            uploaderemail: $("#uploaderemail").val(),
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            chamberid: $("#chamberid").val(),
            hearingdate: $("#hearingdate").val(),
            hearingtime: $("#hearingtime").val(),
            hearingtype: $("#hearingtype").val(),
        };

        if (params != null) {
            $.ajax({
                type: "POST",
                url: "/Agenda/Create",
                data: params,
                contentType: 'application/x-www-form-urlencoded',
                success: function (response) {
                    if (response != null) {
                        //$('#rsDlg').on('hide', function () {
                        window.location.href = "/Manage/CourtCase/AgendasByEmail?email=" + params.uploaderemail;
                        //});
                        $("#myModal").modal('hide');
                        $("#rsDlg .modal-body").html("Upload succesully.");
                        $("#rsDlg").modal();                        
                    } else {
                        $("#myModal").modal("hide");
                        $("#rsDlg .modal-body").html("Upload failed.");
                        $("#rsDlg").modal();
                    }
                },
                failure: function (response) {
                    $("#rsDlg .modal-body").html(response.responseText);
                    $("#myModal").modal('hide');
                },
                error: function (response) {
                    $("#rsDlg .modal-body").html(response.responseText);
                    $("#myModal").modal('hide');
                }
            });
        }
    });

    $("#date").change(function (e) {
        var tmp = $(e.target).val();
        if (tmp.includes("/")) {
            var arr = tmp.split("/");
            var newDate = arr[2] + "-" + arr[0] + "-" + arr[1];
            $("#date").val(newDate);
        }
    });

    $("#hearingdate").change(function (e) {
        var tmp = $(e.target).val();
        if (tmp.includes("/")) {
            var arr = tmp.split("/");
            var newDate = arr[2] + "-" + arr[0] + "-" + arr[1];
            $("#hearingdate").val(newDate);
        }
    });
});

