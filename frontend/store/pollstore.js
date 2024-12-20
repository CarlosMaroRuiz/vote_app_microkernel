import { socket } from '../socket.js';

class PollStore {
    constructor() {
        if (PollStore.instance) {
            return PollStore.instance;
        }

        this.polls = {};      // { pollId: { title: '', options: [] } }
        this.results = {};    // { pollId: { option1: votes, option2: votes, ... } }

        PollStore.instance = this;
    }


    addPoll(pollId, title, options) {
        if (!this.polls[pollId]) {
            this.polls[pollId] = { title, options };
            this.results[pollId] = {};
            options.forEach(option => {
                this.results[pollId][option] = 0;
            });
        }
    }


    getPoll(pollId) {
        return this.polls[pollId] || null;
    }


    vote(pollId, option) {
        if (this.results[pollId] && this.results[pollId][option] !== undefined) {
            this.results[pollId][option] += 1;
        } else {
            console.warn(`La opción "${option}" no existe en la encuesta con ID "${pollId}".`);
        }
    }


    getResults(pollId) {
        return this.results[pollId] || null;
    }


    getAllPolls() {
        return this.polls;
    }


    getAllResults() {
        return this.results;
    }


    getAllPollData() {
        return {
            polls: this.getAllPolls(),
            results: this.getAllResults()
        };
    }

    sendAllPollData() {
        const allData = this.getAllPollData();
        socket.emit('message', {
            event: 'send_all_polls',
            data: allData
        });
    }





    saveResults(pollId) {
        const results = this.getResults(pollId);
        if (results) {
            socket.emit('message', {
                event: 'save_results',
                data: { pollId, results }
            });
        } else {
            console.warn(`No hay resultados para la encuesta con ID "${pollId}".`);
        }
    }



}

const instance = new PollStore();
Object.freeze(instance);

export default instance;
