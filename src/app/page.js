import Image from "next/image";
import styles from "./page.module.css";
import fsPromises from 'fs/promises';
import path from 'path';





export default async function Home() {

  const dataFilePath = path.join(process.cwd(), 'db/data.json');

  const jsonData = await fsPromises.readFile(dataFilePath);
  const objectData = JSON.parse(jsonData);

  console.log(objectData);

  const newData = {
    Name: "Ermina",
    ID: 2
  };

  objectData.push(newData)

  const updatedData = JSON.stringify(objectData);

  await fsPromises.writeFile(dataFilePath, updatedData);

  return (
    <div className={styles.page}>
          <h1 className="text-3xl font-bold underline">
          <button className="btn btn-accent">Accent</button>
      Hello world!
    </h1>
    </div>
  );
}
