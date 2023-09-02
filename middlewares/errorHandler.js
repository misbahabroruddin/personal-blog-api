const errorHandler = (err, req, res, next) => {
  if (err.name === 'credential') {
    res.status(400).json({
      success: false,
      message: 'Invalid credential, please check your username or password',
    });
  } else if (err.name === 'badRequest') {
    res.status(400).json({ success: false, message: 'Bad Request' });
  } else if (err.name === 'unauthorized') {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  } else if (err.name === 'notFound') {
    res.status(404).json({ success: false, message: 'Error Not Found' });
  } else if (err.name === 'dataNotFound') {
    res.status(404).json({ success: false, message: 'Data Not Found' });
  } else if (err.name === 'dataExist') {
    res
      .status(409)
      .json({ success: false, message: 'Email or username already exist' });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      log: err.message,
    });
  }
};

module.exports = errorHandler;
