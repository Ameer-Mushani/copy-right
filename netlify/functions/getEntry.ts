import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler: Handler = async(event, context) => {
   //load all entries from db
   const allEntries = await prisma.entries.findMany();
   return {
      statusCode: 200,
      body: JSON.stringify(allEntries.map(entry => (
        // flatten player name into score entry 
        { id: entry.entryId, string: entry.string}
      ))
      , (key, value) =>
        // need to add a custom serializer because CockroachDB IDs map to
        // JavaScript BigInts, which JSON.stringify has trouble serializing.
        typeof value === 'bigint'
          ? value.toString()
          : value 
      )
    }
}

export { handler }