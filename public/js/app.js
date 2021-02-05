const length = 4
const numbers = []
for (var i=0; i < length; i++);
{
    numbers.push(i + 1)
}

console.log(numbers)


const weathername = document.querySelector('form')
const locationname = document.querySelector('input')
const msg1 = document.querySelector("#msg1")
const msg2 = document.querySelector("#msg2")

weathername.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = locationname.value

    msg1.textContent = "Loading..."
    msg2.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                msg1.textContent = data.error 
            }
            else {
                msg1.textContent = data.forecast
                msg2.textContent = data.location
            }
        })
})
})
