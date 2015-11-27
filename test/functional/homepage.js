describe('hipstertron homepage tests', function() {
    var submitEmailButton = element(by.css('.main-submit'));

    beforeEach(function() {
        browser.get('http://www.hipstertron.com/');
    });

    it('should test my sanity', function() {
        var mainH1 = element(by.css('#main-explanation'));
        expect(mainH1.getText()).toEqual("Hipster Tron helps you get awesome tickets to concerts you care about, 100% Free.")
    });

    it('should display a warning when the user attempts to submit a blank address', function() {
        var blankEmailWarning = element(by.css(".warning"))
        submitEmailButton.click()
        expect(blankEmailWarning.getAttribute('class')).not.toContain('ng-hide')
    });

    it('should reject emails that are alreadly in the system', function() {
        var emailInput = element(by.model('userEmail.email'));
        var emailErrorBlock = element(by.css('.main-signup-form span span'));
        emailInput.sendKeys("email@email.com")
        submitEmailButton.click()
        expect(emailErrorBlock.getAttribute('class')).toMatch('')
    });
});

describe('sign up page tests', function() {
    var submitEmailButton = element(by.css('.main-submit'));

    beforeEach(function() {
        browser.get('http://www.hipstertron.com/signup');
    });

    it('should display a warning when the user attempts to submit a blank address', function() {
        var blankEmailWarning = element(by.css(".warning"))
        submitEmailButton.click()
        expect(blankEmailWarning.getAttribute('class')).not.toContain('ng-hide')
    });

    it('should reject emails that are alreadly in the system', function() {
        var emailInput = element(by.model('userEmail.email'));
        var emailErrorBlock = element(by.css('.main-signup-form span span'));
        emailInput.sendKeys("email@email.com")
        submitEmailButton.click()
        expect(emailErrorBlock.getAttribute('class')).toMatch('')
    });
});

describe('calendar page tests', function() {
    beforeEach(function() {
        browser.get('http://www.hipstertron.com/calendar');
    });

    it('should return concert listings', function() {
        var concertCount = element.all(by.css('.calendar td')).count();
        expect(concertCount).toBeGreaterThan(60)
    });

    it('should create more results when scrolled to the bottom', function() {
        var firstCount = element.all(by.css('.calendar td')).count()
        browser.executeScript("window.scrollTo(0, document.body.scrollHeight)").then(function() {
            var secondResultSet = element.all(by.css('.calendar td'));
            expect(firstCount).toBeLessThan(secondResultSet.count())
        });
    });
});