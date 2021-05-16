import React from "react";
import { fetchUser } from "../../actions/index";
import Card from "../Card";
import Loader from "../Loader";
import { formatDateToMMDDYY } from "../../api/general";
/**
 * Displays a singular uses information
 */
class UsersShow extends React.Component {
  state = { user: null };
  componentDidMount() {
    this.fetchUser();
  }
  /**
   * Fetches the user from the database
   */
  fetchUser = async () => {
    const userName = this.props.match.params.name;
    const user = await fetchUser(userName);
    console.log(user);
    this.setState({
      user: user,
    });
  };

  render() {
    if (!this.state.user) {
      return <Loader />;
    }
    console.log(this.state.user.picture);
    return (
      <div className="container py-4">
        <div className="flex space-x-4">
          {/**Left Side */}
          <div className="w-1/3 flex flex-col space-y-4">
            {/**Basic user information */}
            <Card
              header="Basic Profile"
              body={
                <div className="flex items-center space-x-2 justify-between py-2">
                  <img
                    src={this.state.user.picture}
                    className="rounded"
                    alt={`${this.state.user.name}`}
                  />
                  <div>
                    <div className="font-semibold">UserName</div>
                    <div className="text-gray-400">
                      Joined on {formatDateToMMDDYY(this.state.user.createdAt)}
                    </div>
                  </div>
                </div>
              }
            />
            <Card
              header="Contributions"
              body={
                <div className="user-info">
                  <div className="flex justify-between border-b py-2">
                    <div className="flex space-x-2">
                      <p>💯</p>
                      <p>Points</p>
                    </div>
                    <div>
                      <p>{this.state.user.points}</p>
                    </div>
                  </div>
                  <div className="flex justify-between py-2">
                    <div className="flex space-x-2">
                      <p>❔</p>
                      <p>Quizzes Made</p>
                    </div>
                    <div>
                      <p>{this.state.user.quizzes.length}</p>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
          <div className="w-2/3 flex flex-col space-y-4">
            <div className="flex space-x-2">
              <Card
                body={
                  <div className="quizzes-solved flex justify-between items-center py-4">
                    <div>
                      <p>Quizzes Solved</p>
                      <p className="font-semibold">0</p>
                    </div>
                    <div className="w-32 h-32 bg-red-200 rounded-full" />
                  </div>
                }
              />
              <Card
                body={
                  <div className="quizzes-solved flex justify-between items-center py-4">
                    <div>
                      <p>Solution Average</p>
                      <p className="font-semibold">0</p>
                    </div>
                    <div className="w-32 h-32 bg-success rounded-full" />
                  </div>
                }
              />
            </div>
            {/**Render user submissions */}
            <Card
              header={
                <h2 className="text-lg font-semibold">
                  Most recent submissions
                </h2>
              }
              body={
                <div className="user-info">
                  <div className="flex justify-between border-b py-2">
                    <div className="flex space-x-2">
                      <p>Quiz 1</p>
                    </div>
                    <div>
                      <p>Score : 2/3</p>
                    </div>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <div className="flex space-x-2">
                      <p>Quiz 2</p>
                    </div>
                    <div>
                      <p>Score : 3/3</p>
                    </div>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <div className="flex space-x-2">
                      <p>Quiz 2</p>
                    </div>
                    <div>
                      <p>Score : 3/3</p>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UsersShow;
