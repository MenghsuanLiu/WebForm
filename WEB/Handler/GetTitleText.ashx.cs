using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CFP.WEB.Handler
{
    /// <summary>
    /// Summary description for GetTitleText
    /// </summary>
    public class GetTitleText : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string rtnVal = "";

            var _uid = context.Request.QueryString["uid"];
            rtnVal = "Welcome To This Form (" + _uid + ")";

            //context.Response.ContentType = "text/plain";
            context.Response.Write(rtnVal);
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