require('dotenv').config();

const { Pool, Client } = require('pg');

const OPTIONS = {
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PW,
  port: 5432,
};

const client = new Client(OPTIONS);
const pool = new Pool(OPTIONS);

// console.log('>>>> client', client);

client.connect();

const text = 'SELECT COUNT(*) FROM transaction_hubs WHERE creator_fulfillment_id=$1'; // GROUP_BY creator_fulfillment_id';
const values = ['1709055'];

client.query(text, values, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res.rows[0].count);
  }
  client.end();
});
