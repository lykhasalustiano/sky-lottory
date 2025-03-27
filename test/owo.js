async function nigga(username, email, password) {
    const payload = {
        username,
        email,
        password
    }

    console.log(payload)

    const response = await fetch(`http://localhost:3000/v1/account/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            apikey: 'lucky'
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    console.log(data)
}

nigga('lychie', 'lychie@gmail.com', '1929');