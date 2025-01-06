import { Box } from "@chakra-ui/react";
import atcoderIcon from "../assets/atcoder.svg";
import codeforcesIcon from "../assets/codeforces.svg";
import codechefIcon from "../assets/codechef.png";
import leetcodeIcon from "../assets/leetcode.svg";
import RatingCard from "./RatingCard";
import { useEffect, useState } from "react";

function Ratings() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [codeforcesUsername, setCodeforcesUsername] = useState("");
  const [codechefUsername, setCodechefUsername] = useState("");
  const [atcoderUsername, setAtcoderUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");

  const [codeforcesData, setCodeforcesData] = useState(null);
  const [codechefData, setCodechefData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);

  const domain = import.meta.env.VITE_APP_DOMAIN;

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await fetch(
          `${domain}/api/users/${userId}/platforms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        const codeforcesPlatform = data.find(
          (platform) => platform.platformUrl === "codeforces.com"
        );
        if (codeforcesPlatform)
          setCodeforcesUsername(codeforcesPlatform.username);

        const codechefPlatform = data.find(
          (platform) => platform.platformUrl === "codechef.com"
        );
        if (codechefPlatform) setCodechefUsername(codechefPlatform.username);

        const atcoderPlatform = data.find(
          (platform) => platform.platformUrl === "atcoder.jp"
        );
        if (atcoderPlatform) setAtcoderUsername(atcoderPlatform.username);

        const leetcodePlatform = data.find(
          (platform) => platform.platformUrl === "leetcode.com"
        );
        if (leetcodePlatform) setLeetcodeUsername(leetcodePlatform.username);
      } catch (error) {
        console.log("Error fetching platforms:", error);
      }
    };

    fetchPlatforms();
  }, [userId, token]);

  // Fetch Codeforces data
  useEffect(() => {
    const fetchCodeforcesData = async () => {
      if (codeforcesUsername) {
        try {
          const response = await fetch(
            `https://codeforces.com/api/user.rating?handle=${codeforcesUsername}`
          );
          const data = await response.json();

          const contests = data.result;
          const n = contests.length;
          let ratingChange = 0;

          if (n >= 2) {
            const latestRating = contests[n - 1].newRating;
            const previousRating = contests[n - 2].newRating;
            ratingChange = latestRating - previousRating;
            if (ratingChange > 0) ratingChange = "+" + ratingChange;
          }

          setCodeforcesData({
            rating: contests[n - 1].newRating,
            ratingChange,
            lastRank: contests[n - 1].rank,
            userRank: getCodeforcesRank(contests[n - 1].newRating),
          });
        } catch (error) {
          console.log("Error fetching Codeforces data:", error);
        }
      }
    };

    const fetchCodechefData = async () => {
      if (codechefUsername) {
        try {
          const response = await fetch(
            `https://codechef-api.vercel.app/handle/${codechefUsername}`
          );
          const data = await response.json();

          const { ratingData } = data;
          let ratingChange = 0;
          let n = ratingData.length;
          if (ratingData && ratingData.length >= 2) {
            const latestRating = parseInt(ratingData[n - 1].rating);
            const previousRating = parseInt(ratingData[n - 2].rating);
            ratingChange = latestRating - previousRating;
            if (ratingChange > 0) ratingChange = "+" + ratingChange;
          }

          setCodechefData({
            rating: data.currentRating,
            highestRating: data.highestRating,
            lastRank: ratingData[n - 1].rank,
            countryRank: data.countryRank,
            userStar: data.stars ? parseInt(data.stars[0]) : null,
            ratingChange,
          });
        } catch (error) {
          console.log("Error fetching CodeChef data:", error);
        }
      }
    };

    const fetchLeetcodeData = async () => {
      if (leetcodeUsername) {
        try {
          const response = await fetch(
            `https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/contest`
          );
          const data = await response.json();

          const { contestParticipation } = data;
          let ratingChange = 0;
          let n = contestParticipation.length;

          if (contestParticipation && n >= 2) {
            const latestRating = parseInt(contestParticipation[n - 1].rating);
            const previousRating = parseInt(contestParticipation[n - 2].rating);
            ratingChange = latestRating - previousRating;
            if (ratingChange > 0) ratingChange = "+" + ratingChange;
          }

          setLeetcodeData({
            rating: parseInt(data.contestRating),
            lastRank: contestParticipation[n - 1].ranking,
            userRank: parseInt(data.contestRating),
            ratingChange,
          });
        } catch (error) {
          console.log("Error fetching LeetCode data:", error);
        }
      }
    };

    if (codeforcesUsername) fetchCodeforcesData();
    if (codechefUsername) fetchCodechefData();
    if (leetcodeUsername) fetchLeetcodeData();
  }, [codeforcesUsername, codechefUsername, leetcodeUsername]);

  // Function to determine Codeforces rank based on rating
  const getCodeforcesRank = (rating) => {
    if (rating >= 4000) return "TOURIST";
    if (rating >= 3000) return "INTERNATIONAL GRANDMASTER";
    if (rating >= 2400) return "GRANDMASTER";
    if (rating >= 2100) return "MASTER";
    if (rating >= 1900) return "CANDIDATE MASTER";
    if (rating >= 1600) return "EXPERT";
    if (rating >= 1400) return "SPECIALIST";
    if (rating >= 1200) return "PUPIL";
    return "NEWBIE";
  };

  const getCodeforcesColor = (rank) => {
    const colors = {
      NEWBIE: "#A3A3A3",
      PUPIL: "#91fa91", // Updated color for PUPIL
      SPECIALIST: "#6bdb6b",
      EXPERT: "#5bbd6b",
      "CANDIDATE MASTER": "#4e997a",
      MASTER: "#3d786b",
      "INTERNATIONAL MASTER": "#2c6055",
      GRANDMASTER: "#1b4c41",
      "INTERNATIONAL GRANDMASTER": "#0a3728",
      TOURIST: "#FFD700",
    };
    return colors[rank] || "#FFFFFF";
  };

  return (
    <Box className="ratingContainer" mt={5}>
      <div className="ratings">
        {codeforcesData && (
          <RatingCard
            platformName="CODEFORCES"
            platformIcon={codeforcesIcon}
            username={codeforcesUsername}
            rating={codeforcesData.rating}
            ratingChange={codeforcesData.ratingChange}
            lastRank={codeforcesData.lastRank}
            userRank={codeforcesData.userRank}
            outerColor={getCodeforcesColor(codeforcesData.userRank)}
          />
        )}
        {codechefData && (
          <RatingCard
            platformName="CODECHEF"
            platformIcon={codechefIcon}
            username={codechefUsername}
            rating={codechefData.rating}
            ratingChange={codechefData.ratingChange}
            lastRank={codechefData.lastRank}
            userStar={codechefData.userStar}
            outerColor="red.200"
          />
        )}
        {atcoderUsername && (
          <RatingCard
            platformName="ATCODER"
            platformIcon={atcoderIcon}
            username={atcoderUsername}
            rating={1223}
            ratingChange={-56}
            lastRank={11208}
            userRank="MASTER"
            outerColor="#E2E8F0"
          />
        )}
        {leetcodeData && (
          <RatingCard
            platformName="LEETCODE"
            platformIcon={leetcodeIcon}
            username={leetcodeUsername}
            rating={leetcodeData.rating}
            ratingChange={leetcodeData.ratingChange}
            lastRank={leetcodeData.lastRank}
            userRank={leetcodeData.userRank}
            outerColor="#ffcc66"
          />
        )}
      </div>
    </Box>
  );
}

export default Ratings;
