import Ladder from "./Ladder";
import Ratings from "./Ratings";
import UpcomingContests from "./UpcomingContests";

function Container() {
  return (
    <div className="container">
      <Ratings />
      <Ladder />
      <UpcomingContests />
    </div>
  );
}

export default Container;
