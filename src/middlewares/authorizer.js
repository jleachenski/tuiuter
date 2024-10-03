export default (roles = []) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
