import './build.css';

const form = document.querySelector('form');
const textarea = document.querySelector('textarea');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    showSpinner();

    const data = new FormData(form);

    const response = await fetch('http://localhost:8080/dream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        }),
    });

    if (response.ok) {
        const { image } = await response.json();
    
        const result = document.querySelector('#result');
        result.innerHTML = `<img src="${image}" class="border-solid border-2 border-stone-100" width="512" />`;
    
        textarea.value = '';
    } else {
        const error = await response.text();
        alert(error);
        console.log(error);
    }

    hideSpinner();
});

function showSpinner() {
    const button = document.querySelector('button');
    button.disabled = true;
    button.innerHTML = "He's thinking... <span class='spinner'>👨‍💻</span>"
};

function hideSpinner() {
    const button = document.querySelector('button');
    button.disabled = false;
    button.innerHTML = "Send to the robot!"
};