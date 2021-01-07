// dialogflow.ts

const dialogflow = require("dialogflow");
// const dialogflow = require("@google-cloud/dialogflow-cx");
const credentials = require("../../credentials.json");
const location = 'global';
const agentId = '2ebe5609-9337-44a2-be25-1334cc0af575';

const sessionClient = new dialogflow.SessionsClient({
  credentials: credentials
});
const projectId: string = process.env.DIALOGFLOW_PROJECT_ID!;

export const runQuery = (query: string, number: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      // A unique identifier for the given session
      //const sessionId = uuid.v4();
      const sessionId = number;
      // Create a new session

      const sessionPath = sessionClient.sessionPath(projectId, sessionId);
      // const sessionPath = sessionClient.projectLocationAgentSessionPath(projectId,location, agentId, sessionId); CX

      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: query,
            // The language used by the client (en-US) for ES
            languageCode: "en-US"
          },
            // The language used by the client (en-US) for CX
            // languageCode: "en"
        }
      };

      // Send request and log result CX
      // const [response] = await sessionClient.detectIntent(request);

      // const {responseMessages} = response.queryResult;

      // const result = responseMessages[0].text.text[0]

      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
