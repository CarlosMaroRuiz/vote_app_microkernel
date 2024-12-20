class PluginManager {
    constructor() {
        this.plugins = [];
    }

    registerPlugin(plugin) {
        this.plugins.push(plugin);
    }

    processMessage(event, data) {
        for (const plugin of this.plugins) {
            const response = plugin.processMessage(event, data);
            if (response) return response; 
        }
        return null;
    }
}

module.exports = PluginManager;
