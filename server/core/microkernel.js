const PluginManager = require('./pluginManager');
const PollManager = require('./pollManager');

class Microkernel {
    constructor() {
        this.pluginManager = new PluginManager();
        this.pollManager = new PollManager();
    }

    registerPlugin(plugin) {
        this.pluginManager.registerPlugin(plugin);
    }

    processMessage(event, data) {
        //Eventos bases del microkernel 
        console.log(event)
        if (event === 'create_poll') {
            return this.pollManager.createPoll(data);
        } else if (event === 'vote') {
            const { pollId, option } = data;
            return this.pollManager.vote(pollId, option);
        } else if (event === 'get_results') {
            return this.pollManager.getResults(data.pollId);
        }

        
        //Eventos personalizados o los plugins que se extiendan
        return this.pluginManager.processMessage(event, data);
    }
}

module.exports = Microkernel;
