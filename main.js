const inputPassword = document.querySelector('#password')
let passwordLenght = 16

function generatePassword() {
    const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789?!@&*()[]'

    let password = ''

    for (let i = 0; i < passwordLenght; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputPassword.value = password;
}

const passwordLenghtEl = document.querySelector('#password-lenght')

passwordLenghtEl.addEventListener('input', () => {
    passwordLenght = passwordLenghtEl.value
    generatePassword()
})

function copy() {
    navigator.clipboard.writeText(inputPassword.value)
}

const copyBtn = document.querySelector('#copy')
copyBtn.addEventListener('click', copy)
