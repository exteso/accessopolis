# accessopolis
[Accessopolis.ch](http://www.accessopolis.ch) is a service for people with disabilities searching information about public places to check if they are accessible and comfortable for them.

Accessopolis is a project promoted by [Fondazione Romulus](http://www.romulus.ch), Lugano and has been implemented by [Federico Yankelevich](https://github.com/yankedev), [Celestino Bellone](https://github.com/cbellone), [Aldo Pizzagalli](https://github.com/aldopizzagalli) and [Giulia Tralamazza]() 
 during [Hack the City 2015](http://www.hackthecity.ch), in Chiasso on 28 and 29 August 2015.
  
  
# Architecture
Accessopolis is an Angular web application completely running inside the browser.
Data are stored on the Firebase infrastructure and protected using Google OAuth2 for authentication and Firebase security for authorization

# Setup Development Environment

Clone github repository:

```
git clone git@github.com:exteso/accessopolis.git
cd accessopolis && npm install && bower install
grunt serve
```

Open browser at http://localhost:8080

*Note:* currently we only have 1 Firebase database, so data modified while developping are immediately changing in PROD (same DB)
 

# How to deploy a new release:
```
git pull origin
grunt build
./publish.sh
```

to publish you need write permission on the GitHub gh-pages branch
