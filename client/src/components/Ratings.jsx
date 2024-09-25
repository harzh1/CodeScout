import { Box, Text } from "@chakra-ui/react";
import atcoderIcon from "../assets/atcoder.svg";
import codeforcesIcon from "../assets/codeforces.svg";
import codechefIcon from "../assets/codechef.png";
import leetcodeIcon from "../assets/leetcode.svg";
import RatingCard from "./RatingCard";

function Ratings() {
  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" color="black">
        Contest Ratings
      </Text>

      <Box className="ratingContainer">
        <div className="ratings">
          <RatingCard
            platformName="CODEFORCES"
            platformIcon={codeforcesIcon}
            username="harzh1"
            rating={1223}
            ratingChange={-56}
            lastRank={11208}
            userRank="PUPIL"
            outerColor="#91fa91"
          />
          <RatingCard
            platformName="CODECHEF"
            platformIcon={codechefIcon}
            username="harzh1"
            rating={1500}
            ratingChange={-100}
            lastRank={11208}
            userStar={3}
            outerColor="red.200"
          />
          <RatingCard
            platformName="ATCODER"
            platformIcon={atcoderIcon}
            username="harzh1"
            rating={1223}
            ratingChange={-56}
            lastRank={11208}
            userRank="MASTER"
            outerColor="#E2E8F0"
          />
          <RatingCard
            platformName="LEETCODE"
            platformIcon={leetcodeIcon}
            username="harzh1"
            rating={1500}
            ratingChange={-100}
            lastRank={11208}
            userStar={4}
            outerColor="#ffcc66"
          />
        </div>
      </Box>
    </>
  );
}

export default Ratings;
