// Complete the Index page component for a Weather App displaying weather data for major cities in Europe
import { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, VStack, Image, Spinner, Center } from "@chakra-ui/react";
import { FaCloudSun, FaTemperatureHigh, FaWind } from "react-icons/fa";

const cities = [
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", lat: 52.52, lon: 13.405 },
  { name: "Madrid", lat: 40.4168, lon: -3.7038 },
  { name: "Rome", lat: 41.9028, lon: 12.4964 },
];

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
      const data = await response.json();
      setWeather(data.current_weather);
    };

    fetchWeather();
  }, [city]);

  return (
    <Box p={4} bg="white" boxShadow="md" borderRadius="lg">
      <Heading size="md" mb={2}>
        {city.name}
      </Heading>
      {weather ? (
        <VStack spacing={3}>
          <Text fontSize="xl">
            <FaTemperatureHigh /> {weather.temperature}°C
          </Text>
          <Text fontSize="md">
            <FaCloudSun /> {weather.weathercode}
          </Text>
          <Text fontSize="sm">
            <FaWind /> {weather.windspeed} km/h
          </Text>
        </VStack>
      ) : (
        <Center h="100px">
          <Spinner />
        </Center>
      )}
    </Box>
  );
};

const Index = () => {
  return (
    <Flex direction="column" align="center" p={5}>
      <Heading mb={6}>Weather Dashboard</Heading>
      <Flex wrap="wrap" justify="center" gap={6}>
        {cities.map((city) => (
          <WeatherCard key={city.name} city={city} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Index;
