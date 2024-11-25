

use('test');

// Insert a few documents into the sales collection.
const getInvalidCount = async () => {
    const count = await db.getCollection('employees').countDocuments({
        $or: [
            { f_Name: { $exists: false } },
            { f_Email: { $exists: false } },
            { f_Mobile: { $exists: false } },
            { f_Designation: { $exists: false } },
            { f_Gender: { $exists: false } },
            { f_Name: null },
            { f_Email: null },
            { f_Mobile: null },
            { f_Designation: null },
            { f_Gender: null },
            { f_Id: { $exists: false } },
        ]
    });
    return count;
}
const getEmpCount = async () => {
    const count = await db.getCollection('employees').countDocuments();
    return count;
}

console.log('invalid counts : ', getInvalidCount());
console.log('total count : ', getEmpCount());
