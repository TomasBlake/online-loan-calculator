import { Mark } from "@mui/base/SliderUnstyled";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React from "react";
import NumericField from "../NumericField/NumericField";

interface InputContainerProps {
  value: number;
  handleChange: (value: number | number[]) => void;
  text: string;
  minValue: number;
  maxValue: number;
  marks: Mark[];
}

const InputContainer: React.FC<InputContainerProps> = ({
  value,
  handleChange,
  text,
  minValue,
  maxValue,
  marks,
}) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    handleChange(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(Number(event.target.value));
  };

  return (
    <Box data-testid="InputContainer" sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">{text}</Typography>
        <NumericField
          min={minValue}
          max={maxValue}
          value={value}
          handleInputChange={handleInputChange}
        />
      </Box>
      <Slider
        value={value}
        onChange={handleSliderChange}
        min={minValue}
        max={maxValue}
        marks={marks}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default InputContainer;
