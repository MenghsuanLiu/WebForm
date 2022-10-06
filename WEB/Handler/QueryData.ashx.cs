using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using Newtonsoft.Json;
using CFP.WEB;
using CFP.BLL;

namespace CFP.WEB.Handler
{
    /// <summary>
    /// Summary description for QueryData
    /// </summary>
    public class QueryData : IHttpHandler, IRequiresSessionState
    {
        //protected static log4net.ILog log = ServiceLocator.Instance.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public void ProcessRequest(HttpContext context)
        {
            string errMsg = "", retVal = "";

            Dictionary<string, object> jsonData = new Dictionary<string, object>();

            object[] arguments = new object[]
              {
                context.Request["call_method"],
                context.Request["query_trainee"],
                context.Request["json_key"],
                errMsg,
                jsonData
              };

            try
            {
                //log.InfoFormat
                //  ("call_method : {0},  query_trainee : {1},  json_key : {2}",
                //   context.Request["call_method"],
                //   context.Request["query_trainee"],
                //   context.Request["json_key"]);

                GetType().GetMethod(
                  context.Request["call_method"],
                  new[]
                  {
                    typeof(string),
                    typeof(string),
                    typeof(string),
                    typeof(string).MakeByRefType(),
                    typeof(Dictionary<string, object>).MakeByRefType()
                  }
                ).Invoke(null, arguments);
            }
            catch (Exception e)
            {
                //log.Fatal(System.Reflection.MethodBase.GetCurrentMethod().Name + " error=" + e.Message);
                throw e;
            }

            JsonSerializerSettings set_s = new JsonSerializerSettings { DateFormatString = "yyyy/MM/dd" };
            retVal = JsonConvert.SerializeObject(
              new
              {
                  error = arguments[3],
                  jsonData = arguments[4]
              },
              set_s);

            //log.Info(retVal);
            context.Response.Write(retVal);
        }

        public static void getAllTraineeGRP(string call_method, string query_trainee, string json_key, ref string errMsg, ref Dictionary<string, object> jsonData)
        {
            try
            {
                //Dictionary<string, object> obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(query_trainee);
                //string str_query_trainee = obj["query_trainee"] as string;

                using (var clsCtx = new ClassInfoGet())
                {
                    var _data = clsCtx.GetTrainClassGrp();
                    //var _data = clsContext.getAllTraineeGRP(query_trainee);
                    jsonData.Add(json_key, _data);
                }
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