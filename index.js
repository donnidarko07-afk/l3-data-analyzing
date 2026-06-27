export default (content) => {
  const lines = content.trim().split('\n').map(line => line.trim()).filter(Boolean);
  const dataLines = lines.slice(2);

  if (dataLines.length === 0) return;

  const delimiter = dataLines[0].includes('|') ? '|' : ',';

  const stars = dataLines.map((line) => {
    
    const parts = line.split(delimiter)
      .map(item => item.trim())
      .filter((item, index, arr) => delimiter === ',' || (index !== 0 && index !== arr.length - 1));

    const [name, galaxy, distance, radius, weight] = parts;

    return {
      name,
      galaxy,
      distance: parseFloat(distance),
      radius: parseFloat(radius),
      weight: parseFloat(weight),
    };
  });

  const count = stars.length;
  console.log(`Count: ${count}`);

  const galaxies = [...new Set(stars.map((star) => star.galaxy))].sort((a, b) => a.localeCompare(b));
  console.log(`Galaxies: ${galaxies.join(', ')}`);

  const distances = stars.map((star) => star.distance);
  const maxDistance = Math.max(...distances);
  const minDistance = Math.min(...distances);
  console.log(`Farest from earth: ${maxDistance} light years, closest to Earth: ${minDistance} light years`);

  const closestStar = stars.reduce((min, star) => (star.distance < min.distance ? star : min), stars[0]);
  console.log(`Closest to Earth: ${closestStar.name} in ${closestStar.galaxy} galaxy`);

  const galaxyWeights = stars.reduce((acc, star) => {
    acc[star.galaxy] = (acc[star.galaxy] || 0) + star.weight;
    return acc;
  }, {});

  const heaviestGalaxy = Object.keys(galaxyWeights).reduce((maxGen, currentGen) => 
    galaxyWeights[currentGen] > galaxyWeights[maxGen] ? currentGen : maxGen
  , Object.keys(galaxyWeights)[0]);

  const starsInHeaviestGalaxy = stars.filter((star) => star.galaxy === heaviestGalaxy);
  const maxRadiusStar = starsInHeaviestGalaxy.reduce((max, star) => (star.radius > max.radius ? star : max), starsInHeaviestGalaxy[0]);

  console.log(`Star with largest radius from heaviest galaxy is ${maxRadiusStar.name}`);
};