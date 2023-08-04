// script.js
const fetchButton = document.getElementById('fetchButton');
const imageContainer = document.getElementById('imageContainer');
const serverURL = 'http://localhost:3000/send-email'; // Change to your server's URL
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

    // Send image URL and message to the server
    const webhookData = {
      imageUrl,
      message: 'test'
    };

    await fetch(serverURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
