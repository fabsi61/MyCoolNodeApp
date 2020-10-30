// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/lessons.db3'
    },
    pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
      }
  }
}
};

//db heisst lessons und hat 2 table einmal lessons und einmal messages