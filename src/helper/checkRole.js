//To verify the role of user
const verifyRole = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles?.includes(req.user.role)) {
        const error = new Error("Only Admin can check the Category");
        error.status = 404;
        next(error);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
//end

module.exports = {
  verifyRole,
};
