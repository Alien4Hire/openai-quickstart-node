import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const question = req.body.question || '';
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(question),
      max_tokens: 500,
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(question) {
  const capitalizedQuestion =
    question[0].toUpperCase() + question.slice(1).toLowerCase();
  return `Suggest a customer service response from the perspective of a software development company.

  type: why arent my changes showing up after saving react app?
  response: There are a few things that could be causing your changes not to show up after saving your React app. Here are a few things you can try:
  Make sure that you have saved the file that you are working on.
  Check the console for any errors that might be preventing your changes from being applied.
  Try manually refreshing the page to see if the changes appear.
  If you are using a development server, such as create-react-app, try stopping and restarting the server to see if that helps.

  type: when will my project be done?
  response: As a software firm, we cannot accurately predict when your project will be completed as it depends on a variety of factors such as the complexity and scope of the project, the availability and skill of the development team, and the efficiency of the development process.
  We understand that you want your project to be completed as soon as possible and we will do our best to deliver it to you in a timely manner. However, it is important to prioritize the quality and stability of the software over meeting arbitrary deadlines.
  We will keep you updated on the progress of the project and will work with you to establish realistic timelines and milestones. Please don't hesitate to contact us if you have any questions or concerns about the status of your project.

  type: what color is the sky?
  response: Sorry, right now I can only answer tech and IT support questions.

  type: ${capitalizedQuestion}
  response:`;
}
