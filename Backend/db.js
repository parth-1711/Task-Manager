// const { db, Table } = require("./db.config.js");
import {db, Table} from './db.config.js'

// Create or Update users
const createOrUpdate = async (data = {}) => {
  const params = {
    TableName: Table,
    Item: data,
  };

  try {
    await db.put(params).promise();
    return { success: true };
  } catch (error) {
    // console.log(error);
    return { success: false };
  }
};

// Read all users
const readAllTasks = async () => {
  const params = {
    TableName: Table,
  };

  try {
    const { Items = [] } = await db.scan(params).promise();
    // console.log(Items);
    return { success: true, data: Items };
  } catch (error) {
    return { success: false, data: null };
  }
};

// Read Users by ID
const getTasksById = async (value, key = "id") => {
  const params = {
    TableName: Table,
    Key: {
      [key]: value,
    },
  };
  try {
    const { Item = {} } = await db.get(params).promise();
    return { success: true, data: Item };
  } catch (error) {
    return { success: false, data: null };
  }
};

// Delete User by ID
const deleteTasksById = async (value, key = "id") => {
  const params = {
    TableName: Table,
    Key: {
      [key]: value,
    },
  };
  // console.log(params);

  try {
    await db.delete(params).promise();
    return { success: true };
  } catch (error) {
    // console.log(error);
    return { success: false };
  }
};

export { createOrUpdate, readAllTasks, getTasksById, deleteTasksById };
// module.exports={ createOrUpdate, readAllTasks, getTasksById, deleteTasksById };