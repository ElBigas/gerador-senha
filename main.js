const inputPassword = document.querySelector('#password')
const passwordLenghtText = document.querySelector('#password-lenght-text')
const alertEl = document.querySelector('.alert-box')
const upperCaseCheckEl = document.querySelector('#uppercase-check')
const numbersCheckEl = document.querySelector('#number-check')
const symbolCheckEl = document.querySelector('#symbol-check');
const securityIndicatorBar = document.querySelector('#security-indicator-bar');

let passwordLenght = 16

/* *** GENERATE PASSWORD *** 
*
* Função principal, ela quem gera a senha e chama a função de 'calculateQuality' e 'calculateFontSize'
*
*/ 

function generatePassword() {
    let chars = 'abcdefghjkmnpqrstuvwxyz'

    const upperCase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'

    const numbers = '123456789'

    const symbol = '?!@&*()[]'

    if (upperCaseCheckEl.checked) {
        chars += upperCase
    }

    if (numbersCheckEl.checked) {
        chars += numbers
    }

    if (symbolCheckEl.checked) {
        chars += symbol
    }

    let password = ''

    for (let i = 0; i < passwordLenght; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputPassword.value = password;
    passwordLenghtText.textContent = passwordLenght

    calculateQuality()
    calculateFontSize()
}

const passwordLenghtEl = document.querySelector('#password-lenght')

passwordLenghtEl.addEventListener('input', () => {
    passwordLenght = passwordLenghtEl.value
    generatePassword()
})

/* *** Calcula a qualidade *** */ 

function calculateQuality() {


    const percent = Math.round(
        (passwordLenght / 64) * 25 +
        (upperCaseCheckEl.checked ? 15 : 0) +
        (numbersCheckEl.checked ? 25 : 0) +
        (symbolCheckEl.checked ? 35 : 0)
    )

    securityIndicatorBar.style.width = `${percent}%`

    if (percent > 60) {
        securityIndicatorBar.classList.add('safe')
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.remove('critical')
    } else if (percent > 40) {
        securityIndicatorBar.classList.remove('safe')
        securityIndicatorBar.classList.add('warning')
        securityIndicatorBar.classList.remove('critical')
    } else {
        securityIndicatorBar.classList.remove('safe')
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.add('critical')
    }
}

/* *** Calcula o tamanho *** */ 

function calculateFontSize() {
    if (passwordLenght > 45) {
        inputPassword.classList.add('font-xxs')
        inputPassword.classList.remove('font-xs')
        inputPassword.classList.remove('font-sm')

    } else if (passwordLenght > 32) {
        inputPassword.classList.remove('font-xxs')
        inputPassword.classList.add('font-xs')
        inputPassword.classList.remove('font-sm')

    } else if (passwordLenght > 22) {
        inputPassword.classList.remove('font-xxs')
        inputPassword.classList.remove('font-xs')
        inputPassword.classList.add('font-sm')
    } else {
        inputPassword.classList.remove('font-xxs')
        inputPassword.classList.remove('font-xs')
        inputPassword.classList.remove('font-sm')
    }
}

/* *** Botão Copy *** */ 

let isClickable = true;

function copy() {
    navigator.clipboard.writeText(inputPassword.value)

    if (isClickable) {
        alertEl.style.display = "block";
        isClickable = false;

        setTimeout(() => {
            alertEl.style.display = "none";
            isClickable = true;
        }, 3000);
    }
}

const copyBtn = document.querySelectorAll('#copy')

copyBtn.forEach(e => {
    e.addEventListener('click', copy)
});

/* *** Botão Renew *** */ 

const renew = document.querySelector('#renew')

renew.addEventListener('click', generatePassword)

generatePassword()

upperCaseCheckEl.addEventListener('click', generatePassword)
numbersCheckEl.addEventListener('click', generatePassword)
symbolCheckEl.addEventListener('click', generatePassword)
