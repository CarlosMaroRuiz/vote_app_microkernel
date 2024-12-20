const SQLitePlugin = require('../plugins/sqlitePlugin');
const AnalyticsPlugin = require('../plugins/analyticsPlugin');

class ConfigPlugin {
    constructor(kernel) {
        this.kernel = kernel; // Inyectable del Microkernel
    }

    registerPlugin() {
        // Instancia los plugins
        const sqlitePlugin = new SQLitePlugin();
        const analyticsPlugin = new AnalyticsPlugin();

        this.kernel.registerPlugin(sqlitePlugin);
        this.kernel.registerPlugin(analyticsPlugin);

        console.log('Plugins registrados con exito.');
    }
}

module.exports = ConfigPlugin;
