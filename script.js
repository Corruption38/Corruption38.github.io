// script.js
const fetchButton = document.getElementById('fetchButton');
const imageContainer = document.getElementById('imageContainer');
const webhookURL = 'https://webhook.site/92f623f6-9a2f-4e30-b81b-f03b5558f4ef';
const searchKeyword = 'chunie';

fetchButton.addEventListener('click', async () => {
    try {
        const response = await fetch(`https://e621.net/search/posts.json?tags=${searchKeyword}`);
        const data = await response.json();
        const imageUrl = data.posts[0].file.url;

        const image = document.createElement('img');
        image.src = imageUrl;
        imageContainer.innerHTML = '';
        imageContainer.appendChild(image);

        // Send image URL to the webhook
        await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl }),
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
