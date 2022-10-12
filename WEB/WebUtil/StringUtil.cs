using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CFP.WEB.WebUtil
{
    public class StringUtil
    {
        public static String ConvertDateTimeToString(DateTime dateTime)
        {
            return ConvertDateTimeToString(dateTime, null);
        }
        public static String ConvertDateTimeToString(DateTime dateTime, string format)
        {
            if (string.IsNullOrEmpty(format)) format = "yyyy/MM/dd";

            if (dateTime == DateTime.MinValue)
            {
                return string.Empty;
            }
            else
            {
                return dateTime.ToString(format);
            }
        }

        public static string ConvertDecimalToString(decimal value)
        {
            string formatedValue = value == decimal.MinValue ? "0.0" : value.ToString();
            string[] valueArray = formatedValue.Split('.');

            string returnValue = string.Empty;
            if (valueArray.Length > 1)
            {
                if (int.Parse(valueArray[1]) == 0)
                {
                    returnValue = valueArray[0];
                }
                else
                {
                    returnValue = string.Format("{0}.{1}", valueArray[0], valueArray[1].TrimEnd('0'));
                }
            }
            else
            {
                returnValue = valueArray[0];
            }
            return returnValue;
        }
    }
}