import type { RequestHandler } from "./$types";
import { collections } from "$lib/server/database";
import { ObjectId } from "mongodb";
import { error, redirect } from "@sveltejs/kit";
import { base } from "$app/paths";
import { z } from "zod";
import type { Message } from "$lib/types/Message";
import { models, validateModel } from "$lib/server/models";
import { authCondition } from "$lib/server/auth";

export const DELETE: RequestHandler = async ({locals, request, cookies}) => {
	const res = await collections.conversations.deleteMany({
		...(locals.userId ? { userId: locals.userId } : { sessionId: locals.sessionId }),
	});
	return new Response(
		JSON.stringify({
			"message": "Cleared all conversations"
		}),
		{ headers: { "Content-Type": "application/json" } }
	);
}

export const POST: RequestHandler = async ({ locals, request , cookies}) => {
	const body = await request.text();

	let title = "";
	let messages: Message[] = [];

	const values = z
		.object({
			fromShare: z.string().optional(),
			userId: z.optional(z.string().trim()),
			model: validateModel(models),
		})
		.parse(JSON.parse(body));
		
	const authCond = values.userId ? {userId : values.userId} : authCondition(locals)

	if (values.fromShare) {
		const conversation = await collections.sharedConversations.findOne({
			_id: values.fromShare,
		});

		if (!conversation) {
			throw error(404, "Conversation not found");
		}

		title = conversation.title;
		messages = conversation.messages;
		values.model = conversation.model;
	}

	const res = await collections.conversations.insertOne({
		_id: new ObjectId(),
		title:
			title ||
			"Untitled " + ((await collections.conversations.countDocuments(authCond)) + 1),
		messages,
		model: values.model,
		createdAt: new Date(),
		updatedAt: new Date(),
		...(values.userId ? { userId: values.userId } : locals.userId ? { userId: locals.userId } : { sessionId: locals.sessionId }),
		...(values.fromShare ? { meta: { fromShareId: values.fromShare } } : {}),
	});

	return new Response(
		JSON.stringify({
			conversationId: res.insertedId.toString(),
		}),
		{ headers: { "Content-Type": "application/json" } }
	);
};
