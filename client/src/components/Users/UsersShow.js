import React from "react";
import CircularSlider from "@fseehawer/react-circular-slider";
import CrosshairsQuestionIcon from "mdi-react/CrosshairsQuestionIcon";
import SummitIcon from "mdi-react/SummitIcon";
import { fetchUser, fetchSubmissions, fetchQuizzes } from "../../actions/index";
import Card from "../Card";
import Loader from "../Loader";
import { formatDateToMMDDYY } from "../../api/general";
import RenderQuizList from "../RenderQuizList";
/**
 * Displays a singular uses information
 */
class UsersShow extends React.Component {
  state = { user: null, submissions: null, allQuizzes: null };
  componentDidMount() {
    this.fetchUserData();
  }
  /**
   * Fetches the userdata from the database
   */
  fetchUserData = async () => {
    const userName = this.props.match.params.name;
    const user = await fetchUser(userName);
    const query = {
      find: { user: user._id },
      limit: 10,
      sort: "desc",
    };
    const submissions = await fetchSubmissions(query);
    const allQuizzes = await fetchQuizzes();
    this.setState({
      user: user,
      submissions: submissions,
      allQuizzes: allQuizzes,
    });
  };
  /**
   * Renders the list of submissions that the user has made
   * @returns {JSX}
   */
  renderRecentSubmissions = () => {
    if (this.state.submissions.length === 0) {
      return <div className="py-4">No Submissions Made Yet</div>;
    }
    return this.state.submissions.map((submission, index) => {
      return (
        <div className="flex justify-between border-b py-2" key={index}>
          <div className="flex space-x-2">
            <p>{submission.quiz.name}</p>
          </div>
          <div>
            <p>
              Score : {submission.correct}/{submission.quiz.questions.length}
            </p>
          </div>
        </div>
      );
    });
  };
  /**
   * Calculate the average score the user has attained throughout their submissions
   * @returns {Number}
   */
  calculateSubmissionAverage = () => {
    if (this.state.submissions.length === 0 || !this.state.submissions) {
      return 0;
    }
    var sum = 0;
    for (var i = 0; i < this.state.submissions.length; i++) {
      sum += parseInt(
        (this.state.submissions[i].correct /
          this.state.submissions[i].quiz.questions.length) *
          100,
        10
      ); //don't forget to add the base
    }

    var avg = sum / this.state.submissions.length;
    return avg;
  };
  /**
   * Get perfects the users has achieved on unique quizzes
   * @returns {Number}
   */
  getUniquePerfectQuizSubmissions = () => {
    function onlyUnique(value, index, self) {
      return (
        self.indexOf(value) === index &&
        value.correct === value.quiz.questions.length
      );
    }
    var unique = this.state.submissions.filter(onlyUnique);
    return unique;
  };
  render() {
    if (!this.state.user) {
      return <Loader />;
    }
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
                    <div className="font-semibold">User Name</div>
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
                    <div className="flex space-x-2 items-center">
                      <SummitIcon size={24} />
                      <p>Points</p>
                    </div>
                    <div>
                      <p>{this.state.user.points}</p>
                    </div>
                  </div>
                  <div className="flex justify-between py-2">
                    <div className="flex space-x-2 items-center">
                      <CrosshairsQuestionIcon size={24} />
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
                      <p className="font-semibold">Completion</p>
                      <p className="text-sm text-gray-600">
                        Strive for Perfection
                      </p>
                    </div>
                    <CircularSlider
                      width={170}
                      label="Solved"
                      labelColor="#DB5461"
                      knobColor="#DB5461"
                      knobDraggable={false}
                      progressColorFrom="#DB5461"
                      progressColorTo="#db313e"
                      progressSize={12}
                      trackColor="#eeeeee"
                      trackSize={8}
                      max={100}
                      appendToValue={"%"}
                      dataIndex={
                        (this.getUniquePerfectQuizSubmissions().length /
                          this.state.allQuizzes.length) *
                        100
                      }
                    />
                  </div>
                }
              />
              <Card
                body={
                  <div className="quizzes-solved flex justify-between items-center py-4">
                    <div>
                      <p className="font-semibold">Recent Solution Avg.</p>
                    </div>
                    <CircularSlider
                      width={170}
                      label="Average"
                      labelColor="#005a58"
                      knobColor="#005a58"
                      knobDraggable={false}
                      progressColorFrom="#00bfbd"
                      progressColorTo="#009c9a"
                      progressSize={12}
                      trackColor="#eeeeee"
                      trackSize={8}
                      max={100}
                      appendToValue={"%"}
                      dataIndex={this.calculateSubmissionAverage()}
                    />
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
                  {this.renderRecentSubmissions()}
                </div>
              }
            />
            <Card
              header={
                <h2 className="text-lg font-semibold">Recent Quizzes Made</h2>
              }
              body={
                <div className="py-4 px-4">
                  <RenderQuizList
                    quizzes={this.state.user.quizzes.slice(0, 5)}
                  />{" "}
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
