document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('contact-form-js');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, subject, message })
            });

            const result = await response.json();

            if (response.ok) {
                alert('Wiadomość została wysłana pomyślnie!');
                form.reset(); 
            } 
            else {
                alert(`Błąd: ${result.error}`);
            }
        } catch (error) {
            console.error('Błąd podczas komunikacji z serwerem:', error);
            alert('Wystąpił błąd podczas łączenia z serwerem.');
        }
    });
});
