const getServerStatus = (req, res) => {
  res.json({ message: 'Server working' });
};

module.exports = { getServerStatus };
