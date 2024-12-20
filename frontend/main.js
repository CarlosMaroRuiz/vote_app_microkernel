// main.js

import { socket } from './socket.js';
import { addOption, handleFormSubmit } from './handlers/formHandler.js';
import { createPollElement, updatePollResults } from './handlers/pollHandler.js';
import { setupSocketListeners } from './utils.js';
import PollStore from "./store/pollstore.js"

setupSocketListeners(createPollElement, updatePollResults);


document.addEventListener('click', (e) => {

    if (e.target.classList.contains('vote-button')) {
        const pollId = e.target.getAttribute('data-poll-id');
        const option = e.target.getAttribute('data-option');

        socket.emit('message', {
            event: 'vote',
            data: { pollId, option }
        });

        alert(`Votaste por: "${option}"`);
    }


    if (e.target.classList.contains('result-button')) {
        const pollId = e.target.getAttribute('data-poll-id');
        socket.emit('message', {
            event: 'get_results',
            data: { pollId }
        });
    }


    if (e.target.classList.contains('save-results-button')) {

        const pollId = e.target.getAttribute('data-poll-id');
        PollStore.saveResults(pollId);
        alert('Resultados finales guardados.');
        alert('Resultados finales guardados.');
    }
});
