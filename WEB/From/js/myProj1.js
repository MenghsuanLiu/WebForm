        // `date` is a `Date` object
        const formatYmd = date => date.toISOString().slice(0, 10);
        // Example
        const today = formatYmd(new Date());      // 2020-05-06  
        const format = "YYYY/MM/DD";

        var $VM = new Vue({
            el: '#vueApp', // binding element /* el:表示這個 vue instance 創建後會掛載取代 id="app" 的元素
            data(){       // 資料區塊
                return {
                    view: 'Query', // 'Result','Entry',
                    classinfo : [
                        {
                            classid : 'BAS01',
                            classname : 'HTML vs. IIS web site',
                            classdate : '2022-08-31',
                            trainer : 'sonia',
                        },
                        {
                            classid : 'BAS02',
                            classname : 'CSS/JavaScript/HTML DOM',
                            classdate : '2022-09-06',
                            trainer : 'sonia',
                        },
                        {
                            classid : 'BAS03',
                            classname : 'JQuery/Vue.js',
                            classdate : '2022-09-13',
                            trainer : 'sonia',
                        }                           
                    ],
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
                    trainee: [ 
                        { empid: '949086', userid: 'link' },
                        { empid: '081271', userid: 'stanleyl' },
                        { empid: '926382', userid: 'janeth' }
                    ],        
                    classSigninRecs:[
                        {
                            classid : 'BAS01',  
                            trainees: [
                                {   
                                    trainee: 'link',
                                    signin: 'Y',
                                    homework: 90,
                                },
                                {   
                                    trainee: 'stanleyl',
                                    signin: 'Y',
                                    homework: 10,
                                },                            
                            ]                                                                  
                        }, 
                        {
                            classid : 'BAS02',  
                            trainees: [
                                {   
                                    trainee: 'link',
                                    signin: 'Y',
                                    homework: 20,
                                },
                                {   
                                    trainee: 'stanleyl',
                                    signin: 'N',
                                    homework: 0,
                                },                            
                            ]                                                                  
                        },                        
                    ]     
                }
            },  
            // created區塊:在DOM渲染成html前callback;用於初始值
            created: function () {
                const self = this;           
                this.initdata();                                 
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
                initdata : function() {
                    const self=this;                     
                    self.criteria.classid = 'BAS02';                   
                },      
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
                    try{                          
                        let _lst = self.classSigninRecs.filter(x=>x.classid==self.criteria.classid)[0];  
                        if (!_lst) return;
                        let _rec = _lst.trainees;  
                        self.criteria.signinrecs = _rec;   
                        self.criteria.flg_query = true;
                        //console.log(self.criteria.signinrecs);                
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
                        self.criteria.signinrecs.push({
                            trainee: self.newsignin.trainee,
                            signin: self.newsignin.flg_signin==true?"Y":"N",                            
                            homework: self.newsignin.homework, 
                        });
                        self.view = 'Query';
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
                    let _output = moment(_date).format(format);
                    return(_output);
                }
            }    
        });
        window.$VM = $VM;

        let loaddata = function(){ // loaddata
            try{            
                $.ajax({
                    type: 'GET',
                    url: 'http://e00d02x04940/BAS03/Form/BAS03.aspx',
                    data: 'ID=Sonia ^^', //發送參數
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
                //  $.ajax({
                //         type: 'POST',
                //         url: 'http://e00d02x04940/BAS03/WebService1.asmx/GetTrainees',      
                //         contentType: "application/json; charset=utf-8", // 參數格式
                //         dataType: "json", // 回傳格式
                //         success: function (data) {                                                
                //             let _ret = JSON.parse(data.d);
                //             let _retStr = "";
                //             $.each(_ret, function(index, element) {
                //                 _retStr += index + " - " + element.empid+":"+element.name + "\n";
                //             });
                //             alert(_retStr);
                //             //$("#show").html(ret.replace(/\n/g, "<br />"));  
                //             //$("body").append(xhr.status);                                                                      
                //         },
                //         error: function (xhr, ajaxOptions, thrownError) {
                //             $("body").append(xhr.status);
                //             $("body").append(xhr.responseText);
                //             alert("Ajax發生錯誤!!");
                //         }
                //  });                  
            }catch(ex){
                console.log(ex.message);
            }                
        }      
        let del = function(dataid){
            try{                       
                //document.getElementById(dataid).style.display = "none";
                $("[id='" + dataid + "']").hide();                 
            }catch(ex){
                console.log(ex.message);
            }                
        } 
        
        // JQuery --Shorthand for $( document ).ready(): DOM is ready for JavaScript code to execute
        $(function() {
            try {
                loaddata();    

                $("#trainee").change(function(){
                    $(this).css("background-color", "#D6D6FF");
                    $("#signin").attr('checked', false);
                    $("#homework").val('0');
                });
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