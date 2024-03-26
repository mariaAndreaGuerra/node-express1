const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    const developers = req.body.developers;
    const results = await Promise.all(
      developers.map(async d => {
        const response = await axios.get(`https://api.github.com/users/${d}`);
        return response.data;
      })
    );
    const out = results.map(r => ({ name: r.name, bio: r.bio }));

    return res.json(out);
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});