import Dexie from 'dexie';

const db = new Dexie('Pokemon');
db.version(1).stores({
  myPokemon: '++id, name',
});

export default db;
