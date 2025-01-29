import { Box, Button, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import codeforcesIcon from "../assets/codeforces.svg";
import codechefIcon from "../assets/codechef.png";
import atcoderIcon from "../assets/atcoder.svg";
import leetcodeIcon from "../assets/leetcode.svg";
import RatingCard from "./RatingCard";

// Helper function to load cached data from localStorage
const loadCachedData = (platform) => {
  const cachedData = localStorage.getItem(`${platform}Data`);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000; // 24 hours
    if (!isExpired) return data;
  }
  return null;
};

function Ratings() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Platform usernames
  const [codeforcesUsername, setCodeforcesUsername] = useState(
    localStorage.getItem("codeforcesUsername") || ""
  );
  const [codechefUsername, setCodechefUsername] = useState(
    localStorage.getItem("codechefUsername") || ""
  );
  const [atcoderUsername, setAtcoderUsername] = useState(
    localStorage.getItem("atcoderUsername") || ""
  );
  const [leetcodeUsername, setLeetcodeUsername] = useState(
    localStorage.getItem("leetcodeUsername") || ""
  );

  // Platform data with initial state from cache
  const [codeforcesData, setCodeforcesData] = useState(() =>
    loadCachedData("codeforces")
  );
  const [codechefData, setCodechefData] = useState(() =>
    loadCachedData("codechef")
  );
  const [leetcodeData, setLeetcodeData] = useState(() =>
    loadCachedData("leetcode")
  );

  const [fetchData, setFetchData] = useState(false);
  const domain = import.meta.env.VITE_APP_DOMAIN;

  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch platform usernames from backend
  useEffect(() => {
    if (!fetchData) return;
    setIsLoading(true);

    const fetchPlatforms = async () => {
      try {
        const response = await fetch(
          `${domain}/api/users/${userId}/platforms`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const platforms = await response.json();

        platforms.forEach((p) => {
          switch (p.platformUrl) {
            case "codeforces.com":
              setCodeforcesUsername(p.username);
              localStorage.setItem("codeforcesUsername", p.username);
              break;
            case "codechef.com":
              setCodechefUsername(p.username);
              localStorage.setItem("codechefUsername", p.username);
              break;
            case "atcoder.jp":
              setAtcoderUsername(p.username);
              localStorage.setItem("atcoderUsername", p.username);
              break;
            case "leetcode.com":
              setLeetcodeUsername(p.username);
              localStorage.setItem("leetcodeUsername", p.username);
              break;
          }
        });
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };

    fetchPlatforms();
  }, [fetchData, domain, token, userId]);

  // Fetch platform data when usernames update
  useEffect(() => {
    if (!fetchData) return;

    const getCodeforcesRank = (rating) => {
      if (rating >= 3000) return "INTERNATIONAL GRANDMASTER";
      if (rating >= 2400) return "GRANDMASTER";
      if (rating >= 2100) return "MASTER";
      if (rating >= 1900) return "CANDIDATE MASTER";
      if (rating >= 1600) return "EXPERT";
      if (rating >= 1400) return "SPECIALIST";
      if (rating >= 1200) return "PUPIL";
      return "NEWBIE";
    };

    // Fetch and cache Codeforces data
    const fetchCodeforcesData = async () => {
      if (!codeforcesUsername) return;
      try {
        const response = await fetch(
          `https://codeforces.com/api/user.rating?handle=${codeforcesUsername}`
        );
        const json = await response.json();
        const contests = json.result;

        if (contests?.length > 0) {
          const n = contests.length;
          let ratingChange = 0;
          if (n >= 2) {
            ratingChange =
              contests[n - 1].newRating - contests[n - 2].newRating;
          }

          const newData = {
            rating: contests[n - 1].newRating,
            ratingChange: ratingChange > 0 ? `+${ratingChange}` : ratingChange,
            lastRank: contests[n - 1].rank,
            userRank: getCodeforcesRank(contests[n - 1].newRating),
          };

          setCodeforcesData(newData);
          localStorage.setItem(
            "codeforcesData",
            JSON.stringify({
              data: newData,
              timestamp: Date.now(),
            })
          );
        }
      } catch (error) {
        console.error("Error fetching Codeforces data:", error);
      }
    };

    // Fetch and cache CodeChef data
    const fetchCodechefData = async () => {
      if (!codechefUsername) return;
      try {
        const response = await fetch(
          `https://codechef-api.vercel.app/handle/${codechefUsername}`
        );
        const data = await response.json();

        if (data.ratingData?.length > 0) {
          const n = data.ratingData.length;
          let ratingChange = 0;
          if (n >= 2) {
            ratingChange = data.currentRating - data.ratingData[n - 2].rating;
          }

          const newData = {
            rating: data.currentRating,
            highestRating: data.highestRating,
            lastRank: data.ratingData[n - 1].rank,
            countryRank: data.countryRank,
            userStar: data.stars ? parseInt(data.stars[0]) : null,
            ratingChange,
          };

          setCodechefData(newData);
          localStorage.setItem(
            "codechefData",
            JSON.stringify({
              data: newData,
              timestamp: Date.now(),
            })
          );
        }
      } catch (error) {
        console.error("Error fetching CodeChef data:", error);
      }
    };

    // Fetch and cache LeetCode data

    const fetchLeetcodeData = async () => {
      if (!leetcodeUsername) return;
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

        const newData = {
          rating: parseInt(data.contestRating),
          lastRank: contestParticipation[n - 1].ranking,
          userRank: parseInt(data.contestRating),
          ratingChange,
        };

        setLeetcodeData(newData);

        localStorage.setItem(
          "leetcodeData",
          JSON.stringify({
            data: newData,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error("Error fetching LeetCode data:", error);
      }
    };

    const fetchAllData = async () => {
      await fetchCodeforcesData();
      await fetchCodechefData();
      await fetchLeetcodeData();
      setFetchData(false); // Reset fetch trigger
      setIsLoading(false);
      localStorage.setItem("lastFetchTime", Date.now());
      setLastUpdated(Date.now());
    };

    fetchAllData();
  }, [fetchData, codeforcesUsername, codechefUsername, leetcodeUsername]);

  const getCodeforcesColor = (rank) => {
    const colors = {
      NEWBIE: "#E0E0E0",
      PUPIL: "#A5D6A7",
      SPECIALIST: "#A7D8D8",
      EXPERT: "#B3B3FF",
      "CANDIDATE MASTER": "#EAADEA",
      MASTER: "#FFCC99",
      "INTERNATIONAL MASTER": "#FFCC99",
      GRANDMASTER: "#FF9999",
      "INTERNATIONAL GRANDMASTER": "#FF9999",
    };
    return colors[rank] || "#FFFFFF";
  };

  useEffect(() => {
    const ratingContainer = document.querySelector(".ratingContainer");
    if (ratingContainer) {
      const handleWheel = (event) => {
        if (event.deltaY !== 0) {
          event.preventDefault();
          ratingContainer.scrollLeft += event.deltaY;
        }
      };
      ratingContainer.addEventListener("wheel", handleWheel);
      return () => ratingContainer.removeEventListener("wheel", handleWheel);
    }
  }, []);

  useEffect(() => {
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    if (lastFetchTime) {
      setLastUpdated(parseInt(lastFetchTime));
    }
  }, []);

  const getLastUpdatedMessage = () => {
    if (!lastUpdated) return "";
    const hoursAgo = Math.floor((Date.now() - lastUpdated) / (1000 * 60 * 60));
    return `Last updated ${hoursAgo} hours ago`;
  };

  return (
    <>
      <Box className="ratingContainer" mt={5}>
        {isLoading ? (
          <div className="ratings">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                height="250px" // Match RatingCard height
                width="400px" // Match RatingCard width
                borderRadius="lg"
                startColor="gray.100"
                endColor="gray.200"
                m="auto" // Match RatingCard margin
              />
            ))}
          </div>
        ) : (
          <div className="ratings">
            <RatingCard
              platformName="CODEFORCES"
              platformIcon={codeforcesIcon}
              username={codeforcesUsername || "No Username"}
              rating={codeforcesData?.rating ?? "NULL"}
              ratingChange={codeforcesData?.ratingChange ?? "NULL"}
              lastRank={codeforcesData?.lastRank ?? "NULL"}
              userRank={codeforcesData?.userRank ?? "NULL"}
              outerColor={getCodeforcesColor(codeforcesData?.userRank)}
            />

            <RatingCard
              platformName="CODECHEF"
              platformIcon={codechefIcon}
              username={codechefUsername || "No Username"}
              rating={codechefData?.rating ?? "NULL"}
              ratingChange={codechefData?.ratingChange ?? "NULL"}
              lastRank={codechefData?.lastRank ?? "NULL"}
              userStar={codechefData?.userStar ?? "1"}
              outerColor="red.200"
            />

            <RatingCard
              platformName="ATCODER"
              platformIcon={atcoderIcon}
              username={atcoderUsername || "No Username"}
              rating={1223}
              ratingChange={-56}
              lastRank={11208}
              userRank="MASTER"
              outerColor="#E2E8F0"
            />

            <RatingCard
              platformName="LEETCODE"
              platformIcon={leetcodeIcon}
              username={leetcodeUsername || "No Username"}
              rating={leetcodeData?.rating ?? "NULL"}
              ratingChange={leetcodeData?.ratingChange ?? "NULL"}
              lastRank={leetcodeData?.lastRank ?? "NULL"}
              userRank={leetcodeData?.userRank ?? "NULL"}
              outerColor="#ffcc66"
            />
          </div>
        )}
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p>{getLastUpdatedMessage()}</p>
        <Button
          isLoading={isLoading}
          loadingText="Fetching..."
          variant="outline"
          w={"fit-content"}
          onClick={() => setFetchData(true)}
        >
          Fetch Data{" "}
          {!codeforcesData && !codechefData && !leetcodeData ? "" : "again"}
        </Button>
      </div>
    </>
  );
}

export default Ratings;
