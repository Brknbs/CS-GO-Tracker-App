const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:steamid', async (req, res) => {
  try {
    const headers = {
      'TRN-Api-Key': process.env.TRACKER_API_KEY
    }
    const steamid = req.params.steamid;
    const response = await fetch(`${process.env.TRACKER_API_URL}/profile/steam/${steamid}`, {
      headers
    });
    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return res.status(404).json({ msg: 'Profile not found.' });
    }

    res.json(data);
  } 
  catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = router;
