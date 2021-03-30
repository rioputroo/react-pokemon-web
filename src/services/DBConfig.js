import Dexie from 'dexie';

const db = new Dexie('Pokemon');
db.version(3).stores({
  myPokemon: '++id, random_id, pokemon_id, name, image ',
});

export default db;
