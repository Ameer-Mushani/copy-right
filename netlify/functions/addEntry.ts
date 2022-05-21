import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface Entry {
  string: string
}

const handler: Handler = async (event, context) => {
  if(event.body) {
    const newEntry = JSON.parse(event.body) as Entry;
    await prisma.player_scores.create({
      data: {
        score: newEntry
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(newEntry)
    };
  }

  return {
    statusCode: 500
  };
}

export { handler }