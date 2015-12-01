var Chance = require('chance');

module.exports = {
    'Sign up init': function(browser) {
        browser.url(browser.launch_url + "/signup").waitForElementVisible('body', 1000);
    },

    'Sign up test': function(browser) {
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
        browser.url(browser.launch_url + '/signup');
        browser.setValue('.main-email', randEmail);
        browser.pause(1000);
        browser.click('.main-signup-form .main-submit');
        browser.pause(2000);
        browser.expect.element('.main-signup-form .email-in-use').to.be.visible;
    },

    'Sign up close': function(browser) {
        browser.end();
    }
};