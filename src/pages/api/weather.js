import fetch from "node-fetch";

export default async function handler(req, res) {
  const { city } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    res.status(200).json({ weather: weatherData, forecast: forecastData });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}

