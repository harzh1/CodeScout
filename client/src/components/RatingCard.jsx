import { Box, Text, Image, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

function RatingCard({
  platformName,
  platformIcon,
  username,
  rating,
  ratingChange,
  lastRank,
  userRank,
  userStar,
  outerColor,
}) {
  let star = "";
  if (userStar) {
    for (let index = 0; index < userStar; index++) {
      star += "★";
    }
  }
  return (
    <Box
      bgGradient={`radial(${outerColor} 0%,white 125% )`}
      borderRadius="lg"
      backdropBlur={5}
      p={5}
      m="auto"
      h="250px"
      w="400px"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      textAlign="center"
    >
      <Box
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack>
          {/* Platform Icon */}
          {platformIcon && (
            <Image
              src={platformIcon}
              alt={`${platformName} logo`}
              boxSize="25px"
            />
          )}

          {/* Platform Name */}
          <Text fontSize="xl" fontWeight="bold" color="black">
            {platformName}
          </Text>
        </HStack>
        <Text fontSize="sm" fontWeight="semibold" color="gray.600">
          {username}
        </Text>
      </Box>

      {/* User Rank */}
      {userRank && (
        <Text fontSize="4xl" fontWeight="bold">
          {userRank}
        </Text>
      )}

      {userStar && (
        <Text fontSize="4xl" fontWeight="bold">
          {star}
        </Text>
      )}

      <HStack
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Rating and Rating Change */}
        <Text fontSize="lg" color="gray.600" fontWeight="bold">
          RATING {rating} [{ratingChange}]
        </Text>

        {/* Last Rank */}
        <Text fontSize="sm" color="gray.600">
          LASTRANK {lastRank}
        </Text>
      </HStack>

      {/* Username */}
    </Box>
  );
}

// RatingCard.propTypes = {
//   platformName: PropTypes.string.isRequired,
//   platformIcon: PropTypes.string,
//   username: PropTypes.string.isRequired,
//   rating: PropTypes.number.isRequired,
//   ratingChange: PropTypes.number.isRequired,
//   lastRank: PropTypes.number,
//   userRank: PropTypes.string,
//   userStar: PropTypes.number,
//   outerColor: PropTypes.string.isRequired, // Single color input for outer gradient
// };

// RatingCard.defaultProps = {
//   platformIcon: "", // Default to an empty string if no icon is provided
// };

export default RatingCard;
