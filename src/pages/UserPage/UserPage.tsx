import { useParams } from "react-router-dom";

const UserPage: React.FC = () => {
  const { id } = useParams();
  return (
    <div>
      <h3>User page</h3>
      <p>Id: {id}</p>
    </div>
  );
};

export default UserPage;
