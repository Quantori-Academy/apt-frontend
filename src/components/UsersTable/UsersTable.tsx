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

import { UserTableColumn, UserTableProps } from "@/types";

// const staticUsers = [
//   {
//     id: 1,
//     username: "tammyfernandez",
//     firstName: "Paige",
//     lastName: "Avila",
//     email: "chandlerchristopher@gmail.com",
//     role: "Admin",
//   },
//   {
//     id: 2,
//     username: "caroline74",
//     firstName: "Kathleen",
//     lastName: "Hanna",
//     email: "joshua84@hotmail.com",
//     role: "Admin",
//   },
//   {
//     id: 3,
//     username: "glensingh",
//     firstName: "Jesus",
//     lastName: "Sanders",
//     email: "charlotte45@gmail.com",
//     role: "Researcher",
//   },
//   {
//     id: 4,
//     username: "debraharding",
//     firstName: "Scott",
//     lastName: "Simmons",
//     email: "hhayes@brooks-hall.com",
//     role: "Admin",
//   },
//   {
//     id: 5,
//     username: "shawnjones",
//     firstName: "Felicia",
//     lastName: "Ortiz",
//     email: "tanyakemp@bruce-martinez.com",
//     role: "Procurement Officer",
//   },
//   {
//     id: 6,
//     username: "wzavala",
//     firstName: "Beth",
//     lastName: "Kelley",
//     email: "beth_kelley@example.com",
//     role: "Researcher",
//   },
//   {
//     id: 7,
//     username: "marcus.jones",
//     firstName: "Marcus",
//     lastName: "Jones",
//     email: "marcus.jones@example.com",
//     role: "Admin",
//   },
//   {
//     id: 8,
//     username: "david_williams",
//     firstName: "David",
//     lastName: "Williams",
//     email: "david.williams@example.com",
//     role: "Procurement Officer",
//   },
//   {
//     id: 9,
//     username: "linda_smith",
//     firstName: "Linda",
//     lastName: "Smith",
//     email: "linda.smith@example.com",
//     role: "Researcher",
//   },
//   {
//     id: 10,
//     username: "roberthughes",
//     firstName: "Robert",
//     lastName: "Hughes",
//     email: "roberthughes@example.com",
//     role: "Admin",
//   },
// ];
const columns: UserTableColumn[] = [
  { label: "Username", key: "username" },
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Role", key: "role" },

  { label: "Actions", key: "actions" },
];
const UsersTable: React.FC<UserTableProps> = ({ users }) => {
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
