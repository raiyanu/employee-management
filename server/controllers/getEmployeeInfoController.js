import Employee from "../models/employeeModel.js";
import asyncHandler from "express-async-handler";

const getEmployeeInfo = asyncHandler(async (req, res) => {
    // const count = await Employee.countDocuments({
    //     $or: [
    //         { f_Name: { $exists: false } },
    //         { f_Email: { $exists: false } },
    //         { f_Mobile: { $exists: false } },
    //         { f_Designation: { $exists: false } },
    //         { f_Gender: { $exists: false } },
    //         { f_Name: null },
    //         { f_Email: null },
    //         { f_Mobile: null },
    //         { f_Designation: null },
    //         { f_Gender: null },
    //     ],
    // });
    const count = await Employee.countDocuments({});

    console.log(`Employees with missing details:`, count);
    const employeeInfo = {
        count
    };
    res.json(employeeInfo);
});

export default getEmployeeInfo;
