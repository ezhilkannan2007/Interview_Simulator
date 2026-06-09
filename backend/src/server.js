require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AI Interview Simulator backend listening on port ${PORT}`);
});
