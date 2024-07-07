/*
What is MVC?
--A design structure or framework that organizes our full stack code into three parts: DB(MODEL), Frontend(VIEW),Backend(CONTROLLER)
--It provides more modularity in our code.
--Good thing to add in resume in bullet points about project

Router.route
--We have already seggregated all the routes in routes folder. To make it more modular, router.route is used
--For e.g. we have a path /listings for two different requests i.e. get and post. We can combine these to requests under single route.

Library we have used for rating : starability

When we wish to send any file to our backend through forms enctype="multipart/formdata"

The normal data which we receive through form is in urlextended form which we parse by using middlewares in app.js
But in case of multipart/formdata, we need multer npm package which parses data in multipart form.

What we have used to store files taken from user for listing?
--We have used third party cloud service called cloudinary to store data in clouds.
--The credentials about this storage must not be shared with others, as it may lead to misuse of our data.
--.env file is used to store all environment variables(credentials) in our code.
--It stores data in KEY=value form
--We cannot use env files directly, hence to access vars stored in it, we need dotenv library(npm package)
--When we are under development phase, we can keep our .env file. In case of production phase, we save it in another form.
--multer+cloudinary is a common combination that there are libraries to connect them: cloudinary and multer-storage-cloudinary (both are npm packages)
--
*/