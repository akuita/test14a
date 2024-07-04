# Authentication with NextAuth

### 1. Setup next/auth server

```javascript
// Setup in .env if you want to custom the next auth server or want to run it on another port.
NEXTAUTH_URL=http://localhost:3000
// Not providing any secret or NEXTAUTH_SECRET will throw an error in production.
NEXTAUTH_SECRET=xxx
```

### 2. Check authentication info

Use below hook to check authentication info

```javascript
import { useAuthenticationData } from '@services/authentication'

const authData = useAuthenticationData()
```

Or you can get anywhere

```javascript
import sessionStorage from '@utils/sessionStorage'

const authenticationInfo = sessionStorage.getAuthenticationInfo()
```