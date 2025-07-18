import { UserOption } from "./side-sheet.types";

// Avatar color palette for random assignment with dark mode support
export const avatarColors = [
    "bg-red-500 dark:bg-red-600 text-white",
    "bg-blue-500 dark:bg-blue-600 text-white",
    "bg-green-500 dark:bg-green-600 text-white",
    "bg-yellow-500 dark:bg-yellow-600 text-white",
    "bg-purple-500 dark:bg-purple-600 text-white",
    "bg-pink-500 dark:bg-pink-600 text-white",
    "bg-indigo-500 dark:bg-indigo-600 text-white",
    "bg-orange-500 dark:bg-orange-600 text-white",
    "bg-teal-500 dark:bg-teal-600 text-white",
    "bg-cyan-500 dark:bg-cyan-600 text-white",
];

// Function to get consistent color for a user
export const getUserAvatarColor = (userId: number) => {
    return avatarColors[userId % avatarColors.length];
};

// Mock user data for email autocomplete
export const mockUsers = [
    { id: 1, email: "john.doe@company.com", name: "John Doe", department: "Engineering" },
    { id: 2, email: "jane.smith@company.com", name: "Jane Smith", department: "Marketing" },
    { id: 3, email: "mike.johnson@company.com", name: "Mike Johnson", department: "Sales" },
    { id: 4, email: "sarah.wilson@company.com", name: "Sarah Wilson", department: "HR" },
    { id: 5, email: "david.brown@company.com", name: "David Brown", department: "Engineering" },
    { id: 6, email: "lisa.davis@company.com", name: "Lisa Davis", department: "Finance" },
    { id: 7, email: "tom.miller@company.com", name: "Tom Miller", department: "Operations" },
    { id: 8, email: "anna.garcia@company.com", name: "Anna Garcia", department: "Design" },
    { id: 9, email: "chris.martinez@company.com", name: "Chris Martinez", department: "Support" },
    { id: 10, email: "emily.taylor@company.com", name: "Emily Taylor", department: "Product" },
    { id: 11, email: "alex.anderson@company.com", name: "Alex Anderson", department: "Engineering" },
    { id: 12, email: "maria.rodriguez@company.com", name: "Maria Rodriguez", department: "Marketing" },
    { id: 13, email: "james.white@company.com", name: "James White", department: "Sales" },
    { id: 14, email: "jennifer.lee@company.com", name: "Jennifer Lee", department: "HR" },
    { id: 15, email: "robert.clark@company.com", name: "Robert Clark", department: "Finance" },
];

// Transform mock users to react-select options
export const userOptions: UserOption[] = mockUsers.map(user => ({
    value: user.email,
    label: user.name,
    id: user.id,
    email: user.email,
    name: user.name,
    department: user.department
}));
