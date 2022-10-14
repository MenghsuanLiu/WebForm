using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Web.SessionState;
using System.Linq;
using System.Web;
using ChrisWeb.BLL;


namespace ChrisWeb.Web.Handler
{
    /// <summary>
    /// Summary description for ClassSignIn_DataHandler
    /// </summary>
    public class ClassSignIn_DataHandler : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
            // 泛型處理常式(.ashx), like aspx(without aspx,only cs),就是沒有畫面的aspx, FYI:https://ithelp.ithome.com.tw/articles/10222264
            #region invoke method named [type] ,with input parameters named [params], output parameters named [propStr]
            HttpRequest Request = context.Request;
            HttpResponse Response = context.Response;
            HttpSessionState Session = context.Session;
            string errMsg = "", rtn = "";
            Dictionary<string, object> jsonData = new Dictionary<string, object>();
            object[] arguments = new object[] { Request["params"], Request["propStr"], errMsg, jsonData };
            try
            {
                //log.InfoFormat("type : {0}, params : {1}, propStr : {2}",
                //                        Request["type"],
                //                        Request["params"],
                //                        Request["propStr"]);

                this.GetType().GetMethod(Request["type"],
                        new[]
                        {
                            typeof(string),
                            typeof(string),
                            typeof(string).MakeByRefType(),
                            typeof(Dictionary<string, object>).MakeByRefType()
                        }
                    )
                    .Invoke(null, arguments);
            }
            catch (Exception e)
            {
                //log.Fatal(System.Reflection.MethodBase.GetCurrentMethod().Name + " error=" + e.Message);
                
                throw e;
            }
            #endregion

            #region response json data:error,jsonData
            //回傳格式 -> error 與 msg
            //rtn = "{ \"error\": \"" + errMsg + "\", \"msg\": \"" + resultMsg + "\" , \"jsonData\": " + jsonData + "}";
            //rtn = JsonHelper.SerializeByScript<object>(new
            //{
            //    error = arguments[2],
            //    jsonData = arguments[3]
            //});
            JsonSerializerSettings set = new JsonSerializerSettings { DateFormatString = "yyyy/MM/dd" };
            rtn = JsonConvert.SerializeObject(new { error = arguments[2], jsonData = arguments[3] }, set);
            //log.Info(rtn);
            Response.Write(rtn);
            #endregion
        }


        public static void GetInitData(string paramsStr, string propStr, ref string errMsg, ref Dictionary<string, object> jsonData)
        {
            try
            {
                Dictionary<string, object> obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(paramsStr);

                //var _classes = ClassInfo.GetList();
                //var _trainees = ClassInfo.GetTrainees();

                using (var _classinfo = new ClassInfoGet())
                {
                    var _classes = _classinfo.GetClassList();
                    var _trainees = _classinfo.GetTrainee();
                    jsonData.Add("classes", _classes);
                    jsonData.Add("trainees", _trainees);
                }

            }
            catch (Exception e)
            {
                errMsg = e.StackTrace;
                throw e;
            }
        }
        public static void GetSelectedRecs(string paramsStr, string propStr, ref string errMsg, ref Dictionary<string, object> jsonData)
        {
            try
            {
                //取出classid / userid
                Dictionary<string, object> obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(paramsStr);
                string _userid = obj["userid"] as string;
                string _classid = obj["classid"] as string;
                using (var _classinfo = new ClassInfoGet())
                {
                    var reqdata = _classinfo.GetSelectedClassRecs(_userid, _classid);
                    jsonData.Add(propStr, reqdata);
                }
            }
            catch (Exception e)
            {
                errMsg = e.StackTrace;
                throw e;
            }
        }
        public static void SaveNewRec(string paramsStr, string propStr, ref string errMsg, ref Dictionary<string, object> jsonData)
        {
            try
            {
                Dictionary<string, object> obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(paramsStr);
                string sJson = obj["newdata"] as string;

                //ClassInfo.InsertSignInRec(sJson);
                using (var _classinfo = new ClassInfoGet())
                {
                    _classinfo.InsertTrainSignInRec(sJson);
                }

                jsonData.Add(propStr, true);
            }
            catch (Exception e)
            {
                errMsg = e.StackTrace;
                throw e;
            }
        }
        public static void DelRec(string paramsStr, string propStr, ref string errMsg, ref Dictionary<string, object> jsonData)
        {
            try
            {
                Dictionary<string, object> obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(paramsStr);
                string _userid = obj["userid"] as string;
                string _classid = obj["classid"] as string;
                string _trainee = obj["trainee"] as string;

                //ClassInfo.DeleteSignInRec(_userid,_classid, _trainee);
                using (var _classinfo = new ClassInfoGet())
                {
                    _classinfo.DeleteRec(_userid, _classid, _trainee);
                }

                jsonData.Add(propStr, true);
            }
            catch (Exception e)
            {
                errMsg = e.StackTrace;
                throw e;
            }
        }


        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
