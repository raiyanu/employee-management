import jwt from "jsonwebtoken";

const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 3 * 24 * 3600000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION" ? true : false,
    sameSite: "strict",
  });
};

export default generateToken;
