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