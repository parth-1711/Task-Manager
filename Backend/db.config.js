import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()


AWS.config.update({
  region: "eu-north-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const db = new AWS.DynamoDB.DocumentClient();

const Table = "Tasks";

export { db, Table };
// module.exports={ db, Table };