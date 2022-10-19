using ChrisWeb.BLL.Model;
using ChrisWeb.BLL;
using ChrisWeb.Web.ExtendedPageClasses;
using System;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Web.UI.WebControls;

namespace ChrisWeb.Web.Form
{
    public partial class ClassSignIn_Maintain : BaseForm
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
            if (!IsPostBack)
            {   
                //給預設值,若從前一個網頁進來會被取代
                userid.Text = "soniali";
                classid.SelectedValue = "BAS01";
                trainee.SelectedValue = "chrisliu";
                //trainee.Text = "chrisliu";
                Debug.WriteLine("~~Request.RequestType=" + Request.RequestType);
                // get POST parameters
                if (Request.Form != null)
                {
                    NameValueCollection _req = Request.Form;
                    if (!string.IsNullOrEmpty(_req["empid"]))
                    {
                        userid.Text = _req["empid"];
                        classid.SelectedValue = _req["classid"];
                        trainee.SelectedValue = _req["trainee"];
                        //trainee.Text = _req["trainee"];
                    }
                    else
                    {

                    }
                }
                else
                {
                    //return;                    
                }
                //把資料綁到下拉式選單
                BindBasicInfo();
                //其他欄位值取得
                LoadFormData();
            }
        }

        public override void BindBasicInfo()
        {
            //classid
            BindCustomizeDDL(classid, "classid");
            BindCustomizeDDL(trainee, "trainee");
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
                    case "trainee":
                        using (ClassInfoGet _classinfo = new ClassInfoGet())
                        {
                            var ls = _classinfo.GetTrainee();
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
            InitViewModel(userid.Text, classid.SelectedValue, trainee.SelectedValue);
        }
        private void InitViewModel(string _userid, string _classid, string _trainee)
        {
            SignInModel model = new SignInModel();
            using (ClassInfoGet _classinfo = new ClassInfoGet())
            {
                model = _classinfo.getSignInData(_userid, _classid, _trainee);
            }
            //把model的值配到DOM中的ID
            WebControlsUtil.SetPageData(Page, model);
            //classid.SelectedValue = model.classid;            
        }
        protected void classid_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
        protected void trainee_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
    
}
