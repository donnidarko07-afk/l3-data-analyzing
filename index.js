export default (content) => {
  const lines = content.replace(/\r\n/g, '\n').trim().split('\n').map(line => line.trim()).filter(Boolean);
  
  const dataLines = lines.slice(2);
  if (dataLines.length === 0) return;

  const stars = dataLines.map((line) => {
    const parts = line.split('|').map(item => item.trim());
    const cleanParts = parts.filter((_, index) => index !== 0 && index !== parts.length - 1);

    let galaxy = cleanParts[1];
    if (galaxy === 'Млечныйпуть') {
      galaxy = 'Млечный путь';
    }

    return {
      name: cleanParts[0],
      galaxy,
      weight: parseFloat(cleanParts[2]),
      radius: parseFloat(cleanParts[3]),
      distance: parseFloat(cleanParts[4]),
    };
  }).filter(star => star.name);

  console.log(`Count: ${stars.length}`);

  const galaxies = [...new Set(stars.map((star) => star.galaxy))].sort((a, b) => a.localeCompare(b));
  console.log(`Galaxies: ${galaxies.join(', ')}`);

  const distances = stars.map((star) => star.distance);
  console.log(`Farest from Earth: ${Math.max(...distances)} light years, closest to Earth: ${Math.min(...distances)} light years`);

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