import type {RequestHandler} from '@sveltejs/kit';
import { STRIPE_API_KEY } from "$env/static/private";
import Stripe from 'stripe';

if (!STRIPE_API_KEY) {
	throw new Error('STRIPE_SECRET_KEY is not set')
}

const stripe = new Stripe(STRIPE_API_KEY, {
	apiVersion: '2023-10-16',
	typescript: true,
})

export const post: RequestHandler = async ({request, url}) => {
	const priceId = (await request.formData()).get('price-id')

	if (!priceId || typeof priceId !== 'string') {
		return {status: 400}
	}

	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			success_url: `${url.origin}/home`,
			cancel_url: `${url.origin}/home`,
		})

		if (!session.url) {
			return {status: 500}
		}

		return {
			status: 303,
			headers: {
				location: session.url,
			},
		}
	} catch (error) {
		return {status: 500}
	}
}