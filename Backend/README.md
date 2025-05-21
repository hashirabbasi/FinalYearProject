# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. This endpoint validates the provided user details, hashes the password, creates the user in the database, and returns a JWT authentication token along with the user object.

## Request Body

Send a JSON object with the following structure:

```
{
  "fullName": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "fullName": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Response

- **201 Created**: User registered successfully. Returns a JSON object with a token and user data.
- **400 Bad Request**: Validation failed. Returns an array of error messages.
- **500 Internal Server Error**: Server error occurred.

### Success Response Example

```
{
  "token": "<jwt_token>",
  "user": {
    "_id": "...",
    "fullName": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
    // ...other fields
  }
}
```

### Error Response Example (Validation)

```
{
  "errors": [
    { "msg": "Invalid email address", "param": "email", ... }
  ]
}
```

## Notes

- All required fields must be present and valid.
- Passwords are securely hashed before storage.
- The endpoint returns a JWT token for authentication after successful registration.

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

Authenticates a user with their email and password. If the credentials are valid, returns a JWT authentication token and the user object.

## Request Body

Send a JSON object with the following structure:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Response

- **200 OK**: Login successful. Returns a JSON object with a token and user data.
- **400 Bad Request**: Validation failed or incorrect credentials. Returns an array of error messages.
- **500 Internal Server Error**: Server error occurred.

### Success Response Example

```
{
  "token": "<jwt_token>",
  "user": {
    "_id": "...",
    "fullName": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
    // ...other fields
  }
}
```

### Error Response Example

```
{
  "errors": [
    { "msg": "Invalid email address", "param": "email", ... }
  ]
}
```

## Notes

- Both fields are required and must be valid.
- Returns a JWT token for authentication upon successful login.
- If credentials are incorrect, a generic error message is returned.

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description

Retrieves the authenticated user's profile information. Requires a valid JWT token (sent via cookie or Authorization header).

## Authentication

- Requires JWT token in `Cookie: token=<jwt_token>` or `Authorization: Bearer <jwt_token>` header.

## Response

- **200 OK**: Returns the user object.
- **401 Unauthorized**: If the token is missing, invalid, expired, or blacklisted.

### Success Response Example

```
{
  "user": {
    "_id": "...",
    "fullName": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
    // ...other fields
  }
}
```

### Error Response Example

```
{
  "error": "Unauthorized - Invalid or expired token"
}
```

## Notes

- Only accessible to authenticated users.
- Returns the current user's profile data.

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie.

## Authentication

- Requires JWT token in `Cookie: token=<jwt_token>` or `Authorization: Bearer <jwt_token>` header.

## Response

- **200 OK**: Logout successful.
- **401 Unauthorized**: If the token is missing, invalid, expired, or blacklisted.

### Success Response Example

```
{
  "message": "Logged out successfully"
}
```

### Error Response Example

```
{
  "error": "Unauthorized - Invalid or expired token"
}
```

## Notes

- After logout, the token is blacklisted and cannot be used again.
- The authentication cookie is cleared.
- Only accessible to authenticated users.
