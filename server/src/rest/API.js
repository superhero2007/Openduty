const bodyParser = require('body-parser');
const clientsApi = require('./clientsAPI');
// const servicesApi = require('./servicesAPI');

module.exports = {
  // declare the apis routing
  init(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true,
    }));
    /**
     * @description routes for clients API
     */
    // Users
    app.get('/api/users/get', clientsApi.getUsers);
    app.put('/api/users/add', clientsApi.addUser);
    app.post('/api/users/update', clientsApi.updateUser);
    app.delete('/api/users/delete', clientsApi.deleteUsers);
    // Incidents
    app.get('/api/incidents/get', clientsApi.getIncidents);
    app.put('/api/incidents/add', clientsApi.addIncident);
    app.post('/api/incidents/update', clientsApi.updateIncident);
    app.delete('/api/incidents/delete', clientsApi.deleteIncidents);
    // Services
    app.get('/api/services/get', clientsApi.getServices);
    app.put('/api/services/add', clientsApi.addService);
    app.post('/api/services/update', clientsApi.updateService);
    app.delete('/api/services/delete', clientsApi.deleteServices);
    // Escalation Policies
    app.get('/api/policies/get', clientsApi.getEscalationPolicies);
    app.put('/api/policies/add', clientsApi.addEscalationPolicy);
    app.post('/api/policies/update', clientsApi.updateEscalationPolicy);
    app.delete('/api/policies/delete', clientsApi.deleteEscalationPolicies);
    // Schedule calendars
    app.get('/api/schedules/get', clientsApi.getSchedules);
    app.put('/api/schedules/add', clientsApi.addSchedule);
    app.post('/api/schedules/update', clientsApi.updateSchedule);
    app.delete('/api/schedules/delete', clientsApi.deleteSchedules);
    // Schedule calendar events
    app.get('/api/scheduleEvents/get', clientsApi.getScheduleEvents);
    app.put('/api/scheduleEvents/add', clientsApi.addScheduleEvent);
    app.post('/api/scheduleEvents/update', clientsApi.updateScheduleEvent);
    app.delete('/api/scheduleEvents/delete', clientsApi.deleteScheduleEvents);
    // Dashboard
    app.get('/api/dashboard/get', clientsApi.getDashboard);
    // Constants
    app.get('/api/constants/get', clientsApi.getConstants);

    /**
     * @description routes for services API
     */
    /**
     * @TODO: Should be synced with pagerduty API
     * */
  },
};
