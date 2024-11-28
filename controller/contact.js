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

const result = await db.query("SELECT $1::text as message", ["Hello world!"]);
console.log(result.rows[0]);

router.get("/", function (req, res) {
  console.log("GET request received");
  res.writeHead(200, { "Content-Type": "application/json" });
  var response = { response: "This is GET method." };
  console.log(response);
  res.end(JSON.stringify(response));
});

router.get("/:id", function (req, res) {
  console.log("GET /:id request received");
  res.writeHead(200, { "Content-Type": "application/json" });
  var response = {
    response: "This is GET method with id=" + req.params.id + ".",
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

router.post("/", jsonParser, function (req, res) {
  console.log("POST request received");
  console.log("Req");
  console.log(req.body);
  const contact = new Contact().createFromJSON(req.body);
  // console.log(contact.pretty());
  insertRecord(contact);
  res.writeHead(200, { "Content-Type": "application/json" });
  var response = { response: "This is POST method." };
  console.log(response);
  res.end(JSON.stringify(response));
});

router.put("/", function (req, res) {
  console.log("PUT request received");
  res.writeHead(200, { "Content-Type": "application/json" });
  var response = { response: "This is PUT method." };
  console.log(response);
  res.end(JSON.stringify(response));
});

router.delete("/", function (req, res) {
  console.log("DELETE request received");
  res.writeHead(200, { "Content-Type": "application/json" });
  var response = { response: "This is DELETE method." };
  console.log(response);
  res.end(JSON.stringify(response));
});

async function insertRecord(contact) {
  /*
  #firstName;
  #lastName;
  #middleName;
  #street1;
  #street2;
  #city;
  #province;
  #postalCode;
  #country;
  #title;
  #phone;
  #birthDate;
  #email;
  */
  let sqlString = [];
  let sqlValues = [];
  if (contact.firstName) {
    sqlString.push("firstName");
    sqlValues.push(contact.firstName);
  }
  if (contact.lastName) {
    sqlString.push("lastName");
    sqlValues.push(contact.lastName);
  }
  if (contact.middleName) {
    sqlString.push("middleName");
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
    sqlString.push("postalCode");
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
    sqlString.push("birthDate");
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
    "INSERT INTO contact(" +
    '"' +
    sqlString.join('","') +
    '") VALUES (' +
    values +
    ") RETURNING *";

  const res = await db.query(sqlFields, sqlValues);
}
