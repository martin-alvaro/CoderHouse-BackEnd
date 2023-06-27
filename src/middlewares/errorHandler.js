export const errorHandler = (error, req, res, next) => {
    console.error(error);
  
    const status = error.status || 500; 
    const message = error.message || 'Server Error';
  
    res.status(status).json({ error: message });
  };
  