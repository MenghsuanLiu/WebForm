namespace CFP.DAL.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ZTST_TRAINCLASS
    {
        [Key]
        [StringLength(10)]
        public string classid { get; set; }

        [StringLength(40)]
        public string classname { get; set; }

        public DateTime? classdate { get; set; }

        [StringLength(10)]
        public string trainer { get; set; }
    }
}
