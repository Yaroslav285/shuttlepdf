const { URL } = require("url");
const puppeteer = require("puppeteer");
let page;

async function getBrowserPage() {
    const browser = await puppeteer.launch({
        args: [
            "--allow-running-insecure-content",
            "--disable-background-networking",
            "--disable-default-apps",
            "--disable-dev-shm-usage",
            "--disable-extensions",
            "--disable-gpu",
            "--disable-new-tab-first-run",
            "--disable-notifications",
            "--disable-sync",
            "--disable-translate",
            "--font-render-hinting=none",
            "--headless",
            "--hide-scrollbars",
            "--ignore-certificate-errors",
            "--metrics-recording-only",
            "--mute-audio",
            "--no-default-browser-check",
            "--no-first-run",
            "--no-sandbox",
            "--no-startup-window",
            "--no-zygote",
            "--safebrowsing-disable-auto-update",
        ],
    });
    return browser.newPage();
}

exports.pdfByURL = async (req, res) => {
    const acceptedMethods = ["GET", "POST"];
    if (acceptedMethods.indexOf(req.method.toUpperCase()) === -1) {
        return res
            .status(400)
            .send(
                `invalid HTTP method: ${req.method} (only GET or POST allowed)`
            );
    }

    let parsedUrl = null;
    try {
        parsedUrl = new URL(req.query.url);
    } catch (err) {
        return res.status(400).send(`invalid URL: ${req.query.url}`);
    }

    if (!page) {
        page = await getBrowserPage();
    }

    await page.goto(parsedUrl.toString());
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    const mediaType = req.query.mediaType || "screen";
    await page.emulateMediaType(mediaType);
    await page.waitFor(5000);

    await page.addStyleTag({
        content: '@page { size: auto; }',
    })

    const [width, height] = await page.evaluate(() => [
        document.documentElement.offsetWidth,
        document.documentElement.offsetHeight
    ]);

    const pdfBuffer = await page.pdf({
        printBackground: true,
        pageRanges: '1',
        height: +height + 1
    });

    res.set("Content-Type", "application/pdf");
    res.status(200).send(pdfBuffer);
};