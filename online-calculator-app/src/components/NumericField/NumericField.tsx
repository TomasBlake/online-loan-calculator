import TextField from "@mui/material/TextField";
import React from "react";
import NumberFormat from "react-number-format";

interface NumericFieldProps {
  value: number;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  min: number;
  max: number;
}

const NumberFormatCustom = React.forwardRef<
  NumberFormat<NumericFieldProps>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, min, max, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onBlur={(event: React.FocusEvent<HTMLInputElement, Element>) => {
        const conversedValue = Number(event.target.value);
        const parsedValue =
          conversedValue > max
            ? max
            : conversedValue < min
            ? min
            : conversedValue;
        onChange({
          target: {
            name: props.name,
            value: parsedValue.toString(),
          },
        });
      }}
      isNumericString
      allowNegative={false}
    />
  );
});

const NumericField: React.FC<NumericFieldProps> = ({
  value,
  handleInputChange,
  min,
  max,
}) => {
  return (
    <TextField
      data-testid="NumericField"
      variant="outlined"
      value={value}
      onChange={handleInputChange}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
      inputProps={{
        min,
        max,
      }}
    />
  );
};

export default NumericField;
