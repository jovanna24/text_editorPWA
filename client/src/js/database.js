import { openDB } from 'idb';

const initdb = async () =>
  // creating a new db named 'jate', will be using version 1 of the db
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // create connection to db and version we want to use
  const db = await openDB('jate', 1); 
  // create a new transaction and specify the db and data privs
  const tx = db.transaction('jate', 'readwrite');
  // open the desire object store 
  const store = tx.objectStore('jate');
  // add content to object store
  const request = store.put({ content, id: 1 });
  // confirmation of request
  const result = await request;
  console.log('Added content to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // create a connection to db and version 
  const db = await openDB('jate', 1); 
  // create a new transaction and specify the db and data privs 
  const tx = db.transaction('jate', 'readwrite');
  // open desired object to store 
  const store = tx.objectStore('jate');
  // get all content from object store 
  const request = store.get(1);
  // get confirmation 
  const result = await request; 
  console.log('result.value', result); 
  return result;
};


// initializes the database
initdb();
