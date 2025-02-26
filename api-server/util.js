function getMinNumber(num1, num2){
    if(isNaN(num1) || isNaN(num2)){
        return{
            status : 400,
            data:{
                error:`Both parameters should be numbers`,
            },
        };
    }
    return{
        status : 200,
        data: {mintest: Math.min(num1,num2)},
    };
}


function getMaxNumber(num3, num4, num5, num6, num7){
    if(isNaN(num3) || isNaN(num4) || isNaN(num5) || isNaN(num6) || isNaN(num7)){
        return{
            status: 400,
            data:{
                error: `All Parameters should be Numbers`
            },
        };
    }
    return{
        status: 200,
        data: {MaximumNumberis: Math.max(num3, num4, num5, num6, num7)},
    }
}

function getAvgNumber(numbers){

    var splitNum = numbers.split(",");
    const numbersArr = splitNum.map(
        numbers =>{
            return parseFloat(numbers);
        }
    )
    if(numbersArr.some(isNaN)){
        return{
            status: 400,
            data:{
                error: `All Parameters should be Numbers`
            },
        };
    }

    var sum = 0;
    numbersArr.forEach(number =>{
        sum = sum + parseInt(number);
    });

    var average = sum / numbersArr.length;
    return{
        status: 200,
        data: {AverageNumberis: average},
    }
}

function getSort(numbers,type){

    if(type !== 'asc' && type !== 'desc'){
        return{
            status: 400,
            data:{
                error: `Wrong type`
            },
        };
    }

    var splitValues = numbers.split(",");
    const valuesArr = splitValues.map(
        values =>{
            return values;
        }
    )
    var arrayLength = valuesArr.length;
    for(var i = 0; i < arrayLength; i++){

        for(var k = 0; k < arrayLength - i - 1; k++){
            if((type === 'asc' && valuesArr[k] > valuesArr[k+1] || type === 'desc' && valuesArr[k] < valuesArr[k+1])){
                [valuesArr[k], valuesArr[k+1]] = [valuesArr[k+1], valuesArr[k]];
            }
        }
    }

    return{
        status: 200,
        data: {Orderis: valuesArr},
    }
}

function getCount(numbers,search){

    var splitValues = numbers.split(",");
    const valuesArr = splitValues.map(
        values =>{
            return values;
        }
    )

    var count = 0;
    for(var a=0; a < valuesArr.length; a++){
        if(valuesArr[a] === search){
            count = count + 1;
        }
    }

    return{
        status: 200,
        data: {Countis: count},
    }
}

module.exports = { 
    getMinNumber, 
    getMaxNumber, 
    getAvgNumber, 
    getSort, 
    getCount 
};
