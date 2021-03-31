import Dexie from 'dexie';

const db = new Dexie('Pokemon');
db.version(5).stores({
  myPokemon: '++id, random_id, pokemon_id, name, image, nickname',
});

export default db;
