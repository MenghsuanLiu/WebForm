// `date` is a `Date` object
const formatYmd = date => date.toISOString().slice(0, 10);
// Example
const today = formatYmd(new Date());      // 2020-05-06  
const format = "YYYY/MM/DD";
const format2 = "YYYY-MM-DD";
const userid = "soniali";

var $VM = new Vue({
    el: '#vueApp', // binding element /* el:表示這個 vue instance 創建後會掛載取代 id="app" 的元素
    data(){       // 資料區塊
        return {
            view: 'Query', // 'Result','Entry',
            classinfo: [],
            //classinfo : [
            //    {
            //        classid : 'BAS01',
            //        classname : 'HTML vs. IIS web site',
            //        classdate : '2022-08-31',
            //        trainer : 'sonia',
            //    },
            //    {
            //        classid : 'BAS02',
            //        classname : 'CSS/JavaScript/HTML DOM',
            //        classdate : '2022-09-06',
            //        trainer : 'sonia',
            //    },
            //    {
            //        classid : 'BAS03',
            //        classname : 'JQuery/Vue.js',
            //        classdate : '2022-09-13',
            //        trainer : 'sonia',
            //    }                           
            //],
            criteria:{
                classid : '',        
                classdate: '',
                trainer: '',
                signinrecs: [],
                flg_query: false,
            },    
            newsignin:{
                trainee: '',
                signin: 'N',
                flg_signin: false,
                homework: 0,                        
            },
            trainee: [],
            //trainee: [ 
            //    { empid: '949086', trainee: 'link' },
            //    { empid: '081271', trainee: 'stanleyl' },
            //    { empid: '926382', trainee: 'janeth' }
            //],         
        }
    },  
    // created區塊:在DOM渲染成html前callback;用於初始值
    created: function () {
        const self = this;                                                        
    },
    // mounted區塊:在DOM渲染成html後callback(可以視作 jQuery 的 Ready);通常是初始化完成後，再對DOM進行需要的操作
    mounted: function () {     
        const self = this;                
    },    
    // 計算屬性區塊:也可以理解為一種必須回傳一個值的method.但其回傳值,若沒有異動就不會被觸發.在DOM中绑定的才能取得值。
    computed: {
        // read only
    },                      
    // 監聽區塊:watch data change
    watch: {
        // 監聽目標名稱:callback 函數
        "criteria.classid": function(newValue, oldValue) {        
            const self=this;     
            try{
                console.log("%c%s", "color:green", `classid has changed from ${oldValue} to ${newValue}`); 
                self.setClass();                        
            }catch(ex){
                console.log(ex.message);
            }                         
        }
    },
    // 方法區塊:供目前Vue區域內使用,未调用不會執行,只執行logic,不限定需回傳值.
    methods: {    
        setClass : function() {
            const self=this;     
            try{                
                self.criteria.signinrecs = [];                                             
                self.criteria.flg_query = false;
                let _class = self.classinfo.filter(x=>x.classid==self.criteria.classid)[0];                                        
                // .set( target, key, value )
                self.$set( self.criteria, 'classname', _class.classname);    
                self.$set( self.criteria, 'classdate', _class.classdate);
                self.$set( self.criteria, 'trainer', _class.trainer);                                
            }catch(ex){
                console.log(ex.message);
            }                                    
        },
        doQuery : function() {
            const self=this;     
            try {
                callajax_queryresult();       
            }catch(ex){
                console.log(ex.message);
            }                      
        },
        doEntry : function() {
            const self=this;
            try{   
                self.view = 'Entry';           
            }catch(ex){
                console.log(ex.message);
            }                     
        },
        doAbort : function (e){
            const self=this;
            try{                        
                e = e || window.event;
                if (e.srcElement.id=='abort1') self.view = 'Query';
                else self.criteria.signinrecs = [];                      
                console.log("event type:",e.type); //will be the event
                console.log("event element id:",e.srcElement.id); //we be the dom element 
            }catch(ex){
                console.log(ex.message);
            }                   
        },
        doSave : function(){
            const self=this;
            try{       
                if( self.newsignin.trainee == ""){
                    AlertMsg("please select 「Trainee」!");
                    return false;
                }    
                let _classdate = $("#classdate").val();    
                //alert(_classdate);
                if( self.criteria.classdate > today ){
                    AlertMsg("class in future, can not be entry!");
                    return false;
                }                  
                let _signin = $("#signin")[0].checked;
                let _homework = $("#homework").text();
                if( self.newsignin.flg_signin == true && (self.newsignin.homework == "" || self.newsignin.homework == "0" )){
                    AlertMsg("If sign-in,please entry 「homework %」!");
                    return false;
                }
                callajax_insertnew();
                //self.criteria.signinrecs.push({
                //    trainee: self.newsignin.trainee,
                //    signin: self.newsignin.flg_signin==true?"Y":"N",                            
                //    homework: self.newsignin.homework, 
                //});
                //self.view = 'Query';
            }catch(ex){
                console.log(ex.message);
            }                                    
        },
        doDel: function(_trainee){
            const self=this;
            try{       
                ConfirmMsg("Are you sure to delete record?", delY,delN,_trainee);
            }catch(ex){
                console.log(ex.message);
            }                    
        },
        doMod: function (_trainee) {
            const self = this;
            try {
                let _userid = $("#userid").val();
                let _classid = $("#classid").val();
                var postData = {
                    userid: _userid,
                    classid: _classid,
                    trainee: _trainee,
                };

                var url = "./ClassSignIn_Maintain.aspx";                
                $.redirectPost(url, postData);

            } catch (ex) {
                console.log(ex.message);
            }
        },
        confirmDel: function(_trainee){
            //console.log("confirmDel:"+_trainee)
            const self=this;
            try{                               
                //let _existIdx = self.criteria.signinrecs.findIndex(x=>x.trainee==_trainee);
                //this.criteria.signinrecs.splice(_existIdx,1);              
                let _userid = $("#userid").val();
                let _classid = $("#classid").val();
                callajax_delete(_userid,_classid,_trainee);
            }catch(ex){
                console.log(ex.message);
            }                    
        },
        formatDate : function(_date,_format=format) {                    
            //let _output = moment(_date).format(_format);                    
            let _output = '';
            if (_format == format) {
                const [year, month, day] = _date.split('-');
                _output = [year, month, day].join('/');
            }
            if (_format == format2) {
                const [year, month, day] = _date.split('/');
                _output = [year, month, day].join('-');
            }                    
            return(_output);
        },
        link_classSigninRecs: function (_data) {
            const self = this;
            try {                        
                self.criteria.signinrecs = [];
                for (let i = 0; i < _data.length; i++) {
                    _classid = _data[i].classid;
                    self.criteria.signinrecs.push({
                        trainee: _data[i].trainee,
                        signin: _data[i].signin,
                        homework: _data[i].homework,
                    });
                }
                self.criteria.flg_query = true;
            } catch (ex) {
                console.log(ex.message);
            }
        },
        link_initData: function (_data) {
            const self = this;
            try {
                if (_data.classes) {
                    self.classinfo = [];
                    let _rtndata = _data.classes;
                    for (let i = 0; i < _rtndata.length; i++) {
                        self.classinfo.push({
                            classid: _rtndata[i].classid,
                            classname: _rtndata[i].classname,
                            classdate: self.formatDate(_rtndata[i].classdate, format2),                            
                            trainer: _rtndata[i].trainer,
                        });
                    }
                }
                if (_data.trainees) {
                    self.trainee = [];
                    let _rtndata = _data.trainees;
                    for (let i = 0; i < _rtndata.length; i++) {
                        self.trainee.push({
                            empid: _rtndata[i].empid,
                            trainee: _rtndata[i].trainee,
                        });
                    }
                }
                self.criteria.classid = $("#h_classid").val();
                $("#query").show();
            } catch (ex) {
                console.log(ex.message);
            }
        }
    }    
});
window.$VM = $VM;

let loaddata = function(){ // loaddata
    try {
        let _data = "ID="+ userid + " ^^";
        $.ajax({
            type: 'GET',
            //url: 'http://e00d02x04940/BAS03/Form/BAS03.aspx',
            url: './BAS03.aspx',
            data: _data, //發送參數
            success: function (data) {
                console.log(data); //輸出結果
                $('#yourname').html(data); //將結果呈現在Div裡                        
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("body").append(xhr.status);
                $("body").append(xhr.responseText);
                alert("Ajax發生錯誤!!");
            }
        });
        callajax_initdata();        
    //      $.ajax({
    //             type: 'POST',
    //             //url: 'http://e00d02x04940/BAS03/WebService1.asmx/GetTrainees',      
    //             url: '../WebService1.asmx/GetTrainees',
    //             contentType: "application/json; charset=utf-8", // 參數格式
    //             dataType: "json", // 回傳格式
    //             success: function (data) {                                                
    //                 let _ret = JSON.parse(data.d);
    //                 let _retStr = "";
    //                 $.each(_ret, function(index, element) {
    //                     _retStr += index + " - " + element.empid+":"+element.name + "\n";
    //                 });
    //                 alert(_retStr);
    //                 //$("#show").html(ret.replace(/\n/g, "<br />"));  
    //                 //$("body").append(xhr.status);                                                                      
    //             },
    //             error: function (xhr, ajaxOptions, thrownError) {
    //                 $("body").append(xhr.status);
    //                 $("body").append(xhr.responseText);
    //                 alert("Ajax發生錯誤!!");
    //             }
    //      });                  

    }catch(ex){
        console.log(ex.message);
    }                
}      
let del = function(dataid){
    try{                                       
        $("[id='" + dataid + "']").hide();                 
    }catch(ex){
        console.log(ex.message);
    }                
} 
        
// JQuery --Shorthand for $( document ).ready(): DOM is ready for JavaScript code to execute
$(function() {
    try {
        /* Set Default Value --------------------------------------- */
        $("#userid").val(userid);
        loaddata();

        /* Set Event ----------------------------------------- */
        $("#trainee").change(function () {
            $(this).css("background-color", "#D6D6FF");
            $("#signin").attr('checked', false);
            $("#homework").val('0');
        });

        $("#query").click(function () {
            try {
                callajax_queryresult();
            } catch (ex) {
                console.log(ex.message);
            }
        });

        /* Setting by flow and handletype -------------------------- */

    } catch (e) {
        alert(e);
    }
});          


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

function ConfirmMsg(msg, _yfunc, _nfunc,_datakey) {
    $("#dialog-message").html(msg);
    $("#dialog-message").dialog({
        height: "auto",
        modal: true,
        //autoOpen: false,
        buttons: {
            'Yes': function () {                    
                $(this).dialog('close');
                _yfunc(_datakey);
            },
            'No': function () {
                $(this).dialog('close');
                _nfunc();
            } 
        }
    });
}          

function delY(_trainee){            
    //console.log("delY:"+_trainee);
    $VM.confirmDel(_trainee);            
}

function delN(){
    //console.log("delN:");
}

function callajax_queryresult() {
    var _userid = $("#userid").val();
    var _classid = $("#classid").val();
    var params = {
        userid: _userid,
        classid: _classid,
    };
    var postData = {
        type: "GetSignInRecs", //DataHandler.ashx ~ method
        params: JSON.stringify(params),
        propStr: "rData" //DataHandler ,jsondata key. 
    };
    var rtnData = callAjax(postData, true, GetSignInRecsRtn); //async
}

function callajax_insertnew() {
    let _signin = $("#signin")[0].checked;
    let _homework = Number($("#homework").val());
    let _vo = {
        userid: $("#userid").val(),
        classid: $("#classid").val(),
        trainee: $("#trainee").val(),
        signin: _signin==true?"Y":"N",
        homework: _homework,
    };
    let _jsondata = "";
    _jsondata = "[" + JSON.stringify(_vo) + "]";
    var params = {
        newdata: _jsondata,
    };
    var postData = {
        type: "SaveSignInRec", //DataHandler.ashx ~ method
        params: JSON.stringify(params),
        propStr: "rData" //DataHandler ,jsondata key. 
    };

    var rtnData = callAjax(postData, true, SaveSignInRecRtn); //async
}

function callajax_delete(_userid,_classid,_trainee) {
    var params = {
    userid: _userid,
    classid: _classid,
    trainee: _trainee,
    };
    var postData = {
    type: "DelSignInRec", //DataHandler.ashx ~ method
    params: JSON.stringify(params),
    propStr: "rData" //DataHandler ,jsondata key. 
    };

    var rtnData = callAjax(postData, true,DelSignInRecRtn); //async
}

function callajax_initdata() {
    try {
        $("#query").hide();
        var _classid = "";        
        if ($("#classid").length > 0 && $("#classid").val() != null)
            _classid = $("#classid").val();
        var params = {
            classid: _classid,
        };
        var postData = {
            type: "GetInitData", //DataHandler.ashx ~ method        
            params: JSON.stringify(params),
            propStr: "rData" //DataHandler ,jsondata key. 
        };

        var rtnData = callAjax(postData, true, GetInitDataRtn); //async
        //GetInitDataRtn('', rtnData);
    } catch (ex) {
        console.log(ex.message);
    }
}

function GetInitDataRtn(type, rtnData) {
    if (typeof (rtnData.error) != 'undefined') {
        if (rtnData.error != "") {
            alert(rtnData.error);
        } else {
            var _data = rtnData.jsonData;
            $VM.link_initData(_data);
            console.log(_data);
        }
    }
}

function GetSignInRecsRtn(type, rtnData) {
    if (typeof (rtnData.error) != 'undefined') {
        if (rtnData.error != "") {
            alert(rtnData.error);
        } else {
            var _data = rtnData.jsonData.rData;
            console.log(_data);

            $VM.link_classSigninRecs(_data);
            //generateResultTable(_data);            
        }
    }
}

/**
 * JQuery generate table
 * @param {any} _data
 */
function generateResultTable(_data) {    
    for (var i = 0; i < _data.length; i++) {
        $('#tabResult tbody').append($('<tr>')
            .attr('id', _data[i].trainee)
            .append($('<td>')
                .attr('class', 'info')
                .append($("<i>")
                    .attr('id', 'del_'+ _data[i].trainee)
                    .attr('class', 'fa fa-minus')
                    .attr('style', 'font-size:20px;color:red;cursor: pointer;')
                )
            )
            .append($('<td>')
                .attr('class', 'info')
                .append($("<i>")
                    .attr('id', 'mod_' + _data[i].trainee)
                    .attr('class', 'fa fa-pencil-square-o')
                    .attr('style', 'font-size:20px;color:forestgreen;cursor: pointer;')
                )
            )
            .append($('<td>')
                .attr('class', 'info')
            )
            .append($('<td>')
                .attr('class', 'info')
            )
            .append($('<td>')
                .attr('class', 'info')
                .text(_data[i].trainee)
            )
            .append($('<td>')
                .attr('class', 'info center')
                .append($('<input>')
                    .attr('type', 'checkbox')
                    .attr('id', 'chk_signin_1')
                    .attr('name', 'chk_signin')                    
                )
            )
            .append($('<td>')
                .attr('class', 'info')
                .text(_data[i].homework+ '%')
            )
        );

    };

    $('i.fa.fa-minus').click(function () {
        console.log($(this));
        let _id = $(this).attr('id');
        let _lst = _id.split("_");
        let _datakey = _lst[1];
        $VM.doDel(_datakey);        
    });
    $('i.fa.fa-pencil-square-o').click(function () {
        console.log($(this));
        let _id = $(this).attr('id');
        let _lst = _id.split("_");
        let _datakey = _lst[1];
        $VM.doMod(_datakey);
    });
}

function SaveSignInRecRtn(type, rtnData) {
    if (typeof (rtnData.error) != 'undefined') {
        if (rtnData.error != "") {
            alert(rtnData.error);
        } else {
            var _data = rtnData.jsonData;
            // re-Query
            callajax_queryresult();
            $VM.view = 'Query';
            console.log(_data);
        }
    }
}

function DelSignInRecRtn(type, rtnData) {
    if (typeof (rtnData.error) != 'undefined') {
        if (rtnData.error != "") {
            alert(rtnData.error);
        } else {
            var _data = rtnData.jsonData;
            // re-Query
            callajax_queryresult();
            $VM.view = 'Query';
            console.log(_data);
        }
    }
}

function callAjax(postData, async, customFunc) {
    var returnData = null;
    if (async) {
        $.blockUI();
    }
    var url = "../Handler/ClassSignIn_DataHandler.ashx";
    // alert(url);    
    $.ajax({
        type: "POST",
        async: async,
        url: url,
        data: postData,
        cache: false,
        lock: true,
        force: false,
        silent: false,
        dataType: "json",
        success: function (data) {
            returnData = data;
            if (async) {
                customFunc(postData.type, returnData);
            }
        },
        error: function (d, e) {
            alert(d.error); alert(e);
        },
        complete: function (d, e) {
            if (async) {
                $.unblockUI();
            }
        }
    });
    return returnData;
}

// jquery extend function
$.extend(
    {
        redirectPost: function (location, args) {
            var form = '';
            $.each(args, function (key, value) {
                value = value.split('"').join('\"')
                form += '<input type="hidden" name="' + key + '" value="' + value + '">';
            });
            $('<form action="' + location + '" method="POST">' + form + '</form>').appendTo($(document.body)).submit();
        }
    });
