import { render } from "@testing-library/react";
import InputContainer from "./InputContainer";

describe("InputContainer", () => {
  it("should render", () => {
const {getByTestId} = render(
      <InputContainer
        value={50}
        handleChange={function (value: number | number[]): void {
          throw new Error("Function not implemented.");
        }}
        text={"Test input container"}
        minValue={5}
        maxValue={100}
        marks={[
          { value: 5, label: "5 kč" },
          { value: 100, label: "100 kč" },
        ]}
      />
    );
    expect(getByTestId("InputContainer")).toBeInTheDocument();
  });
});
