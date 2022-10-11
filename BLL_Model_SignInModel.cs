using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ChrisWeb.DAL.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChrisWeb.BLL.Model
{   
    [NotMapped]
    public class SignInModel : ZTST_TRAINSIGNIN
    {
        #region classdate
        public DateTime? classdate { get; set; }
        #endregion
        #region trainer
        public string trainer { get; set; }
        #endregion
        #region treegp
        public string treegp { get; set; }
        #endregion
        //public bool signflag
        //{
        //    get { return signin.Equals("Y"); }
        //}
    }
}
