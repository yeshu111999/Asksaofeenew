<script>
	// import { Button } from "@svelteuidev/core";
	import LoginModal from "$lib/components/LoginModal.svelte";
	import RaiseAnIssuePopup from "$lib/components/RaiseAnIssuePopup.svelte";
	import AboutUsPopup from "$lib/components/AboutUsPopup.svelte";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import Cookies from "js-cookie";

	let loginModalOpen = false;
	let showSignUp = false;
	let settings;
	let token;

	let showRaiseAnIssuePopup = false;
	function openRaiseAnIssuePopup() {
		showRaiseAnIssuePopup = true;
	}

	function closeRaiseAnIssuePopup() {
		showRaiseAnIssuePopup = false;
	}

	let showAboutUsPopup = false;
	function openAboutUsPopup() {
		showAboutUsPopup = true;
	}

	function closeAboutUsPopup() {
		showAboutUsPopup = false;
	}

	function gotoHome() {
		goto("/home");
	}

	function showLoginPopup() {
		loginModalOpen = true;
		showSignUp = false;
	}

	function showSignUpPopup() {
		loginModalOpen = true;
		showSignUp = true;
	}

	onMount(() => {
		loginModalOpen = false;
		// token = Cookies.get("token");
		// if (token) {
		// 	goto("/home");
		// }
	});
</script>

<div class="landingPageWrap scrollbar-custom">
	{#if loginModalOpen}
		<LoginModal {showSignUp} {settings} on:close={() => (loginModalOpen = false)} />
	{/if}
	<div class="landingPageWrapChild">
		<div class="landBarWrap">
			<div class="landBarWidthWrap">
				<div class="logoTitleWrap">
					<div class="logoWrap">
						<img width="40px" src="/assets/images/statue-liberty.jpg" alt="immigpt" />
					</div>
					<div class="logoTitle">ImmiGPT</div>
				</div>
				<div class="authBtnWrap">
					<!-- <Button
						on:click={() => showSignUpPopup()}
						variant="default"
						color="dark"
						radius="xl"
						size="md"
					>
						<span style="color: #222 !important;">Sign up</span>
					</Button> -->
					<button on:click={() => showSignUpPopup()} class="signUpBtn"
						><span style="color: #222 !important;">Sign up</span></button
					>
					<button on:click={() => showLoginPopup()} class="loginBtn"
						><span style="color: #fff !important;">Login</span></button
					>
					<!-- <Button on:click={() => showLoginPopup()} color="dark" radius="xl" size="md"
						><span style="color: #fff !important;">Login</span></Button
					> -->
				</div>
			</div>
		</div>
		<div class="landPgHeroWrap">
			<div class="landPgHeroDetailWrap">
				<div class="landPgHeroTitle1">A Generative AI</div>
				<div class="landPgHeroTitle2">For Immigration and Travel</div>
				<div class="landPgHeroDesc">
					ImmiGPT revolutionizes your journey with cutting-edge AI technology,providing instant
					responses to your Travel and Immigration concerns.
				</div>
			</div>
			<div class="landPgHeroMailSection2">
				<!-- <div class="landPgHeroMailInputWrap">
					<input class="landPgHeroMailInput" type="text" placeholder="Enter Email address" />
					<Button on:click={() => (loginModalOpen = true)} color="dark" radius="xl" size="xs"
						>Try now</Button
					>
				</div> -->
				<!-- <Button color="dark" radius="xl" on:click={() => (loginModalOpen = true)} size="lg"
					><span style="color: #fff !important;">Get Started It’s Free</span></Button
				> -->
				<button on:click={() => (loginModalOpen = true)} class="getStartedBtn"
					><span style="color: #fff !important;">Get Started It’s Free</span></button
				>
				<div class="freePlanWrap">
					<div class="freeIconWrap">
						<svg
							width="17"
							height="17"
							viewBox="0 0 17 17"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="8.50006"
								cy="8.50006"
								r="6.0025"
								stroke="#00C850"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M6.12842 8.72613L7.57369 10.1714L7.56435 10.1621L10.825 6.90137"
								stroke="#00C850"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
					<div class="freePlanTitle">Free Plan Available</div>
				</div>
				<img src="/assets/images/immpng.png" style="margin-top: 16px;" alt="" />
			</div>
		</div>
		<div class="featureDetailSection">
			<div class="featureDetailsWrap">
				<div class="featureSubTitle">WHAT'S INSIDE</div>
				<div class="featureTitle">Explore the Infinite</div>
				<div class="featureCardsWrap">
					<div class="featureMainCard">
						<div class="featureDetailCard">
							<div class="featureIconWrap">
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect
										x="4"
										y="4"
										width="24"
										height="24"
										rx="6"
										stroke="white"
										stroke-opacity="0.87"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M22.6666 11.3343V19.5555C22.6666 20.1294 22.2993 20.6389 21.7549 20.8204L16.4216 22.5982C16.1479 22.6894 15.852 22.6894 15.5783 22.5982L10.2449 20.8204C9.70049 20.6389 9.33325 20.1294 9.33325 19.5555V11.3343C9.33325 10.9057 9.53928 10.5033 9.88697 10.2527C10.2347 10.0021 10.6816 9.93388 11.0882 10.0694L15.5783 11.5661C15.852 11.6573 16.1479 11.6573 16.4216 11.5661L20.9116 10.0694C21.3182 9.93388 21.7652 10.0021 22.1129 10.2527C22.4606 10.5033 22.6666 10.9057 22.6666 11.3343Z"
										stroke="white"
										stroke-opacity="0.87"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M15.9999 11.6333V22.6665"
										stroke="white"
										stroke-opacity="0.87"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<div class="featureTextWrap">
								<div class="featureTextTitle">
									Visa Interview and Immigration Preparation with Simulated Scenarios
								</div>
								<div class="featureTextDesc">
									Access a tailored compilation of anticipated questions and answers for your visa
									interview and immigration, personalized to your unique situation. Additionally,
									immerse yourself in simulated mock visa interviews and immigration scenarios that
									closely match your current circumstances.
								</div>
							</div>
						</div>
						<div class="featureDetailCard">
							<div class="featureIconWrap">
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M20 12.0002H22.6667"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M9.33325 22.6667H11.9999"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M16 22.6667H22.6667"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M25.3333 5.3335C26.8067 5.3335 28 6.52683 28 8.00016V25.3335C28 26.8068 26.8067 28.0002 25.3333 28.0002H6.66667C5.19333 28.0002 4 26.8068 4 25.3335V8.00016C4 6.52683 5.19333 5.3335 6.66667 5.3335"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M9.33325 17.3332H11.9999"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M16 17.3332H22.6667"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M13.3333 4H10.6666C9.93059 4 9.33325 4.59733 9.33325 5.33333V12L11.9999 10.6667L14.6666 12V5.33333C14.6666 4.59733 14.0693 4 13.3333 4Z"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M6.66675 5.33317H9.33341"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M14.6667 5.33317H25.3334"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<div class="featureTextWrap">
								<div class="featureTextTitle">Customizable Templates</div>
								<div class="featureTextDesc">
									Explore our document generation guidance for students, professionals, and
									tourists. From SOPs and LORs to financial support letters and offer letters,
									browse our provided formats. Fill in your details to receive personalized
									documents in your chosen template.
								</div>
							</div>
						</div>
					</div>
					<div class="featureMainCard">
						<div class="featureMainCardFull">
							<div class="featureTextTitle">What gives ImmiGPT a competitive edge ?</div>
							<div class="featureTextDesc">
								ImmiGPT simplifies the complex immigration process by addressing critical market
								gaps. Unlike Other GPT’s, ImmiGPT ensures access to real-time, up-to-date
								information eliminating knowledge restrictions. Its specialized training data
								ensures precise advice, focusing on immigration laws. The platform's unique
								reasoning module, paired with Large Language Model technology, facilitates logical
								reasoning, inference, and decision-making, offering personalized solutions. ImmiGPT
								stands as an innovative, efficient, and personalized alternative, empowering clients
								to navigate the complexities of immigration confidently and achieve their goals
								without unnecessary stress or delay.
							</div>
						</div>
					</div>
					<div class="featureMainCard">
						<div class="featureDetailCard">
							<div class="featureIconWrap">
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M27.6094 6.27585L25.724 4.39051C25.2027 3.86918 24.3587 3.86918 23.8387 4.39051L9.72404 18.5052C9.47337 18.7545 9.33337 19.0945 9.33337 19.4478V22.6665H12.552C12.9054 22.6665 13.2454 22.5265 13.4947 22.2758L27.6094 8.16118C28.1307 7.64118 28.1307 6.79718 27.6094 6.27585V6.27585Z"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M25.2134 10.5466L21.4534 6.78662"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M28 14.6667V25.3333C28 26.8067 26.8067 28 25.3333 28H6.66667C5.19333 28 4 26.8067 4 25.3333V6.66667C4 5.19333 5.19333 4 6.66667 4H17.3333"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<div class="featureTextWrap">
								<div class="featureTextTitle">Web Search Functionality</div>
								<div class="featureTextDesc">
									Enhance your search experience with our web search function, extracting precise
									and organized responses directly from the web that are relevant to your queries.
									This enables you to bypass the manual web scraping hassle, saving time and
									ensuring accurate, up-to-date information tailored to your needs.
								</div>
							</div>
						</div>
						<div class="featureDetailCard">
							<div class="featureIconWrap">
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M16.5454 15.6495H9.33337V12.4935C9.33337 10.7482 10.748 9.3335 12.4934 9.3335H16.5454C18.2894 9.3335 19.7027 10.7468 19.7027 12.4908V12.4908C19.704 14.2348 18.2894 15.6495 16.5454 15.6495Z"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M9.33337 15.6494H19.5094C21.2534 15.6494 22.6667 17.0627 22.6667 18.8067V19.5081C22.6667 21.2534 21.2534 22.6667 19.5094 22.6667H12.4934C10.748 22.6667 9.33337 21.2521 9.33337 19.5067V15.6494L9.33337 15.6494Z"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M10 4H22.0053C25.316 4 28 6.684 28 9.99467V22.0067C28 25.316 25.316 28 22.0053 28H9.99467C6.684 28 4 25.316 4 22.0053V10C4 6.68667 6.68667 4 10 4V4Z"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<div class="featureTextWrap">
								<div class="featureTextTitle">Blogs & FAQ's</div>
								<div class="featureTextDesc">
									Discover a wealth of knowledge in our blogs and FAQs. Dive into user experiences,
									gain insights, and find answers to commonly asked questions. Explore our content
									to enrich your understanding and make the most of your journey with us.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pricingDetailSection" id="pricingDetailSection">
			<div class="pricingDetailsWrap">
				<div class="pricingDetailSubTitle">pricing</div>
				<div class="pricingDetailTitle">Choose the plan that suits you best</div>
				<div class="pricingDetailCardsWrap">
					<div class="pricingDetailMainCard">
						<div class="priceWrap">
							<div class="payType">Free plan</div>
							<div class="price">$0/Month</div>
						</div>
						<div class="payTypeFeaturesWrap">
							<div class="detailText">Plan includes:</div>
							<div class="detailText">
								<svg
									width="16"
									height="17"
									viewBox="0 0 16 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.3333 4.83301L5.99996 12.1663L2.66663 8.83301"
										stroke="#00B347"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg> Access to ImmiGPT Basic model
							</div>
							<div class="detailText">
								<svg
									width="16"
									height="17"
									viewBox="0 0 16 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.3333 4.83301L5.99996 12.1663L2.66663 8.83301"
										stroke="#00B347"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg> Basic model updates
							</div>
							<div class="detailText">
								<svg
									width="16"
									height="17"
									viewBox="0 0 16 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.3333 4.83301L5.99996 12.1663L2.66663 8.83301"
										stroke="#00B347"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg> Access to templates
							</div>
							<div class="detailText">
								<svg
									width="16"
									height="17"
									viewBox="0 0 16 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.3333 4.83301L5.99996 12.1663L2.66663 8.83301"
										stroke="#00B347"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg> Access to Visa Preparation Centre
							</div>
							<div class="detailText"><span style="color: #fff;">.</span></div>
						</div>
						<!-- <Button fullSize color="dark" radius="md"
							><span style="color: #fff">Choose Plan</span></Button
						> -->
						<button on:click={() => (loginModalOpen = true)} class="choosePlanBtn"
							><span style="color: #fff !important;">Choose Plan</span></button
						>
					</div>
					<div class="pricingDetailMainCard">
						<div class="priceWrap">
							<div class="payType">Premium plan</div>
							<div class="price">$10/Month</div>
						</div>
						<div class="payTypeFeaturesWrap">
							<div class="detailText">Plan includes:</div>
							<div class="detailText">
								<svg
									width="16"
									height="17"
									viewBox="0 0 16 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.3333 4.83301L5.99996 12.1663L2.66663 8.83301"
										stroke="#00B347"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg> Access to ImmiGPT Pro model
							</div>
							<div class="detailText">
								<svg
									width="16"
									height="17"
									viewBox="0 0 16 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.3333 4.83301L5.99996 12.1663L2.66663 8.83301"
										stroke="#00B347"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg> Pro model updates
							</div>
							<div class="detailText">
								<svg
									width="16"
									height="17"
									viewBox="0 0 16 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.3333 4.83301L5.99996 12.1663L2.66663 8.83301"
										stroke="#00B347"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg> Access to templates
							</div>
							<div class="detailText">
								<svg
									width="16"
									height="17"
									viewBox="0 0 16 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.3333 4.83301L5.99996 12.1663L2.66663 8.83301"
										stroke="#00B347"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg> Access to Visa Preparation Centre
							</div>
							<div class="detailText">
								<svg
									width="16"
									height="17"
									viewBox="0 0 16 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.3333 4.83301L5.99996 12.1663L2.66663 8.83301"
										stroke="#00B347"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg> Access Beta features
							</div>
						</div>
						<!-- <Button fullSize color="dark" radius="md"
							><span style="color: #fff">Choose Plan</span></Button
						> -->
						<button on:click={() => (loginModalOpen = true)} class="choosePlanBtn"
							><span style="color: #fff !important;">Choose Plan</span></button
						>
					</div>
				</div>
			</div>
		</div>
		<div class="expSection">
			<div class="expWrap">
				<div class="expTextWrap">
					<div class="expTitle">Experience the power of ImmiGPT for Free</div>
					<div class="expDesc">Try it now and explore the possibilities!</div>
				</div>
				<!-- <Button
					on:click={() => (loginModalOpen = true)}
					variant="default"
					color="dark"
					radius="xl"
					size="md"><span style="color:#000 !important">Get Started</span></Button
				> -->
				<button on:click={() => (loginModalOpen = true)} class="getStartedSmallBtn"
					><span style="color: #000 !important;">Get Started</span></button
				>
			</div>
		</div>
		<div class="trySection">
			<div class="tryWrap">
				<div class="tryTextWrap">
					<div class="tryTitle">Access your Travel Companion at pocket</div>
					<div class="tryDesc">
						Find real time answers related to Travel and Immigration, Prepare and attempt mocks for
						Visa interview, Compelling SOP assistance
					</div>
					<svg
						width="127"
						height="48"
						viewBox="0 0 127 48"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<rect x="0.5" y="0.5" width="126" height="47" rx="5.5" fill="black" />
						<rect x="0.5" y="0.5" width="126" height="47" rx="5.5" stroke="#776F6F" />
						<path
							d="M47.5767 14.5199C47.5218 14.3475 47.4479 14.1932 47.3551 14.0568C47.2642 13.9186 47.1553 13.8011 47.0284 13.7045C46.9015 13.6061 46.7566 13.5312 46.5938 13.4801C46.4328 13.429 46.2557 13.4034 46.0625 13.4034C45.7348 13.4034 45.4394 13.4877 45.1761 13.6562C44.9129 13.8248 44.7045 14.072 44.5511 14.3977C44.3996 14.7216 44.3239 15.1184 44.3239 15.5881C44.3239 16.0597 44.4006 16.4583 44.554 16.7841C44.7074 17.1098 44.9176 17.357 45.1847 17.5256C45.4517 17.6941 45.7557 17.7784 46.0966 17.7784C46.4129 17.7784 46.6884 17.714 46.9233 17.5852C47.16 17.4564 47.3428 17.2746 47.4716 17.0398C47.6023 16.803 47.6676 16.5246 47.6676 16.2045L47.8949 16.2472H46.2301V15.5227H48.517V16.1847C48.517 16.6733 48.4129 17.0975 48.2045 17.4574C47.9981 17.8153 47.7121 18.0919 47.3466 18.2869C46.983 18.482 46.5663 18.5795 46.0966 18.5795C45.5701 18.5795 45.108 18.4583 44.7102 18.2159C44.3144 17.9735 44.0057 17.6297 43.7841 17.1847C43.5625 16.7377 43.4517 16.2074 43.4517 15.5938C43.4517 15.1297 43.5161 14.7131 43.6449 14.3438C43.7737 13.9744 43.9545 13.661 44.1875 13.4034C44.4223 13.1439 44.6979 12.946 45.0142 12.8097C45.3324 12.6714 45.6799 12.6023 46.0568 12.6023C46.3712 12.6023 46.6638 12.6487 46.9347 12.7415C47.2074 12.8343 47.4498 12.9659 47.6619 13.1364C47.8759 13.3068 48.053 13.5095 48.1932 13.7443C48.3333 13.9773 48.428 14.2358 48.4773 14.5199H47.5767ZM49.6314 18.5V12.6818H53.2791V13.4375H50.5092V15.2102H53.0888V15.9631H50.5092V17.7443H53.3132V18.5H49.6314ZM54.1648 13.4375V12.6818H58.6676V13.4375H56.8523V18.5H55.9773V13.4375H54.1648ZM62.6577 12.6818V18.5H61.7798V12.6818H62.6577ZM63.6491 13.4375V12.6818H68.152V13.4375H66.3366V18.5H65.4616V13.4375H63.6491ZM76.3182 15.5909C76.3182 16.2121 76.2045 16.7462 75.9773 17.1932C75.75 17.6383 75.4384 17.9811 75.0426 18.2216C74.6487 18.4602 74.2008 18.5795 73.6989 18.5795C73.1951 18.5795 72.7453 18.4602 72.3494 18.2216C71.9555 17.9811 71.6449 17.6373 71.4176 17.1903C71.1903 16.7434 71.0767 16.2102 71.0767 15.5909C71.0767 14.9697 71.1903 14.4366 71.4176 13.9915C71.6449 13.5445 71.9555 13.2017 72.3494 12.9631C72.7453 12.7225 73.1951 12.6023 73.6989 12.6023C74.2008 12.6023 74.6487 12.7225 75.0426 12.9631C75.4384 13.2017 75.75 13.5445 75.9773 13.9915C76.2045 14.4366 76.3182 14.9697 76.3182 15.5909ZM75.4489 15.5909C75.4489 15.1174 75.3722 14.7187 75.2188 14.3949C75.0672 14.0691 74.8589 13.8229 74.5938 13.6562C74.3305 13.4877 74.0322 13.4034 73.6989 13.4034C73.3636 13.4034 73.0644 13.4877 72.8011 13.6562C72.5379 13.8229 72.3295 14.0691 72.1761 14.3949C72.0246 14.7187 71.9489 15.1174 71.9489 15.5909C71.9489 16.0644 72.0246 16.464 72.1761 16.7898C72.3295 17.1136 72.5379 17.3598 72.8011 17.5284C73.0644 17.6951 73.3636 17.7784 73.6989 17.7784C74.0322 17.7784 74.3305 17.6951 74.5938 17.5284C74.8589 17.3598 75.0672 17.1136 75.2188 16.7898C75.3722 16.464 75.4489 16.0644 75.4489 15.5909ZM82.1087 12.6818V18.5H81.3018L78.3445 14.233H78.2905V18.5H77.4126V12.6818H78.2251L81.1854 16.9545H81.2393V12.6818H82.1087Z"
							fill="white"
						/>
						<path
							d="M49.5455 28.5938C49.4858 28.3864 49.402 28.2031 49.294 28.044C49.1861 27.8821 49.054 27.7457 48.8977 27.6349C48.7443 27.5213 48.5682 27.4347 48.3693 27.375C48.1733 27.3153 47.956 27.2855 47.7173 27.2855C47.2713 27.2855 46.8793 27.3963 46.5412 27.6179C46.206 27.8395 45.9446 28.1619 45.7571 28.5852C45.5696 29.0057 45.4759 29.5199 45.4759 30.1278C45.4759 30.7358 45.5682 31.2528 45.7528 31.679C45.9375 32.1051 46.1989 32.4304 46.5369 32.6548C46.875 32.8764 47.2741 32.9872 47.7344 32.9872C48.152 32.9872 48.5085 32.9134 48.804 32.7656C49.1023 32.6151 49.3295 32.4034 49.4858 32.1307C49.6449 31.858 49.7244 31.5355 49.7244 31.1634L50.0994 31.2188H47.8494V29.8295H51.5014V30.929C51.5014 31.696 51.3395 32.3551 51.0156 32.9062C50.6918 33.4545 50.2457 33.8778 49.6776 34.1761C49.1094 34.4716 48.4588 34.6193 47.7259 34.6193C46.9077 34.6193 46.1889 34.4389 45.5696 34.0781C44.9503 33.7145 44.4673 33.1989 44.1207 32.5312C43.777 31.8608 43.6051 31.0653 43.6051 30.1449C43.6051 29.4375 43.7074 28.8068 43.9119 28.2528C44.1193 27.696 44.4091 27.2244 44.7812 26.8381C45.1534 26.4517 45.5866 26.1577 46.081 25.956C46.5753 25.7543 47.1108 25.6534 47.6875 25.6534C48.1818 25.6534 48.642 25.7259 49.0682 25.8707C49.4943 26.0128 49.8722 26.2145 50.2017 26.4759C50.5341 26.7372 50.8054 27.0483 51.0156 27.4091C51.2259 27.767 51.3608 28.1619 51.4205 28.5938H49.5455ZM55.8107 34.6278C55.1488 34.6278 54.5763 34.4872 54.0934 34.206C53.6133 33.9219 53.2425 33.527 52.9812 33.0213C52.7198 32.5128 52.5891 31.9233 52.5891 31.2528C52.5891 30.5767 52.7198 29.9858 52.9812 29.4801C53.2425 28.9716 53.6133 28.5767 54.0934 28.2955C54.5763 28.0114 55.1488 27.8693 55.8107 27.8693C56.4727 27.8693 57.0437 28.0114 57.5238 28.2955C58.0067 28.5767 58.3789 28.9716 58.6403 29.4801C58.9016 29.9858 59.0323 30.5767 59.0323 31.2528C59.0323 31.9233 58.9016 32.5128 58.6403 33.0213C58.3789 33.527 58.0067 33.9219 57.5238 34.206C57.0437 34.4872 56.4727 34.6278 55.8107 34.6278ZM55.8192 33.2216C56.1204 33.2216 56.3718 33.1364 56.5735 32.9659C56.7752 32.7926 56.9272 32.5568 57.0295 32.2585C57.1346 31.9602 57.1871 31.6207 57.1871 31.2401C57.1871 30.8594 57.1346 30.5199 57.0295 30.2216C56.9272 29.9233 56.7752 29.6875 56.5735 29.5142C56.3718 29.3409 56.1204 29.2543 55.8192 29.2543C55.5153 29.2543 55.2596 29.3409 55.0522 29.5142C54.8477 29.6875 54.6928 29.9233 54.5877 30.2216C54.4854 30.5199 54.4343 30.8594 54.4343 31.2401C54.4343 31.6207 54.4854 31.9602 54.5877 32.2585C54.6928 32.5568 54.8477 32.7926 55.0522 32.9659C55.2596 33.1364 55.5153 33.2216 55.8192 33.2216ZM63.1701 34.6278C62.5082 34.6278 61.9357 34.4872 61.4528 34.206C60.9727 33.9219 60.6019 33.527 60.3406 33.0213C60.0792 32.5128 59.9485 31.9233 59.9485 31.2528C59.9485 30.5767 60.0792 29.9858 60.3406 29.4801C60.6019 28.9716 60.9727 28.5767 61.4528 28.2955C61.9357 28.0114 62.5082 27.8693 63.1701 27.8693C63.832 27.8693 64.4031 28.0114 64.8832 28.2955C65.3661 28.5767 65.7383 28.9716 65.9996 29.4801C66.261 29.9858 66.3917 30.5767 66.3917 31.2528C66.3917 31.9233 66.261 32.5128 65.9996 33.0213C65.7383 33.527 65.3661 33.9219 64.8832 34.206C64.4031 34.4872 63.832 34.6278 63.1701 34.6278ZM63.1786 33.2216C63.4798 33.2216 63.7312 33.1364 63.9329 32.9659C64.1346 32.7926 64.2866 32.5568 64.3888 32.2585C64.494 31.9602 64.5465 31.6207 64.5465 31.2401C64.5465 30.8594 64.494 30.5199 64.3888 30.2216C64.2866 29.9233 64.1346 29.6875 63.9329 29.5142C63.7312 29.3409 63.4798 29.2543 63.1786 29.2543C62.8746 29.2543 62.619 29.3409 62.4116 29.5142C62.207 29.6875 62.0522 29.9233 61.9471 30.2216C61.8448 30.5199 61.7937 30.8594 61.7937 31.2401C61.7937 31.6207 61.8448 31.9602 61.9471 32.2585C62.0522 32.5568 62.207 32.7926 62.4116 32.9659C62.619 33.1364 62.8746 33.2216 63.1786 33.2216ZM70.521 37.0909C69.9329 37.0909 69.4286 37.0099 69.0082 36.848C68.5906 36.6889 68.2582 36.4716 68.011 36.196C67.7638 35.9205 67.6033 35.6108 67.5295 35.267L69.2085 35.0412C69.2596 35.1719 69.3406 35.294 69.4513 35.4077C69.5621 35.5213 69.7085 35.6122 69.8903 35.6804C70.0749 35.7514 70.2994 35.7869 70.5636 35.7869C70.9585 35.7869 71.2837 35.6903 71.5394 35.4972C71.7979 35.3068 71.9272 34.9872 71.9272 34.5384V33.3409H71.8505C71.771 33.5227 71.6516 33.6946 71.4925 33.8565C71.3335 34.0185 71.1289 34.1506 70.8789 34.2528C70.6289 34.3551 70.3306 34.4062 69.984 34.4062C69.4925 34.4062 69.0451 34.2926 68.6417 34.0653C68.2411 33.8352 67.9215 33.4844 67.6829 33.0128C67.4471 32.5384 67.3292 31.9389 67.3292 31.2145C67.3292 30.473 67.4499 29.8537 67.6914 29.3565C67.9329 28.8594 68.2539 28.4872 68.6545 28.2401C69.0579 27.9929 69.4996 27.8693 69.9798 27.8693C70.3462 27.8693 70.6531 27.9318 70.9002 28.0568C71.1474 28.179 71.3462 28.3324 71.4968 28.517C71.6502 28.6989 71.7681 28.8778 71.8505 29.054H71.9187V27.9545H73.7212V34.5639C73.7212 35.1207 73.5849 35.5866 73.3121 35.9616C73.0394 36.3366 72.6616 36.6179 72.1786 36.8054C71.6985 36.9957 71.146 37.0909 70.521 37.0909ZM70.5593 33.0426C70.8519 33.0426 71.0991 32.9702 71.3008 32.8253C71.5053 32.6776 71.6616 32.4673 71.7695 32.1946C71.8803 31.919 71.9357 31.5895 71.9357 31.206C71.9357 30.8224 71.8817 30.4901 71.7738 30.2088C71.6658 29.9247 71.5096 29.7045 71.305 29.5483C71.1005 29.392 70.8519 29.3139 70.5593 29.3139C70.261 29.3139 70.0096 29.3949 69.805 29.5568C69.6005 29.7159 69.4457 29.9375 69.3406 30.2216C69.2354 30.5057 69.1829 30.8338 69.1829 31.206C69.1829 31.5838 69.2354 31.9105 69.3406 32.1861C69.4485 32.4588 69.6033 32.6705 69.805 32.821C70.0096 32.9687 70.261 33.0426 70.5593 33.0426ZM76.9812 25.7727V34.5H75.1658V25.7727H76.9812ZM81.4183 34.6278C80.745 34.6278 80.1655 34.4915 79.6797 34.2188C79.1967 33.9432 78.8246 33.554 78.5632 33.0511C78.3018 32.5455 78.1712 31.9474 78.1712 31.2571C78.1712 30.5838 78.3018 29.9929 78.5632 29.4844C78.8246 28.9759 79.1925 28.5795 79.6669 28.2955C80.1442 28.0114 80.7038 27.8693 81.3459 27.8693C81.7777 27.8693 82.1797 27.9389 82.5518 28.0781C82.9268 28.2145 83.2536 28.4205 83.532 28.696C83.8132 28.9716 84.032 29.3182 84.1882 29.7358C84.3445 30.1506 84.4226 30.6364 84.4226 31.1932V31.6918H78.8956V30.5668H82.7138C82.7138 30.3054 82.657 30.0739 82.5433 29.8722C82.4297 29.6705 82.272 29.5128 82.0703 29.3991C81.8714 29.2827 81.6399 29.2244 81.3757 29.2244C81.1001 29.2244 80.8558 29.2884 80.6428 29.4162C80.4325 29.5412 80.2678 29.7102 80.1484 29.9233C80.0291 30.1335 79.968 30.3679 79.9652 30.6264V31.696C79.9652 32.0199 80.0249 32.2997 80.1442 32.5355C80.2663 32.7713 80.4382 32.9531 80.6598 33.081C80.8814 33.2088 81.1442 33.2727 81.4482 33.2727C81.6499 33.2727 81.8345 33.2443 82.0021 33.1875C82.1697 33.1307 82.3132 33.0455 82.4325 32.9318C82.5518 32.8182 82.6428 32.679 82.7053 32.5142L84.3842 32.625C84.299 33.0284 84.1243 33.3807 83.8601 33.6818C83.5987 33.9801 83.2607 34.2131 82.8459 34.3807C82.4339 34.5455 81.9581 34.6278 81.4183 34.6278ZM88.4187 34.5V25.7727H91.8619C92.5238 25.7727 93.0877 25.8991 93.5536 26.152C94.0195 26.402 94.3746 26.75 94.619 27.196C94.8661 27.6392 94.9897 28.1506 94.9897 28.7301C94.9897 29.3097 94.8647 29.821 94.6147 30.2642C94.3647 30.7074 94.0025 31.0526 93.5281 31.2997C93.0565 31.5469 92.4854 31.6705 91.815 31.6705H89.6204V30.1918H91.5167C91.8718 30.1918 92.1644 30.1307 92.3945 30.0085C92.6275 29.8835 92.8008 29.7116 92.9144 29.4929C93.0309 29.2713 93.0891 29.017 93.0891 28.7301C93.0891 28.4403 93.0309 28.1875 92.9144 27.9716C92.8008 27.7528 92.6275 27.5838 92.3945 27.4645C92.1616 27.3423 91.8661 27.2812 91.5082 27.2812H90.2638V34.5H88.4187ZM97.9695 25.7727V34.5H96.1541V25.7727H97.9695ZM101.29 34.6236C100.873 34.6236 100.5 34.5511 100.174 34.4062C99.8469 34.2585 99.5884 34.0412 99.3981 33.7543C99.2106 33.4645 99.1168 33.1037 99.1168 32.6719C99.1168 32.3082 99.1836 32.0028 99.3171 31.7557C99.4506 31.5085 99.6325 31.3097 99.8626 31.1591C100.093 31.0085 100.354 30.8949 100.647 30.8182C100.942 30.7415 101.252 30.6875 101.576 30.6562C101.956 30.6165 102.263 30.5795 102.496 30.5455C102.729 30.5085 102.898 30.4545 103.003 30.3835C103.108 30.3125 103.161 30.2074 103.161 30.0682V30.0426C103.161 29.7727 103.076 29.5639 102.905 29.4162C102.738 29.2685 102.499 29.1946 102.189 29.1946C101.863 29.1946 101.603 29.267 101.409 29.4119C101.216 29.554 101.088 29.733 101.026 29.9489L99.3469 29.8125C99.4322 29.4148 99.5998 29.071 99.8498 28.7812C100.1 28.4886 100.422 28.2642 100.817 28.108C101.215 27.9489 101.675 27.8693 102.198 27.8693C102.561 27.8693 102.909 27.9119 103.242 27.9972C103.577 28.0824 103.874 28.2145 104.132 28.3935C104.394 28.5724 104.6 28.8026 104.75 29.0838C104.901 29.3622 104.976 29.696 104.976 30.0852V34.5H103.255V33.5923H103.203C103.098 33.7969 102.958 33.9773 102.782 34.1335C102.605 34.2869 102.394 34.4077 102.147 34.4957C101.9 34.581 101.614 34.6236 101.29 34.6236ZM101.81 33.3707C102.077 33.3707 102.313 33.3182 102.517 33.2131C102.722 33.1051 102.882 32.9602 102.999 32.7784C103.115 32.5966 103.174 32.3906 103.174 32.1605V31.4659C103.117 31.5028 103.039 31.5369 102.939 31.5682C102.843 31.5966 102.733 31.6236 102.611 31.6491C102.489 31.6719 102.367 31.6932 102.245 31.7131C102.123 31.7301 102.012 31.7457 101.912 31.7599C101.699 31.7912 101.513 31.8409 101.354 31.9091C101.195 31.9773 101.071 32.0696 100.983 32.1861C100.895 32.2997 100.851 32.4418 100.851 32.6122C100.851 32.8594 100.941 33.0483 101.12 33.179C101.301 33.3068 101.532 33.3707 101.81 33.3707ZM107.271 36.9545C107.041 36.9545 106.825 36.9361 106.623 36.8991C106.424 36.8651 106.26 36.821 106.129 36.767L106.538 35.4119C106.751 35.4773 106.943 35.5128 107.113 35.5185C107.287 35.5241 107.436 35.4844 107.561 35.3991C107.689 35.3139 107.792 35.169 107.872 34.9645L107.978 34.6875L105.63 27.9545H107.539L108.895 32.7614H108.963L110.331 27.9545H112.252L109.708 35.2074C109.586 35.5597 109.42 35.8665 109.21 36.1278C109.002 36.392 108.74 36.5952 108.422 36.7372C108.103 36.8821 107.72 36.9545 107.271 36.9545Z"
							fill="white"
						/>
						<rect x="12" y="12" width="24" height="24" fill="url(#pattern0)" />
						<defs>
							<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
								<use xlink:href="#image0_943_907" transform="scale(0.00195312)" />
							</pattern>
							<image
								id="image0_943_907"
								width="512"
								height="512"
								xlink:href="data:image/png;base64,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"
							/>
						</defs>
					</svg>
				</div>
				<div class="previewAppWrap">
					<div class="previewImage1">
						<img width="200px" src="/assets/images/90002.png" alt="" />
					</div>
					<div class="previewImage2">
						<img width="200px" src="/assets/images/90001.png" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="footerSection">
			<div class="footerWrap">
				<div class="footerAbout">
					<div class="logoTitleWrap">
						<div class="logoWrap">
							<img width="40px" src="/assets/images/sl-neg.png" alt="immigpt" />
						</div>
						<div class="logoTitleWhite">ImmiGPT</div>
					</div>
					<div class="footerAboutDesc">A Generative AI For Immigration And Travel</div>
					<svg
						width="270"
						height="48"
						viewBox="0 0 270 48"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<rect x="0.5" y="2.5" width="126" height="43" rx="5.5" fill="black" />
						<rect x="0.5" y="2.5" width="126" height="43" rx="5.5" stroke="#776F6F" />
						<path
							d="M47.5767 14.0199C47.5218 13.8475 47.4479 13.6932 47.3551 13.5568C47.2642 13.4186 47.1553 13.3011 47.0284 13.2045C46.9015 13.1061 46.7566 13.0312 46.5938 12.9801C46.4328 12.929 46.2557 12.9034 46.0625 12.9034C45.7348 12.9034 45.4394 12.9877 45.1761 13.1562C44.9129 13.3248 44.7045 13.572 44.5511 13.8977C44.3996 14.2216 44.3239 14.6184 44.3239 15.0881C44.3239 15.5597 44.4006 15.9583 44.554 16.2841C44.7074 16.6098 44.9176 16.857 45.1847 17.0256C45.4517 17.1941 45.7557 17.2784 46.0966 17.2784C46.4129 17.2784 46.6884 17.214 46.9233 17.0852C47.16 16.9564 47.3428 16.7746 47.4716 16.5398C47.6023 16.303 47.6676 16.0246 47.6676 15.7045L47.8949 15.7472H46.2301V15.0227H48.517V15.6847C48.517 16.1733 48.4129 16.5975 48.2045 16.9574C47.9981 17.3153 47.7121 17.5919 47.3466 17.7869C46.983 17.982 46.5663 18.0795 46.0966 18.0795C45.5701 18.0795 45.108 17.9583 44.7102 17.7159C44.3144 17.4735 44.0057 17.1297 43.7841 16.6847C43.5625 16.2377 43.4517 15.7074 43.4517 15.0938C43.4517 14.6297 43.5161 14.2131 43.6449 13.8438C43.7737 13.4744 43.9545 13.161 44.1875 12.9034C44.4223 12.6439 44.6979 12.446 45.0142 12.3097C45.3324 12.1714 45.6799 12.1023 46.0568 12.1023C46.3712 12.1023 46.6638 12.1487 46.9347 12.2415C47.2074 12.3343 47.4498 12.4659 47.6619 12.6364C47.8759 12.8068 48.053 13.0095 48.1932 13.2443C48.3333 13.4773 48.428 13.7358 48.4773 14.0199H47.5767ZM49.6314 18V12.1818H53.2791V12.9375H50.5092V14.7102H53.0888V15.4631H50.5092V17.2443H53.3132V18H49.6314ZM54.1648 12.9375V12.1818H58.6676V12.9375H56.8523V18H55.9773V12.9375H54.1648ZM62.6577 12.1818V18H61.7798V12.1818H62.6577ZM63.6491 12.9375V12.1818H68.152V12.9375H66.3366V18H65.4616V12.9375H63.6491ZM76.3182 15.0909C76.3182 15.7121 76.2045 16.2462 75.9773 16.6932C75.75 17.1383 75.4384 17.4811 75.0426 17.7216C74.6487 17.9602 74.2008 18.0795 73.6989 18.0795C73.1951 18.0795 72.7453 17.9602 72.3494 17.7216C71.9555 17.4811 71.6449 17.1373 71.4176 16.6903C71.1903 16.2434 71.0767 15.7102 71.0767 15.0909C71.0767 14.4697 71.1903 13.9366 71.4176 13.4915C71.6449 13.0445 71.9555 12.7017 72.3494 12.4631C72.7453 12.2225 73.1951 12.1023 73.6989 12.1023C74.2008 12.1023 74.6487 12.2225 75.0426 12.4631C75.4384 12.7017 75.75 13.0445 75.9773 13.4915C76.2045 13.9366 76.3182 14.4697 76.3182 15.0909ZM75.4489 15.0909C75.4489 14.6174 75.3722 14.2187 75.2188 13.8949C75.0672 13.5691 74.8589 13.3229 74.5938 13.1562C74.3305 12.9877 74.0322 12.9034 73.6989 12.9034C73.3636 12.9034 73.0644 12.9877 72.8011 13.1562C72.5379 13.3229 72.3295 13.5691 72.1761 13.8949C72.0246 14.2187 71.9489 14.6174 71.9489 15.0909C71.9489 15.5644 72.0246 15.964 72.1761 16.2898C72.3295 16.6136 72.5379 16.8598 72.8011 17.0284C73.0644 17.1951 73.3636 17.2784 73.6989 17.2784C74.0322 17.2784 74.3305 17.1951 74.5938 17.0284C74.8589 16.8598 75.0672 16.6136 75.2188 16.2898C75.3722 15.964 75.4489 15.5644 75.4489 15.0909ZM82.1087 12.1818V18H81.3018L78.3445 13.733H78.2905V18H77.4126V12.1818H78.2251L81.1854 16.4545H81.2393V12.1818H82.1087Z"
							fill="white"
						/>
						<path
							d="M49.936 27.06C49.72 26.644 49.42 26.332 49.036 26.124C48.652 25.908 48.208 25.8 47.704 25.8C47.152 25.8 46.66 25.924 46.228 26.172C45.796 26.42 45.456 26.772 45.208 27.228C44.968 27.684 44.848 28.212 44.848 28.812C44.848 29.412 44.968 29.944 45.208 30.408C45.456 30.864 45.796 31.216 46.228 31.464C46.66 31.712 47.152 31.836 47.704 31.836C48.448 31.836 49.052 31.628 49.516 31.212C49.98 30.796 50.264 30.232 50.368 29.52H47.236V28.428H51.832V29.496C51.744 30.144 51.512 30.74 51.136 31.284C50.768 31.828 50.284 32.264 49.684 32.592C49.092 32.912 48.432 33.072 47.704 33.072C46.92 33.072 46.204 32.892 45.556 32.532C44.908 32.164 44.392 31.656 44.008 31.008C43.632 30.36 43.444 29.628 43.444 28.812C43.444 27.996 43.632 27.264 44.008 26.616C44.392 25.968 44.908 25.464 45.556 25.104C46.212 24.736 46.928 24.552 47.704 24.552C48.592 24.552 49.38 24.772 50.068 25.212C50.764 25.644 51.268 26.26 51.58 27.06H49.936ZM56.0493 33.108C55.4253 33.108 54.8613 32.968 54.3573 32.688C53.8533 32.4 53.4573 32 53.1693 31.488C52.8813 30.968 52.7373 30.368 52.7373 29.688C52.7373 29.016 52.8853 28.42 53.1813 27.9C53.4773 27.38 53.8813 26.98 54.3933 26.7C54.9053 26.42 55.4773 26.28 56.1093 26.28C56.7413 26.28 57.3133 26.42 57.8253 26.7C58.3373 26.98 58.7413 27.38 59.0373 27.9C59.3333 28.42 59.4813 29.016 59.4813 29.688C59.4813 30.36 59.3293 30.956 59.0253 31.476C58.7213 31.996 58.3053 32.4 57.7773 32.688C57.2573 32.968 56.6813 33.108 56.0493 33.108ZM56.0493 31.92C56.4013 31.92 56.7293 31.836 57.0333 31.668C57.3453 31.5 57.5973 31.248 57.7893 30.912C57.9813 30.576 58.0773 30.168 58.0773 29.688C58.0773 29.208 57.9853 28.804 57.8013 28.476C57.6173 28.14 57.3733 27.888 57.0693 27.72C56.7653 27.552 56.4373 27.468 56.0853 27.468C55.7333 27.468 55.4053 27.552 55.1013 27.72C54.8053 27.888 54.5693 28.14 54.3933 28.476C54.2173 28.804 54.1293 29.208 54.1293 29.688C54.1293 30.4 54.3093 30.952 54.6693 31.344C55.0373 31.728 55.4973 31.92 56.0493 31.92ZM63.7016 33.108C63.0776 33.108 62.5136 32.968 62.0096 32.688C61.5056 32.4 61.1096 32 60.8216 31.488C60.5336 30.968 60.3896 30.368 60.3896 29.688C60.3896 29.016 60.5376 28.42 60.8336 27.9C61.1296 27.38 61.5336 26.98 62.0456 26.7C62.5576 26.42 63.1296 26.28 63.7616 26.28C64.3936 26.28 64.9656 26.42 65.4776 26.7C65.9896 26.98 66.3936 27.38 66.6896 27.9C66.9856 28.42 67.1336 29.016 67.1336 29.688C67.1336 30.36 66.9816 30.956 66.6776 31.476C66.3736 31.996 65.9576 32.4 65.4296 32.688C64.9096 32.968 64.3336 33.108 63.7016 33.108ZM63.7016 31.92C64.0536 31.92 64.3816 31.836 64.6856 31.668C64.9976 31.5 65.2496 31.248 65.4416 30.912C65.6336 30.576 65.7296 30.168 65.7296 29.688C65.7296 29.208 65.6376 28.804 65.4536 28.476C65.2696 28.14 65.0256 27.888 64.7216 27.72C64.4176 27.552 64.0896 27.468 63.7376 27.468C63.3856 27.468 63.0576 27.552 62.7536 27.72C62.4576 27.888 62.2216 28.14 62.0456 28.476C61.8696 28.804 61.7816 29.208 61.7816 29.688C61.7816 30.4 61.9616 30.952 62.3216 31.344C62.6896 31.728 63.1496 31.92 63.7016 31.92ZM71.1499 26.28C71.6619 26.28 72.1139 26.384 72.5059 26.592C72.9059 26.792 73.2179 27.044 73.4419 27.348V26.388H74.8219V33.108C74.8219 33.716 74.6939 34.256 74.4379 34.728C74.1819 35.208 73.8099 35.584 73.3219 35.856C72.8419 36.128 72.2659 36.264 71.5939 36.264C70.6979 36.264 69.9539 36.052 69.3619 35.628C68.7699 35.212 68.4339 34.644 68.3539 33.924H69.7099C69.8139 34.268 70.0339 34.544 70.3699 34.752C70.7139 34.968 71.1219 35.076 71.5939 35.076C72.1459 35.076 72.5899 34.908 72.9259 34.572C73.2699 34.236 73.4419 33.748 73.4419 33.108V32.004C73.2099 32.316 72.8939 32.58 72.4939 32.796C72.1019 33.004 71.6539 33.108 71.1499 33.108C70.5739 33.108 70.0459 32.964 69.5659 32.676C69.0939 32.38 68.7179 31.972 68.4379 31.452C68.1659 30.924 68.0299 30.328 68.0299 29.664C68.0299 29 68.1659 28.412 68.4379 27.9C68.7179 27.388 69.0939 26.992 69.5659 26.712C70.0459 26.424 70.5739 26.28 71.1499 26.28ZM73.4419 29.688C73.4419 29.232 73.3459 28.836 73.1539 28.5C72.9699 28.164 72.7259 27.908 72.4219 27.732C72.1179 27.556 71.7899 27.468 71.4379 27.468C71.0859 27.468 70.7579 27.556 70.4539 27.732C70.1499 27.9 69.9019 28.152 69.7099 28.488C69.5259 28.816 69.4339 29.208 69.4339 29.664C69.4339 30.12 69.5259 30.52 69.7099 30.864C69.9019 31.208 70.1499 31.472 70.4539 31.656C70.7659 31.832 71.0939 31.92 71.4379 31.92C71.7899 31.92 72.1179 31.832 72.4219 31.656C72.7259 31.48 72.9699 31.224 73.1539 30.888C73.3459 30.544 73.4419 30.144 73.4419 29.688ZM77.9868 24.12V33H76.6188V24.12H77.9868ZM85.8428 29.532C85.8428 29.78 85.8268 30.004 85.7948 30.204H80.7428C80.7828 30.732 80.9788 31.156 81.3308 31.476C81.6828 31.796 82.1148 31.956 82.6268 31.956C83.3628 31.956 83.8828 31.648 84.1868 31.032H85.6628C85.4628 31.64 85.0988 32.14 84.5708 32.532C84.0508 32.916 83.4028 33.108 82.6268 33.108C81.9948 33.108 81.4268 32.968 80.9228 32.688C80.4268 32.4 80.0348 32 79.7468 31.488C79.4668 30.968 79.3268 30.368 79.3268 29.688C79.3268 29.008 79.4628 28.412 79.7348 27.9C80.0148 27.38 80.4028 26.98 80.8988 26.7C81.4028 26.42 81.9788 26.28 82.6268 26.28C83.2508 26.28 83.8068 26.416 84.2948 26.688C84.7828 26.96 85.1628 27.344 85.4348 27.84C85.7068 28.328 85.8428 28.892 85.8428 29.532ZM84.4148 29.1C84.4068 28.596 84.2268 28.192 83.8748 27.888C83.5228 27.584 83.0868 27.432 82.5668 27.432C82.0948 27.432 81.6908 27.584 81.3548 27.888C81.0188 28.184 80.8188 28.588 80.7548 29.1H84.4148ZM96.1383 27.144C96.1383 27.568 96.0383 27.968 95.8383 28.344C95.6383 28.72 95.3183 29.028 94.8783 29.268C94.4383 29.5 93.8743 29.616 93.1863 29.616H91.6743V33H90.3063V24.66H93.1863C93.8263 24.66 94.3663 24.772 94.8063 24.996C95.2543 25.212 95.5863 25.508 95.8023 25.884C96.0263 26.26 96.1383 26.68 96.1383 27.144ZM93.1863 28.5C93.7063 28.5 94.0943 28.384 94.3503 28.152C94.6063 27.912 94.7343 27.576 94.7343 27.144C94.7343 26.232 94.2183 25.776 93.1863 25.776H91.6743V28.5H93.1863ZM98.811 24.12V33H97.443V24.12H98.811ZM100.151 29.664C100.151 29 100.287 28.412 100.559 27.9C100.839 27.388 101.215 26.992 101.687 26.712C102.167 26.424 102.695 26.28 103.271 26.28C103.791 26.28 104.243 26.384 104.627 26.592C105.019 26.792 105.331 27.044 105.563 27.348V26.388H106.943V33H105.563V32.016C105.331 32.328 105.015 32.588 104.615 32.796C104.215 33.004 103.759 33.108 103.247 33.108C102.679 33.108 102.159 32.964 101.687 32.676C101.215 32.38 100.839 31.972 100.559 31.452C100.287 30.924 100.151 30.328 100.151 29.664ZM105.563 29.688C105.563 29.232 105.467 28.836 105.275 28.5C105.091 28.164 104.847 27.908 104.543 27.732C104.239 27.556 103.911 27.468 103.559 27.468C103.207 27.468 102.879 27.556 102.575 27.732C102.271 27.9 102.023 28.152 101.831 28.488C101.647 28.816 101.555 29.208 101.555 29.664C101.555 30.12 101.647 30.52 101.831 30.864C102.023 31.208 102.271 31.472 102.575 31.656C102.887 31.832 103.215 31.92 103.559 31.92C103.911 31.92 104.239 31.832 104.543 31.656C104.847 31.48 105.091 31.224 105.275 30.888C105.467 30.544 105.563 30.144 105.563 29.688ZM114.692 26.388L110.636 36.108H109.22L110.564 32.892L107.96 26.388H109.484L111.344 31.428L113.276 26.388H114.692Z"
							fill="white"
						/>
						<rect x="12" y="12" width="24" height="24" fill="url(#pattern0)" />
						<rect x="143.5" y="0.5" width="126" height="47" rx="5.5" fill="black" />
						<rect x="143.5" y="0.5" width="126" height="47" rx="5.5" stroke="#776F6F" />
						<path
							d="M190.577 14.5199C190.522 14.3475 190.448 14.1932 190.355 14.0568C190.264 13.9186 190.155 13.8011 190.028 13.7045C189.902 13.6061 189.757 13.5312 189.594 13.4801C189.433 13.429 189.256 13.4034 189.062 13.4034C188.735 13.4034 188.439 13.4877 188.176 13.6562C187.913 13.8248 187.705 14.072 187.551 14.3977C187.4 14.7216 187.324 15.1184 187.324 15.5881C187.324 16.0597 187.401 16.4583 187.554 16.7841C187.707 17.1098 187.918 17.357 188.185 17.5256C188.452 17.6941 188.756 17.7784 189.097 17.7784C189.413 17.7784 189.688 17.714 189.923 17.5852C190.16 17.4564 190.343 17.2746 190.472 17.0398C190.602 16.803 190.668 16.5246 190.668 16.2045L190.895 16.2472H189.23V15.5227H191.517V16.1847C191.517 16.6733 191.413 17.0975 191.205 17.4574C190.998 17.8153 190.712 18.0919 190.347 18.2869C189.983 18.482 189.566 18.5795 189.097 18.5795C188.57 18.5795 188.108 18.4583 187.71 18.2159C187.314 17.9735 187.006 17.6297 186.784 17.1847C186.563 16.7377 186.452 16.2074 186.452 15.5938C186.452 15.1297 186.516 14.7131 186.645 14.3438C186.774 13.9744 186.955 13.661 187.188 13.4034C187.422 13.1439 187.698 12.946 188.014 12.8097C188.332 12.6714 188.68 12.6023 189.057 12.6023C189.371 12.6023 189.664 12.6487 189.935 12.7415C190.207 12.8343 190.45 12.9659 190.662 13.1364C190.876 13.3068 191.053 13.5095 191.193 13.7443C191.333 13.9773 191.428 14.2358 191.477 14.5199H190.577ZM192.631 18.5V12.6818H196.279V13.4375H193.509V15.2102H196.089V15.9631H193.509V17.7443H196.313V18.5H192.631ZM197.165 13.4375V12.6818H201.668V13.4375H199.852V18.5H198.977V13.4375H197.165ZM205.658 12.6818V18.5H204.78V12.6818H205.658ZM206.649 13.4375V12.6818H211.152V13.4375H209.337V18.5H208.462V13.4375H206.649ZM219.318 15.5909C219.318 16.2121 219.205 16.7462 218.977 17.1932C218.75 17.6383 218.438 17.9811 218.043 18.2216C217.649 18.4602 217.201 18.5795 216.699 18.5795C216.195 18.5795 215.745 18.4602 215.349 18.2216C214.955 17.9811 214.645 17.6373 214.418 17.1903C214.19 16.7434 214.077 16.2102 214.077 15.5909C214.077 14.9697 214.19 14.4366 214.418 13.9915C214.645 13.5445 214.955 13.2017 215.349 12.9631C215.745 12.7225 216.195 12.6023 216.699 12.6023C217.201 12.6023 217.649 12.7225 218.043 12.9631C218.438 13.2017 218.75 13.5445 218.977 13.9915C219.205 14.4366 219.318 14.9697 219.318 15.5909ZM218.449 15.5909C218.449 15.1174 218.372 14.7187 218.219 14.3949C218.067 14.0691 217.859 13.8229 217.594 13.6562C217.33 13.4877 217.032 13.4034 216.699 13.4034C216.364 13.4034 216.064 13.4877 215.801 13.6562C215.538 13.8229 215.33 14.0691 215.176 14.3949C215.025 14.7187 214.949 15.1174 214.949 15.5909C214.949 16.0644 215.025 16.464 215.176 16.7898C215.33 17.1136 215.538 17.3598 215.801 17.5284C216.064 17.6951 216.364 17.7784 216.699 17.7784C217.032 17.7784 217.33 17.6951 217.594 17.5284C217.859 17.3598 218.067 17.1136 218.219 16.7898C218.372 16.464 218.449 16.0644 218.449 15.5909ZM225.109 12.6818V18.5H224.302L221.344 14.233H221.29V18.5H220.413V12.6818H221.225L224.185 16.9545H224.239V12.6818H225.109Z"
							fill="white"
						/>
						<path
							d="M188.263 34.5H186.286L189.298 25.7727H191.676L194.685 34.5H192.707L190.521 27.767H190.453L188.263 34.5ZM188.139 31.0696H192.81V32.5099H188.139V31.0696ZM195.701 36.9545V27.9545H197.491V29.054H197.572C197.651 28.8778 197.766 28.6989 197.917 28.517C198.07 28.3324 198.269 28.179 198.513 28.0568C198.761 27.9318 199.067 27.8693 199.434 27.8693C199.911 27.8693 200.352 27.9943 200.755 28.2443C201.158 28.4915 201.481 28.8651 201.722 29.3651C201.964 29.8622 202.085 30.4858 202.085 31.2358C202.085 31.9659 201.967 32.5824 201.731 33.0852C201.498 33.5852 201.18 33.9645 200.776 34.223C200.376 34.4787 199.927 34.6065 199.43 34.6065C199.077 34.6065 198.778 34.5483 198.531 34.4318C198.286 34.3153 198.086 34.169 197.93 33.9929C197.773 33.8139 197.654 33.6335 197.572 33.4517H197.516V36.9545H195.701ZM197.478 31.2273C197.478 31.6165 197.532 31.956 197.64 32.2457C197.748 32.5355 197.904 32.7614 198.109 32.9233C198.313 33.0824 198.562 33.1619 198.854 33.1619C199.15 33.1619 199.4 33.081 199.604 32.919C199.809 32.7543 199.964 32.527 200.069 32.2372C200.177 31.9446 200.231 31.608 200.231 31.2273C200.231 30.8494 200.178 30.517 200.073 30.2301C199.968 29.9432 199.813 29.7187 199.609 29.5568C199.404 29.3949 199.153 29.3139 198.854 29.3139C198.559 29.3139 198.309 29.392 198.104 29.5483C197.903 29.7045 197.748 29.9261 197.64 30.2131C197.532 30.5 197.478 30.8381 197.478 31.2273ZM203.295 36.9545V27.9545H205.085V29.054H205.165C205.245 28.8778 205.36 28.6989 205.511 28.517C205.664 28.3324 205.863 28.179 206.107 28.0568C206.354 27.9318 206.661 27.8693 207.028 27.8693C207.505 27.8693 207.945 27.9943 208.349 28.2443C208.752 28.4915 209.075 28.8651 209.316 29.3651C209.558 29.8622 209.678 30.4858 209.678 31.2358C209.678 31.9659 209.56 32.5824 209.325 33.0852C209.092 33.5852 208.773 33.9645 208.37 34.223C207.969 34.4787 207.521 34.6065 207.023 34.6065C206.671 34.6065 206.371 34.5483 206.124 34.4318C205.88 34.3153 205.68 34.169 205.523 33.9929C205.367 33.8139 205.248 33.6335 205.165 33.4517H205.11V36.9545H203.295ZM205.072 31.2273C205.072 31.6165 205.126 31.956 205.234 32.2457C205.342 32.5355 205.498 32.7614 205.702 32.9233C205.907 33.0824 206.156 33.1619 206.448 33.1619C206.744 33.1619 206.994 33.081 207.198 32.919C207.403 32.7543 207.558 32.527 207.663 32.2372C207.771 31.9446 207.825 31.608 207.825 31.2273C207.825 30.8494 207.772 30.517 207.667 30.2301C207.562 29.9432 207.407 29.7187 207.202 29.5568C206.998 29.3949 206.746 29.3139 206.448 29.3139C206.153 29.3139 205.903 29.392 205.698 29.5483C205.496 29.7045 205.342 29.9261 205.234 30.2131C205.126 30.5 205.072 30.8381 205.072 31.2273ZM218.434 28.2827C218.4 27.9389 218.254 27.6719 217.995 27.4815C217.737 27.2912 217.386 27.196 216.943 27.196C216.642 27.196 216.387 27.2386 216.18 27.3239C215.973 27.4062 215.814 27.5213 215.703 27.669C215.595 27.8168 215.541 27.9844 215.541 28.1719C215.535 28.3281 215.568 28.4645 215.639 28.581C215.713 28.6974 215.814 28.7983 215.941 28.8835C216.069 28.9659 216.217 29.0384 216.385 29.1009C216.552 29.1605 216.731 29.2116 216.922 29.2543L217.706 29.4418C218.086 29.527 218.436 29.6406 218.754 29.7827C219.072 29.9247 219.348 30.0994 219.581 30.3068C219.814 30.5142 219.994 30.7585 220.122 31.0398C220.252 31.321 220.319 31.6435 220.322 32.0071C220.319 32.5412 220.183 33.0043 219.913 33.3963C219.646 33.7855 219.26 34.0881 218.754 34.304C218.251 34.517 217.645 34.6236 216.934 34.6236C216.23 34.6236 215.616 34.5156 215.093 34.2997C214.574 34.0838 214.167 33.7642 213.875 33.3409C213.585 32.9148 213.433 32.3878 213.419 31.7599H215.204C215.224 32.0526 215.308 32.2969 215.456 32.4929C215.606 32.6861 215.806 32.8324 216.056 32.9318C216.309 33.0284 216.595 33.0767 216.913 33.0767C217.225 33.0767 217.497 33.0312 217.727 32.9403C217.96 32.8494 218.14 32.723 218.268 32.5611C218.396 32.3991 218.46 32.2131 218.46 32.0028C218.46 31.8068 218.402 31.642 218.285 31.5085C218.172 31.375 218.004 31.2614 217.782 31.1676C217.564 31.0739 217.295 30.9886 216.977 30.9119L216.027 30.6733C215.291 30.4943 214.71 30.2145 214.284 29.8338C213.858 29.4531 213.646 28.9403 213.649 28.2955C213.646 27.767 213.787 27.3054 214.071 26.9105C214.358 26.5156 214.751 26.2074 215.251 25.9858C215.751 25.7642 216.319 25.6534 216.956 25.6534C217.603 25.6534 218.169 25.7642 218.652 25.9858C219.137 26.2074 219.515 26.5156 219.785 26.9105C220.055 27.3054 220.194 27.7628 220.203 28.2827H218.434ZM225.011 27.9545V29.3182H221.069V27.9545H225.011ZM221.964 26.3864H223.779V32.4886C223.779 32.6562 223.805 32.7869 223.856 32.8807C223.907 32.9716 223.978 33.0355 224.069 33.0724C224.163 33.1094 224.271 33.1278 224.393 33.1278C224.478 33.1278 224.563 33.1207 224.648 33.1065C224.734 33.0895 224.799 33.0767 224.844 33.0682L225.13 34.419C225.039 34.4474 224.911 34.4801 224.746 34.517C224.582 34.5568 224.381 34.581 224.146 34.5895C223.708 34.6065 223.325 34.5483 222.995 34.4148C222.668 34.2812 222.414 34.0739 222.232 33.7926C222.05 33.5114 221.961 33.1562 221.964 32.7273V26.3864ZM229.08 34.6278C228.418 34.6278 227.846 34.4872 227.363 34.206C226.883 33.9219 226.512 33.527 226.251 33.0213C225.989 32.5128 225.859 31.9233 225.859 31.2528C225.859 30.5767 225.989 29.9858 226.251 29.4801C226.512 28.9716 226.883 28.5767 227.363 28.2955C227.846 28.0114 228.418 27.8693 229.08 27.8693C229.742 27.8693 230.313 28.0114 230.793 28.2955C231.276 28.5767 231.648 28.9716 231.91 29.4801C232.171 29.9858 232.302 30.5767 232.302 31.2528C232.302 31.9233 232.171 32.5128 231.91 33.0213C231.648 33.527 231.276 33.9219 230.793 34.206C230.313 34.4872 229.742 34.6278 229.08 34.6278ZM229.089 33.2216C229.39 33.2216 229.641 33.1364 229.843 32.9659C230.045 32.7926 230.197 32.5568 230.299 32.2585C230.404 31.9602 230.457 31.6207 230.457 31.2401C230.457 30.8594 230.404 30.5199 230.299 30.2216C230.197 29.9233 230.045 29.6875 229.843 29.5142C229.641 29.3409 229.39 29.2543 229.089 29.2543C228.785 29.2543 228.529 29.3409 228.322 29.5142C228.117 29.6875 227.962 29.9233 227.857 30.2216C227.755 30.5199 227.704 30.8594 227.704 31.2401C227.704 31.6207 227.755 31.9602 227.857 32.2585C227.962 32.5568 228.117 32.7926 228.322 32.9659C228.529 33.1364 228.785 33.2216 229.089 33.2216ZM233.482 34.5V27.9545H235.242V29.0966H235.31C235.43 28.6903 235.63 28.3835 235.911 28.1761C236.192 27.9659 236.516 27.8608 236.883 27.8608C236.974 27.8608 237.072 27.8665 237.177 27.8778C237.282 27.8892 237.374 27.9048 237.454 27.9247V29.5355C237.369 29.5099 237.251 29.4872 237.1 29.4673C236.95 29.4474 236.812 29.4375 236.687 29.4375C236.42 29.4375 236.181 29.4957 235.971 29.6122C235.763 29.7259 235.599 29.8849 235.477 30.0895C235.357 30.294 235.298 30.5298 235.298 30.7969V34.5H233.482ZM241.071 34.6278C240.397 34.6278 239.818 34.4915 239.332 34.2188C238.849 33.9432 238.477 33.554 238.216 33.0511C237.954 32.5455 237.824 31.9474 237.824 31.2571C237.824 30.5838 237.954 29.9929 238.216 29.4844C238.477 28.9759 238.845 28.5795 239.319 28.2955C239.797 28.0114 240.356 27.8693 240.998 27.8693C241.43 27.8693 241.832 27.9389 242.204 28.0781C242.579 28.2145 242.906 28.4205 243.184 28.696C243.466 28.9716 243.684 29.3182 243.841 29.7358C243.997 30.1506 244.075 30.6364 244.075 31.1932V31.6918H238.548V30.5668H242.366C242.366 30.3054 242.309 30.0739 242.196 29.8722C242.082 29.6705 241.924 29.5128 241.723 29.3991C241.524 29.2827 241.292 29.2244 241.028 29.2244C240.752 29.2244 240.508 29.2884 240.295 29.4162C240.085 29.5412 239.92 29.7102 239.801 29.9233C239.681 30.1335 239.62 30.3679 239.618 30.6264V31.696C239.618 32.0199 239.677 32.2997 239.797 32.5355C239.919 32.7713 240.091 32.9531 240.312 33.081C240.534 33.2088 240.797 33.2727 241.1 33.2727C241.302 33.2727 241.487 33.2443 241.654 33.1875C241.822 33.1307 241.966 33.0455 242.085 32.9318C242.204 32.8182 242.295 32.679 242.358 32.5142L244.037 32.625C243.951 33.0284 243.777 33.3807 243.512 33.6818C243.251 33.9801 242.913 34.2131 242.498 34.3807C242.086 34.5455 241.61 34.6278 241.071 34.6278Z"
							fill="white"
						/>
						<g clip-path="url(#clip0_943_932)">
							<path
								d="M175.491 17.8634C175.34 17.9804 172.677 19.4806 172.677 22.8164C172.677 26.6748 176.065 28.0398 176.167 28.0736C176.151 28.1568 175.628 29.943 174.38 31.763C173.268 33.3646 172.105 34.9636 170.337 34.9636C168.569 34.9636 168.114 33.9366 166.073 33.9366C164.084 33.9366 163.377 34.9974 161.76 34.9974C160.143 34.9974 159.014 33.5154 157.717 31.6954C156.214 29.5582 155 26.238 155 23.0868C155 18.0324 158.286 15.3518 161.521 15.3518C163.239 15.3518 164.672 16.4802 165.751 16.4802C166.778 16.4802 168.38 15.2842 170.335 15.2842C171.076 15.2842 173.738 15.3518 175.491 17.8634ZM169.407 13.1444C170.215 12.185 170.787 10.8538 170.787 9.5226C170.787 9.338 170.772 9.1508 170.738 9C169.422 9.0494 167.857 9.8762 166.913 10.9708C166.172 11.8132 165.481 13.1444 165.481 14.4938C165.481 14.6966 165.514 14.8994 165.53 14.9644C165.613 14.98 165.748 14.9982 165.884 14.9982C167.064 14.9982 168.549 14.2078 169.407 13.1444Z"
								fill="white"
							/>
						</g>
						<defs>
							<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
								<use xlink:href="#image0_943_932" transform="scale(0.00195312)" />
							</pattern>
							<clipPath id="clip0_943_932">
								<rect width="21.164" height="26" fill="white" transform="translate(155 9)" />
							</clipPath>
							<image
								id="image0_943_932"
								width="512"
								height="512"
								xlink:href="data:image/png;base64,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"
							/>
						</defs>
					</svg>
				</div>
				<div class="footerLinksWrap">
					<div class="linkSection">
						<div class="linksTitle">Important Links</div>
						<div class="linksWrap">
							<!-- <div class="link">
								<a href="/#">About us</a>
							</div> -->
							<div class="link">
								<a href="#pricingDetailSection">Pricing</a>
							</div>
							<div class="link">
								<a target="_blank" href="/privacy-policy">Terms and Policies</a>
							</div>
							<!-- <div class="link">
								<a href="/privacy-policy">Privacy policy</a>
							</div> -->
							<div class="link">
								<a on:click={openRaiseAnIssuePopup}>Contact Us</a>
							</div>
							<div class="link">
								<a on:click={openAboutUsPopup}>About Us</a>
							</div>
							<div class="link">
								<a target="_blank" href="https://immigpt.blog/">Blogs</a>
							</div>
						</div>
						<RaiseAnIssuePopup
							{showRaiseAnIssuePopup}
							on:closeRaiseAnIssuePopup={closeRaiseAnIssuePopup}
						/>
						<AboutUsPopup {showAboutUsPopup} on:closeAboutUsPopup={closeAboutUsPopup} />
					</div>
					<div class="linkSection">
						<div class="linksTitle">Follow us</div>
						<div class="linksWrap">
							<!-- <div class="link">
								<a href="">Linked in</a>
							</div> -->
							<div class="link">
								<a target="_blank" href="https://www.facebook.com/profile.php?id=100094491979735"
									>Facebook</a
								>
							</div>
							<div class="link">
								<a target="_blank" href="https://twitter.com/immiGPT">Twitter</a>
							</div>
							<div class="link">
								<a target="_blank" href="https://instagram.com/immigpt?igshid=NzVpdjdkZXozajBq"
									>Instagram</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.landPgHeroMailInput {
		padding: 8px;
		border: none;
		outline: none;
		flex: 1;
	}

	.signUpBtn {
		padding: 8px 16px;
		display: flex;
		justify-content: center;
		border: 0.7px solid #222;
		border-radius: 20px;
		color: #000;
		font-weight: 700;
	}

	.loginBtn {
		padding: 8px 24px;
		display: flex;
		justify-content: center;
		background-color: #000;
		border-radius: 20px;
		color: #fff;
		font-weight: 700;
	}

	.getStartedBtn {
		padding: 12px 32px;
		display: flex;
		justify-content: center;
		background-color: #000;
		border-radius: 40px;
		color: #fff;
		font-weight: 700;
		font-size: 20px;
	}

	.getStartedBtn {
		padding: 12px 32px;
		display: flex;
		justify-content: center;
		background-color: #000;
		border-radius: 40px;
		color: #fff;
		font-weight: 700;
		font-size: 20px;
	}

	.getStartedSmallBtn {
		padding: 8px 24px;
		display: flex;
		justify-content: center;
		background-color: #fff;
		border-radius: 20px;
		color: #000;
		font-weight: 700;
	}

	.choosePlanBtn {
		padding: 8px 24px;
		display: flex;
		width: 100%;
		justify-content: center;
		background-color: #000;
		border-radius: 8px;
		color: #fff;
		font-weight: 700;
	}

	.landingPageWrap {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow-y: auto;
		background-color: #fff;
	}

	.landingPageWrapChild {
		display: flex;
		flex-direction: column;
	}

	.landBarWrap {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: center;
		position: fixed;
		background-color: #fff;
		z-index: 10;
		box-shadow: 2px 0 24px rgb(219, 219, 219);
	}

	.landBarWidthWrap {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		padding: 16px;
		max-width: 1240px;
	}

	.logoTitleWrap {
		display: flex;
		justify-content: center;
		gap: 8px;
		align-items: center;
	}

	.authBtnWrap {
		display: flex;
		justify-content: center;
		gap: 8px;
		align-items: center;
	}

	.logoTitleWhite {
		font-size: 16px;
		font-family: Inter;
		font-weight: 600;
		color: #fff;
	}

	.logoTitle {
		font-size: 16px;
		font-family: Inter;
		font-weight: 600;
		color: #000;
	}

	.landPgHeroWrap {
		display: flex;
		flex-direction: column;
		padding: 16px;
		align-items: center;
		gap: 32px;
		min-height: 100vh;
		height: auto;
		margin-top: 74px;
		margin-bottom: 74px;
		justify-content: center;
	}

	.landPgHeroDetailWrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: center;
		align-items: center;
		max-width: 700px;
	}

	.landPgHeroMailSection2 {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		gap: 16px;
	}

	.landPgHeroMailInputWrap {
		display: flex;
		border-radius: 40px;
		border: 2px solid #aeaeae;
		align-items: center;
		justify-content: space-between;
		padding: 8px;
		text-align: center;
		width: 100%;
		max-width: 480px;
	}

	.landPgHeroTitle1 {
		color: #a5a5a5;
		font-size: 48px;
		font-family: Inter;
		font-weight: 700;
		letter-spacing: 0.48px;
		text-align: center;
	}

	.landPgHeroTitle2 {
		color: #222;
		font-size: 48px;
		font-family: Inter;
		font-weight: bolder;
		letter-spacing: 0.48px;
		text-align: center;
		/* background: -webkit-linear-gradient(#000, #858585, #222);
		background-clip: inherit;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent; */
		color: #222;
	}

	.landPgHeroDesc {
		color: #545454;
		font-size: 16px;
		font-family: Inter;
		font-weight: 400;
		line-height: 24px;
		word-wrap: break-word;
		text-align: center;
	}

	.freePlanWrap {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}

	.freePlanTitle {
		color: #545454;
		font-size: 14px;
		font-family: Inter;
		font-weight: 400;
	}

	.featureDetailSection {
		min-height: 100vh;
		background-color: #000;
		padding: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.featureDetailsWrap {
		color: #fff;
		max-width: 1240px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.featureSubTitle {
		color: #777777;
		font-size: 14px;
		font-family: Inter;
		font-weight: 500;
		text-transform: uppercase;
	}

	.featureTitle {
		color: white;
		font-size: 40px;
		font-family: Inter;
		font-weight: 700;
		line-height: 52px;
		text-align: center;
	}

	.featureCardsWrap {
		display: flex;
		gap: 16px;
		margin-top: 24px;
	}

	.featureMainCard {
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex: 1;
	}

	.featureDetailCard {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 10px;
		height: 100%;
	}

	.featureMainCardFull {
		display: flex;
		flex-direction: column;
		justify-content: end;
		height: 100%;
		padding: 16px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 10px;
	}

	.featureIconWrap {
		background: rgba(255, 255, 255, 0.01);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 10px;
		padding: 8px;
		width: fit-content;
	}

	.featureTextTitle {
		color: white;
		font-size: 20px;
		font-family: Inter;
		font-weight: 600;
	}

	.featureTextDesc {
		color: #979797;
		font-size: 16px;
		font-family: Inter;
		font-weight: 400;
	}

	.pricingDetailSection {
		min-height: 85vh;
		padding: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}

	.pricingDetailSubTitle {
		color: #777777;
		font-size: 14px;
		font-family: Inter;
		font-weight: 500;
		text-transform: uppercase;
	}

	.pricingDetailTitle {
		color: black;
		font-size: 40px;
		font-family: Inter;
		font-weight: 700;
		text-align: center;
	}

	.pricingDetailsWrap {
		color: #222;
		width: 100%;
		max-width: 1240px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.pricingDetailCardsWrap {
		display: flex;
		gap: 16px;
		margin-top: 24px;
		width: 100%;
		justify-content: center;
	}

	.pricingDetailMainCard {
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex: 1;
		background-color: #fff;
		padding: 24px;
		border-radius: 16px;
		border: 2px solid #d9d9d9;
		width: 100%;
		/* max-width: 400px; */
	}

	.payTypeFeaturesWrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.payType {
		color: rgba(0, 0, 0, 0.65);
		font-size: 20px;
		font-family: Inter;
		font-weight: 600;
	}

	.price {
		color: black;
		font-size: 24px;
		font-family: Inter;
		font-weight: 600;
	}

	.detailText {
		display: flex;
		color: rgba(0, 0, 0, 0.87);
		font-size: 16px;
		font-family: Inter;
		font-weight: 400;
		align-items: center;
		gap: 8px;
	}

	.trySection {
		background-color: #e8e8e8;
		padding: 0 16px;
		min-height: 400px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tryWrap {
		color: #fff;
		display: flex;
		flex-direction: row;
		/* gap: 24px; */
		align-items: center;
		max-width: 1240px;
		justify-content: space-between;
		width: 100%;
		height: 100%;
	}

	.previewAppWrap {
		display: flex;
		flex: 1;
		justify-content: center;
		height: 100%;
		gap: 24px;
	}

	.previewImage1 {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.tryTextWrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: left;
		flex: 1;
	}

	.tryTitle {
		color: #222;
		font-size: 40px;
		font-family: Inter;
		font-weight: 700;
		text-align: left;
	}

	.tryDesc {
		color: #222;
		font-size: 16px;
		font-family: Inter;
		font-weight: 400;
		line-height: 24px;
		text-align: left;
	}

	.expSection {
		background-color: #000;
		padding: 16px;
		min-height: 400px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.expWrap {
		color: #fff;
		display: flex;
		flex-direction: column;
		gap: 24px;
		align-items: center;
		max-width: 1240px;
	}

	.expTextWrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: center;
	}

	.expTitle {
		color: white;
		font-size: 40px;
		font-family: Inter;
		font-weight: 700;
		text-align: center;
	}

	.expDesc {
		color: #c6c6c6;
		font-size: 16px;
		font-family: Inter;
		font-weight: 400;
		line-height: 24px;
		text-align: center;
	}
	.footerSection {
		padding: 16px;
		min-height: 400px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000;
	}

	.footerAbout {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
	}

	.footerLinksWrap {
		flex: 1;
		display: flex;
		justify-content: space-evenly;
	}

	.footerWrap {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 1240px;
		width: 100%;
	}

	.linkSection {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.linksTitle {
		color: #fff;
		font-size: 14px;
		font-family: Inter;
		font-weight: 500;
		text-transform: uppercase;
	}

	.linksWrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.link {
		color: #fff;
		font-size: 14px;
		font-family: Inter;
		font-weight: 400;
		cursor: pointer;
	}

	.footerAboutDesc {
		color: #fff;
	}

	@media screen and (max-width: 786px) {
		.featureCardsWrap {
			display: flex;
			flex-direction: column;
		}

		.pricingDetailCardsWrap {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.footerWrap {
			display: flex;
			flex-direction: column;
			gap: 16px;
			justify-content: space-between;
			height: 100%;
		}

		.footerLinksWrap {
			width: 100%;
			justify-content: space-around;
		}

		.landPgHeroTitle1 {
			font-size: 36px;
		}

		.landPgHeroTitle2 {
			font-size: 36px;
		}

		.featureTitle {
			font-size: 36px;
		}

		.pricingDetailTitle {
			font-size: 36px;
		}

		.tryTitle {
			font-size: 36px;
		}

		.tryWrap {
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 24px;
			max-width: 1240px;
			justify-content: space-between;
			width: 100%;
			height: 100%;
		}
	}
</style>
