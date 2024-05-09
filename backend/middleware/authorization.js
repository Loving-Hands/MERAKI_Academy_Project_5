// This function checks if the user has a permission the passed permission

const authorization = (string) => {
    return (req, res, next) => {
       // console.log("auth",req.token.role.permissions);
        if (!req.token.role.permissions.includes(string)) {
          return res.status(403).json({
            success: false,
            message: `Unauthorized`,
          });
        }
         console.log('create post');
        next();
      };
  
};

module.exports = authorization;
