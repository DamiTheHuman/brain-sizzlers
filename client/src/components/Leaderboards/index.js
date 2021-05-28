import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../actions/";
import Loader from "../Loader";

class LeaderBoards extends React.Component {
  state = { users: null };
  componentDidMount() {
    this.fetchUsers();
  }
  /**
   * Fetches the users with the highest amount of points from the database
   */
  fetchUsers = async () => {
    const response = await fetchUsers({
      limit: 5,
      sort: "points",
      order: "desc",
    });
    this.setState({ users: response.data });
  };
  renderList = () => {
    return this.state.users.map((user, index) => {
      return (
        <div className="flex space-x-4 py-2 items-center" key={index}>
          <div>
            <h3 className="text-xl font-bold">{index + 1}.</h3>
          </div>
          <div>
            <img
              src={user.picture}
              className="rounded-full w-8/12"
              alt={`${user.name}-thumbnail`}
            />
          </div>
          <div className="flex-grow flex justify-between items-center border-t border-b py-4">
            <div className="flex flex-col space-y-2">
              <Link to={`/users/${user.name}`} className="text-xl text-primary">
                {user.name}
              </Link>
              <p className="text-gray-300">{user.points} Points</p>
            </div>
          </div>
          <Link to={`/users/${user.name}`}>
            <Button>View Profile</Button>
          </Link>
        </div>
      );
    });
  };
  render() {
    if (!this.state.users) {
      return <Loader />;
    }
    return <div className="leader-boards px-32">{this.renderList()}</div>;
  }
}

export default LeaderBoards;
