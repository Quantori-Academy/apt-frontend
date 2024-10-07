import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { UserTableColumn } from "@/types";

const users = [
  {
    id: 1,
    username: "tammyfernandez",
    firstName: "Paige",
    lastName: "Avila",
    email: "chandlerchristopher@gmail.com",
    role: "Admin",
    lastLogin: "2024-04-24",
  },
  {
    id: 2,
    username: "caroline74",
    firstName: "Kathleen",
    lastName: "Hanna",
    email: "joshua84@hotmail.com",
    role: "Admin",
    lastLogin: "2023-10-23",
  },
  {
    id: 3,
    username: "glensingh",
    firstName: "Jesus",
    lastName: "Sanders",
    email: "charlotte45@gmail.com",
    role: "Researcher",
    lastLogin: "2023-07-10",
  },
  {
    id: 4,
    username: "debraharding",
    firstName: "Scott",
    lastName: "Simmons",
    email: "hhayes@brooks-hall.com",
    role: "Admin",
    lastLogin: "2023-03-04",
  },
  {
    id: 5,
    username: "shawnjones",
    firstName: "Felicia",
    lastName: "Ortiz",
    email: "tanyakemp@bruce-martinez.com",
    role: "Procurement Officer",
    lastLogin: "2024-09-23",
  },
  {
    id: 6,
    username: "wzavala",
    firstName: "Beth",
    lastName: "Kelley",
    email: "beth_kelley@example.com",
    role: "Researcher",
    lastLogin: "2024-03-10",
  },
  {
    id: 7,
    username: "marcus.jones",
    firstName: "Marcus",
    lastName: "Jones",
    email: "marcus.jones@example.com",
    role: "Admin",
    lastLogin: "2024-08-10",
  },
  {
    id: 8,
    username: "david_williams",
    firstName: "David",
    lastName: "Williams",
    email: "david.williams@example.com",
    role: "Procurement Officer",
    lastLogin: "2023-12-05",
  },
  {
    id: 9,
    username: "linda_smith",
    firstName: "Linda",
    lastName: "Smith",
    email: "linda.smith@example.com",
    role: "Researcher",
    lastLogin: "2024-07-15",
  },
  {
    id: 10,
    username: "roberthughes",
    firstName: "Robert",
    lastName: "Hughes",
    email: "roberthughes@example.com",
    role: "Admin",
    lastLogin: "2024-04-25",
  },
  {
    id: 11,
    username: "tiffanybrown",
    firstName: "Tiffany",
    lastName: "Brown",
    email: "tiffany.brown@example.com",
    role: "Admin",
    lastLogin: "2024-03-03",
  },
  {
    id: 12,
    username: "kennedyjackson",
    firstName: "Kennedy",
    lastName: "Jackson",
    email: "kennedy.jackson@example.com",
    role: "Moderator",
    lastLogin: "2024-08-22",
  },
  {
    id: 13,
    username: "emilyjones",
    firstName: "Emily",
    lastName: "Jones",
    email: "emily.jones@example.com",
    role: "User",
    lastLogin: "2023-11-15",
  },
  {
    id: 14,
    username: "richardgarcia",
    firstName: "Richard",
    lastName: "Garcia",
    email: "richard.garcia@example.com",
    role: "Admin",
    lastLogin: "2023-12-28",
  },
  {
    id: 15,
    username: "michelleturner",
    firstName: "Michelle",
    lastName: "Turner",
    email: "michelle.turner@example.com",
    role: "User",
    lastLogin: "2024-06-07",
  },
  {
    id: 16,
    username: "stephaniewatson",
    firstName: "Stephanie",
    lastName: "Watson",
    email: "stephanie.watson@example.com",
    role: "Moderator",
    lastLogin: "2024-05-18",
  },
  {
    id: 17,
    username: "brandonmartinez",
    firstName: "Brandon",
    lastName: "Martinez",
    email: "brandon.martinez@example.com",
    role: "Admin",
    lastLogin: "2024-01-21",
  },
  {
    id: 18,
    username: "ashleyparker",
    firstName: "Ashley",
    lastName: "Parker",
    email: "ashley.parker@example.com",
    role: "User",
    lastLogin: "2023-08-13",
  },
  {
    id: 19,
    username: "nathansanders",
    firstName: "Nathan",
    lastName: "Sanders",
    email: "nathan.sanders@example.com",
    role: "Moderator",
    lastLogin: "2023-10-29",
  },
  {
    id: 20,
    username: "jenniferhall",
    firstName: "Jennifer",
    lastName: "Hall",
    email: "jennifer.hall@example.com",
    role: "Admin",
    lastLogin: "2024-02-16",
  },
  {
    id: 21,
    username: "anthonyjohnson",
    firstName: "Anthony",
    lastName: "Johnson",
    email: "anthony.johnson@example.com",
    role: "User",
    lastLogin: "2024-07-03",
  },
  {
    id: 22,
    username: "kimberlyadams",
    firstName: "Kimberly",
    lastName: "Adams",
    email: "kimberly.adams@example.com",
    role: "Moderator",
    lastLogin: "2024-03-27",
  },
  {
    id: 23,
    username: "chrismoore",
    firstName: "Chris",
    lastName: "Moore",
    email: "chris.moore@example.com",
    role: "Admin",
    lastLogin: "2023-10-07",
  },
  {
    id: 24,
    username: "saragarcia",
    firstName: "Sara",
    lastName: "Garcia",
    email: "sara.garcia@example.com",
    role: "User",
    lastLogin: "2024-09-19",
  },
  {
    id: 25,
    username: "lisaanderson",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@example.com",
    role: "Moderator",
    lastLogin: "2023-12-11",
  },
  {
    id: 26,
    username: "patrickmiller",
    firstName: "Patrick",
    lastName: "Miller",
    email: "patrick.miller@example.com",
    role: "Admin",
    lastLogin: "2024-05-14",
  },
  {
    id: 27,
    username: "meganbrown",
    firstName: "Megan",
    lastName: "Brown",
    email: "megan.brown@example.com",
    role: "User",
    lastLogin: "2023-11-09",
  },
  {
    id: 28,
    username: "joshuaallen",
    firstName: "Joshua",
    lastName: "Allen",
    email: "joshua.allen@example.com",
    role: "Moderator",
    lastLogin: "2024-06-21",
  },
  {
    id: 29,
    username: "allisonclark",
    firstName: "Allison",
    lastName: "Clark",
    email: "allison.clark@example.com",
    role: "User",
    lastLogin: "2024-04-06",
  },
  {
    id: 30,
    username: "jamesking",
    firstName: "James",
    lastName: "King",
    email: "james.king@example.com",
    role: "Admin",
    lastLogin: "2023-09-28",
  },
  {
    id: 31,
    username: "lilyhernandez",
    firstName: "Lily",
    lastName: "Hernandez",
    email: "lily.hernandez@example.com",
    role: "Moderator",
    lastLogin: "2024-07-24",
  },
  {
    id: 32,
    username: "michaelmorris",
    firstName: "Michael",
    lastName: "Morris",
    email: "michael.morris@example.com",
    role: "Admin",
    lastLogin: "2024-02-09",
  },
  {
    id: 33,
    username: "amandahall",
    firstName: "Amanda",
    lastName: "Hall",
    email: "amanda.hall@example.com",
    role: "User",
    lastLogin: "2024-09-01",
  },
  {
    id: 34,
    username: "justinjones",
    firstName: "Justin",
    lastName: "Jones",
    email: "justin.jones@example.com",
    role: "Moderator",
    lastLogin: "2023-10-30",
  },
  {
    id: 35,
    username: "charlottebaker",
    firstName: "Charlotte",
    lastName: "Baker",
    email: "charlotte.baker@example.com",
    role: "Admin",
    lastLogin: "2023-11-14",
  },
  {
    id: 36,
    username: "danielscott",
    firstName: "Daniel",
    lastName: "Scott",
    email: "daniel.scott@example.com",
    role: "User",
    lastLogin: "2024-05-06",
  },
  {
    id: 37,
    username: "rebeccawilson",
    firstName: "Rebecca",
    lastName: "Wilson",
    email: "rebecca.wilson@example.com",
    role: "Moderator",
    lastLogin: "2024-04-18",
  },
  {
    id: 38,
    username: "nicholasyoung",
    firstName: "Nicholas",
    lastName: "Young",
    email: "nicholas.young@example.com",
    role: "Admin",
    lastLogin: "2024-03-01",
  },
  {
    id: 39,
    username: "ethandavis",
    firstName: "Ethan",
    lastName: "Davis",
    email: "ethan.davis@example.com",
    role: "User",
    lastLogin: "2023-10-02",
  },
  {
    id: 40,
    username: "victoriaharris",
    firstName: "Victoria",
    lastName: "Harris",
    email: "victoria.harris@example.com",
    role: "Moderator",
    lastLogin: "2023-12-31",
  },
  {
    id: 41,
    username: "kylethomas",
    firstName: "Kyle",
    lastName: "Thomas",
    email: "kyle.thomas@example.com",
    role: "Admin",
    lastLogin: "2024-08-29",
  },
  {
    id: 42,
    username: "emilymartinez",
    firstName: "Emily",
    lastName: "Martinez",
    email: "emily.martinez@example.com",
    role: "User",
    lastLogin: "2023-12-23",
  },
  {
    id: 43,
    username: "alexcook",
    firstName: "Alex",
    lastName: "Cook",
    email: "alex.cook@example.com",
    role: "Admin",
    lastLogin: "2024-06-15",
  },
  {
    id: 44,
    username: "oliverward",
    firstName: "Oliver",
    lastName: "Ward",
    email: "oliver.ward@example.com",
    role: "Moderator",
    lastLogin: "2023-07-18",
  },
  {
    id: 45,
    username: "jenniferbrooks",
    firstName: "Jennifer",
    lastName: "Brooks",
    email: "jennifer.brooks@example.com",
    role: "User",
    lastLogin: "2024-03-12",
  },
  {
    id: 46,
    username: "andrewgreen",
    firstName: "Andrew",
    lastName: "Green",
    email: "andrew.green@example.com",
    role: "Admin",
    lastLogin: "2024-01-25",
  },
  {
    id: 47,
    username: "kathrynphillips",
    firstName: "Kathryn",
    lastName: "Phillips",
    email: "kathryn.phillips@example.com",
    role: "Moderator",
    lastLogin: "2023-09-12",
  },
  {
    id: 48,
    username: "davidcollins",
    firstName: "David",
    lastName: "Collins",
    email: "david.collins@example.com",
    role: "User",
    lastLogin: "2024-08-17",
  },
  {
    id: 49,
    username: "elizabethhall",
    firstName: "Elizabeth",
    lastName: "Hall",
    email: "elizabeth.hall@example.com",
    role: "Admin",
    lastLogin: "2023-10-08",
  },
  {
    id: 50,
    username: "henryanderson",
    firstName: "Henry",
    lastName: "Anderson",
    email: "henry.anderson@example.com",
    role: "User",
    lastLogin: "2024-07-01",
  },
];
const columns: UserTableColumn[] = [
  { label: "Username", key: "username" },
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Role", key: "role" },
  { label: "Last Login", key: "lastLogin" },
  { label: "Actions", key: "actions" },
];
const UsersTable = () => {
  const handleEdit = (userId: number) => {
    console.log(`Edit user with id: ${userId}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {columns.map((column) => {
                if (column.key !== "actions") {
                  return (
                    <TableCell key={column.key}>
                      {user[column.key as keyof typeof user]}
                    </TableCell>
                  );
                }
              })}
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
