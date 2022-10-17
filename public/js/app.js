
console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value
    messageone.textContent = 'loading...'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) return messageone.textContent = data.error
        messageone.textContent = data.forecast
        messagetwo.textContent = data.location
    })
})
})