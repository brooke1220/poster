const puppeteer = require('puppeteer');
const config = require('../config/puppeteer.js');
const vlog = console.log;

function sizeToPosition(size){
    return  {
        x: 0,
        y: 0,
        width: parseInt(size.width),
        height: parseInt(size.height)
    }
}

function mergeConfig(config, useConfig){
    Object.keys(config).forEach(key => {
        if(useConfig[key]){
            if(config[key] instanceof Object){
                config[key] = Object.assign(config[key], useConfig[key])
            }else{
                config[key] = useConfig[key]
            }
        }else if(config[key] instanceof Object){
            mergeConfig(config[key], useConfig)
        }
    })
    
    return config
}

class Puppeteer {
    constructor(options = {}){
        this.config = mergeConfig(Object.assign({}, config), options)
    }

    static createBrowser(options){
        return puppeteer.launch(options)
    }

    async browser(useCallback){ //利用切片来进行浏览器的打开和关闭
        let config = Object.assign({}, this.config.browser);
        let browser = await Puppeteer.createBrowser(config)
        await useCallback(browser)
        await browser.close();
    }

    async screenshot(page, path){
        let config = Object.assign({}, this.config.screenshot);

        await page.setUserAgent(this.config.userAgent)

        if(['base64', 'binary'].includes(path || config.encoding)){
            config.encoding = path || config.encoding
            config.path = ''
        }else{
            config.path = path
        }
        
        if(config.shotSize.height == 'all'){
            config.fullPage = !0
        }else if(config.shotSize.height == 'body'){
            const documentSize = await page.evaluate(() => {
                return { width: document.documentElement.clientWidth, height : document.body.clientHeight }
            })
            config.shotSize.height = documentSize.height
            config.clip = sizeToPosition(config.shotSize);
        }else{
            config.clip = sizeToPosition(config.shotSize);
        }

        if(config.type == 'png') delete config.quality

        delete config.shotSize
        vlog(config)
        return await page.screenshot(config);
    }
}

module.exports = Puppeteer