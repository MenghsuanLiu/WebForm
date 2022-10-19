const _url_ajaxPOst = "../Handler/ClassSignIn_DataHandler.ashx";

$(function () {

    try {
        $("#save").click(function () {
            let bRtn = true;

            if ($("#form_mod").validationEngine('validate') == true) {
                bRtn = confirm("確定儲存？");
                if (!bRtn) {
                    return false;
                }

                // form1 上 css class = "saveform"的 tag value 轉成JSON string
                let Jsondata = "";
                //後面ClassInfoGet.cs在json->obj時是用[0]取值
                Jsondata = "[" + JSON.stringify($('#form_mod .saveform').serializeObject()) + "]";
                console.log(Jsondata);

                let params = {
                    data: Jsondata
                };
                // console.log(JSON.stringify(params));
                let postData = {
                    type: "CreateModifyRec",
                    params: JSON.stringify(params),
                    propStr: "rData"                //DataHandler ,jsondata key.
                }
                let rtnData = callAjax(postData, true, CreateModifyRtn);  //async
            }
            else {
                // alert("Validate :false");
                return false;
            }
            return false;
        });    
 
    }
    catch (exce) {
        alert(exce)
    }
})

function callAjax(putParameter, async, customFunc) {
    var returnData = null;
    if (async) {
        $.blockUI({
            message: "<i class='fa fa-spinner fa-pulse orange' style='font-size:600%'></i>",
            /*"<img src='./image/Color-Loading-2.gif' />",*/
            css: { borderWidth: '0px', backgroundColor: 'transparent' }
        });
    }

    // alert(url);    
    $.ajax({
        type: "POST",
        async: async,
        url: _url_ajaxPOst,
        data: putParameter,
        cache: false,
        lock: true,
        force: false,
        silent: false,
        dataType: "json",
        success: function (data) {
            returnData = data;
            if (async) {
                customFunc(putParameter.type, returnData);
            }
        },
        error: function (d, e) {
            //alert(d.error); alert(e);
            console.log(d.error);
            console.log(e);
        },
        complete: function (d, e) {
            if (async) {
                $.unblockUI();
            }
        }
    });
    return returnData;
}
function CreateModifyRtn(type, rtnData) {
    try {
        if (typeof (rtnData.error) != 'undefined') {
            if (rtnData.error != "") {
                alert(rtnData.error);
            } else {
                console.log(rtnData.jsonData);
                if (rtnData.jsonData.rData) {
                    var _data = rtnData.jsonData.rData;
                    alert(_data);
                }
                console.log("End~~~~");
            }
        }
    } catch (ex) {
        console.log(ex.message);
    }
}
