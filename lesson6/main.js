var fibonacci = function(n) {
    var result = 0;
    if(n===0){
        result = 0;
    }
    if(n===1){
        result = 1;
    }
    return fibonacci(n-1)+fibonacci(n-2);
}
console.log('fibonacci(10)'+fibonacci(2));
/*
exports.fibonacci = fibonacci;

if(require.main===module){
    var n = 2;
    console.log('fibonacci('+n+'):'+fibonacci(n));
}*/
