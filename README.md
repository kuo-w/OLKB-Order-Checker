## OLKB Order Checker

A repository of component files to deploy a Google App Engine CRON that calls a Google Cloud Function that parses https://orders.olkb.com/ to find an order placement in queue and SMS text the result.

## Deployment

### Google Cloud Function

Use the editor to input main.js and set the required environment variables.

### Google App Engine

Use the Google SDK to run:

```
gcloud app deploy
gcloud app deploy cron.yaml
```

### Google Cloud Datastore

Set the Cloud Function URL in datastore.  
Read https://stackoverflow.com/a/35261091 for instructions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Valerii Iatsko for how to schedule a Cron using Google App Engine ([ Medium ](https://medium.com/google-cloud/google-cloud-functions-scheduling-cron-5657c2ae5212))

- Brandon Morelli for how to web scrape using Node.js ( [ Medium ](https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7))

- Martin Omander for code to read Google Cloud Datastore values ( [ Stackoverflow ](https://stackoverflow.com/a/35261091))
