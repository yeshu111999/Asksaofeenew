<script>
	import SectionWrapper from "$lib/components/SectionWrapper.svelte";
</script>

<div class="container">
	<SectionWrapper header={"About Us"}>
		<div>
			<section>
				<p>
					At <strong>immiGPT.ai</strong>, we're dedicated to revolutionizing the way individuals
					approach immigration and travel processes. In the ever-evolving landscape of global
					immigration regulations, finding reliable, personalized information can be challenging.
					That's where we come in.
				</p>
				<p>
					Harnessing the power of advanced AI, immiGPT offers tailored guidance to a myriad of
					users, from students and professionals to travelers seeking their next adventure. Our
					platform covers a vast range of topics, including visa applications, work and study
					opportunities abroad, family-sponsored visas, and cultural assimilation advice, ensuring
					that users don't just access information but truly unlock a world of global opportunities.
				</p>
				<p>
					As pioneers in the realm of digital immigration solutions, our mission is to make global
					mobility simpler and more accessible than ever before. We believe in empowering our users
					with timely and accurate information, making the intricacies of international transition
					smooth and hassle-free. Questions, concerns, or feedback? Don't hesitate to reach out to
					our dedicated team at <a href="mailto:hello@immiGPT.ai">hello@immiGPT.ai</a>. We're here
					to guide, assist, and transform your global aspirations into reality.
				</p>
			</section>
		</div>
	</SectionWrapper>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	p {
		font-size: 16px;
	}

	a {
		color: blue;
		text-decoration: underline;
	}
</style>
