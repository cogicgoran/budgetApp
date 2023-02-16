import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./receiptAddProduct.module.scss";
import classNames from "classnames";
import { useNewReceiptContext } from "../../../context/NewReceiptContext";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uuidv4 } from "@firebase/util";
import Button from "../../UI/button/Button";

interface Props {
  onAddArticle: (article: FormDataArticle) => void;
  onCancel: () => any;
}

const schema = z.object({
  name: z
    .string({ invalid_type_error: "Invalid name" })
    .min(1, { message: "Name must contain at least 1 character" }),
  category: z.string({
    invalid_type_error: "Please select an article category",
  }),
  price: z
    .number({ coerce: true, invalid_type_error: "Invalid price" })
    .positive({ message: "Price must be positive" }),
});

function getInitialFormValues() {
  return {
    name: "",
    category: null as string | null,
    price: "",
  };
}

type AddArticleFormValues = ReturnType<typeof getInitialFormValues>;

export interface FormDataArticle {
  uuid: string;
  name: string;
  price: number;
  category: { color: string; icon: string; id: number; name: string };
}

function ReceiptAddProduct(props: Props) {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<AddArticleFormValues>({
    defaultValues: getInitialFormValues(),
    resolver: zodResolver(schema),
  });
  const { categories } = useNewReceiptContext();
  const { t } = useTranslation();
  const textAdd = t("add");
  const textAddProduct = t("addProduct");
  const textCategory = t("category");
  const textCancel = t("cancel");
  const textName = t("name");
  const textPrice = t("price");

  const formValues = watch();

  function onSubmit(values: AddArticleFormValues) {
    props.onAddArticle({
      uuid: uuidv4(),
      name: values.name.trim(),
      category: categories.find(
        (category) => category.id === Number(values.category!)
      )!,
      price: Number(values.price),
    });

    props.onCancel();
  }

  function onInvalid(a: any) {
    console.log("err", a);
  }

  const submitAction = handleSubmit(onSubmit, onInvalid);

  return (
    <div className={styles.newProduct}>
      <div>
        <h4>{textAddProduct}</h4>
        <form id="article-form" name="article-form" onSubmit={submitAction}>
          <div
            className={classNames(styles.newProductInput, {
              [styles.invalid]: errors.name,
            })}
          >
            <label htmlFor="name">{textName}:</label>
            <input {...register("name")} placeholder={textName} />
          </div>
          <div
            className={classNames(styles.newProductInput, {
              [styles.invalid]: errors.category,
            })}
          >
            <label htmlFor="category">{textCategory}:</label>
            <select {...register("category")}>
              <option selected value="" hidden>
                {textCategory}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className={classNames(styles.newProductInput, {
              [styles.invalid]: errors.price,
            })}
          >
            <label htmlFor="price">{textPrice}:</label>
            <input {...register("price")} placeholder={textPrice} />
          </div>
          <div className={styles.newProductControls}>
            <Button
              type="button"
              actionType="fail"
              onClick={props.onCancel}
            >
              {textCancel}
            </Button>
            {/* <button
              className={classNames(styles.newProductAddArticleBtn, {
                [styles.disabled]: false,
              })}
              type="button"
              disabled={false}
              onClick={submitAction}
            >
              {textAdd}
            </button> */}
            <Button actionType="success" type="button" onClick={submitAction}>
              {textAdd}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReceiptAddProduct;
