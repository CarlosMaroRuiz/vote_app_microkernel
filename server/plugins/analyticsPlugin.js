class AnalyticsPlugin {
    processMessage(event, data) {
        if (event === 'analyze') {
            const { pollId, results } = data;
            const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);
            return { pollId, totalVotes };
        }
        return null;
    }
}

module.exports = AnalyticsPlugin;
