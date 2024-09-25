import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

function UpcomingContests() {
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
            <p>Codeforces Contests</p>
          </TabPanel>
          <TabPanel>
            <p>Codechef Contests</p>
          </TabPanel>
          <TabPanel>
            <p>Atcoder Contests</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default UpcomingContests;
