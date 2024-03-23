import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
	return new Response(
		JSON.stringify({
			"message": "Healthy"
		}),
		{ headers: { "Content-Type": "application/json" } }
	);
}