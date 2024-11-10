const games = require("../data/games.json");
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.sql(`INSERT INTO games (name, code, image_id, image_url, min_player)
 VALUES
     ('Mobile Legend: Bang Bang', 'MLBB', '66bcc13de375273f60e25694', 'https://ik.imagekit.io/d2jwx074f/game-image/ml.jpg?updatedAt=1723646357523', 5),
     ('Honor of Kings', 'HOK', '66bd5132e375273f6083dadd', 'https://ik.imagekit.io/d2jwx074f/game-image/HOK-2.jpg?updatedAt=1723683122194', 5),
     ('Player Unknowns BattleGrounds', 'PUBG', '66bd5256e375273f608693f6', 'https://ik.imagekit.io/d2jwx074f/game-image/pubg.jpeg?updatedAt=1723683478402', 4),
     ('Clash of Clans', 'COC', '66bd5369e375273f608bcade', 'https://ik.imagekit.io/d2jwx074f/game-image/clash-of-clans.jpg?updatedAt=1723683702126', 10),
     ('Clash Royale', 'CRA', '66bd530ce375273f60892924', 'https://ik.imagekit.io/d2jwx074f/game-image/clash-royale.jpg?updatedAt=1723683597068', 10),
     ('Call of Duty: Modern Warfare', 'CODMW', '66bd53f4e375273f608ce2e4', 'https://ik.imagekit.io/d2jwx074f/game-image/cod-warfare.jpg?updatedAt=1723683828563', 5),
     ('Candy Crush Saga', 'CCS', '66bd549be375273f608e9aca', 'https://ik.imagekit.io/d2jwx074f/game-image/candy-crush.png?updatedAt=1723683995282', 1),
     ('Call of Duty Mobile', 'CODM', '66bd54dde375273f608f8a62', 'https://ik.imagekit.io/d2jwx074f/game-image/codm.jpg?updatedAt=1723684061253', 5),
     ('Valorant', 'Valo', '66bcbfbde375273f60d9afac', 'https://ik.imagekit.io/d2jwx074f/game-image/valo.jpg?updatedAt=1723645885950', 5),
     ('League of Legends', 'LoL', '66bd5568e375273f6098b6f0', 'https://ik.imagekit.io/d2jwx074f/game-image/league-of-legends.jpg?updatedAt=1723684223945', 5),
     ('Wildrift', 'WR', '66bd55c2e375273f609a807a', 'https://ik.imagekit.io/d2jwx074f/game-image/wild-rift.png?updatedAt=1723684291511', 5),
     ('Dota 2', 'Dota', '66bd5603e375273f609af9f2', 'https://ik.imagekit.io/d2jwx074f/game-image/dota-2.jpg?updatedAt=1723684355911', 5),
     ('Fortnite', 'Fn', '66bd56b1e375273f609c5b40', 'https://ik.imagekit.io/d2jwx074f/game-image/Fortnite.jpg?updatedAt=1723684529590', 4),
     ('Genshin Impact', 'Genshin', '66bd5705e375273f609d3a46', 'https://ik.imagekit.io/d2jwx074f/game-image/genshin-impact.png?updatedAt=1723684613393', 1),
     ('Among Us', 'AMONGUS', '66bd574de375273f609e8527', 'https://ik.imagekit.io/d2jwx074f/game-image/among-us.jpg?updatedAt=1723684685878', 8),
     ('Minecraft', 'MC', '66bd57ace375273f609fef5f', 'https://ik.imagekit.io/d2jwx074f/game-image/minecraft.png?updatedAt=1723684780372', 1);
 `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(
    `DELETE FROM games WHERE code IN (${games
      .map(({ code }) => `'${code}'`)
      .join(", ")});`
  );
};
