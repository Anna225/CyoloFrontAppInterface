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

    //$('#myTable').DataTable(
    //    {
    //        ajax: {
    //            url: "Home/GetCourtCaseList",
    //            type: "POST",
    //        },
    //        processing: true,
    //        serverSide: true,
    //        filter: true,
    //        columns: [
    //            { data: "CourtCaseNo", name: "CourtCaseNo" },
    //            { data: "HearingGeneral", name: "HearingGeneral" },
    //            { data: "ChamberID", name: "ChamberID" },
    //            { data: "HearingDate", name: "HearingDate" },
    //            { data: "HearingTime", name: "HearingTime" },
    //            { data: "HearingType", name: "HearingType" },
    //        ]
    //    }
    //);


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
    if (window.location.href.includes("Match") || window.location.href.includes("GetByCourtCase")) {
        getJuridictionList();
    }
    /*
    $("#select_juridiction_id").select2({
        closeOnSelect: true,
        language: 'nl',
        placeholder: "Rechtscollege",
        minimumInputLength: 3,
        ajax: {
            url: "/cgi-main/ajax-request-json.pl",
            dataType: 'json',
            delay: 250,
            data: function (term) {
                return {
                    requete: 'json_list',
                    liste: 'juridiction',
                    backend: 'N',
                    search: term.term,
                    lg: 'nl',
                };
            },
            processResults: function (data, page) { // parse the results into the format expected by Select2.
                // since we are using custom formatting functions we do not need to alter the remote JSON data
                if (data.message !== '') { return { results: [] }; }
                if (data.message == '') { return { results: data.data }; }
            },
            cache: true
        },
        templateResult: formatResultJuridiction, // omitted for brevity, see the source of this page
        templateSelection: formatSelectionJuridiction,  // omitted for brevity, see the source of this page
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
    });
    */

    //$("#select_juridiction_id").on('change', function (e) {
    //    var tmp = this.value.split('-');
    //    $('#jur_num').val(tmp[0]);
    //    $('#jur_annexe').val(tmp[1]);
    //    $('#liste_fixations').html('');
    //    show_div('/cgi-dossier/ajax-request-html.pl', 'show_fixations_form', tmp[0] + '--' + tmp[1] + '--nl', 'suite_formulaire');
    //}); 

});

/*
$("#select_juridiction_id").select2({
    closeOnSelect: true,
    language: 'nl',
    placeholder: "Rechtscollege",
    minimumInputLength: 3,
    ajax: {
        url: "/cgi-main/ajax-request-json.pl",
        dataType: 'json',
        delay: 250,
        data: function (term) {
            return {
                requete: 'json_list',
                liste: 'juridiction',
                backend: 'N',
                search: term.term,
                lg: 'nl',
            };
        },
        processResults: function (data, page) { // parse the results into the format expected by Select2.
            // since we are using custom formatting functions we do not need to alter the remote JSON data
            if (data.message !== '') { return { results: [] }; }
            if (data.message == '') { return { results: data.data }; }
        },
        cache: true
    },
    templateResult: formatResultJuridiction, // omitted for brevity, see the source of this page
    templateSelection: formatSelectionJuridiction,  // omitted for brevity, see the source of this page
    escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
});
*/
function formatResultJuridiction(data) {
    if (!data.id) return data.message;
    var res = data.type_juridiction.split(' - ');
    var lib_juridiction = '<div> ' + data.jur_num + '-' + data.jur_annexe + ' ' + res[0] + ' ' + data.canton;
    if (data.division_id != '000') { lib_juridiction = lib_juridiction + ' AFDELING ' + data.division; }
    if (data.type_juridiction_id == 38) { lib_juridiction = lib_juridiction.replace('DIVISION', 'SIEGE'); lib_juridiction = lib_juridiction.replace('AFDELING', 'ZETEL'); }
    section = (res.length > 1) ? ', ' + res[1] : '';
    lib_juridiction = lib_juridiction + section
    lib_juridiction = lib_juridiction + '</div>'
    return lib_juridiction;
}
function formatSelectionJuridiction(data) {
    var lib_juridiction = '';
    if (!data.typeJuridiction) { return "Rechtscollege"; }
    var res = data.typeJuridiction.split(' - ');
    lib_juridiction = res[0] + ' ' + data.canton;
    if (data.divisionId != '000') { lib_juridiction = lib_juridiction + ' AFDELING ' + data.division; }
    if (data.typeJuridictionId == 38) {
        lib_juridiction = lib_juridiction.replace('DIVISION', 'SIEGE');
        lib_juridiction = lib_juridiction.replace('AFDELING', 'ZETEL');
    }
    var section = (res.length > 1) ? ', ' + res[1] : '';
    lib_juridiction = lib_juridiction + section;
    return lib_juridiction;
}
function formatNoResultJuridiction(term) {
    return '<div>No result for Juridiction ' + term + '</div>';
}
function compare(a, b) {
    if (a.last_nom < b.last_nom) {
        return -1;
    }
    if (a.last_nom > b.last_nom) {
        return 1;
    }
    return 0;
}