module.exports = {
    'About hipstertron page init': function(browser) {
        browser.url(browser.launch_url + '/info/about-hipstertron').waitForElementVisible('body', 1000);
    },
    'Sign up button test': function(browser) {
        browser.expect.element('.info-button').to.be.present.text.to.equal('Sign Up');
        browser.expect.element('.info-button a').to.have.attribute('href').which.equals(browser.launch_url + '/signup');
    },
    'Test left nav': function(browser) {
        browser.expect.element('.info-link-active').to.have.attribute('href').which.equals(browser.launch_url + '/info/about-hipstertron');
    },
    'About hipstertron page close': function(browser) {
        browser.pause(1000);
        browser.end();
    }
};