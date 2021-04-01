const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

// Static Files
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// API routes
app.use('/api', require('./api/index'));

//Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err });
});

const init = async () => {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`app is listening at port ${port}!`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
