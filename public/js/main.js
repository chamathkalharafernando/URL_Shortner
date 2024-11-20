async function shortenUrl() {
    const urlInput = document.getElementById('url');
    const resultDiv = document.getElementById('result');
    
    try {
        const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: urlInput.value }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            resultDiv.className = 'success';
            resultDiv.innerHTML = `
                <p>Shortened URL: <a href="${data.shortUrl}" target="_blank">
                    ${data.shortUrl}
                </a></p>
            `;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        resultDiv.className = 'error';
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
    
    resultDiv.style.display = 'block';
}