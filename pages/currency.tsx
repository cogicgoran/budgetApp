import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useHttp } from "../hooks/useHttp";
import { useRouter } from "next/router";
import { PATHS } from "../utils/constants";
import PageTitle from "../components/pageTitle/PageTitle";
import MainCard from "../components/pages/currency/MainCard";

const validationSchema = Yup.object().shape({
  currency: Yup.string()
    .min(3, "Must be exactly 3 characters")
    .max(3, "Must be exactly 3 characters")
    .required("Required!"),
});

const getCurrencyRequestConfig = {
  url: "http://localhost:8000/api/currencies",
  method: "GET",
};

function CurrencyPage() {
  const {
    isLoading: currencyIsLoading,
    error: currencyError,
    fetchTask: getCurrencies,
  } = useHttp();
  const {
    isLoading: currencyPostIsLoading,
    error: currencyPostError,
    fetchTask: postCurrencies,
  } = useHttp();
  const [isPostingCurrency, setIsPostingCurrency] = useState(false);
  const [currencies, setCurrencies] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getCurrencies(getCurrencyRequestConfig, handleGetCurrenciesResponse);
  }, []);

  function handlePostCurrencyResponse() {
    router.push(PATHS.HOME);
  }

  function handleSubmit(values: any) {
    const postCurrencyRequestConfig = {
      url: "http://localhost:8000/api/currencies",
      method: "POST",
      data: { currency: values.currency },
    };
    setIsPostingCurrency(true);
    postCurrencies(postCurrencyRequestConfig, handlePostCurrencyResponse);
  }

  function handleGetCurrenciesResponse(response: any) {
    setCurrencies(response.data);
  }

  return (
    <div>
      <PageTitle title="Currencies" />
      <MainCard>
        <div>
          {currencyIsLoading && <div>Fetching currencies...</div>}
          {!currencyIsLoading && currencyError && (
            <div>{currencyError.message}</div>
          )}
          {!currencyIsLoading &&
            !currencyError &&
            currencies &&
            currencies.length > 0 &&
            currencies.map((currency: any) => {
              return <div>{currency.code}</div>;
            })}
          {!currencyIsLoading &&
            !currencyError &&
            currencies &&
            currencies.length === 0 && <div>No currencies found!</div>}
        </div>
        {isPostingCurrency && currencyPostIsLoading && <div>Loading...</div>}
        {isPostingCurrency && !currencyPostIsLoading && currencyPostError && (
          <div>{currencyPostError.message}</div>
        )}
        {isPostingCurrency && !currencyPostIsLoading && !currencyPostError && (
          <div>Successfully added currency</div>
        )}
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
