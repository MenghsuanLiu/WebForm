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
    public class Model_TrainSigIn2 : ZTST_TRAINSIGNIN2
    {
        #region classdate_hw
        public DateTime? classdate_hw { get; set; }
        #endregion
        #region trainer
        public string trainer { get; set; }
        #endregion
    }
}
