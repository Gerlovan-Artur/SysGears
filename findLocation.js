function generateRandomCoordinates() {
  // Згенерувати випадкові координати астероїда (x, y, z)
  const x = Math.floor(Math.random() * 101);
  const y = Math.floor(Math.random() * 101);
  const z = Math.floor(Math.random() * 101);
  return { x, y, z };
}

function calculateDistance(probeCoordinates, asteroidCoordinates) {
  // Розрахувати відстань між зондом та астероїдом
  const dx = probeCoordinates.x - asteroidCoordinates.x;
  const dy = probeCoordinates.y - asteroidCoordinates.y;
  const dz = probeCoordinates.z - asteroidCoordinates.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function findAsteroidLocation() {
  const asteroidCoordinates = generateRandomCoordinates();
  const probes = [];
  
  // Максимальна відстань уявного кубу
  const maxDistance = Math.sqrt(100 * 100 + 100 * 100 + 100 * 100);
  
  // Максимальна кількість зондів, яку можна використовувати
  const maxProbeCount = Math.floor(maxDistance) + 1;
  
  for (let i = 0; i < maxProbeCount; i++) {
    let probeCoordinates = generateRandomCoordinates();
    let distance = calculateDistance(probeCoordinates, asteroidCoordinates);
    
    // Зберегти координати зонду та відстань
    probes.push({
      coordinates: probeCoordinates,
      distance: distance
    });
  }
  
  // Сортувати зонди за зростанням відстані
  probes.sort((a, b) => a.distance - b.distance);
  
  // Повернути координати астероїда та інформацію про зонди
  return {
    result: {
      location: asteroidCoordinates,
      probes: {
        count: probes.length,
        coordinates: probes.map(probe => probe.coordinates)
      }
    }
  };
}

// Приклад використання
const result = findAsteroidLocation();
console.log(result);