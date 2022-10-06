namespace CFP.DAL.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ZTST_TRAINCLASSGRP
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(10)]
        public string classid { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(10)]
        public string groupid { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(10)]
        public string trainee { get; set; }

        [StringLength(1)]
        public string leader_flg { get; set; }
    }
}
