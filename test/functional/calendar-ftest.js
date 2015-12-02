module.exports = {
    'Calendar init': function(browser) {
        browser.url(browser.launch_url + "/calendar").waitForElementVisible('body', 1000);
    },

    'Test if Calendar is Down': function(browser) {
        browser.pause(2000);
        browser.expect.element('.calendar tbody tr').to.be.present;
        browser.expect.element('.calendar tbody tr a').text.to.not.equal('');
        browser.execute(function(data) {
            return document.querySelectorAll(".calendar tbody tr").length;
        }, [], function(result) {
            console.log(result.value);
            var moreThanFifty = result.value > 50;
            var moreThanOneFifty = result.value > 150;
            browser.assert.equal(moreThanFifty, true);
            browser.assert.equal(moreThanOneFifty, true);
        });
    },

    'Calendar close': function(browser) {
        browser.end();
    }
};