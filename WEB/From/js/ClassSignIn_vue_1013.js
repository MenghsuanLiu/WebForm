const _userid = "chrisliu";
const _url_ajaxGet = "../Handler/GetTitleText.ashx"
const _url_ajaxPOst = "../Handler/ClassSignIn_DataHandler.ashx";
// `date` is a `Date` object
const formatYmd = date => date.toISOString().slice(0, 10);
// Example
const today = formatYmd(new Date());      // 2020-05-06  
const format = "YYYY/MM/DD";
const ymd_format = "YYYY-MM-DD";

var $VM = new Vue({ 
    el: '#vueApp', // binding element /* el:表示這個 vue instance 創建後會掛載取代 id="app" 的元素
    data(){       // 資料區塊
        return {
            view: 'Query', // 'Result','Entry',
            classinfo:{
                    classid : "",
                    classname : "",
                    classdate : "",
                    trainer : "",
            },
            criteria:{
                classid: "",        
                classdate: "",
                trainer: "",
                signinrecs: [],
                flg_query: false,
            },    
            newsignin:{
                trainee: "",
                signin: "N",
                flg_signin: false,
                homework: 0,                        
            },     
            // trainee: [ 
            //     { gpid: "G1", empid: '949086', userid: 'link' },
            //     { gpid: "G2", empid: '081271', userid: 'stanleyl' },
            //     { gpid: "G3", empid: '926382', userid: 'janeth' }
            // ],        
            // classSigninRecs:[
            //     {
            //         classid : 'BAS01',  
            //         trainees: [
            //             {   
            //                 trainee: 'link',
            //                 signin: 'Y',
            //                 homework: 90,
            //             },
            //             {   
            //                 trainee: 'stanleyl',
            //                 signin: 'Y',
            //                 homework: 10,
            //             },                            
            //         ]                                                                  
            //     }, 
            //     {
            //         classid : 'BAS02',  
            //         trainees: [
            //             {   
            //                 trainee: 'link',
            //                 signin: 'Y',
            //                 homework: 20,
            //             },
            //             {   
            //                 trainee: 'stanleyl',
            //                 signin: 'N',
            //                 homework: 0,
            //             },                            
            //         ]                                                                  
            //     },
            //     {
            //         classid : 'BAS04',  
            //         trainees: [
            //             {   
            //                 trainee: 'chris',
            //                 signin: 'Y',
            //                 homework: 40,
            //             },
            //             {   
            //                 trainee: 'little',
            //                 signin: 'Y',
            //                 homework: 70,
            //             },                            
            //         ]                                                                  
            //     },                         
            // ]     
        }
    },  
    // created區塊:在DOM渲染成html前callback;用於初始值
    created: function () {
        const self = this;           
        // this.initdata();                                 
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
        //initdata : function() {
        //    const self=this;                     
        //    self.criteria.classid = 'BAS02';                   
        //},      
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
        //按下Query鍵
        doQuery: function () {
            const self = this;
            try {
                queryresult_ajax();
                //callajax_queryresult();
            } catch (ex) {
                console.log(ex.message);
            }
        },
        //doQuery : function() {
        //    const self=this;     
        //    try{                          
        //        let _lst = self.classSigninRecs.filter(x=>x.classid==self.criteria.classid)[0];  
        //        if (!_lst) return;
        //        let _rec = _lst.trainees;  
        //        self.criteria.signinrecs = _rec; 
        //        self.criteria.flg_query = true;
        //        //console.log(self.criteria.signinrecs);                
        //    }catch(ex){
        //        console.log(ex.message);
        //    }                      
        //},
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
                if (e.srcElement.id == 'save_abort') self.view = 'Query';
                else {
                    self.criteria.signinrecs = [];
                    self.criteria.flg_query = false;
                }
                                          
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
                insertnew_ajax();
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
                ConfirmMsg("Are you sure to delete record?",delY,delN,_trainee);
            }catch(ex){
                console.log(ex.message);
            }                    
        },
        confirmDel: function(_trainee){
            //console.log("confirmDel:"+_trainee)
            const self=this;
            try{                               
                let _existIdx = self.criteria.signinrecs.findIndex(x=>x.trainee==_trainee);
                this.criteria.signinrecs.splice(_existIdx,1);
            }catch(ex){
                console.log(ex.message);
            }                    
        },
        formatDate : function(_date) {                    
            let _output = moment(_date).format(ymd_format);
            return(_output);
        },
        //取得資料寫進classinfo
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
                            classdate: self.formatDate(_rtndata[i].classdate, ymd_format),
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
        },
        //取得資料寫入criteria.signinrecs,同時指定criteria.flg_query = true
        link_classSelectedResult: function (_data) {
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
        }
    }    
});
window.$VM = $VM;


let loadTitle = function () {
    try {
        $.ajax({
            type: "GET",
            url: _url_ajaxGet,
            datatype: "json",
            data: {
                uid: _userid
            },
            success: function (data) {
                var _output = data
                //將結果呈現在Div裡
                $("#yourname").html(_output); 
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("body").append(xhr.status);
                $("body").append(xhr.responseText);
                alert("Ajax發生錯誤!!");
            }

        })
    }
    catch (exce) {
        console.log(exce.message);
    }
}
let loadCombo = function(){
    // form1 上 css class = "saveform"的 tag value 轉成JSON string
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
 
}
let del = function(dataid){
    try{                       
        //document.getElementById(dataid).style.display = "none";
        $("[id='" + dataid + "']").hide();                 
    }catch(ex){
        console.log(ex.message);
    }                
} 
 

$(function () {
    try {
        /*Set Default Value*/
        $("#userid").val(_userid);
        loadTitle();
        loadCombo();






        $("#trainee").change(function(){
            $(this).css("background-color", "#D6D6FF");
            $("#signin").attr('checked', false);
            $("#homework").val('0');
        });
    }
    catch (exce) {
        alert(exce)
    }
})

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
//用ajax依classid取得內容
function queryresult_ajax() {
    var _userid = $("#userid").val();
    var _classid = $("#classid").val();
    var params = {
        userid: _userid,
        classid: _classid,
    };
    var postData = {
        type: "GetSelectedRecs", //DataHandler.ashx ~ method
        params: JSON.stringify(params),
        propStr: "rData" //DataHandler ,jsondata key. 
    };
    var rtnData = callAjax(postData, true, GetSelectedRecsRtn); //async
}
//用ajax寫資料進table
function insertnew_ajax() {
    let _signin = $("#signin")[0].checked;
    let _homework = Number($("#homework").val());
    let _vo = {
        userid: $("#userid").val(),
        classid: $("#classid").val(),
        trainee: $("#trainee").val(),
        signin: _signin == true ? "Y" : "N",
        homework: _homework,
    };
    let _jsondata = "";
    _jsondata = "[" + JSON.stringify(_vo) + "]";
    var params = {
        newdata: _jsondata,
    };
    var postData = {
        type: "SaveNewRec", //DataHandler.ashx ~ method
        params: JSON.stringify(params),
        propStr: "rData" //DataHandler ,jsondata key. 
    };

    var rtnData = callAjax(postData, true, SaveNewRecRtn); //async
}


function delY(_trainee){            
    //console.log("delY:"+_trainee);
    $VM.confirmDel(_trainee);            
}

function delN(){
    //console.log("delN:");
}



function callAjax(putParameter, async, customFunc) { 
    var returnData = null;
    if (async) {
        $.blockUI();
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
//進來頁面 1.取得init的資料 2.用method $VM.link_initData寫到畫面
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
//按Query 1.取得符合條件的資料 2.用method $VM.link_classSelectedResult寫到畫面
function GetSelectedRecsRtn(type, rtnData) {
    if (typeof (rtnData.error) != 'undefined') {
        if (rtnData.error != "") {
            alert(rtnData.error);
        } else {
            var _data = rtnData.jsonData.rData;
            console.log(_data);

            $VM.link_classSelectedResult(_data);
            //generateResultTable(_data);            
        }
    }
}
//按Save 1.重新Query資料 2.切回Query Mode
function SaveNewRecRtn() {
    if (typeof (rtnData.error) != 'undefined') {
        if (rtnData.error != "") {
            alert(rtnData.error);
        } else {
            var _data = rtnData.jsonData;
            // re-Query
            queryresult_ajax();
            $VM.view = 'Query';
            console.log(_data);
        }
    }
}
