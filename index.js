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

const users = process.env.USERS;
const usersArr = users.split(',');
// console.log(usersArr);

const text = 'SELECT COUNT(*) FROM transaction_hubs WHERE creator_fulfillment_id=$1'; // GROUP_BY creator_fulfillment_id';

for (let i = 0; i < usersArr.length; i++) {
  client.query(text, [usersArr[i]], (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(usersArr[i], res.rows[0].count);
      // console.log(res.rows[0].count);
    }
    client.end();
  });
}
