class Contact {
  #contactId;
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

  set contactId(contactId) {
    this.#contactId = contactId;
  }

  get contactId() {
    return this.#contactId;
  }

  set firstName(firstName) {
    this.#firstName = firstName;
  }

  get firstName() {
    return this.#firstName;
  }

  set lastName(lastName) {
    this.#lastName = lastName;
  }

  get lastName() {
    return this.#lastName;
  }

  set middleName(middleName) {
    this.#middleName = middleName;
  }

  get middleName() {
    return this.#middleName;
  }

  set street1(street1) {
    this.#street1 = street1;
  }

  get street1() {
    return this.#street1;
  }

  set street2(street2) {
    this.#street2 = street2;
  }

  get street2() {
    return this.#street2;
  }

  set city(city) {
    this.#city = city;
  }

  get city() {
    return this.#city;
  }

  set province(province) {
    this.#province = province;
  }

  get province() {
    return this.#province;
  }

  set postalCode(postalCode) {
    this.#postalCode = postalCode;
  }

  get postalCode() {
    return this.#postalCode;
  }

  set country(country) {
    this.#country = country;
  }

  get country() {
    return this.#country;
  }

  set title(title) {
    this.#title = title;
  }

  get title() {
    return this.#title;
  }

  set phone(phone) {
    this.#phone = phone;
  }

  get phone() {
    return this.#phone;
  }

  set birthDate(birthDate) {
    this.#birthDate = birthDate;
  }

  get birthDate() {
    return this.#birthDate;
  }

  set email(email) {
    this.#email = email;
  }

  get email() {
    return this.#email;
  }

  createFromJSON = function (body) {
    if (!body) {
      return new Contact();
    }
    let contact = new Contact();
    contact.contactId = body.contactId ? body.contactId : null;
    contact.firstName = body.firstName ? body.firstName : null;
    contact.lastName = body.lastName ? body.lastName : null;
    contact.middleName = body.middleName ? body.middleName : null;
    contact.street1 = body.street1 ? body.street1 : null;
    contact.street2 = body.street2 ? body.street2 : null;
    contact.city = body.city ? body.city : null;
    contact.province = body.province ? body.province : null;
    contact.postalCode = body.postalCode ? body.postalCode : null;
    contact.country = body.country ? body.country : null;
    contact.title = body.title ? body.title : null;
    contact.phone = body.phone ? body.phone : null;
    contact.birthDate = body.birthDate ? body.birthDate : null;
    contact.email = body.email ? body.email : null;
    return contact;
  };

  pretty = function () {
    let str =
      '{"contact": {"contactId" : "' +
      this.contactId +
      '", "firstName" : "' +
      this.firstName +
      '", "lastName" : "' +
      this.lastName +
      '", "middleName" : "' +
      this.middleName +
      '",  "street1" : "' +
      this.street1 +
      '", "street2" : "' +
      this.street2 +
      '", "city" : "' +
      this.city +
      '", "province" : "' +
      this.province +
      '", "postalCode" : "' +
      this.postalCode +
      '", "country" : "' +
      this.country +
      '", "title" : "' +
      this.title +
      '", "phone" : "' +
      this.phone +
      '", "birthDate" : "' +
      this.birthDate +
      '", "email" : "' +
      this.email +
      '"}}';
    return JSON.parse(str.replaceAll(null, "null"));
  };
}

export default Contact;

/*
-- Table: contact


CREATE TABLE IF NOT EXISTS contact
(
    contactid integer NOT NULL DEFAULT nextval('contact_contactid_seq'::regclass),
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
    email character varying(250),
    CONSTRAINT contact_pkey PRIMARY KEY (contactid)
)

  */
