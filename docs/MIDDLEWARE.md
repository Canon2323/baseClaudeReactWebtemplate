# 🛡️ Middleware Configuration

The middleware system handles route protection, authentication, and request/response modifications in this Next.js application.

## 📍 Location

```
src/middleware.ts
```

**Important:** The middleware file must be at `src/middleware.ts` (same level as `src/app/`) for Next.js App Router to recognize it properly.

## 🔧 What It Does

The middleware intercepts every request before it reaches your pages and handles:

### 1. Route Protection
- Blocks access to protected routes for unauthenticated users
- Redirects unauthorized users to login page
- Checks user permissions for admin routes

### 2. Authentication Checks
- Validates authentication tokens/sessions
- Handles authentication state management
- Manages user session persistence

### 3. Request/Response Modifications
- Adds security headers
- Modifies request/response objects
- Handles CORS policies

### 4. Redirects and Rewrites
- Automatic redirects based on auth state
- URL rewrites for cleaner paths
- Conditional routing based on user roles

## 🚀 How It Works

```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Your middleware logic here
  // - Check authentication
  // - Validate permissions  
  // - Handle redirects
}
```

## ⚙️ Configuration

### Protected Routes
Define protected routes in `src/config/routes.ts`:

```typescript
export const routes = {
  protected: ['/dashboard', '/profile', '/settings'],
  admin: ['/admin', '/admin/*'],
  auth: ['/login', '/register'],
  public: ['/', '/about', '/contact']
};
```

### Matcher Configuration
Control which paths the middleware runs on:

```typescript
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## 🔐 Authentication Integration

### With Supabase Auth
```typescript
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Create Supabase client
  const supabase = createServerClient(/* config */)
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

### With NextAuth.js
```typescript
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(request) {
    // Additional middleware logic
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)
```

## 🛠 Customization

### Adding New Protected Routes
1. Update `src/config/routes.ts`
2. Add route patterns to middleware logic
3. Test with different user states

### Custom Headers
```typescript
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  return response
}
```

### Role-Based Access
```typescript
export function middleware(request: NextRequest) {
  const userRole = getUserRole(request) // Your logic
  
  if (isAdminRoute(pathname) && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }
}
```

## 🔍 Debugging

### Common Issues

1. **Middleware not running:**
   - Check file location: Must be `src/middleware.ts`
   - Verify export: Must export a function named `middleware`
   - Check matcher configuration

2. **Infinite redirects:**
   - Ensure redirect target is not also protected
   - Add proper conditions to prevent loops

3. **Performance issues:**
   - Use matcher to limit middleware scope
   - Avoid heavy operations in middleware
   - Cache authentication checks when possible

### Debug Logging
```typescript
export function middleware(request: NextRequest) {
  console.log('Middleware running for:', request.nextUrl.pathname)
  
  // Your middleware logic
}
```

## 📚 Resources

- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Supabase Auth with Middleware](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [NextAuth.js Middleware](https://next-auth.js.org/configuration/nextjs#middleware)

---

**🛡️ The middleware is your first line of defense for route protection and request handling!**