const data = require("./index/data.json");
const index = require("./index/index.json");

const headers = require("../corsHeaders");
const options = require("./index/config");

const MiniSearch = require("minisearch");
const removeAccents = require("remove-accents");

const miniSearch = MiniSearch.loadJS(index, options);

module.exports.handle = async ({ queryStringParameters }) => {
  const query = queryStringParameters?.query;
  if (query == null) {
    return { statusCode: 200, body: JSON.stringify([]), headers };
  }
  const limit = queryStringParameters?.limit ?? 10;
  const result = miniSearch
    .search(removeAccents(query).toLocaleLowerCase())
    .slice(0, limit)
    .map((i) => ({ ...data[i.id], search: i }));
  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers,
  };
};
