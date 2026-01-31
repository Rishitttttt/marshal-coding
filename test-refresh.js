import fetch from "node-fetch";

const BASE_URL = "http://localhost:5000/api/auth";

async function testRefreshToken() {
  try {
    console.log("Testing Refresh Token Flow...\n");

    // Step 1: Register a new user
    const testEmail = `test_${Date.now()}@test.com`;
    const testUsername = `testuser_${Date.now()}`;
    
    console.log("1. Registering new user...");
    const registerRes = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: testUsername,
        email: testEmail,
        password: "password123",
      }),
    });
    const registerData = await registerRes.json();
    console.log(`   Status: ${registerRes.status}`);
    console.log(`   Message: ${registerData.message}\n`);

    // Step 2: Login to get tokens
    console.log("2. Logging in...");
    const loginRes = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: testEmail,
        password: "password123",
      }),
    });
    const loginData = await loginRes.json();
    console.log(`   Status: ${loginRes.status}`);
    console.log(`   Has accessToken: ${!!loginData.accessToken}`);
    console.log(`   Message: ${loginData.message}\n`);

    // Step 3: Use refresh token to get new access token
    console.log("3. Refreshing token...");
    const refreshRes = await fetch(`${BASE_URL}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const refreshData = await refreshRes.json();
    console.log(`   Status: ${refreshRes.status}`);
    console.log(`   Has new accessToken: ${!!refreshData.accessToken}`);
    console.log(`   Message: ${refreshData.message}\n`);

    if (refreshRes.status === 200) {
      console.log("SUCCESS! Refresh token endpoint is working!\n");
    } else {
      console.log("FAILED! Status code: " + refreshRes.status + "\n");
    }

  } catch (error) {
    console.error("Error:", error.message);
  }
}

testRefreshToken();
