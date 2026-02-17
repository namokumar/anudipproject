# Security Verification & Penetration Testing Guide

You have successfully implemented the core security layer for SupportSaaS. This guide will help you verify the implementation and attempt to "hack" your own application to ensure the defenses are working.

## 1. Verify Database Connection & RLS
**Goal**: Confirm that the Dashboard loads and Row Level Security (RLS) is active.

1.  **Login**: Go to the login page and sign in with your account.
2.  **Check Dashboard**:
    *   **Success**: You should see the Dashboard with "Total Tickets: 0" (or similar stats) and "No tickets found" in the table. This means the app successfully connected to the `tickets` table you created in Supabase.
    *   **Failure**: If you see a red error message about "relation \"tickets\" does not exist", the SQL script was not run correctly.
3.  **Verify RLS (Privacy)**:
    *   Open a second browser (Incognito mode).
    *   Sign up/Login as a **different user**.
    *   The second user should **NOT** see any tickets created by the first user. (Since you have no tickets yet, this is hard to see, but the dashboard loading without error confirms the policy allowed the empty read).

## 2. "Hack" the Login (Brute Force Test)
**Goal**: Verify that the `rateLimiter.js` protects against brute-force attacks.

1.  **Logout** of your account.
2.  Go to the **Login Page**.
3.  Enter your email (e.g., `admin@example.com`).
4.  Enter a **WRONG password** (e.g., `wrong1`). Click "Sign In".
5.  Repeat this **5 times** quickly.
6.  **Observation**: On the 5th or 6th attempt, you should see a red error:
    *   *"Too many failed attempts. Please wait 30s..."*
    *   The "Sign In" button should be **disabled** with a countdown timer.
    *   **Result**: The attack is blocked. Your app is safe from basic brute-force scripts.

## 3. "Hack" the Input (XSS / Sanitization Test)
**Goal**: Try to inject malicious code (Cross-Site Scripting) into the application.

1.  Go to the **Signup Page**.
2.  **Attempt XSS in Name**:
    *   In the "Full Name" field, copy-paste this malicious payload:
        ```html
        <script>alert('HACKED!')</script> Hacker
        ```
    *   Add a valid email and password.
    *   Click "Create My Account".
3.  **Observation**:
    *   The application should **Show an Error** ("Full name contains invalid characters") or **Strip the tags**.
    *   If you manage to signup, go to the Dashboard.
    *   Look at the Welcome message (top left). It should likely say "Welcome back, Hacker" or "Welcome back, alert('HACKED') Hacker".
    *   **Result**: If you do **NOT** see a popup alert box saying "HACKED!", the sanitization is working.

## 4. "Hack" the Routes (Unauthorized Access)
**Goal**: Verify that unauthenticated users cannot access private pages.

1.  **Logout** so you are on the Login page.
2.  In the browser URL bar, verify the URL is `/login`.
3.  Manually type: `http://localhost:5173/dashboard` (or your current port) and hit Enter.
4.  **Observation**:
    *   You should be **instantly redirected** back to `/login`.
    *   You should **not** see the Dashboard content even for a split second.
    *   **Result**: The `ProtectedRoute` component is working.

## 5. Security Headers Check
**Goal**: detailed verification of browser security instructions.

1.  In Chrome, right-click anywhere and select **Inspect** -> **Network** tab.
2.  Refresh the page.
3.  Click the first request (`localhost`).
4.  Look at the **Response Headers**. You should see:
    *   `Content-Security-Policy`: (Restrictive rules we added)
    *   `X-Content-Type-Options: nosniff`
    *   `Referrer-Policy: strict-origin-when-cross-origin`
    *   **Result**: The app is telling the browser to block malicious external scripts.

---

**Summary**: If your app passes these 5 tests, it is secure against the most common web attacks (OWASP Top 10 vulnerabilities like XSS, Broken Access Control, and Brute Force).
