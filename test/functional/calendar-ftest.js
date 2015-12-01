module.exports = {
    'Calendar init': function(browser) {
        browser.url(browser.launch_url + "/calendar").waitForElementVisible('body', 1000);
    },

    'Calendar close': function(browser) {
        browser.end();
    }
};