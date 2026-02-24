document.addEventListener('DOMContentLoaded', () => {
    fetchMessages();
});

async function fetchMessages() {
    try {
        const response = await fetch('/api/messages');
        const messages = await response.json();
        
        const container = document.getElementById('messages-container');
        container.innerHTML = ''; 

        if (messages.length === 0) {
            container.innerHTML = '<p>Brak nowych wiadomości.</p>';
            return;
        }

        messages.forEach(msg => {
            const div = document.createElement('div');
            div.className = 'msg-card';
            div.innerHTML = `
                <p><strong>Od:</strong> ${msg.email}</p>
                <p><strong>Temat:</strong> ${msg.subject}</p>
                <p><strong>Treść:</strong> ${msg.message}</p>
                <button class="btn btn-edit" onclick="editMessage(${msg.id}, '${msg.subject}', '${msg.message}')">Edytuj</button>
                <button class="btn btn-delete" onclick="deleteMessage(${msg.id})">Usuń</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Błąd pobierania wiadomości:', error);
    }
}

async function deleteMessage(id) {
    if (confirm('Czy na pewno chcesz usunąć tę wiadomość?')) {
        await fetch(`/api/messages/${id}`, {
            method: 'DELETE'
        });
        fetchMessages(); 
    }
}

async function editMessage(id, oldSubject, oldMessage) {
    const newSubject = prompt('Edytuj temat:', oldSubject);
    const newMessage = prompt('Edytuj treść:', oldMessage);

    if (newSubject !== null && newMessage !== null) {
        await fetch(`/api/messages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject: newSubject, message: newMessage })
        });
        fetchMessages(); 
    }
}
