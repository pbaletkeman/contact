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
    this.contactId = contactId;
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
}

/*
-- Table: public.contact

-- DROP TABLE IF EXISTS public.contact;

CREATE TABLE IF NOT EXISTS public.contact
(
	contactid integer NOT NULL DEFAULT nextval('contact_contactid_seq'::regclass),
    "firstName" character varying(50) COLLATE pg_catalog."default",
    "lastName" character varying(50) COLLATE pg_catalog."default",
    "middleName" character varying(50) COLLATE pg_catalog."default",
    street1 character varying(150) COLLATE pg_catalog."default",
    street2 character varying(150) COLLATE pg_catalog."default",
    city character varying(100) COLLATE pg_catalog."default",
    province character(5) COLLATE pg_catalog."default",
    "postalCode" character varying(15) COLLATE pg_catalog."default",
    country character(6) COLLATE pg_catalog."default",
    title character(4) COLLATE pg_catalog."default",
    phone character(10) COLLATE pg_catalog."default",
    "birthDate" date,
    "email" character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT contact_pkey PRIMARY KEY (contactid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.contact
    OWNER to pete;
*/
