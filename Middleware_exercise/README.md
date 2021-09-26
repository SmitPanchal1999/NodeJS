# Middleware exercise 

There is only one route in the routes folder which handles requests like add user ,get users but this routes are just for testing purpose as the main goal is to make 8 different middlewares...

# 8 Middlewares:

1. Request Logger (requestLogger)

This middleware is responsible for log all the requests File is saved under ./logs/requests.logs file Log Format: Current Date-time URL Method IP

Note: to test this call any API and check the log file


2. Authorized or not (auth)

This middleware is responsible for cheking that JWT token is present in the header or not and If yes then it is valid or not

Note: To check this call use route "/addUser" with POST request and input like {"username":"hello"}


3. Restrict content type -> application/json (restrictJsonContentType)

This middleware is responsible for checking that is given data in the request body is JSON or not

Note: Test it with route "/addProduct" POST request 

and set content type to anything instead of JSON


4. CORS middleware (cors)

This middleware sets the cors


5. Code Error Handler (errorHandler)

This middleware is responsible for handling the code errors First it will set staus to 500 and then log the error Log file will be ./logs/errors.logs Log format: Date-Time errorMessage URL Method


6. Page not found (pageNotFound)

This midleware is responsible for handling the page request not found 404 error


7. check body parameter (checkBodyParameters)

This middleware is responsible for checking if required feilds are present in the req.body parameters or not.

Note. To test this middleware use "addProduct" POST route and don't provide "productName" and "productId"


8. User validation (userValidate)

This middleware is responsible for checking if user's details is valid or not

Note. To test this use "/addUser" POST route and provide username and password body parameters
