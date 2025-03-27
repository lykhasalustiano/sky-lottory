async function loginUser(username, password) {
    try {
        const response = await fetch('http://localhost:3000/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed.");
        }

        console.log("✅ Login successful:", data);
        return data;

    } catch (error) {
        console.error("❌ Login error:", error.message);
    }
}
