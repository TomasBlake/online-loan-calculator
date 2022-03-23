import React, { useEffect } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import { useSelector } from "react-redux";
import {
  calculateLoan,
  selectLoanCalculation,
  setLoanAmount,
  setRepeymentPeriod,
  setWithInsurance,
} from "./features/calculation/calculationSlice";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "./hooks";
import InputContainer from "./components/InputContainer/InputContainer";

const App = () => {
  const {
    loanAmount,
    monthlyPayment,
    repaymentPeriod,
    withInsurance,
    pending,
  } = useSelector(selectLoanCalculation);

  const dispatch = useAppDispatch();

  const handleChangeLoanAmount = (value: number | number[]) => {
    dispatch(setLoanAmount(value));
  };

  const handleChangeRepaymentPeriod = (value: number | number[]) => {
    dispatch(setRepeymentPeriod(value));
  };

  const handleChangeWithInsurance = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    dispatch(setWithInsurance(checked));
  };

  useEffect(() => {
    dispatch(
      calculateLoan({
        loanPrinciple: loanAmount,
        months: repaymentPeriod,
        interestRate: Number(process.env.REACT_APP_MOCK_INTEREST),
        withInsurance,
      })
    );
  }, [loanAmount, repaymentPeriod, withInsurance]);

  return (
    <Card
      sx={{ display: "flex", justifyContent: "space-evenly", margin: "50px" }}
      className="App"
    >
      <Box
        sx={{
          display: "flex",
          minHeight: "400px",
          minWidth: "300px",
          width: "800px",
          maxWidth: "1000px",
          justifyContent: "space-evenly",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        {/* settings */}

        <InputContainer
          handleChange={handleChangeLoanAmount}
          minValue={5000}
          maxValue={1500000}
          value={loanAmount}
          text="Kolik byste si u nás rádi půjčili?"
          marks={[
            { value: 5000, label: "5000 Kč" },
            { value: 1500000, label: "1500000 Kč" },
          ]}
        />

        <InputContainer
          handleChange={handleChangeRepaymentPeriod}
          minValue={14}
          maxValue={120}
          value={repaymentPeriod}
          text="Délkou splácení si určete výšku splátky"
          marks={[
            { value: 14, label: "14 Měsíců" },
            { value: 120, label: "120 Měsíců" },
          ]}
        />

        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChangeWithInsurance}
              checked={withInsurance}
            />
          }
          label="S pojištěním"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          maxHeight: "300px",
          padding: "10px",
        }}
      >
        {/* view */}
        <Box sx={{ display: "flex", height: "25px", justifyContent: "center" }}>
          {pending && <CircularProgress />}
        </Box>
        <Typography variant="subtitle1">Měsíčně zaplatíte</Typography>
        <Typography sx={{ width: "350px" }} variant="h2">
          {Math.floor(monthlyPayment)} kč
        </Typography>
        <Button variant="contained">Pokračovat</Button>
      </Box>
    </Card>
  );
};

export default App;
