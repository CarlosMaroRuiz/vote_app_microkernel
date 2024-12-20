

import { socket } from '../socket.js';
import { clearForm } from '../utils.js';

const createPollForm = document.getElementById('createPollForm');
const optionsContainer = document.getElementById('optionsContainer');
const addOptionButton = document.getElementById('addOption');
export function addOption() {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'flex items-center space-x-3 mb-4';
    optionDiv.innerHTML = `
        <input type="text" class="option-input flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Opción">
        <button type="button" class="remove-option bg-red-600 text-white px-4 py-3 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition">-</button>
    `;
    optionsContainer.appendChild(optionDiv);


    optionDiv.querySelector('.remove-option').addEventListener('click', () => {
        optionDiv.remove();
    });
}

export function handleFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const options = Array.from(document.querySelectorAll('.option-input'))
        .map(input => input.value.trim())
        .filter(value => value);

    if (title && options.length > 0) {
        socket.emit('message', {
            event: 'create_poll',
            data: { title, options }
        });
        clearForm(createPollForm, optionsContainer);
    } else {
        alert('Por favor, ingresa un título y al menos una opción.');
    }
}


addOptionButton.addEventListener('click', addOption);
createPollForm.addEventListener('submit', handleFormSubmit);
