<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HW1018.aspx.cs" Inherits="CFP.WEB.From.HW1018" %>

<!DOCTYPE html>

<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="google" content="notranslate" />
    <!-- Diable cache for Chrome -->
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-store" />
    <meta http-equiv="expires" content="-1" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />

<%--    <link rel="shortcut icon" href="./image/favicon.png" />
    <link rel="icon" href="./image/favicon.png" type="image/x-icon" />--%>

    <link href="./css/pass_blue.css"  rel="stylesheet" />
    <link href="./css/pass_custom.css" rel="stylesheet" />    
    <link href="./css/SignIn.css" rel="stylesheet" />
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" />    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />    

    <!--JQuery-->
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    
    <!--JQuery UI-->
    <link href="./js/jquery-ui-1.13.2/jquery-ui.min.css" rel="stylesheet" type="text/css" />         
    <script src="./js/jquery-ui-1.13.2/jquery-ui.min.js" type="text/javascript"></script>      

    <!--JQuery blockUI-->
    <script src="./js/jquary-blockui-2.7.0/jquery.blockUI.js" type="text/javascript"></script>

    <!--JQuery validationEngine-->
    <link href="./js/jQuery-Validation-Engine-3.0.0/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />
    <script src="./js/jQuery-Validation-Engine-3.0.0/js/languages/jquery.validationEngine-zh_TW.js" type="text/javascript"></script>
    <script src="./js/jQuery-Validation-Engine-3.0.0/js/jquery.validationEngine.js" type="text/javascript"></script>
    <!--JSON2-->
    <script src="./js/json2.js" type="text/javascript"></script>
    <script src="./js/jquery.serialize-object.js" type="text/javascript"></script>
    <title>Class From Maintain With URL input</title>  
    <style type="text/css">
        .auto-style1 {
            font-size: 1em;
            padding: 4px 10px 4px 5px;
            border: solid 1px gray;
            border: solid 1px #81ABD1;
            width: 85%;
            height: 25px;
        }
    </style>
</head>
<body>
    <div id="vueApp" style="width:80%;margin:0px auto;">
    <form id="form_mod" runat="server"> 
        <fieldset>
        <%--<legend class="col text-center formTitle">Class Sign-in Form </legend><div id="yourname"></div>--%>     
        <div  id="div_entry">       
            <div  class="tb1">Change</div>                                                                                 
            <table style="width: 100%">
                <%--課程下拉選單/User ID--%>
                <tr>
                    <td style="width: 15%" class="title" rowspan="2">Class：</td>
                    <td style="width: 85%" class="info">
                             <%--<asp:DropDownList runat="server" ID="classid" CssClass="saveform validate[required]" onfocus="defaultIndex=this.selectedIndex" onchange="this.selectedIndex=defaultIndex" OnSelectedIndexChanged="classid_SelectedIndexChanged" AutoPostBack="True" />       --%>                        
                        <asp:DropDownList runat="server" ID="classid" CssClass="saveform validate[required]" OnSelectedIndexChanged="classid_SelectedIndexChanged" AutoPostBack="True" />                               
                        <asp:TextBox ID="userid" runat="server" CssClass="saveform hide" Width="60px" style="display:none"/>  
                    </td>                                    
                </tr>
                <%--課程日期/訓練者--%>
                <tr>                    
                    <td class="info">
                        <table style="width: 100%">
                            <tr>
                                <td style="width: 15%" class="title">Class Date：</td>
                                <td style="width: 35%" >
                                    <%--<asp:TextBox runat="server" ID="classdate" Width="80px" CssClass="saveform" ReadOnly="True"></asp:TextBox>--%>
                                    <input type="text"  runat="server" ID="classdate" Width="80px" CssClass="saveform" ReadOnly/>

                                </td>
                                <td style="width: 15%" class="title">Trainer：</td>
                                <td style="width: 35%" >
                                    <%--<asp:TextBox runat="server" ID="TextBox1" Width="80px" CssClass="saveform" ReadOnly="True"></asp:TextBox>--%>
                                    <input type="text"  runat="server" ID="trainer" Width="80px" CssClass="saveform" ReadOnly/>                                    
                                </td>                                
                            </tr>
                        </table>
                    </td>                                 
                </tr>
                <%--學員--%>
                <tr>
                    <td style="width: 15%" class="title" rowspan="2">Trainee：</td>
                    <td class="auto-style1" style="width: 30%"> 
                        <asp:DropDownList runat="server" ID="trainee" CssClass="saveform validate[required]" OnSelectedIndexChanged="trainee_SelectedIndexChanged" AutoPostBack="True" />
                        <%--<asp:TextBox runat="server" ID="trainee" Width="80px" CssClass="saveform" ReadOnly="True"></asp:TextBox>--%>
                    </td>
                </tr>
                <%--是否Sigin/完成百分比/網址--%>
                <tr>                    
                    <td class="info">
                        <table class="w-100">
                            <tr>
                                <td style="width: 15%" class="title">Sign-in：</td>
                                <td style="width: 10%" >
                                    <%--<asp:CheckBox ID="signflag" runat="server" Text="Sign-in" CssClass="saveform" />        --%>     
                                    <input id="signin" type="checkbox" runat="server" Text="Sign-in" value="Y" class="saveform" />        
                                </td>
                                <td style="width: 15%" class="title">Homework(%):</td>
                                <td style="width: 10%" >
                                    <asp:TextBox runat="server" ID="homework" Width="60px" CssClass="saveform validate[custom[integer],min[0],max[100]]"></asp:TextBox></td>
                                <td style="width: 15%" class="title">Homework URL:</td>
                                <td style="width: 35%" >
                                    <%--ID要和Model中欄位名一致--%>
                                    <asp:TextBox runat="server" ID="homeworkURL" Width="200px" CssClass="saveform validate[custom[url]]"></asp:TextBox></td>
                            </tr>
                        </table>                        
                    </td>                                 
                </tr>  
                <%--按鍵區--%>
                <tr>
                    <td class="center" colspan="2">
                        <button id="save" type="button" class="btn btn-primary btn-sm">Change to Save</button>
                        <button id="abort" type="button" class="btn btn-secondary btn-sm">Abort</button>
                    </td>
                </tr>
            </table>
        </div>               
        </fieldset>              
    </form>   
    </div>     
    <div id="dialog-message" title="請檢查~~" class="hide"></div>
    
    <!--Vue.js-->
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.7.10/dist/vue.js"></script>  -->
    <script src="./js/hw1018.js"></script>
</body>
</html>