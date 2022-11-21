import React from "react";
import { Formik, Field, Form } from "formik";
import { useTranslation } from "react-i18next";
import isEmpty from "lodash.isempty";
import * as Yup from "yup";
import styles from "./receiptAddProduct.module.scss";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  price: Yup.number().min(0).required("Required"),
});

interface Props {
  onAddArticle: Function;
  onCancel: Function;
  currency: any;
}

function ReceiptAddProduct(props: Props) {
  const { t } = useTranslation();

  const textAdd = t("add");
  const textAddProduct = t("addProduct");
  const textCategory = t("category");
  const textCancel = t("cancel");
  const textName = t("name");
  const textPrice = t("price");

  function handleSubmit(values: any) {
    props.onAddArticle({
      name: values.name.trim(),
      category: values.category.trim(),
      price: Number(values.price.trim()),
    });

    props.onCancel();
  }

  const inputClass = styles["new-product-input"];
  const inputErrorClass = [styles["new-product-input"], styles["invalid"]].join(
    " "
  );

  const buttonClass = styles["new-product__add-article-btn"];
  const buttonClassDisabled = [
    styles["new-product__add-article-btn"],
    styles["disabled"],
  ].join(" ");

  return (
    <div className={styles["new-product"]}>
      <div>
        <h4>{textAddProduct}</h4>
        <Formik
          initialValues={{
            name: "",
            category: "",
            price: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div
                className={
                  touched.name && errors.name ? inputErrorClass : inputClass
                }
              >
                <label htmlFor="name">{textName}:</label>
                <Field
                  id="name"
                  name="name"
                  placeholder={`${textName}...`}
                ></Field>
              </div>
              <div
                className={
                  touched.category && errors.category
                    ? inputErrorClass
                    : inputClass
                }
              >
                <label htmlFor="category">{textCategory}:</label>
                <Field
                  id="category"
                  name="category"
                  placeholder={`${textCategory}...`}
                ></Field>
              </div>
              <div
                className={
                  touched.price && errors.price ? inputErrorClass : inputClass
                }
              >
                <label htmlFor="price">{textPrice}:</label>
                <Field
                  id="price"
                  name="price"
                  placeholder={`${textPrice}...`}
                ></Field>
              </div>
              <div className={styles["new-product__controls"]}>
                <button
                  className={styles["new-product__cancel-btn"]}
                  type="button"
                  onClick={props.onCancel as any}
                >
                  {textCancel}
                </button>
                <button
                  className={
                    isEmpty(errors) && !isEmpty(touched)
                      ? buttonClass
                      : buttonClassDisabled
                  }
                  type="submit"
                  disabled={!isEmpty(errors)}
                >
                  {textAdd}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ReceiptAddProduct;
