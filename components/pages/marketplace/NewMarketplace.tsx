import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PATHS } from "../../../utils/constants";
import NewProductInput from "../../forms/NewProductInput";
import styles from "./newMarketplace.module.scss";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { getResponseErrorMessage } from "../../../utils/function/common";
import { createNewMarketplace } from "../../../utils/function/api/marketplace";
import { Marketplace } from "@prisma/client";

interface Props {
  onCancel: () => void;
  onSuccess: (marketplace: Marketplace) => void;
}

const addMarketplaceSchema = z.object({
  name: z.string(),
  address: z.string(),
});

export type AddMarketplacePayload = ReturnType<
  typeof addMarketplaceSchema["parse"]
>;

const DEFAULT_MARKETPLACE: AddMarketplacePayload = { name: "", address: "" };

function NewMarketplace({onCancel,onSuccess}: Props) {
  const [shop, setShop] = useState(DEFAULT_MARKETPLACE);
  const formMethods = useForm({
    defaultValues: {
      name: "",
      address: "",
    },
    resolver: zodResolver(addMarketplaceSchema),
  });
  const router = useRouter();

  async function submitHandler(payload: AddMarketplacePayload) {
    try {
      const marketplace = await createNewMarketplace(payload);
      toast.success("Marketplace added")
      onSuccess(marketplace);
    } catch (error) {
      toast.error(getResponseErrorMessage(error));
    }
  }

  return (
    <div>
      <h3>NEW MARKETPLACE</h3>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(submitHandler)}>
          <NewProductInput name="name" label="Shop name" />
          <NewProductInput name="address" label="Address" />
          <div className={styles["new-marketplace__controls"]}>
            <button
              className={styles["new-marketplace__cancel-btn"]}
              type="button"
              onClick={onCancel}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className={styles["new-marketplace__confirm-btn"]}
            >
              CONFIRM
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default NewMarketplace;
