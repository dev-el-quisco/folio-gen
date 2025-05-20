import { getLatestFolios } from "@/app/libs/data";
import FoliosTable from "./FoliosTable";

export default async function FoliosTableContext() {
  const folios = await getLatestFolios();
  return (
    <>
      <FoliosTable folios={folios} />
    </>
  );
}
