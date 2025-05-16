# API Documentation

## User Registration
`POST /users/register`

Registers a new user in the system.

### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Request Parameters

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| fullname.firstname | String | User's first name | Required, minimum 3 characters |
| fullname.lastname | String | User's last name | Optional, minimum 3 characters if provided |
| email | String | User's email address | Required, must be a valid email format |
| password | String | User's password | Required, minimum 6 characters |

### Responses

#### Success (201 Created)
```json
{
  "token": "jwt-token-here",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "value": "ab",
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### Status Codes

| Status Code | Description |
|-------------|-------------|
| 201 | User successfully registered |
| 400 | Validation error, invalid input data |

## User Login
`POST /users/login`

Authenticates a user and provides a JWT token.

### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Request Parameters

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| email | String | User's email address | Required, must be a valid email format |
| password | String | User's password | Required, minimum 6 characters |

### Responses

#### Success (200 OK)
```json
{
  "token": "jwt-token-here",
  "user": {
    "_id": "user-id",
    "email": "john.doe@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
```

#### Error (401 Unauthorized)
```json
{
  "error": "Invalid email or password"
}
```

#### Error (400 Bad Request)
```json
{
  "errors": [
    {
      "value": "invalid-email",
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | User successfully authenticated |
| 400 | Validation error, invalid input data |
| 401 | Authentication failed |
| 500 | Server error |

## User Profile
`GET /users/profile`

Retrieves the authenticated user's profile. Requires authentication.

### Headers
```
Authorization: Bearer jwt-token-here
```
or
Cookie with token

### Responses

#### Success (200 OK)
```json
{
  "success": true,
  "profile": {
    "_id": "user-id",
    "email": "john.doe@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
```

#### Error (401 Unauthorized)
```json
{
  "error": "Unauthorized - No token provided"
}
```
or
```json
{
  "error": "Unauthorized - Token has been invalidated"
}
```
or
```json
{
  "error": "Unauthorized - User not found"
}
```
or
```json
{
  "error": "Unauthorized - Invalid token"
}
```

### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Profile successfully retrieved |
| 401 | Unauthorized - invalid or missing token |
| 500 | Server error |

## User Logout
`GET /users/logout`

Logs out the currently authenticated user. Requires authentication.

### Headers
```
Authorization: Bearer jwt-token-here
```
or
Cookie with token

### Responses

#### Success (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

#### Error (401 Unauthorized)
```json
{
  "error": "Unauthorized - No token provided"
}
```
or
```json
{
  "error": "Unauthorized - Token has been invalidated"
}
```
or
```json
{
  "error": "Unauthorized - User not found"
}
```
or
```json
{
  "error": "Unauthorized - Invalid token"
}
```

#### Error (500 Server Error)
```json
{
  "error": "Server error during logout"
}
```

### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | User successfully logged out |
| 401 | Unauthorized - invalid or missing token |
| 500 | Server error |

## Login Page
`GET /users/login` or `GET /users/`

Returns the login page.

### Responses

#### Success (200 OK)
```json
{
  "message": "Login page endpoint"
}
```

### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Login page successfully retrieved | 

## Captain Registration
`POST /captains/register`

Registers a new captain in the system.

### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "captain.john@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "vehicleType": "car",
    "capacity": 4
  }
}
```

### Request Parameters

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| fullname.firstname | String | Captain's first name | Required, minimum 3 characters |
| fullname.lastname | String | Captain's last name | Optional, minimum 3 characters if provided |
| email | String | Captain's email address | Required, must be a valid email format |
| password | String | Captain's password | Required, minimum 6 characters |
| vehicle.color | String | Vehicle color | Required, minimum 3 characters |
| vehicle.plate | String | Vehicle license plate | Required, minimum 3 characters |
| vehicle.vehicleType | String | Type of vehicle | Required, must be one of: 'car', 'bike', 'auto' |
| vehicle.capacity | Number | Vehicle passenger capacity | Required, min: 1, max: 10 |

### Responses

#### Success (201 Created)
```json
{
  "token": "jwt-token-here",
  "captain": {
    "_id": "captain-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain.john@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "vehicleType": "car",
      "capacity": 4
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

#### Error (400 Bad Request) - Validation Error
```json
{
  "errors": [
    {
      "value": "",
      "msg": "Firstname is required",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

#### Error (400 Bad Request) - Captain Already Exists
```json
{
  "message": "Captain already exists"
}
```

### Status Codes

| Status Code | Description |
|-------------|-------------|
| 201 | Captain successfully registered |
| 400 | Validation error or captain already exists | 