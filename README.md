## Backend service for info106.cz

### Methods

#### Search institution

##### Request

``` GET https://{url}/institutions?query=kacelar+prezidenta+republiky&limit=5```

##### Response

```json
[
  {
    "id": 1353,
    "name": "Kancelář prezidenta republiky",
    "address": {
      "street": "Hrad I. nádvoří",
      "locality": "Praha 1",
      "houseNo": "1",
      "part": "Hradčany",
      "postalCode": "11900",
      "region": "Hlavní město Praha"
    },
    "detail": "https://www.czechpoint.cz/spravadat/p/ovm/datafile?format=xml&service=seznamovm&id=KPrzdentaR",
    "ds": "9hjaihw",
    "search": {
      "id": 1353,
      "terms": [
        "kancelar",
        "prezidenta",
        "republiky"
      ],
      "score": 707.4399070253285,
      "match": {
        "kancelar": [
          "name"
        ],
        "prezidenta": [
          "name"
        ],
        "republiky": [
          "name"
        ]
      }
    }
  }
]

```

