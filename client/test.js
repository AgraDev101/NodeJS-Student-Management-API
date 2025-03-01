// SPREAD operator, REST operator

function multiply(num, ...numbers) {
    let result = numbers.map((n) => {
        return n * num
    })
    return result
}

console.log(multiply(4, 1, 2, 3, 4))




