# shuttlepdf

📃 Smashingly simple, and scalable _("serverless")_ HTML to PDF conversions using Google Cloud Functions, and Puppeteer.


## Getting Started

### Prerequisites

- Ensure you have `gcloud` installed:
    - MacOS: `brew cask install google-cloud-sdk`
    - Others: https://cloud.google.com/sdk/gcloud
- Ensure you have authenticated with Google Cloud: `gcloud init`
- (Optional) Set your current working project: `gcloud config set project <project>`

### Deployment

1. Clone / download a copy of this repository
2. Remove `index.js`
3. Rename `for-cloud.js` to `index.js`
4. Run `./deploy.sh`
5. Enter yes for "Allow unauthenticated invocations of new function" (unless you want to expose your function privately, and in other ways)
6. Test it out! e.g. `https://<region>-<project>.cloudfunctions.net/pdfByURL?url=https://www.bbc.co.uk`

Update `deploy.sh` to suit your needs (e.g. higher timeouts, different region, more memory, etc).

### Performance (Cloud version)

It is worth mentioning that the average processing time for a standard web page (using the default `1024MB` set in `deploy.sh`) is between 5-15s.

This can potentially be improved by increasing the memory (as doing so will increase the CPU alongside it).

If you are dealing with lots of requests or if you require lower latencies, you may want to consider running a serverful converter, e.g. https://github.com/gotenberg/gotenberg

We also suggest pairing the serverful converter with a workflow engine like [Temporal](https://temporal.io/) if you have relatively complex processing pipelines or if you require strong guarantees (SLAs) around conversions.

### Docker container version

Please follow the instructions on page: https://hub.docker.com/r/yaroslav285/puppeter-pdf

In short:
Just use docker-compose template.

##### Known issues for Docker version:

Current version does not support paralled printing mechanism.

In other words:

You can't print two pages simultaneously. Just wait for completion first request.
