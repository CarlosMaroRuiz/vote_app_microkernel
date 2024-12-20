class PollManager {
    constructor() {
        this.polls = {};
        this.results = {}; 
    }

    createPoll({ title, options }) {
        const pollId = Date.now().toString(); 
        this.polls[pollId] = { title, options };
        this.results[pollId] = options.reduce((acc, option) => {
            acc[option.toLowerCase()] = 0; 
            return acc;
        }, {});
        return { pollId, title, options }; 
    }

    vote(pollId, option) {
        if (!this.results[pollId]) {
            return { error: 'Encuesta no encontrada' }; 
        }

        const normalizedOption = option.toLowerCase(); 
        if (!this.results[pollId].hasOwnProperty(normalizedOption)) {
            return { error: 'Opción no válida' }; 
        }

        this.results[pollId][normalizedOption]++; 
        return { pollId, results: this.results[pollId] }; 
    }


    getResults(pollId) {
        if (!this.results[pollId]) {
            return { error: 'Encuesta no encontrada' }; 
        }

        return { pollId, results: this.results[pollId] }; 
    }
}

module.exports = PollManager;
