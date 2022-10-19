
$(function() {
    //alert("seriablizeObject :: " + $.fn.jquery + "[Start]");
    
    /* 
     * Function : serializeObject
     * serializeArray : 只取 <input> <textarea> <select> , 且非 disabled 的
     * Description : serializeArray already does exactly that, you just need to massage the data into your required format
     * Reference Url : http://stackoverflow.com/questions/1184624/serialize-form-to-json-with-jquery 
     * Sample : http://jsfiddle.net/sxGtM/3/
     */
    $.fn.serializeObject = function() {
        //alert("strart serializeOnject");
        var o = {};
        //var a = this.serializeArray();
        var a = this.serializef();
        //if ($.fn.jquery == "1.4.4") {
        if(parseFloat($.fn.jquery)<1.6){
            $.each(a, function() {
                var name;
                if (this.mappingname == undefined || this.mappingname == "")
                    name = this.name;
                else
                    name = this.mappingname;

                if (o[name] !== undefined) {
                    //先不考慮 multi-select
                    if (o[name] === "")
                        o[name] = this.value || '';
                }
                else {
                    o[name] = this.value || '';
                }
            });
        } //end of if
        else {
            $.each(a, function() {
                var name;
                if (this.mappingname == undefined || this.mappingname == "")
                    name = this.name;
                else
                    name = this.mappingname;

                if (o[name] !== undefined) {
                    if (!o[name].push) {
                        o[name] = [o[this.name]];
                    }
                    o[name].push(this.value || '');
                } else {
                    if (this.isArray == "true") {
                        o[name] = [];
                        o[name].push(this.value || '');
                    } else
                        o[name] = this.value || '';
                }
            }); //end of $.each
        } //end of else
        return o;
    };
    /*
    Function : serializef 取得表單中的資料
    [name][mappingname][value]
    */
    $.fn.serializef = function() {
        //alert("serializef");
        var obj = new Array();
        if (parseFloat($.fn.jquery) < 1.6) {//if ($.fn.jquery == "1.4.4") {
            for (var i = 0; i < this.length; i++) {
                var dataItem = new Object();
                var tmp = $(this[i]);
                dataItem.name = tmp.attr("name");
                dataItem.mappingname = tmp.attr("mappingname");     //for mapping to DataBase

                if (tmp.attr("tagName") == "SPAN" || tmp.attr("tagName") == "DIV")
                    dataItem.value = tmp.attr("innerText");
                else if ((tmp.attr("tagName") == "INPUT" && tmp.attr("type") == "checkbox") ||
                    (tmp.attr("tagName") == "INPUT" && tmp.attr("type") == "radio"))
                    dataItem.value = tmp.filter(":checked").val(); //tmp.attr("checked");
                else
                    dataItem.value = tmp.val();
                obj.push(dataItem);
            }
        } //end of if(parseFloat($.fn.jquery) < 1.6)
        else {
            for (var i = 0; i < this.length; i++) {
                var dataItem = new Object();
                var tmp = $(this[i]);
                dataItem.name = tmp.attr("name");
                dataItem.mappingname = tmp.attr("mappingname");     //for mapping to DataBase
                dataItem.isArray = tmp.attr("isArray");

                if ((tmp.prop("tagName") == "INPUT" && tmp.prop("type") == "checkbox") ||
					    (tmp.prop("tagName") == "INPUT" && tmp.prop("type") == "radio")) {
                    if (tmp.prop("checked")) {
                        dataItem.value = tmp.val(); //tmp.filter(":checked").val();                 
                        obj.push(dataItem);
                    }
                } else {
                    dataItem.value = tmp.val();
                    obj.push(dataItem);
                }
            } //end of  for
        } //end of else
        return obj;
    } //end of $.fn.serializef = function()
    //alert("seriablizeObject :: " + $.fn.jquery + "[END]");
});
    
