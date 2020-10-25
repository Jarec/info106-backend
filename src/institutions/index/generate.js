const fs = require("fs");
const path = require("path");

const axios = require("axios");
const MiniSearch = require("minisearch");
const xml2js = require("xml2js");

const options = require("./config");

const url =
  "https://www.czechpoint.cz/spravadat/ovm/datafile.do?format=xml&service=seznamovm";

function mapHouseNo(domovni, orientacni, evidencni) {
  return [domovni, orientacni, evidencni].filter((i) => i).join("/");
}

function mapAddress(address) {
  if (address == null) {
    return null;
  }
  const {
    UliceNazev: street,
    ObecNazev: locality,
    CisloDomovni: domovni,
    CisloOrientacni: orientacni,
    CisloEvidencni: evidencni,
    CastObceNeboKatastralniUzemi: part,
    PSC: postalCode,
    KrajNazev: region,
  } = address;
  return {
    street,
    locality,
    houseNo: mapHouseNo(domovni, orientacni, evidencni),
    part,
    postalCode,
    region,
  };
}

async function loadDataList() {
  const { data } = await axios.get(url);
  const parser = new xml2js.Parser({
    trim: true,
    emptyTag: null,
    explicitArray: false,
  });
  let parsed = await parser.parseStringPromise(data);
  const {
    SeznamOvmIndex: { Subjekt: list },
  } = parsed;
  return list.map(
    (
      { AdresaUradu: address, Nazev: name, DetailSubjektu: detail, IdDS: ds },
      index
    ) => ({
      id: index,
      name,
      address: mapAddress(address),
      detail,
      ds,
    })
  );
}

loadDataList().then((list) => {
  const miniSearch = new MiniSearch(options);
  miniSearch.addAll(list);

  fs.writeFileSync(
    path.resolve(__dirname, "index.json"),
    JSON.stringify(miniSearch)
  );
  fs.writeFileSync(path.resolve(__dirname, "data.json"), JSON.stringify(list));
});
