using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace CFP.WEB.ExtendedPageClasses
{
    public abstract class BaseForm : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            #region Set No Cache...
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Cache.SetExpires(DateTime.Parse("1970/1/1"));
            Response.Cache.SetNoStore();
            #endregion

            //if (!IsPostBack)
            //{
            //    LoadFormData();
            //}
        }

        #region - 繼承後必須實作的抽象method
        /// <summary>
        /// 自行定義 載入表單資料該做的事
        /// </summary>
        public abstract void LoadFormData();

        public abstract void BindBasicInfo();
        #endregion


    }
}