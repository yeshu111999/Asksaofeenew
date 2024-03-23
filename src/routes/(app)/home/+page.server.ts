import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import Stripe from "stripe";
import { STRIPE_API_KEY } from "$env/static/private";

const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: "2023-10-16" });

export async function load({ url }) {
	const sessionId = url.searchParams.get("session_id");
	const isFailure = url.searchParams.get("failure");
	return { sessionId, isFailure };
}

export const actions: Actions = {
	checkout: async ({ request }) => {
		const priceId = (await request.formData()).get("price-id");
		let url: string | null;

		if (!priceId || typeof priceId !== "string") {
			return { status: 400 };
		}
		try {
			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						price: priceId,
						quantity: 1,
					},
				],
				mode: "subscription",
				success_url: `${request.headers.get("origin")}/home?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${request.headers.get("origin")}/home?failure=true`,
			});

			url = session.url;
		} catch (errorObj) {
			throw error(500, "Unknown error occurred");
		}

		if (url) {
			throw redirect(303, url);
		}
	},
};
