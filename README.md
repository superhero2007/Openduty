# What is this?
**Openduty** is an incident escalation tool, just like [Pagerduty](http://pagerduty.com) . It has a Pagerduty compatible API too.

# Getting started:
```
1. yarn install in both client & server folders
2. run yarn dev in client folder (starts the API and the front end)
3. Unit tests - yarn test in client / gulp test in server
```
You need to set up the web server to serve the ***client/public*** folder and return ***index.html*** on any request, and proxy
 all request to ***/api/**** to Express API port. See ***/docs/nginx.conf.example***
 
# Current status
Openduty is in Alpha status, and needs a lot of work to be done.
Most important todo's:

**Client side**:
1) Preloader spinners while fetching data
2) Deal with dates format in datepickers and calendars
3) Common notifier component for errors, warnings and success messages
4) Some data validation and length restrictions on client
5) More comments and docs
6) CSS styling, mobile version

**Server side**:
1) Start backend development
