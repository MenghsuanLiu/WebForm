
var $VM = new Vue({
    el: '#app', // binding element /* el:表示這個 vue instance 創建後會掛載取代 id="app" 的元素
    data(){     // 資料區塊
        return {
            message: 'Hello World!',            
            classinfo: {
                classid : 'BAS01',
                classname: 'HTML',
                trainees: [
                    {
                    empid: '962019',
                    userid: 'soniali'
                    },
                    {
                    empid: '914466',
                    userid: 'tiffany'
                    }                
                ]
            }             
        }
    },  
    // created區塊:在DOM渲染成html前callback;用於初始值
    created: function () {
        const self = this;            
    },
    // mounted區塊:在DOM渲染成html後callback(可以視作 jQuery 的 Ready);通常是初始化完成後，再對DOM進行需要的操作
    mounted: function () {     
    },    
    // 計算屬性區塊:也可以理解為一種必須回傳一個值的method.但其回傳值,若沒有異動就不會被觸發.在DOM中绑定的才能取得值。
    computed: {
        // read only
        classDisplayName: function() {
            return (this.classinfo.classid + '_' + this.classinfo.classname);
        },
    },                      
    // 監聽區塊:watch data change
    watch: {
        // 監聽目標名稱:callback 函數
        "classinfo.classid": function(newValue, oldValue) {            
            console.log("%c%s", "color:green", `classid has changed from ${oldValue} to ${newValue}`); 
        }
    },
    // 方法區塊:供目前Vue區域內使用,未调用不會執行,只執行logic,不限定需回傳值.
    methods: {

    }    
});