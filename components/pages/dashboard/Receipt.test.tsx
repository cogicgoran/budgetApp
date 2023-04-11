import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Receipt from "./Receipt";
import { DashboardReceipt } from "../../../hooks/useRecentReceipts";

describe("Home", () => {
  it("renders a loading state", () => {
    const props: DashboardReceipt = {
      currency: "RSD",
      date: new Date(),
      id: 1,
      mostSpentCategory: {
        id: 1,
        color: "#123242",
        icon: "yes",
        name: "test name",
      },
      price: 1250,
      shopName: "Test shop name",
    };

    render(<Receipt {...props} />);

    const componentRoot = screen.getByRole("banana");
    const priceCurrencyElement = screen.getByTestId("priceCurrency");
    expect(priceCurrencyElement).toBeInTheDocument();
    expect(componentRoot).toContainElement(priceCurrencyElement);
    expect(componentRoot).toBeInTheDocument();
  });
});
