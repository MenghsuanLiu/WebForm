using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI;

namespace CFP.WEB.WebUtil
{
    /// <summary>
    /// WebControlsUtil 的摘要描述
    /// </summary>
    public class WebControlsUtil
    {
        private static void ReadOnlyAll(Control parentControl)
        {
            if (parentControl.HasControls())
            {
                SetReadOnlyByControl(parentControl);
                foreach (Control c in parentControl.Controls)
                {
                    ReadOnlyAll(c);
                }
            }
            else
            {
                SetReadOnlyByControl(parentControl);
            }
        }

        private static void SetReadOnlyByControl(Control control)
        {
            if (control is HtmlControl || control is WebControl)
            {
                if (control is RadioButtonList)
                {
                    RadioButtonList radioList = control as RadioButtonList;
                    foreach (ListItem item in radioList.Items)
                    {
                        item.Attributes.Add("onclick", "javascript:return false;");
                    }
                    (control as RadioButtonList).Attributes.Add("onclick", "javascript:return false;");
                }
                else if (control is DropDownList)
                {
                    (control as DropDownList).Enabled = false;
                }
                else
                {
                    (control.GetType().GetProperty("Attributes").GetValue(control, null) as AttributeCollection).Add("readonly", "readonly");
                }
            }
        }

        private static object GetValue(object srcObj, PropertyInfo prop)
        {
            return prop.GetValue(srcObj, null);
        }

        public static void RegisterScript(Page page, string scriptStr)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(),
                        Guid.NewGuid().ToString(),
                        scriptStr,
                        true);
        }

        public static void SetPageData(Page page, object formData)
        {
            PropertyInfo[] propArray = formData.GetType().GetProperties();
            foreach (PropertyInfo prop in propArray)
            {
                object value = GetValue(formData, prop);
                if (value != null)
                {
                    if (value.GetType().Equals(typeof(decimal)))
                    {
                        value = StringUtil.ConvertDecimalToString((decimal)value);
                    }

                    Control control = page.FindControl(prop.Name);
                    if (control != null)
                    {
                        #region WebControl Binding Data
                        switch (control.GetType().FullName)
                        {
                            case "System.Web.UI.HtmlControls.HtmlInputCheckBox":
                                HtmlInputCheckBox htmlchk = (HtmlInputCheckBox)control;
                                htmlchk.Checked = htmlchk.Value == value.ToString();
                                break;
                            case "System.Web.UI.WebControls.Label":
                                Label label = (Label)control;
                                if (value is DateTime)
                                {
                                    label.Text = StringUtil.ConvertDateTimeToString((value as DateTime?).Value);
                                }
                                else if (value is bool)
                                {
                                    label.Visible = (bool)value;
                                }
                                else
                                {
                                    label.Text = value.ToString();
                                }
                                break;
                            case "System.Web.UI.WebControls.CheckBoxList":
                                CheckBoxList checkBoxList = (CheckBoxList)control;
                                string[] values = value as string[];
                                foreach (ListItem item in checkBoxList.Items)
                                {
                                    if (values.Contains(item.Value))
                                    {
                                        item.Selected = true;
                                    }
                                }
                                break;
                            case "System.Web.UI.HtmlControls.HtmlInputRadioButton":
                                HtmlInputRadioButton htmlRadio = (HtmlInputRadioButton)control;
                                htmlRadio.Value = value.ToString();
                                break;
                            case "System.Web.UI.WebControls.RadioButtonList":
                                RadioButtonList radioList = (RadioButtonList)control;
                                radioList.SelectedValue = value.ToString();
                                break;
                            case "System.Web.UI.HtmlControls.HtmlInputText":
                                HtmlInputText htmlInputText = (HtmlInputText)control;
                                if (value is DateTime)
                                {
                                    htmlInputText.Value = StringUtil.ConvertDateTimeToString((value as DateTime?).Value);
                                }
                                else
                                {
                                    htmlInputText.Value = value.ToString();
                                }
                                break;
                            case "System.Web.UI.WebControls.TextBox":
                                TextBox textBox = (TextBox)control;
                                if (value is DateTime)
                                {
                                    textBox.Text = StringUtil.ConvertDateTimeToString((value as DateTime?).Value);
                                }
                                else if (value is Dictionary<string, object>)
                                {
                                    foreach (KeyValuePair<string, object> item in value as Dictionary<string, object>)
                                    {
                                        if (item.Key.Equals("CssClass"))
                                        {
                                            textBox.CssClass = item.Value.ToString();
                                        }
                                        else if (item.Key.Equals("ReadOnly"))
                                        {
                                            textBox.ReadOnly = (bool)item.Value;
                                        }
                                        else
                                        {
                                            textBox.Text = item.Value.ToString();
                                        }
                                    }
                                }
                                else
                                {
                                    textBox.Text = value.ToString();
                                }

                                break;
                            case "System.Web.UI.HtmlControls.HtmlTableRow":
                                HtmlTableRow htmlTableRow = (HtmlTableRow)control;
                                if (value is string)
                                {
                                    if (!string.IsNullOrEmpty(value.ToString()))
                                    {
                                        ReadOnlyAll(htmlTableRow);
                                    }
                                }
                                else
                                {
                                    if (!Convert.ToBoolean(value))
                                    {
                                        htmlTableRow.Style.Add("display", "none");
                                    }
                                    else
                                    {
                                        htmlTableRow.Style.Add("display", "");
                                    }
                                }
                                break;
                            case "System.Web.UI.HtmlControls.HtmlTableCell":
                                HtmlTableCell htmlTableCell = (HtmlTableCell)control;
                                if (value is string)
                                {
                                    if (!string.IsNullOrEmpty(value.ToString()))
                                    {
                                        ReadOnlyAll(htmlTableCell);
                                    }
                                }
                                else
                                {
                                    if (!Convert.ToBoolean(value))
                                    {
                                        ReadOnlyAll(htmlTableCell);
                                    }
                                }
                                break;
                            case "System.Web.UI.WebControls.TableCell":
                                TableCell tableCell = (TableCell)control;
                                tableCell.Visible = Convert.ToBoolean(value);
                                break;
                            case "System.Web.UI.WebControls.TableHeaderCell":
                                TableHeaderCell tableHeaderCell = (TableHeaderCell)control;
                                tableHeaderCell.Visible = Convert.ToBoolean(value);
                                break;
                            case "System.Web.UI.HtmlControls.HtmlImage":
                                HtmlImage htmlImage = (HtmlImage)control;
                                if (!Convert.ToBoolean(value))
                                {
                                    htmlImage.Style.Add("display", "none");
                                }
                                break;
                            case "System.Web.UI.WebControls.Image":
                                Image image = (Image)control;
                                if (!Convert.ToBoolean(value))
                                {
                                    image.Style.Add("display", "none");
                                }
                                break;
                            case "System.Web.UI.WebControls.DropDownList":
                                DropDownList ddl = (DropDownList)control;
                                if (value is string)
                                {
                                    ddl.SelectedValue = value.ToString();
                                }
                                else if (value is ListItem[])
                                {
                                    ddl.Items.AddRange(value as ListItem[]);
                                }
                                else if (value is bool)
                                {
                                    ddl.Enabled = (bool)value;
                                }
                                break;
                            case "System.Web.UI.HtmlControls.HtmlButton":
                                HtmlButton button = (HtmlButton)control;
                                if (value is string)
                                {
                                    button.InnerText = value.ToString();
                                }
                                else if (value is bool)
                                {
                                    if (!Convert.ToBoolean(value))
                                    {
                                        button.Style.Add("display", "none");
                                    }
                                }
                                break;
                            case "System.Web.UI.HtmlControls.HtmlGenericControl":
                                HtmlGenericControl hgc = (HtmlGenericControl)control;
                                if (value is string)
                                {
                                    if (!string.IsNullOrEmpty(value.ToString()))
                                    {
                                        ReadOnlyAll(hgc);
                                    }
                                }
                                else
                                {
                                    hgc.Visible = Convert.ToBoolean(value);
                                }
                                break;
                            case "System.Web.UI.HtmlControls.HtmlTextArea":
                                HtmlTextArea textarea = (HtmlTextArea)control;
                                textarea.Value = value.ToString();
                                break;
                            case "System.Web.UI.WebControls.HiddenField":
                                HiddenField hiddenField = (HiddenField)control;
                                hiddenField.Value = value.ToString();
                                break;
                            case "System.Web.UI.HtmlControls.HtmlInputHidden":
                                HtmlInputHidden htmlInputHidden = (HtmlInputHidden)control;
                                htmlInputHidden.Value = value.ToString();
                                break;
                            case "System.Web.UI.HtmlControls.HtmlIframe":
                                HtmlIframe htmlIframe = (HtmlIframe)control;
                                htmlIframe.Src = value.ToString();
                                break;
                            case "System.Web.UI.HtmlControls.HtmlInputFile":
                                HtmlInputFile htmlInputFile = (HtmlInputFile)control;
                                htmlInputFile.Attributes.Add("class", value.ToString());
                                break;
                                //case "StandUI.MultiSelectDialog":
                                //    LabelAndTextBox s = (LabelAndTextBox)control;
                                //    s.textBox.Text = value.ToString();

                                //    break;
                        }
                        #endregion
                    }
                }
            }

        }
    }
}