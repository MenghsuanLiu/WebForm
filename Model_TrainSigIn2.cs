using ChrisWeb.DAL.Model;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChrisWeb.BLL.Model
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
