module.exports = {
    userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)' + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',

    browser: {
        headless: true,

        defaultViewport: {
            width: 375,
            height: 667,
            deviceScaleFactor: 1,
            isMobile: false,
            hasTouch: false
        },
        timeout: 3000,
    },

    screenshot: {
        path: '',
        type: 'jpeg',
        omitBackground: false,
        encoding: 'binary',
        quality: 75,
        fullPage: false,
        shotSize: {
            width: 375,
            height: 667
        }
        /*clip: {
            x: 0,
            y: 0,
            width: 375,
            height: 667
        }*/
    }
}