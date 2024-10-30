import { Box } from "@chakra-ui/react";
import atcoderIcon from "../assets/atcoder.svg";
import codeforcesIcon from "../assets/codeforces.svg";
import codechefIcon from "../assets/codechef.png";
import leetcodeIcon from "../assets/leetcode.svg";
import RatingCard from "./RatingCard";
import { useEffect, useState } from "react";
import * as cheerio from "cheerio";

function Ratings() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [codeforcesUsername, setCodeforcesUsername] = useState("");
  const [codechefUsername, setCodechefUsername] = useState("");
  const [atcoderUsername, setAtcoderUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        console.log("User ID:", userId);
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}/platforms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("API Response:", data);

        const codeforcesPlatform = data.find(
          (platform) => platform.platformUrl === "codeforces.com"
        );
        if (codeforcesPlatform) {
          setCodeforcesUsername(codeforcesPlatform.username);
        } else {
          console.log("Codeforces platform not found");
        }

        const codechefPlatform = data.find(
          (platform) => platform.platformUrl === "codechef.com"
        );
        if (codechefPlatform) {
          setCodechefUsername(codechefPlatform.username);
        } else {
          console.log("Codechef platform not found");
        }

        const atcoderPlatform = data.find(
          (platform) => platform.platformUrl === "atcoder.jp"
        );
        if (atcoderPlatform) {
          setAtcoderUsername(atcoderPlatform.username);
        } else {
          console.log("Atcoder platform not found");
        }

        const leetcodePlatform = data.find(
          (platform) => platform.platformUrl === "leetcode.com"
        );
        if (leetcodePlatform) {
          setLeetcodeUsername(leetcodePlatform.username);
        } else {
          console.log("Leetcode platform not found");
        }
      } catch (error) {
        console.log("Error fetching platforms:", error);
      }
    };

    const fetchCodechefData = async (username) => {
      const response = await fetch(
        `https://www.codechef.com/users/${username}`
      );
      const html = await response.text();
      const $ = cheerio.load(html);
      const rating = $(".rating-number").text();
      const ratingChange = $(".rating").text();
      const lastRank = $(".rating-ranks").text();
      console.log("Codechef Rating:", rating);
      console.log("Codechef Rating Change:", ratingChange);
      console.log("Codechef Last Rank:", lastRank);
    };

    fetchPlatforms();
    fetchCodechefData("harzh1");
  }, []);

  return (
    <>
      <Box className="ratingContainer" mt={5}>
        <div className="ratings">
          {codeforcesUsername !== "" && (
            <RatingCard
              platformName="CODEFORCES"
              platformIcon={codeforcesIcon}
              username={codeforcesUsername}
              rating={1223}
              ratingChange={-56}
              lastRank={11208}
              userRank="PUPIL"
              outerColor="#91fa91"
            />
          )}
          {codechefUsername !== "" && (
            <RatingCard
              platformName="CODECHEF"
              platformIcon={codechefIcon}
              username={codechefUsername}
              rating={1500}
              ratingChange={-100}
              lastRank={11208}
              userStar={3}
              outerColor="red.200"
            />
          )}
          {atcoderUsername !== "" && (
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
          {leetcodeUsername !== "" && (
            <RatingCard
              platformName="LEETCODE"
              platformIcon={leetcodeIcon}
              username={leetcodeUsername}
              rating={1500}
              ratingChange={-100}
              lastRank={11208}
              userStar={4}
              outerColor="#ffcc66"
            />
          )}
        </div>
      </Box>
    </>
  );
}

export default Ratings;
