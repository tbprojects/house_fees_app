# House Fees App

This app allows summarizing monthly house fees (like water, energy, heating) and presents them in the nice chart.

* data records are stored in indexDB
* data records can be synced to house_fees_api
* app support following languages
  * en - http://domoweoplaty.pl/en
  * pl - http://domoweoplaty.pl/pl

## Setup

```bash
$ npm ci
```

## Running the app

```bash
# serve locally
$ ng serve

# build for production
$ ng build
```

### Techstack

* Angular Core / Material / i18n
* Chart.js
* Dexie
* date-fns
* qrious
