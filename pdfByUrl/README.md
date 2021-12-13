# shuttlepdf

📃 Smashingly simple, and scalable _("serverless")_ HTML to PDF conversions using Azure Functions, and Puppeteer.

## Getting started:

Create your Azure function app.
Select your deployment strategy and configure pipelines for function deployment.
Referenced documentation:
https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-function-app-portal
https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=javascript

The function code is already prepared. Just deploy your code to function app.


### Deployment

1. Clone / download a copy of this repository
2. Deploy the codebase to azure functions with NodeJS v14 runtime.
3. Test it out! e.g. `https://<az-functions-domain>/api/pdfByURL?code=<azure_function_auth_code>url=https://www.bbc.co.uk`


### Performance

It is worth mentioning that the average processing time for a standard web page (using the default `1024MB`) is between 5-15s.

This can potentially be improved by increasing the memory (as doing so will increase the CPU alongside it).
