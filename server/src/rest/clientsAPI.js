/**
 * @description API mockup responces to be used for frontend development on "live" data from server.
 * @TODO: Real API methods should follow the same structure and operate the real data from database
 */
module.exports = {
  // Users
  getUsers(req, res) {
    const mockUsersList = [
      {
        id: '89342j587rjhg87he8rgh',
        username: 'testUsername1',
        email: 'test-email@email.com',
        phone: '+669994446653',
        pushoverUserKey: 'UC13434343434343434343434343134324',
        pushoverAppKey: 'AP13434343434343434343434343134324',
        slackRoomName: 'My room',
        prowlApiKey: '9qwc5u8tc48uy5-v84-ybv45yb45yb4yb45yb',
        prowlAppName: 'MyProwlApp',
        prowlUrl: 'https://prowlURL',
        rocketWebhookUrl: 'https://rocketURL',
        notificationMethods: ['xmpp', 'slack', 'prowl', 'rocket'],
      },
      {
        id: '2gfte6urjhg87he8tj878',
        username: 'OneMoreTestUsername',
        email: 'test-email2@eml.com',
        phone: '+447774446653',
        pushoverUserKey: 'UC1343475686567978697967357656765775',
        pushoverAppKey: 'AP13434343434343434343434343134324',
        slackRoomName: 'slackRoomName2',
        prowlApiKey: 'prowlAppKey2',
        prowlAppName: 'prowlAppName2',
        prowlUrl: 'prowlURL2',
        rocketWebhookUrl: 'rocketURL2',
        notificationMethods: ['twilio_call', 'slack', 'prowl', 'rocket'],
      },
    ];
    const mockData = req.query.id ? [mockUsersList[0]] : mockUsersList;

    res.status(200);
    return res.send(mockData);
  },
  addUser(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  updateUser(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  deleteUsers(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },

  // Incidents
  getIncidents(req, res) {
    const mockIncidentsList = [
      {
        id: 'iosu0987tu754j280g73g05',
        description: 'Test incident description text',
        details: 'A lot of text with full test incident description details. Not limited in length',
        eventType: 'acknowledge',
        incidentKey: 'testIncidentKey',
        occurredAt: new Date().toJSON(),
        isSilenced: false,
        isSilencedUntil: null,
        serviceId: '08j0u8924j5g374857g3784hg',
        serviceName: 'Test service name',
      },
      {
        id: '876nb6tn9iuh54j280g7kluh',
        description: 'Second incident description',
        details: 'A lot of text with full test incident description details. Not limited in length',
        eventType: 'notified',
        incidentKey: 'testIncidentKey',
        occurredAt: new Date().toJSON(),
        isSilenced: false,
        isSilencedUntil: null,
        serviceId: '08j0u8924j5g374857g3784hg',
        serviceName: 'Test service name',
      },
      {
        id: '987hu56f87tu754j280g796j',
        description: 'Other service\'s incident',
        details: 'A lot of text with full test incident description',
        eventType: 'notification_failed',
        incidentKey: 'testIncidentKey',
        occurredAt: new Date().toJSON(),
        isSilenced: false,
        isSilencedUntil: null,
        serviceId: '345u8924j5g374857g3drt35',
        serviceName: 'One more service name',
      },
    ];
    const mockData = req.query.id ? [mockIncidentsList[0]] : mockIncidentsList;

    res.status(200);
    return res.send(mockData);
  },
  addIncident(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  updateIncident(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  deleteIncidents(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },

  // Services
  getServices(req, res) {
    const mockServices = [
      {
        id: '08j0u8924j5g374857g3784hg',
        name: 'Test service name',
        retryAfter: 3,
        escalateAfter: 5,
        apiToken: '89eu9u98u98u98ugfgfdg',
        notificationsDisabled: false,
        isSilenced: false,
        isSilencedUntil: null,
        policyId: 'iuerhouther078thudfgujdfgujpj',
        incidentsCount: 2,
        policyName: 'Test policy', // virtual
      },
      {
        id: '345u8924j5g374857g3drt35',
        name: 'One more service name',
        retryAfter: 5,
        escalateAfter: 2,
        apiToken: 't5t54t45e7765u98u98ugfgfdg',
        notificationsDisabled: true,
        isSilenced: false,
        isSilencedUntil: null,
        policyId: 'iuerhouther078thudfgujdfgujpj',
        incidentsCount: 137,
        policyName: 'Test policy', // virtual
      },
    ];
    const mockData = req.query.id ? [mockServices[0]] : mockServices;
    res.status(200);
    return res.send(mockData);
  },
  addService(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  updateService(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  deleteServices(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },

  // Escalation policies
  getEscalationPolicies(req, res) {
    const mockPoliciesList = [
      {
        id: 'iuerhouther078thudfgujdfgujpj',
        name: 'Test policy',
        repeatTimes: 1,
        calendarIds: ['98wu4598u0948u69s8ut98urt9y8ub', '43530948u69s8ut98urt9y543bfhf'],
        userIds: ['2gfte6urjhg87he8tj878'],
      },
      {
        id: '546456456er078thudfgujdfg456tyu',
        name: 'One more test policy',
        repeatTimes: 2,
      },
      {
        id: '745dhyy778jhutherg565yjuuytrrty',
        name: 'Most dangerous policy',
        repeatTimes: 15,
      },
    ];
    const mockData = req.query.id ? [mockPoliciesList[0]] : mockPoliciesList;

    res.status(200);
    return res.send(mockData);
  },
  addEscalationPolicy(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  updateEscalationPolicy(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  deleteEscalationPolicies(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },

  // Schedule calendars
  getSchedules(req, res) {
    const mockSchedulesList = [
      {
        id: '98wu4598u0948u69s8ut98urt9y8ub',
        name: 'Test schedule',
        slug: 'TestSlug',
      },
      {
        id: '43530948u69s8ut98urt9y543bfhf',
        name: 'Test schedule 2',
        slug: 'TestSlug',
      },
    ];
    const mockData = req.query.id ? [mockSchedulesList[0]] : mockSchedulesList;

    res.status(200);
    return res.send(mockData);
  },
  addSchedule(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  updateSchedule(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  deleteSchedules(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },

  // Schedule calendar events
  getScheduleEvents(req, res) {
    const now = new Date();
    const later = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000));
    const later2 = new Date(now.getTime() + (4 * 24 * 60 * 60 * 1000));
    const later3 = new Date(now.getTime() + (8 * 24 * 60 * 60 * 1000));
    const mockScheduleEventsList = [
      {
        id: '98wu4598u0948u69s8ut98urt9y8ub',
        start: now.toJSON(),
        end: later.toJSON(),
        title: 'Test User',
        calendar: '98wu4598u0948u69s8ut98urt9y8ub',
        calendarName: 'Test schedule 2',
        onCall: '89342j587rjhg87he8rgh',
        fallback: '2gfte6urjhg87he8tj878',
        description: 'Test desc',
        creator: '2gfte6urjhg87he8tj878',
        recurring: 'monthly',
        recurringPeriodEnd: new Date().toJSON(),
      },
      {
        id: '43530948u69s8ut98urt9y543bfhf',
        start: later2.toJSON(),
        end: later3.toJSON(),
        title: 'Test User',
        onCall: ['89342j587rjhg87he8rgh'],
        calendar: '98wu4598u0948u69s8ut98urt9y8ub',
        calendarName: 'Test schedule 2',
        fallback: ['2gfte6urjhg87he8tj878'],
        description: 'Another event description',
        creator: '2gfte6urjhg87he8tj878',
      },
    ];
    const mockData = req.query.id ? [mockScheduleEventsList[0]] : mockScheduleEventsList;

    res.status(200);
    return res.send(mockData);
  },
  addScheduleEvent(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  updateScheduleEvent(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },
  deleteScheduleEvents(req, res) {
    res.status(200);
    return res.send({
      status: 'ok',
    });
  },

  // Dashboard
  getDashboard(req, res) {
    const mockDashboard = [
      {
        id: '2343248u0948u69s8ut98urt9y8ub',
        time: new Date().toJSON(),
        serviceName: 'Test Service',
        eventData: 'Description text here',
      },
      {
        id: 't3t434530948u69s8ut98urt9y543bfhf',
        time: new Date().toJSON(),
        serviceName: 'Test Service 2',
        eventData: 'Description text 2',
      },
      {
        id: 'f43r34r434530948u69s8ut98urt93453453',
        time: new Date().toJSON(),
        serviceName: 'Test Service 2',
        eventData: 'Description text 3344',
      },
    ];
    const mockData = req.query.serviceId ? [mockDashboard[0]] : mockDashboard;

    res.status(200);
    return res.send(mockData);
  },
  // Constants
  getConstants(req, res) {
    const constants = {
      eventTypes: [
        'acknowledge',
        'resolve',
        'silence_service',
        'unsilence_service',
        'silence_incident',
        'unsilence_incident',
        'forward',
        'log',
        'notified',
        'notification_failed',
        'trigger',
      ],
      notificationTypes: [
        'xmpp',
        'pushover',
        'email',
        'twilio_sms',
        'twilio_call',
        'slack',
        'prowl',
        'rocket',
      ],
      datepickerFormats: {
        dateFormat: 'YYYY/MM/DD',
        timeFormat: 'HH:mm',
        timeIntervals: 30,
      },
      calendarFormats: {
        dateFormat: 'MMM Do YYYY, h:mm',
        step: 60,
      },
      alertsTimeout: 5000,
      alertsPosition: 'top-right',
    };

    res.status(200);
    return res.send(constants);
  },
};
