import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Text,
  Button,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { format, differenceInHours } from "date-fns";
import PropTypes from "prop-types";

import atcoderIcon from "../assets/atcoder.svg";
import codeforcesIcon from "../assets/codeforces.svg";
import codechefIcon from "../assets/codechef.png";
import leetcodeIcon from "../assets/leetcode.svg";

const IST_OFFSET = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // 5 hours 30 minutes in milliseconds

function ContestCard({
  platformName,
  contestName,
  startTime,
  endTime,
  registerLink,
}) {
  // Convert to IST by adding the offset

  let platformIcon = "";
  let platformColor = "";
  if (platformName === "CODEFORCES") {
    platformIcon = codeforcesIcon;
    platformColor = "red.500";
  } else if (platformName === "CODECHEF") {
    platformIcon = codechefIcon;
    platformColor = "#5f3920";
  } else if (platformName === "ATCODER") {
    platformIcon = atcoderIcon;
    platformColor = "black";
  } else if (platformName === "LEETCODE") {
    platformIcon = leetcodeIcon;
    platformColor = "#b77f32";
  }

  const startInIST = new Date(new Date(startTime).getTime() + IST_OFFSET);
  const endInIST = new Date(new Date(endTime).getTime() + IST_OFFSET);

  const formattedStartDate = format(startInIST, "dd/MM/yy");
  const formattedStartTime = format(startInIST, "p");
  const duration = differenceInHours(endInIST, startInIST);

  return (
    <Card borderRadius="lg" overflow="hidden" p={2} variant="outline">
      <CardHeader
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        p={1}
      >
        <Image src={platformIcon} alt={`${platformName} logo`} boxSize="25px" />
        <Spacer></Spacer>
        <Text color={platformColor}> {platformName}</Text>
      </CardHeader>
      <CardBody p={1}>
        <Text as="h3" size="md" fontWeight="bold">
          {contestName}
        </Text>
      </CardBody>
      <CardFooter
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Stack direction="row" spacing={1}>
          <Text fontSize="sm">{formattedStartTime}</Text>
          <Text fontSize="sm">-</Text>
          <Text fontSize="sm">{formattedStartDate}</Text>
          <Text fontSize="sm">-</Text>
          <Text fontSize="sm">{duration} hrs</Text>
        </Stack>
        <Button
          p={1}
          as="a"
          href={registerLink}
          target="_blank"
          colorScheme="blue"
          size="sm"
          variant="ghost"
        >
          REGISTER
        </Button>
      </CardFooter>
    </Card>
  );
}

ContestCard.propTypes = {
  platformName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
  registerLink: PropTypes.string.isRequired,
};

export default ContestCard;
