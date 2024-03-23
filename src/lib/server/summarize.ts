import { buildPrompt } from "$lib/buildPrompt";
import { generateFromDefaultEndpoint } from "$lib/server/generateFromDefaultEndpoint";
import { defaultModel } from "$lib/server/models";

export async function summarize(prompt: string) {
	const userPrompt = `Please provide a short title of the following message: \n` + prompt;
	
	const summaryPrompt = await buildPrompt({
		messages: [{ from: "user", content: userPrompt }],
		preprompt:
			"You are a Summarization AI. Your task is to summarize and title the summary, in a single sentence of less than 5 words. Do not try to answer questions, just title the summary generated from user's request.",
		model: defaultModel,
	});
	var generated_text = await generateFromDefaultEndpoint(summaryPrompt).catch((e) => {
		console.error(e);
		return null;
	});

	if (generated_text) {
		if(generated_text.startsWith("Title:")) {
			generated_text = generated_text.slice("Title:".length).trimEnd();
		}
		return generated_text;
}
	return null;
}
