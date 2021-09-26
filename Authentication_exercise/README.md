# Authentication exercise

All routes are handled in the server.js file like google ,facebook ,github (auth/google || facebook || github) and custom authentication using jwt tokens ...

Different routes and it's descriptions:
- "/"=> renders login page
- "/register"=> renders register page
- "/registerNewUser"=> registers new user into the database and redirects to the "/" route
- "/checkLogin" => check if the user is registered or not if yes then it generates a cookie of jwt token and redirects it to dashboardForUser route .. else redirects it to login again
- "/dashboardForUser" and "/dashboard" => both renders dashboard page
- "/auth/google || facebook || github"=> authenticates using google or facebook or github authentication service using passport
- "/logout" => logout user
