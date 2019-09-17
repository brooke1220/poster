const Puppeteer = require('../libs/puppeteer.js');
const vlog = console.log;

async function poster(req, res){
    let options = {
        defaultViewport: {
            width: parseInt(req.body.screen_width),
            height: parseInt(req.body.screen_height)
        },
        shotSize: {
            width: req.body.shot_width,
            height: req.body.shot_height || 'all'
        },
        omitBackground: req.body.white ? true: false,
        type: req.body.type,
        quality: req.body.quality
    }

    let puppeteer = new Puppeteer(options)
    
    puppeteer.browser(async browser => {
        const page = await browser.newPage();

        await page.goto(req.body.url);

        let stream = await puppeteer.screenshot(page);

        res.writeHead(200, {'Contet-Type': req.body.type});
        res.end(stream);
    })
}

module.exports = poster