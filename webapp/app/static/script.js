// Script for calling backend to fetch user revenue

async function getRevenue() {
    const user_name = document.getElementById("user_name").value.trim();
    const result = document.getElementById("result");

    if (!user_name) {
        result.textContent = "Please enter a valid User name.";
        return;
    }

    result.textContent = "Loading revenue data...";

    try {
        const res = await fetch(`/api/revenue/${user_name}`);
        if (!res.ok) {
            result.textContent = "Error fetching revenue. User may not exist.";
            return;
        }

        const data = await res.json();
        result.textContent = `Revenue for user ${user_name}: $${data.revenue}`;
    } catch (err) {
        console.error(err);
        result.textContent = "Connection error. Backend may be offline.";
    }
}

async function addUser() {
    const name = document.getElementById("newUserName").value.trim();
    const revenue = parseFloat(document.getElementById("newUserRevenue").value);

    const result = document.getElementById("addResult");

    if (!name || isNaN(revenue)) {
        result.textContent = "Please enter valid name and revenue.";
        return;
    }

    try {
        const res = await fetch('/api/add_user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, revenue })
        });

        const data = await res.json();
        if (res.ok) {
            result.textContent = `User added: ${data.message}`;
        } else {
            result.textContent = `Error: ${data.error}`;
        }
    } catch (err) {
        console.error(err);
        result.textContent = "Connection error.";
    }
}
