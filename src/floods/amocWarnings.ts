import { Client } from "basic-ftp";

export async function getAllWarns(): Promise<string[]> {
  const client = new Client();
  // client.ftp.verbose = true;
  try {
    await client.access({
      host: "ftp.bom.gov.au",
      secure: false,
    });

    await client.cd("/anon/gen/fwo/");
    const files = await client.list();

    const warns = getNames(files);

    return warns;
  } catch (err) {
    console.error(err); // Note: .error() instead of .log()
    // Note: Error was being captured here and not being thrown up downstream
    throw err;
  } finally {
    // Note: Close the connection AFTER we have succeeeded or failed
    client.close();
  }
}

// Note: Fat arrow function to regular function as is pattern
// Note: Return shape of response for types
// Note: Wasn't actually async method
export function getNames(warnings: any): string[] {
  let warns: any = [];

  for (var file in warnings) {
    if (warnings[file].name.endsWith(".amoc.xml")) {
      warns.push(warnings[file].name);
    }
  }

  return warns;
}
