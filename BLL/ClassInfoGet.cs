using CFP.DAL.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CFP.BLL
{
    public class ClassInfoGet : DbContext
    {
        public IEnumerable<object> GetClassList()
        {
            try
            {
                using (var sapctx = new sapDBconn())
                {
                    var classls = sapctx.ZTST_TRAINCLASS.ToList();
                    return classls;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetTrainee()
        {
            try
            {
                using (var sapctx = new sapDBconn())
                {
                    var teels = sapctx.ZTST_TRAINEE.ToList();
                    return teels;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetTrainClassGrp()
        {
            try
            {
                using (var sapctx = new sapDBconn())
                {
                    var gpls = sapctx.ZTST_TRAINCLASSGRP.ToList();
                    return gpls;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetTrainClassGrpByTrainee(string _trainee)
        {
            try
            {
                using (var sapctx = new sapDBconn())
                {
                    var byteels = sapctx.ZTST_TRAINCLASSGRP
                        .GroupJoin(sapctx.ZTST_TRAINEE,
                                            e => e.trainee,
                                            u => u.trainee,
                                            (e, u) => new { e.classid, e.groupid, e.trainee, u })
                        .Where(s => s.trainee.Equals(_trainee))
                        .SelectMany(e => e.u.DefaultIfEmpty(),
                                            (e, u) => new { e.classid, e.groupid, e.trainee, u.empid, u.zname })
                        .ToList();
                    return byteels;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
