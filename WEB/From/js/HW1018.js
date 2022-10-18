//var $VM = new Vue({
//    el: '#vueApp', // binding element /* el:表示這個 vue instance 創建後會掛載取代 id="app" 的元素
//    data() {       // 資料區塊
 
//    },
//    // created區塊:在DOM渲染成html前callback;用於初始值
//    created: function () {
//        // this.initdata();                                 
//    },
//    // mounted區塊:在DOM渲染成html後callback(可以視作 jQuery 的 Ready);通常是初始化完成後，再對DOM進行需要的操作
//    mounted: function () {
//    },
//    // 計算屬性區塊:也可以理解為一種必須回傳一個值的method.但其回傳值,若沒有異動就不會被觸發.在DOM中绑定的才能取得值。
//    computed: {
//        // read only
//    },
//    // 監聽區塊:watch data change
//    watch: {
 
//    },
//    // 方法區塊:供目前Vue區域內使用,未调用不會執行,只執行logic,不限定需回傳值.
//    methods: {
//    }
//});
////window.$VM = $VM;