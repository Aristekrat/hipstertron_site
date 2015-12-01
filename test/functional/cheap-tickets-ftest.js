module.exports = {
    'Cheap tickets page init': function(browser) {
        browser.url(browser.launch_url + '/info/cheap-tickets').waitForElementVisible('body', 1000);
    },
    'Sign up button test': function(browser) {
        browser.expect.element('.info-button').to.be.present;
        browser.expect.element('.info-button a').to.have.attribute('href').which.equals(browser.launch_url + '/signup');

        browser.click('a[href="/signup"]');
        browser.pause(1000);
        browser.url(function(result) {
            this.assert.equal(result.value, browser.launch_url + '/signup', 'Link led to the signup page');
        });
        browser.url(browser.launch_url + '/info/cheap-tickets');
    },
    'Test left nav': function(browser) {
        browser.expect.element('.info-link-active').to.have.attribute('href').which.equals(browser.launch_url + '/info/cheap-tickets');
    },
    'Cheap tickets page close': function(browser) {
        browser.pause(1000);
        browser.end();
    }
};