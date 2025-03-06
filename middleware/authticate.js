import jwt from "jsonwebtoken";

const authMiddlewore = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader == null || authHeader == undefined) {
    return res.status(401).json({ message: "unauthorizad" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "unauthorizad" });
    }
    req.user = user;
    next();
  });
};

export default authMiddlewore;

// { "email": "jane.smith@example.com",
//     "password": "password123"}

// {
//     "message": "logged in",
//     "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwibmFtZSI6IkphbmUgU21pdGgiLCJlbWFpbCI6ImphbmUuc21pdGhAZXhhbXBsZS5jb20iLCJwcm9maWxlIjpudWxsLCJpYXQiOjE3NDA5ODc4MjgsImV4cCI6MTc3MjUyMzgyOH0.quZlYlkDQvCjDkAPL96HARZuhI9cDvwNvMm5XB7nJyw"
// }
