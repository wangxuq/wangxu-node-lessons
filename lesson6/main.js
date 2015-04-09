var fibonacci = function(n) {
    if(n===0){
        return 0;
    }
    if(n===1){
        return 1;
    }
    if(n>=2) {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

exports.fibonacci = fibonacci;

if(require.main === module){
    var n = Number(process.argv[2]);
    console.log('fibonacci('+n+'):'+fibonacci(n));
}

