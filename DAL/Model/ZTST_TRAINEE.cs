namespace CFP.DAL.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ZTST_TRAINEE
    {
        [Key]
        [StringLength(10)]
        public string trainee { get; set; }

        [StringLength(40)]
        public string zname { get; set; }

        [StringLength(10)]
        public string empid { get; set; }

        [StringLength(10)]
        public string groupid { get; set; }
    }
}
