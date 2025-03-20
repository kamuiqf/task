import Table from "./api.js";

const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

function addRelativeDensityCol(rows, maxDensity) {
  for (const row of rows) {
    const density = row[3];
    const relativeDensity = Math.round((density * 100) / maxDensity);
    row.push(relativeDensity.toString());
  }
}

function createRow(line) {
  return line.split(",");
}

function collect(rows) {
  let result = [];

  for (const row of rows) {
    let s = row[0].padEnd(18);
    s += row[1].padStart(10);
    s += row[2].padStart(8);
    s += row[3].padStart(8);
    s += row[4].padStart(18);
    s += row[5].padStart(6);
    result.push(s);
  }

  return result;
}

export function makeTable(data) {
  if (!data) {
    return [];
  }

  const lines = data.split("\n");
  const table = Table();

  table.initColumns({
    city: "string",
    population: "number",
    area: "number",
    density: "number",
    country: "string",
  });

  for (let i = 1; i < lines.length - 1; i++) {
    const row = createRow(lines[i]);
    table.addRow(row);
  }

  const relativeDensity = table.addColumn(
    "relativeDensity",
    "number",
    (rows) => {
      addRelativeDensityCol(rows, table.max("density"));
    },
  );

  table.sort(relativeDensity);
  // table.print();
  const res = collect(table.rows);
  return res;
}

makeTable(data);
