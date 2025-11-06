export const authorizeRole = (reqRole) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const userRole = req.user.role;

      if (userRole === reqRole) {
        next();
      } else {
        return res.status(403).json({ success: false, message: "Access Denied" });
      }

    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
};
