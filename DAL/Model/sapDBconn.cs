using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace CFP.DAL.Model
{
    public partial class sapDBconn : DbContext
    {
        public sapDBconn()
            : base("name=sapContext")
        {
        }

        public virtual DbSet<ZTST_TRAINCLASS> ZTST_TRAINCLASS { get; set; }
        public virtual DbSet<ZTST_TRAINCLASSGRP> ZTST_TRAINCLASSGRP { get; set; }
        public virtual DbSet<ZTST_TRAINEE> ZTST_TRAINEE { get; set; }
        public virtual DbSet<ZTST_TRAINSIGNIN> ZTST_TRAINSIGNIN { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ZTST_TRAINSIGNIN>()
                .Property(e => e.homework)
                .HasPrecision(18, 0);
        }
    }
}
