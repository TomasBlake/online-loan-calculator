var express = require('express');
var LoanCalc = require('loan-calc');
var app = express();
var cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// This responds a POST request for the homepage
app.post('/monthpaymentcalculation', function (req, res) {
   var {loanPrinciple, months, interestRate, withInsurance} = req.body;
   var monthPayment = LoanCalc.paymentCalc({
      amount: loanPrinciple,
      rate: interestRate,
      termMonths: months
  });

  if (withInsurance) {
     monthPayment += 200;
  }

   res.json({ monthPayment: monthPayment })
})

var server = app.listen(8081, function () {
   
   console.log("Example app listening at http://localhost:8081")
})