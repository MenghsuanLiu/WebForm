using CFP.BLL.Model;
using CFP.WEB.ExtendedPageClasses;
using CFP.BLL;
using CFP.WEB.WebUtil;
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
    public partial class HW1018 : BaseForm
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
            if (!IsPostBack)
            {
                userid.Text = "chrisliu";
                //classid.SelectedValue = "BAS01";
                //trainee.Text = "chrisliu";
                trainee.SelectedValue = "chrisliu";
                Debug.WriteLine("~~Request.RequestType=" + Request.RequestType);
                // get POST parameters
                if (Request.Form != null)
                {
                    NameValueCollection _req = Request.Form;
                    if (!string.IsNullOrEmpty(_req["userid"]))
                    {
                        userid.Text = _req["userid"];
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

                BindBasicInfo();
                LoadFormData();
            }
            else
            {
                //homework.Text = "";
                //homeworkURL.Text = "";
                //LoadFormData();
            }
        }



        protected void classid_SelectedIndexChanged(object sender, EventArgs e)
        {
            LoadFormData();
            //string msg = classid.SelectedItem.Text + " - " + classid.SelectedItem.Value;
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
            Model_TrainSigIn2 model = new Model_TrainSigIn2();
            using (ClassInfoGet _classinfo = new ClassInfoGet())
            {
                model = _classinfo.getSignInDataWithURL(_userid, _classid, _trainee);
            }

            WebControlsUtil.SetPageData(Page, model);
            //homeworkURL.Text = model.homeworkURL;
            //classid.SelectedValue = model.classid;            
        }

        protected void trainee_SelectedIndexChanged(object sender, EventArgs e)
        {
            homework.Text = "";
            homeworkURL.Text = "";
            LoadFormData();
        }
    }
}