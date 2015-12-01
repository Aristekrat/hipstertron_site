var Chance = require('chance');

module.exports = {
    'Homepage init': function(browser) {
        browser.url(browser.launch_url).waitForElementVisible('body', 1000);
    },

    'Nav bar test': function(browser) {
        browser.click('nav a[href="/"]');
        browser.pause(1000);
        browser.url(function(result) {
            this.assert.equal(result.value, browser.launch_url + '/', 'Homepage link works');
            browser.url(browser.launch_url);
        });

        browser.click('nav a[href="/calendar"]');
        browser.pause(1000);
        browser.url(function(result) {
            this.assert.equal(result.value, browser.launch_url + '/calendar', 'calendar link works');
            browser.url(browser.launch_url);
        });

        browser.click('nav a[href="/info/about-hipstertron"]');
        browser.pause(1000);
        browser.url(function(result) {
            this.assert.equal(result.value, browser.launch_url + '/info/about-hipstertron', 'Info link works');
            browser.url(browser.launch_url);
        });

        browser.click('nav a[href="/signup"]');
        browser.pause(1000);
        browser.url(function(result) {
            this.assert.equal(result.value, browser.launch_url + "/signup", 'Signup link works');
            browser.url(browser.launch_url);
        });

        /*        browser.click('nav a[title="Give Hipstertron some Twitter love"]');
        browser.pause(1000);
        browser.url(function(result) {
            this.assert.equal(result.value, "https://twitter.com/intent/tweet?text=Hes%20heard%20of%20that%20show%20before%20you&hashtags=HipsterTron&url=http%3A%2F%2Fwww.hipstertron.com", 'Twitter link works');
            browser.url(browser.launch_url);
        });

        browser.click('nav a[title="Give Hipstertron some Facebook love"]');
        browser.pause(1000);
        browser.url(function(result) {
            this.assert.equal(result.value, "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.hipstertron.com", 'Facebook link works');
            browser.url(browser.launch_url);
        });*/
    },

    'Homepage sign up test': function(browser) {
        // Test No Email
        browser.setValue('.main-email', '');
        browser.click('.main-signup-form .main-submit');
        browser.expect.element('.main-signup-form .warning').to.be.visible;

        // Test Improper Email
        browser.clearValue('.main-email');
        browser.setValue('.main-email', 'improperemail@');
        browser.click('.main-signup-form .main-submit');
        browser.expect.element('.main-signup-form .warning').to.be.visible;

        // Test Proper Email
        var chance = new Chance();
        var randEmail = chance.email();
        browser.clearValue('.main-email');
        browser.setValue('.main-email', randEmail);
        browser.click('.main-signup-form .main-submit');
        browser.pause(1000);
        browser.expect.element('.main-signup-form .social-button').to.be.visible;

        // Reject email already submitted
        browser.url(browser.launch_url);
        browser.setValue('.main-email', randEmail);
        browser.pause(1000);
        browser.click('.main-signup-form .main-submit');
        browser.pause(2000);
        browser.expect.element('.main-signup-form .email-in-use').to.be.visible;
    },

    'Homepage close': function(browser) {
        browser.pause(1000);
        browser.end();
    }
};