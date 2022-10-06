using CFP.DAL.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CFP.DAL
{
    internal class unitTestProg
    {
        static void Main(string[] args)
        {


            Console.WriteLine("Show Chris Item:");
            ShowAll();
            //Console.WriteLine("");
            //Console.WriteLine("Insert New Line:");
            //InsertData();
            //ShowAll();
            //Console.WriteLine("");
            //Console.WriteLine("Update Line:");
            //UpdateData();
            //ShowAll();
            //Console.WriteLine("");
            //Console.WriteLine("Delete Line:");
            //DelData();
            //ShowAll();


            Console.ReadKey();
        }
        static void ShowAll()
        {
            using (var ctx = new sapDBconn())
            {

                var rows = ctx.ZTST_TRAINEE.Where(b => DbFunctions.Like(b.trainee, "%chris%")).ToList();
                //var rows = ctx.ZTST_TRAINEE.Where(b => b.trainee == "chrisliu").ToList();
                //var rows = ctx.ZTST_TRAINEE.ToList();
                rows.ForEach(x =>
                {
                    StringBuilder sb = new StringBuilder();
                    sb.AppendFormat("{0},{1},{2},{3};", x.trainee, x.zname, x.empid, x.groupid);
                    Console.WriteLine(sb.ToString());
                });
                //LINQ 方法
                var rows_linq = from x in ctx.ZTST_TRAINEE
                                select x;


                foreach (var result in rows_linq)
                {
                    StringBuilder sb = new StringBuilder();
                    sb.AppendFormat("{3},{0},{1},{2}", result.trainee, result.zname, result.empid, result.groupid);
                    Console.WriteLine(sb.ToString());
                }
            }
        }
        static void InsertData()
        {
            using (var ctx = new sapDBconn())
            {
                var newdata = new ZTST_TRAINEE()
                {
                    trainee = "chrisABC",
                    empid = "987654",
                    groupid = "GG",
                    zname = "小叮噹"
                };
                ctx.ZTST_TRAINEE.Add(newdata);
                ctx.SaveChanges();
            }
        }
        static void UpdateData()
        {
            using (var ctx = new sapDBconn())
            {
                //var udata = ctx.ZTST_TRAINEE.Where(tne => tne.empid == "987654").ToList();
                //for (int i = 0; i < udata.Count; i++)
                //{
                //    var cname = udata[i];
                //    cname.empid = "123456";
                //}
                var udata = ctx.ZTST_TRAINEE.Where(tne => tne.empid == "987654").First();
                udata.empid = "123456";
                ctx.SaveChanges();
            }
        }
        static void DelData()
        {
            using (var ctx = new sapDBconn())
            {
                var deldata = ctx.ZTST_TRAINEE.Where(tne => tne.trainee == "chrisABC").First();
                ctx.ZTST_TRAINEE.Remove(deldata);
                ctx.SaveChanges();
            }
        }
    }
}
