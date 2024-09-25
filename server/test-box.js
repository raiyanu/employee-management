import connectDB from "./config/db.js";
import Employee from "./models/employeeModel.js";

await connectDB();

let emp = await Employee.find();

let female = 0,
	male = 0;

for (let i = 0; i < emp.length; i++) {
	if (emp[i].f_Gender == "female") {
		female++;
	} else {
		male++;
	}
}

console.log("emp:", emp);
console.log("female:", female);
console.log("male:", male);

// const blog = new Blog({
// 	title: "bad title 1.1",
// 	content: "bad content 2.1",
// 	author: emp._id,
// });

// await blog.save();
// console.log(`blog id is ${blog.id}`);
// console.log(`blog:`, blog);

// const oneemp = await emp.findOne();
// console.log("oneemp:", oneemp);
