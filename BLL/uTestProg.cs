using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CFP.BLL
{
    internal class uTestProg
    {
        static void Main(string[] args)
        {
            using (var classinfo = new ClassInfoGet())
            {
                var _ls = classinfo.GetTrainClassGrpByTrainee("chrisliu");
                //var _ls = classinfo.GetTrainClassGrp();

                Console.WriteLine(_ls.First());
                Console.ReadKey();
            }
        }
    }
}
