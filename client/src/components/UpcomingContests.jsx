import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import ContestCard from "./ContestCard";
import { isToday, isTomorrow, isAfter, addDays } from "date-fns";

const API_URL = "https://clist.by/api/v4/contest/";
const API_KEY = "ebe0cb5ac2781b22caacabf0b90a8bb6a837a350";
const USERNAME = "test2";

const platformNames = {
  "leetcode.com": "LEETCODE",
  "codeforces.com": "CODEFORCES",
  "codechef.com": "CODECHEF",
  "atcoder.jp": "ATCODER",
};

function UpcomingContests() {
  const [contests, setContests] = useState({
    today: [],
    tomorrow: [],
    later: [],
  });

  useEffect(() => {
    const fetchContests = async () => {
      try {
        // Fetch contests from all four platforms
        const leetcodeResponse = await fetch(
          `${API_URL}?username=${USERNAME}&api_key=${API_KEY}&resource=leetcode.com&upcoming=true&format=json`
        );
        const codeforcesResponse = await fetch(
          `${API_URL}?username=${USERNAME}&api_key=${API_KEY}&resource=codeforces.com&upcoming=true&format=json`
        );
        const codechefResponse = await fetch(
          `${API_URL}?username=${USERNAME}&api_key=${API_KEY}&resource=codechef.com&upcoming=true&format=json`
        );
        const atcoderResponse = await fetch(
          `${API_URL}?username=${USERNAME}&api_key=${API_KEY}&resource=atcoder.jp&upcoming=true&format=json`
        );

        // Check if any response is not ok
        if (
          !leetcodeResponse.ok ||
          !codeforcesResponse.ok ||
          !codechefResponse.ok ||
          !atcoderResponse.ok
        ) {
          throw new Error("Error fetching contests from one or more platforms");
        }

        // Parse the JSON responses
        const leetcodeData = await leetcodeResponse.json();
        const codeforcesData = await codeforcesResponse.json();
        const codechefData = await codechefResponse.json();
        const atcoderData = await atcoderResponse.json();

        // Combine contest data from all platforms
        const combinedContests = [
          ...(leetcodeData.objects || []),
          ...(codeforcesData.objects || []),
          ...(codechefData.objects || []),
          ...(atcoderData.objects || []),
        ];

        const today = [];
        const tomorrow = [];
        const later = [];

        combinedContests.forEach((contest) => {
          const startTime = new Date(contest.start);
          if (isToday(startTime)) {
            today.push(contest);
          } else if (isTomorrow(startTime)) {
            tomorrow.push(contest);
          } else if (isAfter(startTime, addDays(new Date(), 1))) {
            later.push(contest);
          }
        });

        // Sort contests by start time
        const sortByStartTime = (a, b) => new Date(a.start) - new Date(b.start);
        today.sort(sortByStartTime);
        tomorrow.sort(sortByStartTime);
        later.sort(sortByStartTime);

        setContests({ today, tomorrow, later });
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className="upcoming-contests">
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab>Today</Tab>
          <Tab>Tomorrow</Tab>
          <Tab>Later</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            {contests.today.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {contests.today.map((contest) => (
                  <ContestCard
                    key={contest.id}
                    platformName={platformNames[contest.resource] || "UNKNOWN"}
                    contestName={contest.event}
                    registerLink={contest.href}
                    startTime={contest.start}
                    endTime={contest.end}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Text>No contests today</Text>
            )}
          </TabPanel>
          <TabPanel>
            {contests.tomorrow.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {contests.tomorrow.map((contest) => (
                  <ContestCard
                    key={contest.id}
                    platformName={platformNames[contest.resource] || "UNKNOWN"}
                    contestName={contest.event}
                    registerLink={contest.href}
                    startTime={new Date(contest.start)}
                    endTime={new Date(contest.end)}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Text>No contests tomorrow</Text>
            )}
          </TabPanel>
          <TabPanel>
            {contests.later.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {contests.later.map((contest) => (
                  <ContestCard
                    key={contest.id}
                    platformName={platformNames[contest.resource] || "UNKNOWN"}
                    contestName={contest.event}
                    registerLink={contest.href}
                    startTime={new Date(contest.start)}
                    endTime={new Date(contest.end)}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Text>No contests later</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default UpcomingContests;
