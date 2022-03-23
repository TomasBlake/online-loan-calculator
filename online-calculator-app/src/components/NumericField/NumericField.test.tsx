import { render } from "@testing-library/react";
import { ChangeEvent } from "react";
import NumericField from "./NumericField";

describe("NumericField", () => {
  it("should render", () => {
    const { getByTestId } = render(
      <NumericField
        value={50}
        handleInputChange={function (
          event: ChangeEvent<HTMLInputElement>
        ): void {
          throw new Error("Function not implemented.");
        }}
        min={5}
        max={100}
      />
    );
    expect(getByTestId("NumericField")).toBeInTheDocument();
  });
});
