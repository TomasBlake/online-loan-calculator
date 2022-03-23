
export type LoanRequestData = {
      loanPrinciple: number;
      months: number;
      interestRate: number,
      withInsurance: boolean
}

export type LoanResponseData = { 
    monthPayment: number;
}