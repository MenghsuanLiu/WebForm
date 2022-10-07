const _url = "../Handler/QueryData.ashx";


$(function () {
    try {
        //按下Query的Event
        $("#qdata").click(function () {
            try {
                callajax_queryTraineeGRP();
            } catch (ex) {
                console.log(ex.message);
            }
        });
    }
    catch (ex) {
        console.log(ex.message);
    }
});


function callajax_queryTraineeGRP() {
    var returnData = null;
    try {
        $.ajax({
            url: _url,
            type: "POST",
            dataType: "json",
            data:
            {
                call_method: "getAllTraineeGRP",
                query_trainee: "",
                json_key: "trainee_grp"
            },
            success: function (data) {
                //var jsonData = JSON.parse(data);


                if (data.error != '') {
                    $("#dt_ls").append(data.error);
                }
                else {
                    $("#tee").empty();
                    $("#tb_class").empty();

                    for (var i = 0; i < data.jsonData.trainee_grp.length; i++) {
                        var strval = "";
                        var tbval = "<tr>";

                        for (var j in data.jsonData.trainee_grp[i]) {
                            strval += data.jsonData.trainee_grp[i][j] + "/";
                            tbval += "<td>" + data.jsonData.trainee_grp[i][j] + "</td>";
                        }
                        tbval += "</tr>"

                        strval = strval.substring(0, strval.length - 1);
                        tbval = tbval.substring(0, tbval.length - 1);
                        $("#tee").append("<li>"+ strval + "</li>")
                        $("#tb_class").append(tbval)
                    }

                    //for (var i = 0; i < data.jsonData.trainee_grp.length; i++) {
                    //    var strOutput = "";

                    //    for (var j in data.jsonData.trainee_grp[i]) {
                    //        strOutput += data.jsonData.trainee_grp[i][j] + "/";
                    //    }

                    //    strOutput = strOutput.substring(0, strOutput.length - 1);
                    //    $("#dt_ls").append(strOutput + "<br/>");

                    //    //$lst_trainee.append("<option value='" + data.jsonData.lst_trainee[i] + "'>" + data.jsonData.lst_trainee[i] + "</option>");
                    //}
                }
                ////console.log(data.error);
                ////console.log(data.jsonData);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("body").append(xhr.status);
                $("body").append(xhr.responseText);
                alert("Ajax發生錯誤!!");
            }
        });
    }
    catch (ex) {
        console.log(ex.message);
    };
    
}

function AlertMsg(msg) {
    $("#dialog-message").html(msg);
    $("#dialog-message").dialog({
        height: "auto",
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });
}
