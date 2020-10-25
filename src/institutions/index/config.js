const removeAccents = require("remove-accents");

module.exports = {
  idField: "id",
  fields: [
    "name",
    "ds",
    "address.street",
    "address.locality",
    "address.houseNo",
    "address.part",
    "address.postalCode",
  ],
  extractField: (document, fieldName) =>
    fieldName.split(".").reduce((doc, key) => doc && doc[key], document),
  processTerm: (term) => removeAccents(term).toLocaleLowerCase(),
  searchOptions: {
    prefix: true,
    fuzzy: (term) => (term.length > 3 ? 0.2 : null),
    boost: {
      name: 2,
    },
  },
};
