import formatCurrency from "../scripts/utils/money.js"


console.log('test suite: formatCurrency');


console.log('converts cents to dollers');

if(formatCurrency(2095) === '20.95'){

    console.log("passed");
}

else{

    console.log("failed");
}

console.log('works with zero');

if(formatCurrency(0) === '0.00'){

    console.log("passed");
}

else{

    console.log("failed");
}

console.log('rounds upto the nearest cents');

if(formatCurrency(2000.4) === '20.00'){

    console.log("passed");
}

else{

    console.log("failed");
}