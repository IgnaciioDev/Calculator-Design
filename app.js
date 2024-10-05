'use strict'

let d = document
let nodeResult = d.querySelector('#result')
let nodeCalculation = d.querySelector('#calculation')

let firstNumber = ''
let secondNumber = ''
let operator
let lastOperator
let result = 0

let clicked = false


d.querySelectorAll('.operation').forEach( (element) => element.addEventListener('click', operate))

d.querySelectorAll('.number').forEach( (element) => element.addEventListener('click', getNumbers))

d.querySelector('#clear').addEventListener('click', function(){
    firstNumber = ''
    secondNumber = ''
    result = 0
    nodeResult.innerHTML = '0'
    nodeCalculation.innerHTML = ''
    clicked = false
})

d.querySelector('#equal').addEventListener('click', calculate)

d.querySelector('#point').addEventListener('click', getNumbers)


function operate(){
    operator = this.value

    if(clicked === false){

        if(secondNumber !== result){
            secondNumber = firstNumber
            firstNumber = ''
        }
        nodeResult.innerHTML += ' ' + this.value + ' ' 
        clicked = true
        lastOperator = operator

    } else if (firstNumber !== '' && secondNumber !== ''){

        calculate( 'continue' )
        nodeResult.innerHTML += ' ' + this.value + ' ' 
        lastOperator = operator

    } else {
        nodeResult.innerHTML = nodeResult.innerHTML.replace(lastOperator, operator)
        lastOperator = operator
    }
}

function getNumbers(){
    firstNumber += this.value
    if(nodeResult.innerHTML === '0' && this.value !== '.'){
        nodeResult.innerHTML = this.value
    } else {
        nodeResult.innerHTML += this.value
    }
}

function calculate( element ){
    console.log(firstNumber)
    console.log(secondNumber)

    if(firstNumber !== '' && secondNumber !== '' ){
        nodeCalculation.innerHTML = secondNumber + ' ' + operator + ' ' + firstNumber + ' ='

        firstNumber = +firstNumber
        secondNumber = +secondNumber

        if(operator === '+'){

            result = secondNumber + firstNumber

        } else if(operator === '-'){

            result = secondNumber - firstNumber

        } else if(operator === 'x'){

            result = secondNumber * firstNumber

        } else if(operator === '/'){

            result = secondNumber / firstNumber

        } else if(operator === '%'){

            result = (firstNumber / 100) * secondNumber

        }

        firstNumber = ''
        secondNumber = result
        nodeResult.innerHTML = Math.round(result * 10000000) / 10000000

        if(element !== 'continue'){
            clicked = false 
        }
    }
}


