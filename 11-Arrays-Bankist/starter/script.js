'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//////////////////////////////////////////////////////////////////////////////////////////////////////APP

let validateUser = ()=>{
  let userName = inputLoginUsername.value;
   let userPin = inputLoginPin.value;

   inputLoginPin.value = inputLoginUsername.value = '';
   inputLoginPin.blur();

   let acc = accounts.find((acc)=>{
      return acc.userName == userName;
   });

   if(acc?.pin == userPin){
    containerApp.style.opacity = 100;
    return acc;
   }
   else{
    return false;
   }
}

let displayMovements = (movements)=>{
  containerMovements.innerHTML = '';

  movements.forEach((mov, i)=>{
    let type = mov<0?'withdrawal':'deposit';

    let html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
         <div class="movements__value">${mov} €</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin',html);
  })

}

function createUserNames(accounts){
  accounts.forEach((acc)=>{
    acc.userName = acc.owner.toLowerCase().split(' ').map((word)=>word[0]).join('');
  });
}

let createDepsWithds = (account)=>{
  let elements = account.movements;
  let deposits = elements.filter((ele)=> ele>0);
  let withdrawals = elements.filter((ele)=>ele<0);

  return [deposits, withdrawals];
}

function displayTotals(account){
  let [deposits, withdrawls] = createDepsWithds(account);
  labelSumIn.textContent = deposits.reduce((sum,curr)=>{
    return sum+curr;
  }, 0) + '€';
  labelSumOut.textContent = Math.abs(withdrawls.reduce((sum,curr)=>{
    return sum+curr;
  }, 0)) + '€';

  labelBalance.textContent = `${withdrawls.reduce((sum,curr)=>{
    return sum+curr;
  }, 0) + deposits.reduce((sum,curr)=>{
    return sum+curr;
  }, 0)}€`;

  account.balance = +(labelBalance.textContent.split('€')[0]);

  labelSumInterest.textContent = `${+labelBalance.textContent.replace('€', '')*account.interestRate/100}€`;

  labelBalance.textContent = `${withdrawls.reduce((sum,curr)=>{
    return sum+curr;
  }, 0) + deposits.reduce((sum,curr)=>{
    return sum+curr;
  }, 0) + +labelSumInterest.textContent.replace('€', '')}€`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  createUserNames(accounts);
});

btnLogin.addEventListener('click',(e)=>{ 
  e.preventDefault();
  let validatedUser = validateUser();
  localStorage.setItem("activeUser", validatedUser.userName);
  if(validatedUser){
    labelWelcome.textContent = `Welcome, ${validatedUser.owner.split(' ')[0]}!`;
    displayMovements(validatedUser.movements);
    displayTotals(validatedUser);
  }
  else{
    labelWelcome.textContent = `Invalid user details! Try login again.`;
  }
});


btnTransfer.addEventListener('click', (e)=>{
  e.preventDefault();

  let activeUser = localStorage.getItem('activeUser');

  let transferTo = inputTransferTo.value;
  let transferAmount = +inputTransferAmount.value;

  inputTransferAmount.value = inputTransferTo.value = '';

  inputTransferAmount.blur();

  if(transferAmount!==0){
    activeUser = accounts.find((acc)=>{
      return acc.userName == activeUser;
    });

    transferTo = accounts.find((acc)=>{
      return acc.userName == transferTo;
    });
    if(activeUser.balance > transferAmount){
    activeUser.movements.push(-transferAmount);
    transferTo.movements.push(transferAmount);}
    else{
      alert("Account balance not enough!!!");
      return;
    }

    displayMovements(activeUser.movements);
    displayTotals(activeUser);
  }
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let arr = [];

function fillArray(){
  for(let i = 'a'; i.charCodeAt(0)<'z'.charCodeAt(0) + 1;i=String.fromCharCode(i.charCodeAt(0) + 1)){
  arr.push(i);
}

  return arr;
}

fillArray();

/////////////////////////////////////////////////
/*
//slice does not mutate the original array
console.log(arr.slice(20));
console.log(arr);
//splice does mutate and removes the spliced out elements
console.log(arr.splice(20));
console.log(arr);
*/

/////////////////////////////////////////////

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]



let checkDogs = (juliaDogs, kateDogs)=>{
  let juliaCopy = [...juliaDogs];
  juliaCopy.splice(0,1);
  juliaCopy.splice(-2);

  let allDogs = [...juliaCopy, ...kateDogs];

  allDogs.forEach((dog, i)=>{
    let message="";
    message = dog<=3?`Dog number ${i+1} is still a puppy 🐶`:`Dog number ${i+1} is an adult, and is ${dog} years old`;

    console.log(message);
  })
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

const myArr = [1,2,3,4,5,6,7,8,9];

const mapped = myArr.map((ele,i, arr)=>{
  const a = arr.slice();
  return ele*i*a.reduce((sum, curr)=>{
    return curr+sum;
  })
})

console.log(myArr);
console.log(mapped);

*/

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


function calcAverageHumanAge(dogAges){
  let dogHumanAge = dogAges.map((age, i)=>{
    return age<=2?2*age:16+4*age;
  });

  dogHumanAge = dogHumanAge.filter((age,i)=>{
    return age>18;
  });

  let dogHumanAgeAscending = dogHumanAge.sort((a,b)=> a-b);

  let averageDogHumanAge = dogHumanAge.reduce((acc,curr)=>acc+curr, 0)/dogHumanAge.length;

  return [dogHumanAgeAscending, averageDogHumanAge];
}


console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

*/