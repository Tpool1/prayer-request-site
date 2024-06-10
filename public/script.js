document.getElementById('prayer-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const request = document.getElementById('request').value;

    fetch('/api/prayer-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, request })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadPrayerRequests();
        } else {
            alert('Error submitting prayer request');
        }
    });
});

function loadPrayerRequests() {
    fetch('/api/prayer-requests')
        .then(response => response.json())
        .then(data => {
            const prayerRequestsDiv = document.getElementById('prayer-requests');
            prayerRequestsDiv.innerHTML = '';
            data.prayerRequests.forEach(prayer => {
                const prayerDiv = document.createElement('div');
                prayerDiv.classList.add('prayer-request');
                prayerDiv.innerHTML = `<strong>${prayer.name}</strong><p>${prayer.request}</p>`;
                prayerRequestsDiv.appendChild(prayerDiv);
            });
        });
}

// Load prayer requests on page load
loadPrayerRequests();
