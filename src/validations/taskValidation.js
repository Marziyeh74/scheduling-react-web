import * as Yup from 'yup';

//


export const taskSchema = Yup.object().shape({

    Title:Yup.string().required('عنوان تسک الزامی می باشد'),
    Category:Yup.string().required('انتخاب دسته بندی الزامی می باشد'),
    Priority:Yup.number().required('انتخاب الویت الزامی هست'),
    Color:Yup.string().required('انتخاب رنگ الزامی هست'),
    Description:Yup.string().nullable()

}) ;