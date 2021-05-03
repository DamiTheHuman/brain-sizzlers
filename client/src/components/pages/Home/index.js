import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-gray-700 py-32">
        <div className="container text-white flex flex-col items-center">
          <div className="w-2/5">
            <h1 className="text-6xl font-bold">Brain Sizzlers!</h1>
            <div className="flex flex-col py-4">
              <p className="font-semibold text-xl mb-4">
                Want to test your knoweledge on questions others have set on the
                internet? You have to come to the right place! Try and climb the
                leader boards with some sizzlers from across the internet!
              </p>
              <div className="flex items-center justify-between">
                <button className="bg-secondary px-2 py-2 rounded text-black font-semibold">
                  Create your challenge
                </button>
                <p className="font-semibold bg-secondary h-1 flex-grow"></p>
                <p className="font-semibold bg-black h-1 flex-grow"></p>
                <button className="bg-black px-2 py-2 rounded text-white font-semibold">
                  Test your knowledge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="text-4xl  text-center font-bold">Popular Quizzes</h2>
        {/* Load popular quizzes*/}
      </div>
      <div className="container">
        <h2 className="text-4xl text-center font-bold">Leaderboards</h2>
        <h4 className="text-2xl text-center font-bold">
          Not many can say they know everything about nothing, Can you?
        </h4>
        {/* Load Leader Boards*/}
      </div>
    </div>
  );
};

export default Home;
