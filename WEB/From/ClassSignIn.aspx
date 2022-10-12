<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ClassSignIn.aspx.cs" Inherits="CFP.WEB.From.ClassSignIn" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="google" content="notranslate"/>
    <!-- Diable cache for Chrome -->
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-store" />
    <meta http-equiv="expires" content="-1" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />

    <link rel="shortcut icon" href="./image/favicon.png"/>
    <link rel="icon" href="./image/favicon.png" type="image/x-icon" />

    <link href="./css/pass_blue.css"  rel="stylesheet" />
    <link href="./css/pass_custom.css" rel="stylesheet" />    
    <%--<link href="./css/myProj1.css" rel="stylesheet" />--%>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"/>    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>    

    <!--JQuery-->
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    
    <!--JQuery UI-->
    <link href="./js/jquery-ui-1.12.1/jquery-ui.min.css" rel="stylesheet" type="text/css" />         
    <script src="./js/jquery-ui-1.12.1/jquery-ui.min.js" type="text/javascript"></script>      
    <!--JQuery blockUI-->
    <script src="./js/jquary-blockui-2.7.0/jquery.blockUI.js" type="text/javascript"></script>

    <title>Class SignIn Form - Chris</title>  
</head>
<body>
    <div id="vueApp" style="width:80%;margin:0px auto;">
    <form id="form1" action="#" runat="server">            
        <fieldset>
        <legend class="col text-center formTitle">Class Sign-in Form<div id="yourname" runat="server"></div></legend>
        <%--Query Criteria--%>
        <div v-show="(view=='Query')" id="div_criteria">        
            <legend class="tb1">Query Criteria</legend>                                                   
            <table id="tab_criteria" style="width: 100%">
                <tr>
                    <td style="width: 15%" class="title" rowspan="2">Class：</td>
                    <td style="width: 85%" class="info">
                        <select id="classid" v-model="criteria.classid" >
                          <option v-for="(item,n) in classinfo" :value="item.classid">{{ item.classid}}_{{ item.classname }}</option>
                        </select>
                    </td>                                    
                </tr>
                <tr>                    
                    <td class="info">
                        <table style="width: 100%">
                            <tr>
                                <td style="width: 15%" class="title">Class Date：</td>
                                <td style="width: 35%" ><input type="date" name="classdate" id="classdate" :value="criteria.classdate" readonly/></td>
                                <td style="width: 15%" class="title">Trainer：</td>
                                <td style="width: 35%" ><input type="text" name="trainer"  :value="criteria.trainer" readonly/></td>                                
                            </tr>
                        </table>                        
                    </td>                                 
                </tr>                                           
                <tr>
                    <td class="center" colspan="2">
                        <button id="query" type="button" class="btn btn-primary btn-sm" @click="doQuery()">Query</button>
                        <%--<button id="query" type="button" class="btn btn-primary btn-sm">Query</button>--%>
                        <button id="abort" type="button" class="btn btn-secondary btn-sm" @click="doAbort(event)">Abort</button>
                    </td>
                </tr>
            </table>
            <br/><br/>                    
        </div>
            

        <div id="div_result" v-show="(view=='Query' && criteria.signinrecs==[])">
            <legend  class="tb1">Query Result {{ classinfo.lentgh }}</legend>                                               
            <i v-if="criteria.flg_query" class="fa fa-plus" style="font-size:20px;color:green;cursor: pointer;" @click="doEntry()"></i>
            <table id="tabResult" cellspacing="0" cellpadding="6" rules="all" border="1" width="100%">
                <thead>
                    <tr>
                        <th class="title">Del</th>                        
                        <th class="title">Mod</th>                        
                        <th class="title">ClassName</th>
                        <th class="title">ClassDate</th>
                        <th class="title">Trainee</th>
                        <th class="title">Sign-in</th>
                        <th class="title">Homework(%)</th>
                    </tr>                    
                </thead>
                <tbody>
                <tr v-for="(item,n) in criteria.signinrecs" :key="trainee">
                    <td class="info"><i class="fa fa-minus" style="font-size:20px;color:red;cursor: pointer;" @click="doDel(item.trainee)"></i></td>                    
                    <td class="info"><i class="fa fa-pencil-square-o" style="font-size:20px;color:forestgreen;cursor: pointer;" @click="doMod(item.trainee)"></i></td>                    
                    <td class="info">{{ criteria.classid }}_{{ criteria.classname }}</td>
                    <td class="info">{{ formatDate(criteria.classdate) }}</td>
                    <td class="info">{{ item.trainee }}</td>
                    <td class="info center"><input type="checkbox" id="chk_signin_1" name="chk_signin" :checked="(item.signin=='Y'?true:false)" onclick="return false"/></td>
                    <td class="info">{{ item.homework }} %</td>
                </tr>
                </tbody>
            </table>            
            <br/><br />                       
        </div>         
        <div v-show="(view=='Entry')" id="div_entry">       
            <div  class="tb1">Entry/Change</div>                                                                                 
            <table style="width: 100%">
                <tr>
                    <td style="width: 15%" class="title" rowspan="2">Class：</td>
                    <td style="width: 85%" class="info">                       
                            <select v-model="criteria.classid" onfocus="defaultIndex=this.selectedIndex" onchange="this.selectedIndex=defaultIndex">
                              <option v-for="(item,n) in classinfo" :value="item.classid">{{ item.classid}}_{{ item.classname }}</option>
                            </select>                    
                    </td>                                    
                </tr>
                <tr>                    
                    <td class="info">
                        <table style="width: 100%">
                            <tr>
                                <td style="width: 15%" class="title">Class Date：</td>
                                <td style="width: 35%" ><input type="date" name="classdate" id="classdate2" :value="criteria.classdate" readonly/></td>
                                <td style="width: 15%" class="title">Trainer：</td>
                                <td style="width: 35%" ><input type="text" name="trainer" :value="criteria.trainer" readonly/></td>                                
                            </tr>
                        </table>                        
                    </td>                                 
                </tr>                                           
                <tr>
                    <td style="width: 15%" class="title" rowspan="2">Trainee：</td>
                    <td style="width: 85%" class="info">
                        <select id="trainee" v-model="newsignin.trainee" >
                          <option value="">--Select one--</option>
                          <option v-for="(item,n) in trainee" :value="item.trainee">{{ item.empid}}_{{ item.trainee }}</option>
                        </select>                         
                    </td>                                    
                </tr>
                <tr>                    
                    <td class="info">
                        <table style="width: 100%">
                            <tr>
                                <td style="width: 15%" class="title">Sign-in：</td>
                                <td style="width: 35%" ><input type="checkbox" name="signin" id="signin" v-model="newsignin.flg_signin"/></td>
                                <td style="width: 15%" class="title">Homework(%):</td>
                                <td style="width: 35%" ><input type="number" name="Homework" id="homework" v-model="newsignin.homework" min="0" max="100"/></td>
                            </tr>
                        </table>                        
                    </td>                                 
                </tr>   
                <tr>
                    <td class="center" colspan="2">
                        <button id="save" type="button" class="btn btn-primary btn-sm" @click="doSave()">Save</button>
                        <button id="abort1" type="button" class="btn btn-secondary btn-sm" @click="doAbort(event)">Abort</button>
                    </td>
                </tr>
            </table>
        </div>               
        </fieldset>              
    </form>
    </div>
    <div name="hiddenArea" class="hide" style="visibility:hidden">
        <input id="userid" type="text" name="userid" runat="server"/>
        <input id="h_classid" type="text" name="h_classid" runat="server"/>
    </div>     
    <div id="dialog-message" title="請檢查~~" class="hide"></div>
    
    <script src="./js/moment.min.js"></script>
    <!--Vue.js-->
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.7.10/dist/vue.js"></script>  -->
    <script src="./js/vue/vue.min.js"></script>
    <script src="./js/ClassSignIn_vue.js"></script>
    <%--<script src="./js/vue/vueChris.js"></script>--%>  
    <%--<script src="../js/myProj2.js"></script>--%>

</body>
</html>