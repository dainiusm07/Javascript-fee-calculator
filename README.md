# Javascript-fee-calculator

#### Requirements:
[NodeJS](https://nodejs.org/en/download/)

##### How to run?
1. Clone the repository `git clone https://github.com/dainiusm07/Javascript-fee-calculator.git`
2. Open console in `Javascript-fee-calculator` folder.
3. Run app by typing `node app.js input.json` (input.json is argument, which represents filename)

#### About

Program is calculating fee for every operation which is in data file. Data file stores array of operations, each operation has information of date, user-id, user-type, type, and operation amount with currency.
At the beggining of the code I created 2 objects. One is for cash_in information and another for cash_out fees for every type of user and so on...
And based on that information program calculates the fee of every operation.

### Unit test

I used MochaJS test framework.

Tests where made for every function that I used in the program code.

(You can find appTest.js in `unit_test/test` folder)

##### How to run test?
1. Go to `unit_test` folder
2. Run test by typing `npm run test`

