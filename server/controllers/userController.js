import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user/set Token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
	console.log("data:", req.body); // TODO : REMOVE THIS
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) {
		res.status(400);
		throw new Error("Invalid user data : username and Password are required");
	}
	const user = await User.findOne({
		username,
	});
	if (user && (await user.matchPassword(password))) {
		let token = generateToken(res, user._id);
		res
			.status(200)
			.cookie(
				"user",
				JSON.stringify({
					_id: user._id,
					username: user.username,
					isLogged: true,
				})
			)
			.redirect(process.env.CLIENT_URL + "/admin");
	} else {
		res.status(401);
		throw new Error("Invalid username or password");
	}
});

// @desc Register user
// route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	console.log(req.body); // TODO : REMOVE THIS
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	if (!username || !email || !password) {
		res.status(400);
		throw new Error(
			"Invalid user data : username, Email and Password are required"
		);
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		console.log(userExists + "User already exists");
		throw new Error("User already exists");
	} else {
		console.log("Creating user...");
		const user = await User.create({
			username,
			email,
			password,
		});
		if (user) {
			generateToken(res, user._id);
			res.status(201).json({
				_id: user._id,
				username: user.username,
				email: user.email,
			});
			console.log("User created");
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	}
});

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
	console.log("Logging out user JWT : ", req.cookies.jwt); // TODO : REMOVE
	if (!req.cookies.jwt) {
		res.status(400);
		throw new Error("Users is not logged in");
	}
	res.cookie("jwt", "", {
		expires: new Date(Date.now() + 3 * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV === "PRODUCTION" ? true : false,
		sameSite: "strict",
	});
	res.cookie("user", "", {
		expires: new Date(Date.now() + 3 * 1000),
		sameSite: "strict",
	});
	res.status(200).redirect(process.env.CLIENT_URL ?? +"/");
});

// @desc Logout user
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = {
		_id: req.user._id,
		username: req.user.username,
		email: req.user.email,
	};
	console.log(user); // TODO : REMOVE
	res.status(200).json({
		user,
	});
});

// @desc Update user
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	console.log(user); // TODO : REMOVE
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}
	if (user.email !== req.body.email) {
		res.status(400);
		throw new Error("Email cannot be updated");
	}
	user.username = req.body.username || user.username;
	// user.email = req.body.email || user.email;
	// TODO:If password is provided , need sine re consideration
	if (req.body.password) {
		user.password = req.body.password;
	}
	const updatedUser = await user.save();
	generateToken(res, updatedUser._id);
	res.status(200).json({
		_id: updatedUser._id,
		username: updatedUser.username,
		email: updatedUser.email,
	});
	console.log("User updated:");
	console.log(updatedUser);
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
};
