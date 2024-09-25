import connectDB from "./config/db.js";
import Employee from "./models/employeeModel.js";
import fs from "fs";

let malepic = 1,
	femalepic = 1;

await connectDB();

let emp = await Employee.find();

for (let i = 0; i < emp.length; i++) {
	if (emp[i].f_Gender == "female") {
		if (femalepic == 4) {
			femalepic = 1;
		}
		console.log("femalepic:", femalepic);
		let updatedFemale = await Employee.findByIdAndUpdate(emp[i]._id, {
			f_Image: {
				data: await fs.readFileSync(`./img/w${femalepic++}.jpg`),
				contentType: "image/jpeg",
			},
		});
		// console.log("updatedFemale:", updatedFemale);
	} else {
		if (malepic == 4) {
			malepic = 1;
		}
		console.log("malepic:", malepic);
		let updatedMale = await Employee.findByIdAndUpdate(emp[i]._id, {
			f_Image: {
				data: await fs.readFileSync(`./img/m${malepic++}.jpg`),
				contentType: "image/jpeg",
			},
		});
		// console.log("updatedMale:", updatedMale);
	}
}

// console.log("emp:", emp);

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
