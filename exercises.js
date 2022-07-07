// --------- Dãy Finbonanci -------------
console.log(" --------- Dãy Finbonanci -------------");
function fibonanci(n) {
    let first_item = 0;
    let second_item = 1;
    let next_item;
    for (let i = 0; i < n; i++) {
        if (i <= 1) next_item = i;
        else {
            next_item = first_item + second_item;
            first_item = second_item;
            second_item = next_item;
        }
        console.log(next_item);
    }
}
fibonanci(10);
// đệ quy
function fibonanci_recursion(i) {
    if (i < 0) {
        return -1;
    } else if (i == 0 || i == 1) return i;
    else {
        return fibonanci_recursion(i - 1) + fibonanci_recursion(i - 2);
    }
}
for (let i = 0; i < 10; i++) {
    console.log(fibonanci_recursion(i));
}

// --------- UCLN, BCNN -------------
//Ước chung lớn nhất của hai số nguyên a và b là số nguyên dương lớn nhất mà a và b chia hết.
//Bội số chung nhỏ nhất của hai số nguyên a và b là số nguyên dương nhỏ nhất chia hết cho cả a và b.
console.log(" --------- UCLN, BCNN -------------");
function UCLN(a, b) {
    //giải thuật Euclid
    var temp;
    while (b != 0) {
        temp = a % b;
        a = b;
        b = temp;
    }
    return a;

    // while (a !== b) {
    //     if (a > b) {
    //         a -= a - b;
    //     } else {
    //         b -= a;
    //     }
    // }
    // return a;
}

function BCNN(a, b) {
    return (a * b) / UCLN(a, b);
}

console.log(UCLN(40, 30));
console.log(BCNN(40, 30));
