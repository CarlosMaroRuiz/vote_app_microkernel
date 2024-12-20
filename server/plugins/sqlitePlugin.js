const Database = require('better-sqlite3');

class SQLitePlugin {
    constructor(databasePath = 'polls.db') {
        this.db = new Database(databasePath);


        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS polls (
                pollId TEXT PRIMARY KEY
            )
        `).run();

     
        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pollId TEXT,
                option TEXT NOT NULL,
                votes INTEGER DEFAULT 0,
                FOREIGN KEY (pollId) REFERENCES polls(pollId)
            )
        `).run();


        this.insertPollStmt = this.db.prepare(`
            INSERT OR IGNORE INTO polls (pollId)
            VALUES (@pollId)
        `);

        this.insertResultStmt = this.db.prepare(`
            INSERT INTO results (pollId, option, votes)
            VALUES (@pollId, @option, @votes)
        `);
    }

    processMessage(event, data) {
        if (event === 'save_results') {
            console.log("Guardando resultados:", data);

            const insertPoll = this.insertPollStmt;
            const insertResult = this.insertResultStmt;

            const transaction = this.db.transaction((pollData) => {
                // Insertar encuesta
                insertPoll.run({
                    pollId: pollData.pollId
                });

                // Insertar resultados
                for (const [option, votes] of Object.entries(pollData.results)) {
                    insertResult.run({
                        pollId: pollData.pollId,
                        option: option,
                        votes: votes
                    });
                }
            });

            try {
                transaction(data);
                console.log("Datos guardados exitosamente.");
            } catch (error) {
                console.error("Error al guardar los datos:", error);
            }
        }

        return null;
    }

  
    close() {
        this.db.close();
    }
}

module.exports = SQLitePlugin;
