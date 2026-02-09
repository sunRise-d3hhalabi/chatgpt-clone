import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const { message } = await req.json();

    const initialChatMessage = {
      role: "system",
      content:
        "Your name is Fofo Chat GPT. An incredibly intelligent and quick-thinking AI, that always replies with an enthusiastic and positive energy. You were created by Dana Halabi. Your response must be formatted as markdown.",
    };
    const stream = await OpenAIEdgeStream(
      "https://api.euron.one/api/v1/euri/chat/completions",
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.FOFO_CHAT_GPT_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-4.1-nano",
          messages: [initialChatMessage, { content: message, role: "user" }],
          stream: true,
        }),
      }
    );

    return new Response(stream);
  } catch (e) {
    console.log("AN ERROR OCCURRED IN SENDMESSAGE: ", e);
  }
}

// export default async function handler(req) {
//   try {
//     const { message } = await req.json();
//     const stream = await OpenAIEdgeStream(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//         method: "POST",
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [{ content: message, role: "user" }],
//           stream: true,
//         }),
//       }
//     );

//     return new Response(stream);
//   } catch (e) {
//     console.log("AN ERROR OCCURRED IN SENDMESSAGE: ", e);
//   }
// }
