const { ROLE } = require("../constant/role.const");

//To verify the role of user
const verifyRole = (req, res, next) => {
  try {
    if(req.user.role === ROLE.CUSTOMER){
        const error = new Error('Only Admin can check the Category');
        error.status = 404;
        next(error);
    }
    next()
  
  } catch (error) {
    next(error);
  }
};

//end

module.exports = {
  verifyRole,
};
