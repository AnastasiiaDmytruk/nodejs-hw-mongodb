export const middlewareNotFoundHandler = (req, res) => {
  res.status(404).json({
    message: `${req.url} not found`,
  });
};
