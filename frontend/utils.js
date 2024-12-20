import { socket } from './socket.js';

export function clearForm(form, optionsContainer) {
    form.reset();
    const additionalOptions = optionsContainer.querySelectorAll('.flex.items-center.space-x-3.mb-4');
    additionalOptions.forEach(option => option.remove());
}


export function setupSocketListeners(handleNewPoll, handlePollResults) {
    socket.on('update', (response) => {

        if (response.error) {
            alert(`Error: ${response.error}`);
            return;
        }

        if (response.pollId && response.options) {

            handleNewPoll({
                pollId: response.pollId,
                title: response.title,
                options: response.options
            });
        }
        
        
        if (response.results) {
            handlePollResults({
                pollId: response.pollId,
                results: response.results
            });
        }
    });
}
