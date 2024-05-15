import * as Yup from 'yup';

export const productValidation = Yup.object().shape({
    name: Yup.string().required(),
    salePrice: Yup.number().min(0).required(),
    costPrice: Yup.number().min(0).required().when("salePrice", (salePrice, schema) => {
        return schema.min(salePrice, "Cost price must be less than or equal to sale price");
    }),
    imgSrc: Yup.string().url().required(),
    discountPercentage: Yup.number().min(0).max(100).required(),
    description: Yup.string().min(10).required(),
    categoryId: Yup.string().required(),
    stockCount: Yup.number().min(1).required(),
});
 