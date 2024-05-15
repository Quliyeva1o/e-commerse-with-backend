import * as Yup from Yup

export  const categoryValidation=Yup.object().shape({
    name:Yup.string().matches(/^[a-zA-Z]+$/,"Name must contain only letters").required()
})