# MERN Authentication System
```
# MERN stack authentication project with Login, Register, Forgot &amp; Reset Password features
# Redux state management in the frontend ( React.js )
# axios api calls for making request to the node.js ( express.js ) server
# Jwt based authentication
# Hashed password saving in the mongoDB database
# Forgot password feature i.e Reset password link will be sent to the user
# SendGrid mail functionality
```

## Usage

Create .env file and add the following environment variables:
```
# PORT=5000
# MONGO_URI= your mongo uri connection string from mongodb
# JWT_SECRET=your JWT secret
# EMAIL_SERVICE=SendGrid
# EMAIL_USERNAME=can be found in sendgrid dashboard
# EMAIL_PASSWORD=can be found in sendgrid dashboard
# EMAIL_FROM=your email associated with sendgrid account i.e reset password link will be sent from this email to the recipient mail address
```

### Install dependencies

```
# Backend deps
npm install
# Frontend deps
cd client
npm install
```

### Run Server

```
# Backend Server (Local)
npm run dev
# Frontend Server (Local)
cd frontend
npm start
```

## Demo can be found here
https://mern-authentication-jwt-demo.herokuapp.com
