import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import Blog from "./models/blogModal.js";

await connectDB();

let user = await User.findOne({ email: "z@.c" });

const blog = new Blog({
	title: "bad title 1.1",
	content: "bad content 2.1",
	author: user._id,
});

await blog.save();
console.log(`blog id is ${blog.id}`);
console.log(`blog:`, blog);

const oneuser = await User.findOne();
console.log("oneUser:", oneuser);
