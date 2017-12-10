/*
 * This is the list of all entities we have in project. It will be used as a reference for API and database structure
 */
export default {
  /*
   * User entity
   * Will be used in the collection of all service users.
   */
  user: {
    username: {
      type: 'string',
      maxlength: 255,
      required: true,
    },
    email: {
      type: 'string',
      maxlength: 255,
      required: true,
    },
    passwordHash: {
      type: 'string',
      maxlength: 82, // for scrypt, or 60 for bcrypt (scrypt is better)
      required: true,
    },
    phone: {
      type: 'string',
      maxlength: 14,
      required: false,
    },
    pushoverUserKey: {
      type: 'string',
      maxlength: 50,
      required: false,
    },
    pushoverAppKey: {
      type: 'string',
      maxlength: 50,
      required: false,
    },
    slackRoomName: {
      type: 'string',
      maxlength: 50,
      required: false,
    },
    prowlApiKey: {
      type: 'string',
      maxlength: 50,
      required: false,
    },
    prowlAppName: {
      type: 'string',
      maxlength: 255,
      required: false,
    },
    prowlUrl: {
      type: 'string',
      maxlength: 512,
      required: false,
    },
    rocketWebhookUrl: {
      type: 'string',
      maxlength: 512,
      required: false,
    },
    // Array of selected notification methods for this user, could be moved to another collection
    notificationMethods: [
      {
        type: 'enum',
        required: false,
        possibleValues: ['xmpp', 'pushover', 'email', 'twilio_sms', 'twilio_call', 'slack', 'prowl', 'rocket'],
      },
    ],
  },

  /*
   * Incident entity
   * Will be created via server-to-server API request event. Has the reference to parent service. Triggers notifications
   * for all subscribed users. Can be silenced (no notifications are sent).
   */
  incident: {
    description: {
      type: 'string',
      maxlength: 200,
      required: true,
    },
    details: {
      type: 'string',
      maxlength: 'none',
      required: true,
    },
    eventType: {
      type: 'enum',
      required: false,
      possibleValues: [
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
    },
    incidentKey: {
      type: 'string',
      maxlength: 200,
      required: true,
    },
    occurredAt: {
      type: 'date',
      required: true,
    },
    isSilenced: {
      type: 'boolean',
      default: false,
      required: false,
    },
    isSilencedUntil: {
      type: 'date',
      required: false,
    },
    serviceId: {
      type: 'mongo_id reference',
      required: true,
    },
    serviceName: {
      type: 'string',
      virtual: true,
    },
  },
  /*
   * Service entity.
   */
  service: {
    name: {
      type: 'string',
      maxlength: 80,
      required: true,
    },
    retryAfter: {
      type: 'number',
      required: true,
    },
    escalateAfter: {
      type: 'number',
      required: true,
    },
    apiToken: {
      type: 'string',
      required: false,
    },
    notificationsDisabled: {
      type: 'boolean',
      default: false,
      required: false,
    },
    isSilenced: {
      type: 'boolean',
      default: false,
      required: false,
    },
    isSilencedUntil: {
      type: 'date',
      required: false,
    },
    policyId: {
      type: 'mongo_id reference',
      required: true,
    },
    policyName: {
      type: 'virtual',
    },
    incidentsCount: {
      type: 'number',
      virtual: true,
    },
  },
  /*
   * Escalation policy entity
   * Sets the number of notifications repeat.
   */
  escalationPolicy: {
    name: {
      type: 'string',
      maxlength: 80,
      required: true,
    },
    repeatTimes: {
      type: 'number',
      required: true,
    },
    calendarIds: {
      type: 'array',
    },
    userIds: {
      type: 'array',
    },
  },
  /*
   * Schedule calendar entity
   */
  scheduleCalendar: {
    name: {
      type: 'string',
      maxlength: 200,
      required: true,
    },
    slug: {
      type: 'string',
      maxlength: 200,
      required: true,
    },
    events: {
      type: 'array',
      todo: 'event structure',
    },
  },

  /*
   * Schedule calendar entity
   */
  scheduleEvent: {
    description: {
      type: 'string',
      maxlength: 200,
      required: true,
    },
    title: {
      // Contains associated user name (from onCall field)
      type: 'string',
      virtual: true,
    },
    start: {
      type: 'date',
      required: true,
    },
    end: {
      type: 'date',
      required: true,
    },
    onCall: {
      type: 'Mongo reference to user',
      required: true,
    },
    fallback: {
      type: 'Mongo reference to user',
      required: true,
    },
    creator: {
      type: 'Mongo reference to user',
      required: true,
    },
    reccuring: {
      type: 'enum',
      required: false,
      possibleValues: [
        'weekly',
        'monthly',
        'daily',
      ],
    },
    recurringPeriodEnd: {
      type: 'date',
      required: false,
    },
    calendar: {
      type: 'Mongo reference to calendar',
      required: true,
    },
    calendarName: {
      type: 'string',
      virtual: true,
    },
  },

  /*
   * Dashboard is a kind of "virtual" entity, as it
   * have no it's own fields and gathers data from other entities
   */
  dashboardLogEvent: {
    time: {
      type: 'date',
      virtual: true,
      required: true,
    },
    serviceName: {
      type: 'string',
      virtual: true,
      required: true,
    },
    eventData: {
      type: 'string',
      virtual: true,
      required: true,
    },
  },
};
