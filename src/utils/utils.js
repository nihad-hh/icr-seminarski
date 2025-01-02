import path from "path";
import { promises as fs } from "fs";

export async function loadDataFromJson(jsonName) {
  console.log(jsonName);

  console.log(process.cwd());
  const dataFilePath = path.join(process.cwd(), "db/" + jsonName + ".json");

  // const dataFilePath = "/db/" + jsonName + ".json";

  console.log(dataFilePath);

  const jsonData = await fs.readFile(dataFilePath);
  const objectData = JSON.parse(jsonData);

  return objectData;
}

export function createVoznje(voznje) {
  return (
    <tbody>
      {voznje.map((row) => (
        <tr key={row.id}>
          <td>{row.datum}</td>
          <td>{row.polaziste}</td>
          <td>{row.odrediste}</td>
          <td>{row.trajanje}</td>
          <td>{row.cijena}</td>
        </tr>
      ))}
    </tbody>
  );
}
