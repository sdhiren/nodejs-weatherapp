console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                messageThree.textContent = ''
                messageFour.textContent = ''
            } else {
                messageOne.textContent = data.address
                messageTwo.textContent = data.forecast
                messageThree.textContent = 'Longitude :' + data.longitude
                messageFour.textContent = 'Lattitude :' + data.lattitude
            }
        })
    })
})