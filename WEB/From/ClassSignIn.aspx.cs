using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CFP.WEB.From
{
    public partial class ClassSignIn : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // get POST parameters
            if (Request.Form != null)
            {
                NameValueCollection _req = Request.Form;
                if (!string.IsNullOrEmpty(_req["userid"]))
                {
                    Debug.WriteLine("got para userid:" + _req["userid"] + ",classid:" + _req["classid"]);
                    userid.Value = _req["userid"];
                    h_classid.Value = _req["classid"];
                }
                else
                {

                }
            }
        }
    }
}