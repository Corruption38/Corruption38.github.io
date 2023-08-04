const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/get-image', async (req, res) => {
  try {
    const response = await fetch('https://e621.net/posts.json?tags=chunie', {
      headers: {
        'User-Agent': 'Your User Agent', // Add a user agent header to mimic a browser request
      },
    });

    const data = await response.json();

    if (data.posts && data.posts.length > 0) {
      const imageUrl = data.posts[0].file.url;

      res.json({ imageUrl });
    } else {
      res.status(404).json({ error: 'No image found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
