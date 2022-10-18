using ChrisWeb.BLL.Model;
using ChrisWeb.BLL;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ChrisWeb.Web.ExtendedPageClasses;

namespace ChrisWeb.Web.Form
{
    public partial class hw1018_chris : BaseForm
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
            if (!IsPostBack)
            {
                userid_hw.Text = "soniali";
                //classid.SelectedValue = "BAS01";
                //trainee.Text = "chrisliu";
                ddl_trainee.SelectedValue = "chrisliu";
                Debug.WriteLine("~~Request.RequestType=" + Request.RequestType);
                // get POST parameters
                if (Request.Form != null)
                {
                    NameValueCollection _req = Request.Form;
                    if (!string.IsNullOrEmpty(_req["userid"]))
                    {
                        userid_hw.Text = _req["userid"];
                        classid.SelectedValue = _req["classid"];
                        ddl_trainee.SelectedValue = _req["trainee"];
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
                homework.Text = "";
                homeworkURL.Text = "";
                LoadFormData();
            }
        }



        protected void classid_SelectedIndexChanged(object sender, EventArgs e)
        {
            //LoadFormData();
            //string msg = classid.SelectedItem.Text + " - " + classid.SelectedItem.Value;
        }
        public override void BindBasicInfo()
        {
            //classid
            BindCustomizeDDL(classid, "classid");
            BindCustomizeDDL(ddl_trainee, "trainee");
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
            InitViewModel(classid.SelectedValue, ddl_trainee.SelectedValue);
        }
        private void InitViewModel(string _classid, string _trainee)
        {
            Model_TrainSigIn2 model = new Model_TrainSigIn2();
            using (ClassInfoGet _classinfo = new ClassInfoGet())
            {
                model = _classinfo.getSignInDataWithURL(_classid, _trainee);
            }

            WebControlsUtil.SetPageData(Page, model);
            //homeworkURL.Text = model.homeworkURL;
            //classid.SelectedValue = model.classid;            
        }

        protected void trainee_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
