<<<<<<< HEAD
const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"]
};

// Get all role names
const roleNames=Object.keys(roles);
console.log(roleNames);

// Check if student can delete
const canStudentDelete=roles.student.includes("delete");
console.log(canStudentDelete);

// Create a flat list of all unique permissions
const allPermissions=[...new Set(Object.values(roles).flat())];
console.log(allPermissions);

// Add new role moderator immutably
const updatedRoles={...roles,
moderator:["update","view"]
};
=======
const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"]
};

// Get all role names
const roleNames=Object.keys(roles);
console.log(roleNames);

// Check if student can delete
const canStudentDelete=roles.student.includes("delete");
console.log(canStudentDelete);

// Create a flat list of all unique permissions
const allPermissions=[...new Set(Object.values(roles).flat())];
console.log(allPermissions);

// Add new role moderator immutably
const updatedRoles={...roles,
moderator:["update","view"]
};
>>>>>>> bc7e11e893e90bae82fa6cea550446fe035f972e
console.log(updatedRoles);