# Login_Asess

**Run NPM install to download all packages locally**

**.env**
Please create a .env file which involves following keys and assign values
1. PORT = 3000 // This value can be changed
2. MONGO_URI = <Mongo_uri to connect to db> // Replace your mongo url to connect as mongodb is used
3. ENCRYPT_SECRET_KEY = p3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C // This value can be changed
4. JWT_SECRET_KEY = p3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C // This value can be changed


**Routes**
1. auth.js - Public Route which handles Register and Login for users
2. home.s - Private Route which uses middleware i.e. authenticate which verifies jwt token exist or not before entering to route. This involves home route for user, logout, storing images and fetching all the images for users

**Middelware**
1. authenticate.js - this middleware is responsible for verifying jwt tokens
2. NotFoundError.js - this middleware is used to handle invalid or routes which doest exist

**Model**
1. user.js - This model involves mongo schema about user table (uses mongoose)
2. image.js - This model involves mongo schema about images to be uploaded by admin (uses mongoose)

**Controllers**
1. home.js - This controller involves functions for user, logout, storing images and fetching all the images for users
2. user.js - This controller involves functions for registering user and logging in users.

**db**
1. connect.js - This file helps in connecting to mongodb database which uses MONGO_URI of .env file.

**Other**
Please download mongodb collections and postman collections which are shared in mail. Import them to respective platforms to test apis.
For better access of apis in postman, i have added Global Variables URL and accessToken.
