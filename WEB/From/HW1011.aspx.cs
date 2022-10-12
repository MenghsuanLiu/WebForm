using CFP.BLL;
using CFP.WEB.ExtendedPageClasses;
using CFP.WEB.WebUtil;
using CFP.BLL.Model;
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
    public partial class HW1011 : BaseForm
    {
        protected void Page_Load(object sender, EventArgs e)
    {
        base.Page_Load(sender, e);
        if (!IsPostBack)
        {
            userid.Text = "soniali";
            //classid.SelectedValue = "BAS01";
            trainee.Text = "chrisliu";
            Debug.WriteLine("~~Request.RequestType=" + Request.RequestType);
            // get POST parameters
            if (Request.Form != null)
            {
                NameValueCollection _req = Request.Form;
                if (!string.IsNullOrEmpty(_req["userid"]))
                {
                    userid.Text = _req["userid"];
                    classid.SelectedValue = _req["classid"];
                    trainee.Text = _req["trainee"];
                }
                else
                {

                }
            }
            else
            {
                //return;                    
            }

            BindBasicInfo();
            LoadFormData();
        }
    }

    protected void classid_SelectedIndexChanged(object sender, EventArgs e)
    {
            LoadFormData();
    }
   

        public override void BindBasicInfo()
    {
        //classid
        BindCustomizeDDL(classid, "classid");
        classid.Items.Insert(0, new ListItem("Pleae Select...", ""));
    }

    public static void BindCustomizeDDL(DropDownList ddl, string kind)
    {
        try
        {
            switch (kind)
            {
                case "classid":
                    using (ClassInfoGet _classinfo = new ClassInfoGet())
                    {
                        var ls = _classinfo.GetClassDDLList();
                        ddl.DataSource = ls;
                        ddl.DataValueField = "Value";
                        ddl.DataTextField = "Text";
                    }
                    break;
            }
            ddl.DataBind();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public override void LoadFormData()
    {
        InitViewModel(userid.Text, classid.SelectedValue, trainee.Text);
    }
    private void InitViewModel(string _userid, string _classid, string _trainee)
    {
        SignInModel model = new SignInModel();
        using (ClassInfoGet _classinfo = new ClassInfoGet())
        {
            model = _classinfo.getSignInData(_userid, _classid, _trainee);
        }

        WebControlsUtil.SetPageData(Page, model);
        //classid.SelectedValue = model.classid;            
    }
}
}