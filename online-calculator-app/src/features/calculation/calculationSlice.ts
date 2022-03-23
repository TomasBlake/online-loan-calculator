import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import client from "../../client";
import { LoanRequestData, LoanResponseData } from "../../types";

export const calculateLoan = createAsyncThunk(
  "loan/fetchLoanAmount",
  async (data: LoanRequestData) => {
    const response = await client.post("/monthpaymentcalculation", data);
    return response.data;
  }
);

interface CalculationState {
  loanAmount: number;
  repaymentPeriod: number;
  withInsurance: boolean;
  monthlyPayment: number;
  pending: boolean;
  error: SerializedError | undefined;
}

const initialState: CalculationState = {
  loanAmount: 5000,
  repaymentPeriod: 14,
  withInsurance: false,
  monthlyPayment: 0,
  pending: false,
  error: undefined,
};

export const calculationSlice = createSlice({
  name: "calculation",
  initialState,
  reducers: {
    setLoanAmount: (state, { payload }) => {
      state.loanAmount = payload;
    },
    setRepeymentPeriod: (state, { payload }) => {
      state.repaymentPeriod = payload;
    },
    setWithInsurance: (state, { payload }) => {
      state.withInsurance = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateLoan.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(calculateLoan.fulfilled, (state, { payload }) => {
        (state.monthlyPayment = (payload as LoanResponseData).monthPayment),
          (state.pending = false);
      })
      .addCase(calculateLoan.rejected, (state, { error }) => {
        (state.error = error), (state.pending = false);
      });
  },
});

export const { setLoanAmount, setRepeymentPeriod, setWithInsurance } =
  calculationSlice.actions;

export const selectLoanCalculation = (state: RootState) => state.calculation;

export default calculationSlice.reducer;
