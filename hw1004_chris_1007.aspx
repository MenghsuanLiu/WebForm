<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="hw1004_chris.aspx.cs" Inherits="ChrisWeb.Web.Form.hw1004_chris" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="google" content="notranslate">
    <!-- Diable cache for Chrome -->
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-store" />
    <meta http-equiv="expires" content="-1" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />

    <link rel="shortcut icon" href="./image/favicon.png">
    <link rel="icon" href="./image/favicon.png" type="image/x-icon" />

    <link href="./css/pass_blue.css"  rel="stylesheet" />
    <link href="./css/pass_custom.css" rel="stylesheet" />    
    <link href="./css/myProj1.css" rel="stylesheet" />
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">    

    <!--JQuery-->
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    
    <!--JQuery UI-->
    <link href="./js/jquery-ui-1.12.1/jquery-ui.min.css" rel="stylesheet" type="text/css" />         
    <script src="./js/jquery-ui-1.12.1/jquery-ui.min.js" type="text/javascript"></script>      

    <title>HW1004-Chirs</title>  
</head>

<body>
    <div id="vueApp" style="width:80%;margin:0px auto;">
    <form id="form1" runat="server">
        <div>
            <button id="qdata" type="button">Query</button>
        </div>
        <div>
            <ul id = "tee">
            </ul>
        </div>
        <div>
            <table id ="tb_class">
            </table>
        </div>
    </form>
    </div>
    <script src="./js/moment.min.js"></script>
    <!--Vue.js-->
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.7.10/dist/vue.js"></script>  -->
    <script src="./js/vue/vue.min.js"></script>
    <script src="./js/qData.js"></script>
</body>
</html>
