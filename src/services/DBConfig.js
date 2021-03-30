import Dexie from 'dexie';

const db = new Dexie('Pokemon');
db.version(1).stores({
  myPokemon: '++id, pokemon_id, name, image ',
});

export default db;
