using ChrisWeb.DAL.Model;
using ChrisWeb.BLL.Model;
using ChrisWeb.DAL;
using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using Newtonsoft.Json;
using System.Data.Entity.Infrastructure;

namespace ChrisWeb.BLL
{
    public class ClassInfoGet: DbContext
    {
        
        public static void SetValue2<T1, T2>(T1 srcObj, T2 destObj)
        {
            PropertyInfo[] propArray = destObj.GetType().GetProperties();

            foreach (PropertyInfo destProp in propArray)
            {
                PropertyInfo pi = srcObj.GetType().GetProperty(destProp.Name);

                if (pi != null)
                {
                    object value = pi.GetValue(srcObj, null);
                    if (value is string)
                        destProp.SetValue(destObj, string.IsNullOrEmpty(value.ToString()) ? null : value);
                    else
                        destProp.SetValue(destObj, value);
                }
            }
        }

        public IEnumerable<object> GetClassList()
        {
            try
            {
                using(var sapctx = new sapTable())
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
                using (var sapctx = new sapTable())
                {
                    var teels = sapctx.ZTST_TRAINEE.ToList();
                    var lsProcess = teels.Select(x => new { Value = x.trainee, Text = x.empid + "-" + x.trainee + "[" + x.zname + "]" })
                    .Distinct()
                    .OrderBy(x => x.Value)
                    .ToList();
                    return lsProcess;
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
                using (var sapctx = new sapTable())
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
                using (var sapctx = new sapTable())
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

        public IEnumerable<object> GetClassDDLList()
        {
            try
            {
                using (var sapctx = new sapTable())
                {
                    var ls = sapctx.ZTST_TRAINCLASS.ToList();
                    var lsProcess = ls.Select(x => new { Value = x.classid, Text = x.classid + "-" + x.classname })
                        .Distinct()
                        .OrderBy(x => x.Value)
                        .ToList();
                    return lsProcess;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region getSignInData return SignInModel
        public SignInModel getSignInData(string _userid, string _classid, string _trainee)
        {
            SignInModel model = new SignInModel();
            try
            {
                using (sapTable sapctx = new sapTable())
                {
                    ZTST_TRAINSIGNIN rec = sapctx.ZTST_TRAINSIGNIN.FirstOrDefault(x => x.userid.Equals(_userid) &&
                                                                     x.classid.Equals(_classid) && x.trainee.Equals(_trainee));
                    if (rec != null)
                    {
                        SetValue2<ZTST_TRAINSIGNIN, SignInModel>(rec, model);
                    }
                    ZTST_TRAINCLASS ls = sapctx.ZTST_TRAINCLASS.FirstOrDefault(x => x.classid.Equals(_classid));
                    if (ls != null)
                    {
                        model.classdate = ls.classdate;
                        model.trainer = ls.trainer;
                    }

                    ZTST_TRAINEE tee = sapctx.ZTST_TRAINEE.FirstOrDefault(x => x.trainee.Equals(_trainee));
                    if (tee != null)
                    {
                        model.treegp = tee.groupid;
                    }
                    model.signin = string.IsNullOrEmpty(model.signin) ? "N" : model.signin;
                }
                return model;
            }
            catch (Exception ex)
            {
                //log.Fatal(System.Reflection.MethodBase.GetCurrentMethod().Name + " ==>" + ex.Message);
                throw ex;
            }
        }
        #endregion

        #region getSignInDataWithURL return Model_TrainSigIn2
        public Model_TrainSigIn2 getSignInDataWithURL(string _classid, string _trainee)
        {
            Model_TrainSigIn2 model = new Model_TrainSigIn2();
            try
            {
                using (sapTable sapctx = new sapTable())
                {
                    ZTST_TRAINSIGNIN2 rec = sapctx.ZTST_TRAINSIGNIN2.FirstOrDefault(x => x.trainee.Equals(_trainee) &&
                                                                     x.classid.Equals(_classid));
                    if (rec != null)
                    {
                        SetValue2<ZTST_TRAINSIGNIN2, Model_TrainSigIn2>(rec, model);
                    }
                    ZTST_TRAINCLASS ls = sapctx.ZTST_TRAINCLASS.FirstOrDefault(x => x.classid.Equals(_classid));
                    if (ls != null)
                    {
                        model.classdate_hw = ls.classdate;
                        model.trainer = ls.trainer;
                    }

                    model.signin = string.IsNullOrEmpty(model.signin) ? "N" : model.signin;
                }
                return model;
            }
            catch (Exception ex)
            {
                //log.Fatal(System.Reflection.MethodBase.GetCurrentMethod().Name + " ==>" + ex.Message);
                throw ex;
            }
        }
        #endregion

        #region  Query records by classid Selected
        public IEnumerable<object> GetSelectedClassRecs(string userid, string classid)
        {
            try
            {
                using (sapTable sapctx = new sapTable())
                {
                    //var ls = sapContext.ZTST_TRAINSIGNIN.Where(x => x.CLASSID.Equals(classid)).ToList();
                    // inner join
                    var ls = (
                        from detail in sapctx.ZTST_TRAINSIGNIN
                        join master in sapctx.ZTST_TRAINCLASS
                            on detail.classid equals master.classid
                        //where detail.classid.Equals(classid) && detail.userid.Equals(userid)
                        //where detail.classid.Equals(classid) && detail.trainee.Equals(userid)
                        where (classid == "" || detail.classid.Contains(classid)) && (userid == "" || detail.trainee.Contains(userid))                    
                        orderby master.classid ascending
                        select new
                        {
                            classid = detail.classid,
                            classname = master.classname,
                            classdate = master.classdate,
                            empid = detail.userid,
                            trainee = detail.trainee,
                            signin = detail.signin,
                            homework = detail.homework
                        }).ToList();
                    return ls;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region Insert Sign in record
        public void InsertTrainSignInRec(string sJson)
        {
            try
            {
                using (sapTable sapctx = new sapTable())
                {
                    ZTST_TRAINSIGNIN _add = JsonConvert.DeserializeObject<List<ZTST_TRAINSIGNIN>>(sJson)[0];
                    //sapContext.ZTST_TRAINSIGNIN.Add(_add);
                    //sapContext.SaveChanges();

                    ZTST_TRAINSIGNIN _rec = sapctx.ZTST_TRAINSIGNIN.Find(_add.userid, _add.classid, _add.trainee);
                    if (_rec == null)
                    {
                        _rec = new ZTST_TRAINSIGNIN();
                        sapctx.Entry(_rec).State = EntityState.Added;
                    }
                    else
                    {
                        sapctx.Entry(_rec).State = EntityState.Modified;
                    }
                    SetValue2(_add, _rec);
                    //log.InfoFormat("InsertSignInRec={0}", JsonConvert.SerializeObject(_rec));
                    sapctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                //log.Fatal(System.Reflection.MethodBase.GetCurrentMethod().Name + " ==>" + ex.Message);
                throw ex;
            }

        }
        #endregion

        #region - DeleteRec
        public void DeleteRec(string _userid, string _classid, string _trainee)
        {
            try
            {
                using (sapTable sapctx = new sapTable())
                {
                    ZTST_TRAINSIGNIN _rec = sapctx.ZTST_TRAINSIGNIN.Find(_userid, _classid, _trainee);
                    if (_rec == null)
                    {
                    }
                    else
                    {
                        sapctx.Entry(_rec).State = EntityState.Deleted;
                    }

                    //log.Info("DeleteData=" + JsonConvert.SerializeObject(_rec));

                    sapctx.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                //log.Fatal(System.Reflection.MethodBase.GetCurrentMethod().Name + " ==>" + ex.Message);
                throw ex;
            }
        }
        #endregion
    }

}
