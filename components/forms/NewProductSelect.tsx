import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import Select, { components, ValueContainerProps } from "react-select";
import { AddArticleFormValues } from "../pages/new-receipt/ReceiptAddProduct";

interface Option {
  label: string;
  value: number;
}

interface Props {
  name: keyof AddArticleFormValues;
  label: string;
  options: any[];
}

function NewProductSelect({ name, label, options }: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<AddArticleFormValues>();
  const value = watch(name);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      className={classNames(
        "grid items-center grid-cols-[16ch_1fr] gap-y-[2ch]",
        "mb-0.5"
      )}
    >
      <label
        htmlFor={name}
        className={classNames({
          "text-[red]": errors[name],
        })}
      >
        {label}:
      </label>
      <Select<Option> // TODO: Find a better way to style select
        {...register(name)}
        options={options}
        onChange={(option) => {
          setValue(name, option ? option.value : null, {
            shouldValidate: true,
          });
        }}
        value={selectedOption}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          control(base) {
            return {
              ...base,
              minHeight: "unset",
              borderRadius: "unset",
              borderColor: errors[name] ? "f00" : "#90c3d0",
            };
          },
          valueContainer(base) {
            return { ...base, padding: "0" };
          },
          input(base) {
            return { ...base, margin: "0" };
          },
          dropdownIndicator(base) {
            return { ...base, padding: "0" };
          },
          placeholder(base) {
            return { ...base, fontStyle: "italic", color: "#90c3d0" };
          },
          option(base) {
            return { ...base, color: "#1a4e5b" };
          },
          singleValue(base) {
            return { ...base, color: "#1a4e5b" };
          },
        }}
        classNames={{
          control() {
            return "border-[#ff0000]";
          },
        }}
      />
    </div>
  );
}

export default NewProductSelect;
