import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import PageTitle from "../components/pageTitle/PageTitle";
import MainCard from "../components/pages/currency/MainCard";
import { useCurrencies } from "../hooks/useCurrencies";
import { toast } from "react-toastify";
import { createCurrency } from "../utils/function/api/currency";

const validationSchema = Yup.object().shape({
  currency: Yup.string()
    .min(3, "Must be exactly 3 characters")
    .max(3, "Must be exactly 3 characters")
    .required("Required!"),
});

function CurrencyPage() {
  const { currencies, isLoading } = useCurrencies();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(values: any) {
    setIsSubmitting(true);
    try {
      createCurrency({ currency: values.currency });
      router.push(router.asPath);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create new currency");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <PageTitle title="Currencies" />
      <MainCard>
        <div>
          {isLoading && <div>Fetching currencies...</div>}
          {!isLoading &&
            currencies.length > 0 &&
            currencies.map((currency: any) => {
              return <div>{currency.code}</div>;
            })}
          {!isLoading && currencies && currencies.length === 0 && (
            <div>No currencies found!</div>
          )}
        </div>
        {isSubmitting && <div>Loading...</div>}

        <Formik
          initialValues={{ currency: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label htmlFor="currency">Currency:</label>
              <Field
                id="currency"
                name="currency"
                placeholder="Currency..."
              ></Field>
            </div>
            <div>
              <button type="submit">Add Currency</button>
            </div>
          </Form>
        </Formik>
      </MainCard>
    </div>
  );
}

export default CurrencyPage;
