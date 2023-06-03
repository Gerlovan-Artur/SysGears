const fs = require('fs');

// Завантажуємо правила конвертації з JSON файлу
const conversionRules = JSON.parse(fs.readFileSync('conversion.json', 'utf-8'));

// Функція для конвертації відстані
function convertDistance(input) {
  const { distance, convertTo } = input;

  // Перевіряємо наявність правил конвертації для вхідної та вихідної одиниць
  if (!conversionRules[distance.unit] || !conversionRules[convertTo]) {
    throw new Error('Unsupported units');
  }

  // Отримуємо співвідношення для конвертації
  const conversionRate = conversionRules[distance.unit][convertTo];

  // Конвертуємо значення відстані
  const convertedValue = distance.value * conversionRate;

  // Округлюємо значення до сотих
  const roundedValue = Math.round(convertedValue * 100) / 100;

  // Повертаємо результат у форматі JSON
  return {
    value: roundedValue,
    unit: convertTo,
  };
}

// Отримання вхідних даних з командного рядка
const input = {
  distance: {
    value: parseFloat(process.argv[2]),
    unit: process.argv[3],
  },
  convertTo: process.argv[4],
};

try {
  const result = convertDistance(input);
  console.log(result);
} catch (error) {
  console.error(error.message);
}