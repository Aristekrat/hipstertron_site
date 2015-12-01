module.exports = {
    'Find concerts page init': function(browser) {
        browser.url(browser.launch_url + '/info/find-tickets').waitForElementVisible('body', 1000);
    },
    'Sign up button test': function(browser) {
        browser.expect.element('.info-button').to.be.present;
        browser.expect.element('.info-button a').to.have.attribute('href').which.equals(browser.launch_url + '/signup');
    },
    'Test left nav': function(browser) {
        browser.expect.element('.info-link-active').to.have.attribute('href').which.equals(browser.launch_url + '/info/find-tickets');
    },
    'Test page links': function(browser) {
        browser.click('a[href="/info/reserve-tickets"]');
        browser.pause(1000);
        browser.url(function(result) {
            this.assert.equal(result.value, browser.launch_url + '/info/reserve-tickets', 'Link led to the reserve tickets page');
        });

        browser.url(browser.launch_url + '/info/find-tickets');
        browser.pause(1000);
        browser.click('a[href="/calendar"]');
        browser.pause(1000);
        browser.url(function(result) {
            this.assert.equal(result.value, browser.launch_url + '/calendar', 'Link led to the calendar page');
        });

        browser.url(browser.launch_url + '/info/find-tickets');
        browser.pause(1000);
        browser.click('a[href="/signup"]');
        browser.pause(1000);
        browser.url(function(result) {
            this.assert.equal(result.value, browser.launch_url + '/signup', 'Link led to the signup page');
        });

        browser.url(browser.launch_url + '/info/find-tickets');
    },
    'Find concerts page close': function(browser) {
        browser.pause(1000);
        browser.end();
    }
};