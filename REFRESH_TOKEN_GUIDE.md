# Refresh Token Implementation - Testing Guide

Your refresh token implementation is **fully functional**. Here's how to test it:

## Step-by-Step Test with cURL

### 1. Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }'
```

### 2. Login (get accessToken and refreshToken cookie)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "testuser@example.com",
    "password": "password123"
  }'
```
This will:
- Return the `accessToken` in the response body
- Store the `refreshToken` as an httpOnly cookie in `cookies.txt`

### 3. Use the refresh token to get a new accessToken
```bash
curl -X POST http://localhost:5000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

This will return a new accessToken without requiring the password again.

### 4. Logout
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

---

## How It Works

### Access Token
- **Expiration**: 15 minutes
- **Storage**: Response body (send with Authorization header)
- **Usage**: `Authorization: Bearer <accessToken>`

### Refresh Token
- **Expiration**: 7 days
- **Storage**: httpOnly cookie (automatically sent with requests)
- **Usage**: Automatic with `credentials: include` in fetch

### Complete Flow

1. **Registration** → User is created with hashed password
2. **Login** → 
   - Validates credentials
   - Generates both tokens
   - Stores refreshToken in database
   - Returns accessToken in response
   - Sets httpOnly refreshToken cookie
3. **Access Protected Resources** →
   - Use accessToken in Authorization header
   - When token expires, get new one using refresh endpoint
4. **Refresh** →
   - Send refreshToken cookie (automatic)
   - Verify against database
   - Return new accessToken
5. **Logout** →
   - Clear refreshToken from database
   - Clear httpOnly cookie

---

## Implementation Details

Your implementation includes:

✅ **Database Integration** - refreshToken stored in User model  
✅ **JWT Tokens** - Separate access and refresh token secrets  
✅ **httpOnly Cookies** - Secure refresh token storage  
✅ **Token Validation** - Verifies token matches stored value  
✅ **Logout** - Clears token from database and cookies  

---

## Frontend Integration Example

```javascript
// 1. Login
const loginRes = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important: send cookies
  body: JSON.stringify({ email, password })
});
const { accessToken } = await loginRes.json();
localStorage.setItem('accessToken', accessToken);

// 2. Make API request with accessToken
const apiRes = await fetch('/api/protected-route', {
  headers: { 'Authorization': `Bearer ${accessToken}` },
  credentials: 'include'
});

// 3. If token expires, refresh it
if (apiRes.status === 401) {
  const refreshRes = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include' // Sends refreshToken cookie automatically
  });
  const { accessToken: newToken } = await refreshRes.json();
  localStorage.setItem('accessToken', newToken);
  
  // Retry original request with new token
}

// 4. Logout
await fetch('/api/auth/logout', {
  method: 'POST',
  credentials: 'include'
});
localStorage.removeItem('accessToken');
```

---

## Troubleshooting

### "No refresh token" error
- Make sure cookies are being sent: use `credentials: 'include'` in fetch
- Check that httpOnly cookie is set in login response

### "Invalid refresh token" error  
- Token might be expired (7 day expiration)
- User might have been logged out
- Database refreshToken might be null

### Token not being sent to refresh endpoint
- Missing `credentials: 'include'` in fetch request
- CORS not properly configured
- Cookie not saved after login

---

## Your Current Setup

**Environment Variables** (.env):
- `JWT_ACCESS_SECRET=access_secret_123`
- `JWT_REFRESH_SECRET=refresh_secret_123`
- `DATABASE_URL=postgresql://postgres:rishit2004@localhost:5432/code_discussion`

**Database Field**:
- `User.refreshToken` - Stores the refresh token for verification

**Routes**:
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Get tokens
- `POST /api/auth/refresh` - Get new accessToken
- `POST /api/auth/logout` - Revoke tokens
