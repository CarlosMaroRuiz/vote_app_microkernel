import PollStore from "../store/pollstore.js"
export function createPollElement(pollData) {
    const { pollId, title, options } = pollData;
    PollStore.addPoll(pollId, title, options);
    const pollsContainer = document.getElementById('polls');
    const pollElement = document.createElement('div');
    pollElement.className = 'bg-white shadow-2xl rounded-2xl p-6';
    pollElement.innerHTML = `
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">${pollData.title}</h3>
        <div class="space-y-3">
            ${pollData.options.map(option => `
                <button class="bg-indigo-500 text-white px-5 py-3 rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 vote-button w-full text-left transition" data-poll-id="${pollData.pollId}" data-option="${option}">
                    Votar por "${option}"
                </button>
            `).join('')}
        </div>
        <button class="bg-blue-600 text-white px-5 py-3 mt-6 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 result-button transition" data-poll-id="${pollData.pollId}">
            Ver Resultados
        </button>
        <button class="bg-green-600 text-white px-5 py-3 mt-3 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 save-results-button transition" data-poll-id="${pollData.pollId}">
            Guardar Resultados Finales
        </button>
        <div class="results mt-4 text-gray-700 hidden"></div>
    `;
    pollsContainer.prepend(pollElement);
}


export function updatePollResults(resultsData) {
    const { pollId, results } = resultsData;
    const pollsContainer = document.getElementById('polls');
    const pollElement = Array.from(pollsContainer.children).find(el => el.querySelector(`[data-poll-id="${pollId}"]`));

    if (pollElement) {
        const resultsElement = pollElement.querySelector('.results');
        resultsElement.innerHTML = `
            <h4 class="font-semibold text-lg mb-2">Resultados:</h4>
            <ul class="list-disc list-inside">
                ${Object.entries(results).map(([option, votes]) => `
                    <li>${option}: <span class="font-bold">${votes}</span> votos</li>
                `).join('')}
            </ul>
        `;
        resultsElement.classList.remove('hidden');
    }
}
