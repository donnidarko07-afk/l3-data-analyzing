export default function generateVacancyStats(content) {
  if (!content || content.trim() === '') return;

  const lines = content.replace(/\r/g, '').trim().split('\n');
  const separator = ';';
  
  const headers = lines[0].split(separator).map(h => h.trim().toLowerCase());
  
  const cityIndex = headers.indexOf('город');
  const salaryIndex = headers.indexOf('зарплата');
  const educationIndex = headers.indexOf('образование');
  const companyIndex = headers.indexOf('компания');

  const dataLines = lines.slice(1).map(line => line.split(separator).map(cell => cell.trim()));

  // Шаг 1
  const count = dataLines.length;
  console.log(`Count: ${count}`);

  // Шаг 2
  const cities = dataLines.map(row => row[cityIndex]).filter(Boolean).join(', ');
  console.log(`Cities: ${cities}`);

  // Шаг 3
  const salaries = dataLines.map(row => {
    const salaryStr = row[salaryIndex] || '';
    return parseInt(salaryStr.replace(/[^0-9]/g, ''), 10) || 0;
  });
  const maxSalary = Math.max(...salaries);
  console.log(`Maximum salary: ${maxSalary}`);

  // Шаг 4
  const graduatedCount = dataLines.filter(row => 
    row[educationIndex] && row[educationIndex].toLowerCase().includes('высшее')
  ).length;
  console.log(`Graduated: ${graduatedCount}`);

  // Шаг 5
  const companyTypes = dataLines.map(row => {
    const companyName = row[companyIndex] || '';
    const match = companyName.match(/^(ООО|ЗАО|ОАО|ИП|АО)/i);
    return match ? match[0].toUpperCase() : null;
  }).filter(Boolean);

  const uniqueTypes = [...new Set(companyTypes)].join(', ');
  console.log(`Company types: ${uniqueTypes}`);
}