import {
  Button,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

function Ladder() {
  const [rating, setRating] = useState(800);

  const handleOnClick = (key) => () => {
    setRating(key);
  };

  return (
    <div>
      <div className="ladderRating">
        <div className="problemTable">
          <TableContainer w="100%" p={5}>
            <Table variant="simple">
              {/* <TableCaption placement="top">
                Ladder to Ace Competitive Programming
              </TableCaption> */}
              <Thead>
                <Tr>
                  <Th>Index</Th>
                  <Th>Problems</Th>

                  <Th>Status</Th>
                  <Th isNumeric>Frequency</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>1</Td>
                  <Td>Number of Pairs</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3799</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Coin Rows</Td>

                  <Td>AC</Td>
                  <Td isNumeric>3512</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>I Hate 1111</Td>

                  <Td>TLE</Td>
                  <Td isNumeric>3793</Td>
                </Tr>
                <Tr>
                  <Td>4</Td>
                  <Td>Same Differences</Td>

                  <Td>WA</Td>
                  <Td isNumeric>4246</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>

        <div className="selectRatings">
          <Text fontSize="2xl" fontWeight="bold" color="black">
            Select Rating
          </Text>

          <SimpleGrid columns={4} spacing={1} className="ratingSelector">
            {Array.from({ length: 28 }, (_, i) => (i + 8) * 100).map((item) => (
              <Button
                colorScheme="blue"
                variant={item === rating ? "solid" : "ghost"}
                size="sm"
                key={item}
                onClick={handleOnClick(item)}
              >
                {item}
              </Button>
            ))}
          </SimpleGrid>

          <Text fontSize="xl" color="blue.500">
            Solved Problems : 3
          </Text>
          <Text fontSize="xl" color="blue.500">
            Unsolved Problems : 97
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Ladder;
