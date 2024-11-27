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
  console.log("createInsertSQL");
  createInsertSQL(contact);
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

// const text =
//   'INSERT INTO contact("firstName","lastName") VALUES($1, $2) RETURNING *';
// const values = ["pete", "letkeman"];

// const res = await db.query(text, values);
// console.log(res.rows[0]);

function createInsertSQL(contact) {
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
  sqlString = [];
  sqlValues = [];
  if (contact.firstName) {
    sqlString.push("firstName");
    sqlValues.push(contact.firstName);
  }
}
