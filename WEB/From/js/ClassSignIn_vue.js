const _userid = "庫庫少";
const _url_ajaxGet = "../Handler/GetTitleText.ashx"



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



$(function () {
    try {
        /*Set Default Value*/
        $("#userid").val(_userid);
        loadTitle();

    }
    catch (exce) {
        alert(exce)
    }
})


var $VM = new Vue({
    //el: 表示這個 vue instance 創建後會掛載取代 id="app" 的元素
    el: "#vueApp",
    data() {
        return {
            view: "Query",
            classinfo: [
                {
                    classid: "BAS01",
                    classname: "HTML vs. IIS web site",
                    classdate: "2022-08-31",
                    trainer: "sonia",
                },
                {
                    classid: "BAS02",
                    classname: "CSS/JavaScript/HTML DOM",
                    classdate: "2022-09-06",
                    trainer: "sonia",
                },
                {
                    classid: "BAS03",
                    classname: "JQuery/Vue.js",
                    classdate: "2022-09-13",
                    trainer: "sonia",
                }
            ],
            criteria: {
                classid: "",
                classdate: "",
                trainer: "",
                signinrecs: [],
                flg_query: false,
            },
        }
    },
    // created區塊:在DOM渲染成html前callback;用於初始值
    created: function () {
        const self = this;
        this.initdata();
    },
    // mounted區塊:在DOM渲染成html後callback(可以視作 jQuery 的 Ready);通常是初始化完成後，再對DOM進行需要的操作
    mounted: function () {

    },
    // 方法區塊:供目前Vue區域內使用,未调用不會執行,只執行logic,不限定需回傳值.
    methods: {
        initdata: function () {
            const self = this;
            self.criteria.classid = "BAS02";
        }
    }


});
window.$VM = $VM;
