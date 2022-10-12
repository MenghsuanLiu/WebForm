using CFP.DAL.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CFP.BLL.Model
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
