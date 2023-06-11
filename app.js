const API_KEY = 'sk-hidden'
const submitBtn = document.getElementById('submit')
const output = document.getElementById('output')
const input = document.querySelector('input')
const history = document.querySelector('.history')
const buttonElement = document.querySelector

function changeInput(value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value
}

async function getMessage() {
    const options =  {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: input.value}],
            max_tokens: 100
        })

    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        output.textContent = data.choices[0].message.content
        if (data.choices[0].message.content && input.value) {
            const pElement = document.createElement('p')
            pElement.textContent = input.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            history.append(pElement)
        }
    } catch (error) {
        console.log(error)
    }
}

submitBtn.addEventListener('click', getMessage)

const clearInput = () => {
    input.textContent = ''
}

buttonElement.addEventListener('click', clearInput)
