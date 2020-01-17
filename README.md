"Cement-bin" a clone of pastebin.
================================================================================
### Technologies used:

* [Docker](https://www.docker.com/) [nodejs and mongodb]
* [nodejs](https://nodejs.org/en/)
* [mongodb](https://www.mongodb.com/) - Database
* [ExpressJS](https://expressjs.com/) - Web server
* [pug](https://pugjs.org/api/getting-started.html)
* [jQuery](https://jquery.com/)
* [mini-css](https://minicss.org/)
* [jquery modal](https://jquerymodal.com/)
* [jquery date/time picker](https://xdsoft.net/jqplugins/datetimepicker/)
* [baray](https://www.npmjs.com/package/baray) - Logger

--------------------------------------------------------------------------------

## Design

This is a one page application.

### Services:

* ```/ [GET]``` - Renders the application ui.
* ```/save [POST]``` - receives the text, filename and expiration date for the paste set by the user. It generates a UUID as a 'key' for the paste, saves the key, filename and expiration into the database. It creates a file with a ```{key}.txt``` filename, writes the text into it and saves it inside ```files``` directory. It returns this ```key``` to the frontend so that a URL can be generated for it.
* ```/files [GET]``` - Fetches the files information from the database, filters it based on the expiration date and returns.
* ```/files [DELETE]``` - Consumes a file's ```key``` to mark the entry indexed by that ```key``` in the database as ```deleted```. It then moves the file [```{key}.txt```] into a ```deleted``` directory so that its ```URL```, if known to the user, becomes invalid.

### Database:
* The database consists of just one ```collection - "files"``` {filename:String, expirationDate:String, deleted:Boolean}
* There is a database initialization script [```{project-directory}/data/scripts```] which is configured to run when the database is created (only) which sets up the database credentials and access to the ```collection```


## Possible improvements

* The application refreshes the list of files by fetching all of them (filenames) - which happens anytime a ```save``` or a ```delete``` occurs. It could be updated such that only the current document being saved/deleted would be used to 'refresh' the list.
* The testing of the application was done manually, albeit the database initialization script. This would need to be automated via unit tests.
* Additional scripts can be written to backup and/or clean the database (both filesystem and database) which can be invoked as required or scheduled via a CRON job.
* UI looks rudimetary -  can be styled better. [UX too]
* The application project could use a configuration management tool to have a single source of truth.

## Getting started:
* First time run ```docker-compose up --build```, otherwise just ```docker-compose up -d```
* The application will start on port ```5555```
* Visit ```http://localhost:5555``` to view the application.

#### Notes

* The application may crash a few times on startup as it tries to connect to mongodb before it is up. However, it will work fine when mongodb is up.
* Logs are written into ```{project-directory}/logs``` directory - periodic cleanup may be required.
* The database directory for mongodb is ```{project-directory}/data/database``` configured to mount into mongodb container at ```/data/db``` as a volume.
* Both the ```nodejs``` application and the ```mongodb``` have been configured to restart always in the case of ```nodejs``` and on-failure in the case of ```mongodb```
* If ```mongodb``` fails to initialize correctly,
  * Stop the containers by running ```docker stop mongo``` and ```docker stop cement```
  * Remove the built mongodb image - ```docker rmi mongo```
  * Delete the contents of ```{project-directory}/data/database``` by running - ```rm -rf data/database/*```
  * Re-run ```docker-compose up --build```
