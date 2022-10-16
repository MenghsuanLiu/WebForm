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
                console.log("event type:",e.type); //will be the event
                console.log("event element id:", e.srcElement.id); //we be the dom element 
                let url = './class_BAS03_vue.aspx';
                $(location).prop("href",url);       
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
                ConfirmMsg("Are you sure to delete record?",delY,delN,_trainee);
            }catch(ex){
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
                $("#query").show();
            } catch (ex) {
                console.log(ex.message);
            }
        }
    }    
});
window.$VM = $VM;
        
// JQuery --Shorthand for $( document ).ready(): DOM is ready for JavaScript code to execute
$(function() {
    try {
        /* Set Default Value --------------------------------------- */
        $("#userid").val(userid);

        /* Set Event ----------------------------------------- */
        $("#save").click(function () {
            let bRtn = true;

            if ($("#form1").validationEngine('validate') == true) {
                bRtn = confirm("確定儲存？");
                if (!bRtn) {
                    return false;
                }

                // form1 上 css class = "saveform"的 tag value 轉成JSON string
                let Jsondata = "";
                Jsondata = JSON.stringify($('#form1 .saveform').serializeObject());
                console.log(Jsondata);

                let params = {
                    data: Jsondata
                };
                // console.log(JSON.stringify(params));
                let postData = {
                    type: "ModSignInRec",
                    params: JSON.stringify(params),
                    propStr: "rData"                //DataHandler ,jsondata key.
                }
                let rtnData = callAjax(postData, true, ModSignInRecRtn);  //async
            }
            else {
                // alert("Validate :false");
                return false;
            }
            return false;
        });

        /* Setting by flow and handletype -------------------------- */

    } catch (e) {
        alert(e);
    }
});          

function delY(_trainee) {
    //console.log("delY:"+_trainee);
    $VM.confirmDel(_trainee);
}

function delN() {
    //console.log("delN:");
}

function ModSignInRecRtn(type, rtnData) {
    try {
        if (typeof (rtnData.error) != 'undefined') {
            if (rtnData.error != "") {
                alert(rtnData.error);
            } else {
                console.log(rtnData.jsonData);
                if (rtnData.jsonData.rData) {
                    var _data = rtnData.jsonData.rData;
                    alert(_data);
                    backQuery();
                }
                console.log("End~~~~");
            }
        }
    }catch (ex) {
        console.log(ex.message);
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

function backQuery() {
    try {
        let _userid = $("#userid").val();
        let _classid = $("#classid").val();
        var postData = {
            userid: _userid,
            classid: _classid
        };

        var url = "./Class_BAS03_vue.aspx";
        $.redirectPost(url, postData);

    } catch (ex) {
        console.log(ex.message);
    }
}

function RedirectPage(url) {    
    var screenWidth = screen.width - 100;
    var screenHeight = screen.height - 100;
    var strFeatures = "resizable=yes,top=100,scrollbars=yes,width=" + screenWidth + ",height=" + screenHeight;   

    window.open(url, '_blank', strFeatures);
    window.opener = null;
    window.open("", "_self");
    window.close();

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
