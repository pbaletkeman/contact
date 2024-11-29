import Router from "express-promise-router";
import bodyParser from "body-parser";

import * as db from "../db/index.js";
import Contact from "../models/contact.js";

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
export default router;

// create application/json parser
var jsonParser = bodyParser.json();

// const result = await db.query("SELECT $1::text as message", ["Hello world!"]);
// console.log(result.rows[0]);

const TABLE_NAME = "contact123";

await initTable();

// await seedTable();

router.get("/sorted/:sortField?/:direction?", async function (req, res) {
  console.log("GET request received");
  res.writeHead(200, { "Content-Type": "application/json" });
  const rows = await getRecords(
    null,
    req.params["sortField"],
    req.params["direction"]
  );
  res.end(JSON.stringify(rows));
});

router.get("/:ids?/:sortField?/:direction?", async function (req, res) {
  console.log("GET request received");
  res.writeHead(200, { "Content-Type": "application/json" });
  const rows = await getRecords(
    req.params["ids"],
    req.params["sortField"],
    req.params["direction"]
  );
  res.end(JSON.stringify(rows));
});

router.get("/:id", async function (req, res) {
  console.log("GET /:id request received");
  res.writeHead(200, { "Content-Type": "application/json" });
  // res.end(req.params["id"]);
  const row = await getRecord(req.params["id"]);
  res.end(JSON.stringify(row));
});

router.post("/", jsonParser, async function (req, res) {
  // console.log("POST request received");
  // console.log("Req");
  // console.log(req.body);
  const contact = new Contact().createFromJSON(req.body);
  // console.log(contact.pretty());
  const inserted = await insertRecord(contact);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(inserted));
});

router.put("/", jsonParser, async function (req, res) {
  const contact = new Contact().createFromJSON(req.body);
  const updated = await updateRecord(contact);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(updated));
});

router.delete("/:ids", async function (req, res) {
  console.log("DELETE request received");
  res.writeHead(200, { "Content-Type": "application/json" });
  const row = await deleteRecords(req.params["ids"]);
  res.end(JSON.stringify(row));
});

async function deleteRecords(ids) {
  const sqlString =
    `DELETE FROM ${TABLE_NAME} WHERE "contactid" in (` + ids + `)`;
  const res = await db.query(sqlString);
  return res.rows;
}

async function getRecord(id) {
  return await getRecords(id, null, null);
}

async function getRecords(ids, sortField, sortDirection) {
  let sqlString = `SELECT "contactid", "firstname", "lastname", "middlename", "street1", "street2", "city", "province", "postalcode", "country", "title", "phone", "birthdate", "email" FROM ${TABLE_NAME} WHERE 1=1 `;
  if (ids) {
    sqlString += ` AND "contactid" in (` + ids + ") ";
  }
  if (sortField) {
    sqlString += ` ORDER BY "` + sortField + `" `;
  }
  if (sortDirection) {
    sqlString += sortDirection;
  }
  const res = await db.query(sqlString);
  return res.rows;
}

async function updateRecord(contact) {
  let sqlString = `UPDATE ${TABLE_NAME} set `;
  let sqlValues = [];
  let i = 0;
  if (contact.firstName) {
    i++;
    sqlString += `"firstname" = $` + i + `,`;
    sqlValues.push(contact.firstName);
  }
  if (contact.lastName) {
    i++;
    sqlString += `"lastname" = $` + i + `,`;
    sqlValues.push(contact.lastName);
  }
  if (contact.middleName) {
    i++;
    sqlString += `"middlename" = $` + i + `,`;
    sqlValues.push(contact.middleName);
  }
  if (contact.street1) {
    i++;
    sqlString += `"street1" = $` + i + `,`;
    sqlValues.push(contact.street1);
  }
  if (contact.street2) {
    i++;
    sqlString += `"street2" = $` + i + `,`;
    sqlValues.push(contact.street2);
  }
  if (contact.city) {
    i++;
    sqlString += `"city" = $` + i + `,`;
    sqlValues.push(contact.city);
  }
  if (contact.province) {
    i++;
    sqlString += `"province" = $` + i + `,`;
    sqlValues.push(contact.province);
  }
  if (contact.postalCode) {
    i++;
    sqlString += `"postalcode" = $` + i + `,`;
    sqlValues.push(contact.postalCode);
  }
  if (contact.country) {
    i++;
    sqlString += `"country" = $` + i + `,`;
    sqlValues.push(contact.country);
  }
  if (contact.title) {
    i++;
    sqlString += `"title" = $` + i + `,`;
    sqlValues.push(contact.title);
  }
  if (contact.phone) {
    i++;
    sqlString += `"phone" = $` + i + `,`;
    sqlValues.push(contact.phone);
  }
  if (contact.birthDate) {
    i++;
    sqlString += `"birthdate" = $` + i + `,`;
    sqlValues.push(contact.birthDate);
  }
  if (contact.email) {
    i++;
    sqlString += `"email" = $` + i + `,`;
    sqlValues.push(contact.email);
  }
  i++;
  sqlString =
    sqlString.substring(0, sqlString.length - 1) +
    ` WHERE contactId = $` +
    i +
    ` RETURNING * `;
  sqlValues.push(contact.contactId);
  const res = await db.query(sqlString, sqlValues, contact.contactId);
  return res.rows;
}

async function insertRecord(contact) {
  let sqlString = [];
  let sqlValues = [];
  if (contact.firstName) {
    sqlString.push("firstname");
    sqlValues.push(contact.firstName);
  }
  if (contact.lastName) {
    sqlString.push("lastname");
    sqlValues.push(contact.lastName);
  }
  if (contact.middleName) {
    sqlString.push("middlename");
    sqlValues.push(contact.middleName);
  }
  if (contact.street1) {
    sqlString.push("street1");
    sqlValues.push(contact.street1);
  }
  if (contact.street2) {
    sqlString.push("street2");
    sqlValues.push(contact.street2);
  }
  if (contact.city) {
    sqlString.push("city");
    sqlValues.push(contact.city);
  }
  if (contact.province) {
    sqlString.push("province");
    sqlValues.push(contact.province);
  }
  if (contact.postalCode) {
    sqlString.push("postalcode");
    sqlValues.push(contact.postalCode);
  }
  if (contact.country) {
    sqlString.push("country");
    sqlValues.push(contact.country);
  }
  if (contact.title) {
    sqlString.push("title");
    sqlValues.push(contact.title);
  }
  if (contact.phone) {
    sqlString.push("phone");
    sqlValues.push(contact.phone);
  }
  if (contact.birthDate) {
    sqlString.push("birthdate");
    sqlValues.push(contact.birthDate);
  }
  if (contact.email) {
    sqlString.push("email");
    sqlValues.push(contact.email);
  }
  let values = "";
  for (let i = 1; i <= sqlValues.length; i++) {
    values += "$" + i + ", ";
  }
  values = values.substring(0, values.length - 2);
  const sqlFields =
    `INSERT INTO ${TABLE_NAME} (` +
    `"` +
    sqlString.join('","') +
    `") VALUES (` +
    values +
    `) RETURNING * `;

  const res = await db.query(sqlFields, sqlValues);
  return res.rows;
}

async function initTable() {
  const sqlString = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
  (
      contactid SERIAL PRIMARY KEY,
      birthDate timestamp without time zone,
      title character(4),
      province character(5),
      country character(6),
      phone character(10),
      postalCode character varying(15),
      firstName character varying(50),
      lastName character varying(50),
      middleName character varying(50),
      street1 character varying(150),
      street2 character varying(150),
      city character varying(100),
      email character varying(250)
  )`;
  const res = await db.query(sqlString);
  return res.rows;
}

async function seedTable() {
  for (let i = 0; i < 10; i++) {
    const sqlString = `INSERT INTO ${TABLE_NAME} ("firstname", "lastname", "middlename", "street1", "street2", "city", "province", "postalcode", "country", "title", "phone", "birthdate", "email")
    VALUES ('firstName${i}', 'lastName${i}', 'middleName${i}', 'street1${i}', 'street2${i}', 'city${i}', 'pr${i}', 'postalCode${i}', 'count${i}', 'mr${i}', 'phone${i}', '2024-12-01', 'email${i}');`;
    // console.log(sqlString);
    const res = await db.query(sqlString);
  }
}
