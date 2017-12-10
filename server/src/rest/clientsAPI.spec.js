'use strict';

const sinonStubPromise = require('sinon-stub-promise');
const rewire = require('rewire');
const test = require('unit.js');

sinonStubPromise(test.sinon);

describe('REST endpoints', () => {

    const clientsAPI = rewire('./clientsAPI');
    const next = test.spy();
    const res = {
        send: test.spy(),
        status: test.spy()
    };

    describe('GET', () => {
        it('should return the list of items for home page', () => {
            const req = {};
            const exampleResolve = {
              username: 'testUsername',
              email: 'test-email@email.com',
              phone: '+669994446653',
              pushoverUserKey: 'UC13434343434343434343434343134324',
              pushoverAppKey: 'AP13434343434343434343434343134324',
              slackRoomName: 'slackRoomName',
              prowlApiKey: 'prowlAppKey',
              prowlAppName: 'prowlAppName',
              prowlUrl: 'prowlURL',
              rocketWebhookUrl: 'rocketURL',
              notificationMethods: ['xmpp', 'pushover', 'email', 'twilio_sms', 'twilio_call', 'slack', 'prowl', 'rocket']
            };
            clientsAPI.getUser(req, res, next);
            test.assert(res.status.calledWithExactly(200));
            test.assert(res.send.calledWithExactly(exampleResolve));
        });
    });
    afterEach(() => {
        res.send.reset();
        next.reset();
    });
});
