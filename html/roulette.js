L=[0, 34, 10, 21, 28, 4, 18, 9, 27, 22, 12, 3, 17, 20, 11, 33, 2, 10, 32, 0o0, 15, 8, 25, 1, 31, 20, 14, 30, 7, 24, 29, 35, 6, 13, 23, 19, 5, 36];

function randomNumber(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let r = randomNumber(0,37);

console.log(L[r]);

if((r + 1) % 2 === 0)
{
    console.log("rouge");
}
else
{
    console.log("noir");
}

if(L[r] % 2 === 0 || L[r] === 0o0)
{
    console.log("pair");
}
else
{
    console.log("impair");
}
if(L[r] > 18 || L[r] === 0o0)
{
    console.log("passe")
}
else
{
    console.log("manque")
}