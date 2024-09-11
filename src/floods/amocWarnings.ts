import { Client } from "basic-ftp";

export async function getAllWarns() {
  const client = new Client();
  // client.ftp.verbose = true;
  try {
    await client.access({
      host: "ftp.bom.gov.au",
      secure: false,
    });

    await client.cd("/anon/gen/fwo/");
    const files = await client.list();

   const warns = await getNames(files)

    return warns;
  } catch (err) {
    console.log(err);
  }

  client.close();
}

export const getNames = async (warnings:any)=>{
  let warns: any = [];
  
  for (var file in warnings) {
    if (warnings[file].name.endsWith(".amoc.xml")) {
      warns.push(warnings[file].name)
    }
  }

  return warns
}