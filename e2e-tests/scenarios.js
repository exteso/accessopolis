var Firebase = require("firebase");

describe('ionic-firebase-seed', function() {

    beforeEach(function() {
        browser.get('/'); // Starts each test from the root URL
    });

    describe('login / sign up view', function() {

        // This test fetches the element with id 'app-content' asynchronously
        // Then it gets the text in that DOM node and makes sure it matches 'Login Sign Up'

        it('renders the login / sign up view when the app loads', function() {
            expect(element.all(by.css('#app-content')).first().getText()).toMatch(/Login Sign Up/);
        });
    });

    describe('login process', function() {

        // This test checks to make sure our login() function is working correctly
        // It enters valid user credentials, clicks the login button
        // and makes sure the header text then contains the logged in user's email
        // It also tests that the 'message-list' element is displayed, since this should only be displayed to logged in users

        it('logs a user in and displays the messages list to a logged in user', function(done) {
            // todo: replace the email and password strings below
            // with a registered user in your application
            var emailField = element(by.model('user.email'));
            emailField.sendKeys('test@example.com');
            var passwordField = element(by.model('user.pass'));
            passwordField.sendKeys('password1234');
            element(by.css('.login')).click();
            setTimeout(function() {
                expect(element(by.id('email-header')).getText()).toMatch(/test@example.com/);
                expect(element(by.id('message-list')).isDisplayed()).toBe(true);
                done();
            }, 2000);
        });
    });


    describe('messages list', function() {

        // This test ensures that adding a new message to Firebase successfully adds 1 item to our $firebaseArray of messages

        it('adds an item to the Messages array', function(done) {
            // todo: replace this with your Firebase App URL
            var testMessagesRef = new Firebase("https://YOUR-FIREABASE-APP.firebaseio.com/messages");
            testMessagesRef.once('value', function(beforeSnap) {
                var messageInput = element(by.model('message.text'));
                messageInput.sendKeys('testmessage');
                element(by.id('add-message')).click();
                setTimeout(function() {
                    testMessagesRef.once('value', function(afterSnap) {
                        expect(afterSnap.numChildren() - 1).toEqual(beforeSnap.numChildren());
                        done();
                    });
                }, 500);
            });
        });
    });
});