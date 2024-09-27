import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ContestCard from "./ContestCard";
import { isToday, isTomorrow, isAfter, addDays } from "date-fns";

const API_URL = "https://clist.by/api/v4/contest/";
const API_KEY = "cdd614b63ab9d21740d319924f980d0bdb28307f";
const USERNAME = "test1";

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
        const response = await fetch(
          `${API_URL}?username=${USERNAME}&api_key=${API_KEY}&resource=leetcode.com,codeforces.com,codechef.com,atcoder.jp&upcoming=true&format=json`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Log the API response for debugging

        if (!data.objects) {
          throw new Error(
            "Invalid API response: 'objects' property is missing"
          );
        }

        const contestsData = data.objects;
        const today = [];
        const tomorrow = [];
        const later = [];

        contestsData.forEach((contest) => {
          const startTime = new Date(contest.start);
          if (isToday(startTime)) {
            today.push(contest);
          } else if (isTomorrow(startTime)) {
            tomorrow.push(contest);
          } else if (isAfter(startTime, addDays(new Date(), 1))) {
            later.push(contest);
          }
        });

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
          </TabPanel>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default UpcomingContests;
