const webhookUrl = 'https://webhook.site/92f623f6-9a2f-4e30-b81b-f03b5558f4ef';
const imageElement = document.getElementById('image');
const fetchButton = document.getElementById('fetchButton');

fetchButton.addEventListener('click', () => {
  fetchImage();
});

async function fetchImage() {
  try {
    const response = await fetch('https://your-image-source.com/api?keyword=chunie');
    const data = await response.json();

    if (data.imageUrl) {
      imageElement.src = data.imageUrl;
      sendToWebhook(data.imageUrl);
    }
  } catch (error) {
    console.error(error);
  }
}

async function sendToWebhook(imageUrl) {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });
  } catch (error) {
    console.error(error);
  }
}

fetchImage();
