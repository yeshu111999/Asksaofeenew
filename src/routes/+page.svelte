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
	let token = "";

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

	function openInPlayStore(app) {
		console.log("url", app);
		let url = "";
		if (app == "AppStore") {
			url = "https://apps.apple.com/us/app/immigpt/id6449792784";
		} else if (app == "PlayStore") {
			url = "https://play.google.com/store/apps/details?id=com.etuloverduolc.immigpt";
		}
		window.open(url, "_blank");
	}

	$: tokenTemp = token;

	function closeLoginPopup() {
		token = Cookies.get("token");
		loginModalOpen = false;
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
		<LoginModal {showSignUp} {settings} on:close={() => closeLoginPopup} />
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
			<div class="landImageWrap">
				<img style="object-fit: cover;" src="/assets/images/heroimmi.jpg" alt="hero" />
			</div>
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
					<div class="flexRow">
						<div
							style="cursor:pointer"
							on:click={() => {
								openInPlayStore("PlayStore");
							}}
						>
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
									<pattern
										id="pattern0"
										patternContentUnits="objectBoundingBox"
										width="1"
										height="1"
									>
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
						<svg
							style="cursor:pointer"
							on:click={() => {
								openInPlayStore("AppStore");
							}}
							width="127"
							height="48"
							viewBox="0 0 127 48"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_943_911)">
								<rect width="127" height="48" rx="6" fill="black" />
								<path
									d="M47.5767 14.5199C47.5218 14.3475 47.4479 14.1932 47.3551 14.0568C47.2642 13.9186 47.1553 13.8011 47.0284 13.7045C46.9015 13.6061 46.7566 13.5312 46.5938 13.4801C46.4328 13.429 46.2557 13.4034 46.0625 13.4034C45.7348 13.4034 45.4394 13.4877 45.1761 13.6562C44.9129 13.8248 44.7045 14.072 44.5511 14.3977C44.3996 14.7216 44.3239 15.1184 44.3239 15.5881C44.3239 16.0597 44.4006 16.4583 44.554 16.7841C44.7074 17.1098 44.9176 17.357 45.1847 17.5256C45.4517 17.6941 45.7557 17.7784 46.0966 17.7784C46.4129 17.7784 46.6884 17.714 46.9233 17.5852C47.16 17.4564 47.3428 17.2746 47.4716 17.0398C47.6023 16.803 47.6676 16.5246 47.6676 16.2045L47.8949 16.2472H46.2301V15.5227H48.517V16.1847C48.517 16.6733 48.4129 17.0975 48.2045 17.4574C47.9981 17.8153 47.7121 18.0919 47.3466 18.2869C46.983 18.482 46.5663 18.5795 46.0966 18.5795C45.5701 18.5795 45.108 18.4583 44.7102 18.2159C44.3144 17.9735 44.0057 17.6297 43.7841 17.1847C43.5625 16.7377 43.4517 16.2074 43.4517 15.5938C43.4517 15.1297 43.5161 14.7131 43.6449 14.3438C43.7737 13.9744 43.9545 13.661 44.1875 13.4034C44.4223 13.1439 44.6979 12.946 45.0142 12.8097C45.3324 12.6714 45.6799 12.6023 46.0568 12.6023C46.3712 12.6023 46.6638 12.6487 46.9347 12.7415C47.2074 12.8343 47.4498 12.9659 47.6619 13.1364C47.8759 13.3068 48.053 13.5095 48.1932 13.7443C48.3333 13.9773 48.428 14.2358 48.4773 14.5199H47.5767ZM49.6314 18.5V12.6818H53.2791V13.4375H50.5092V15.2102H53.0888V15.9631H50.5092V17.7443H53.3132V18.5H49.6314ZM54.1648 13.4375V12.6818H58.6676V13.4375H56.8523V18.5H55.9773V13.4375H54.1648ZM62.6577 12.6818V18.5H61.7798V12.6818H62.6577ZM63.6491 13.4375V12.6818H68.152V13.4375H66.3366V18.5H65.4616V13.4375H63.6491ZM76.3182 15.5909C76.3182 16.2121 76.2045 16.7462 75.9773 17.1932C75.75 17.6383 75.4384 17.9811 75.0426 18.2216C74.6487 18.4602 74.2008 18.5795 73.6989 18.5795C73.1951 18.5795 72.7453 18.4602 72.3494 18.2216C71.9555 17.9811 71.6449 17.6373 71.4176 17.1903C71.1903 16.7434 71.0767 16.2102 71.0767 15.5909C71.0767 14.9697 71.1903 14.4366 71.4176 13.9915C71.6449 13.5445 71.9555 13.2017 72.3494 12.9631C72.7453 12.7225 73.1951 12.6023 73.6989 12.6023C74.2008 12.6023 74.6487 12.7225 75.0426 12.9631C75.4384 13.2017 75.75 13.5445 75.9773 13.9915C76.2045 14.4366 76.3182 14.9697 76.3182 15.5909ZM75.4489 15.5909C75.4489 15.1174 75.3722 14.7187 75.2188 14.3949C75.0672 14.0691 74.8589 13.8229 74.5938 13.6562C74.3305 13.4877 74.0322 13.4034 73.6989 13.4034C73.3636 13.4034 73.0644 13.4877 72.8011 13.6562C72.5379 13.8229 72.3295 14.0691 72.1761 14.3949C72.0246 14.7187 71.9489 15.1174 71.9489 15.5909C71.9489 16.0644 72.0246 16.464 72.1761 16.7898C72.3295 17.1136 72.5379 17.3598 72.8011 17.5284C73.0644 17.6951 73.3636 17.7784 73.6989 17.7784C74.0322 17.7784 74.3305 17.6951 74.5938 17.5284C74.8589 17.3598 75.0672 17.1136 75.2188 16.7898C75.3722 16.464 75.4489 16.0644 75.4489 15.5909ZM82.1087 12.6818V18.5H81.3018L78.3445 14.233H78.2905V18.5H77.4126V12.6818H78.2251L81.1854 16.9545H81.2393V12.6818H82.1087Z"
									fill="white"
								/>
								<path
									d="M45.2628 34.5H43.2855L46.2983 25.7727H48.6761L51.6847 34.5H49.7074L47.5213 27.767H47.4531L45.2628 34.5ZM45.1392 31.0696H49.8097V32.5099H45.1392V31.0696ZM52.701 36.9545V27.9545H54.4908V29.054H54.5717C54.6513 28.8778 54.7663 28.6989 54.9169 28.517C55.0703 28.3324 55.2692 28.179 55.5135 28.0568C55.7607 27.9318 56.0675 27.8693 56.4339 27.8693C56.9112 27.8693 57.3516 27.9943 57.755 28.2443C58.1584 28.4915 58.4808 28.8651 58.7223 29.3651C58.9638 29.8622 59.0845 30.4858 59.0845 31.2358C59.0845 31.9659 58.9666 32.5824 58.7308 33.0852C58.4979 33.5852 58.1797 33.9645 57.7763 34.223C57.3757 34.4787 56.9268 34.6065 56.4297 34.6065C56.0774 34.6065 55.7777 34.5483 55.5305 34.4318C55.2862 34.3153 55.0859 34.169 54.9297 33.9929C54.7734 33.8139 54.6541 33.6335 54.5717 33.4517H54.5163V36.9545H52.701ZM54.478 31.2273C54.478 31.6165 54.532 31.956 54.6399 32.2457C54.7479 32.5355 54.9041 32.7614 55.1087 32.9233C55.3132 33.0824 55.5618 33.1619 55.8544 33.1619C56.1499 33.1619 56.3999 33.081 56.6044 32.919C56.8089 32.7543 56.9638 32.527 57.0689 32.2372C57.1768 31.9446 57.2308 31.608 57.2308 31.2273C57.2308 30.8494 57.1783 30.517 57.0732 30.2301C56.968 29.9432 56.8132 29.7187 56.6087 29.5568C56.4041 29.3949 56.1527 29.3139 55.8544 29.3139C55.5589 29.3139 55.3089 29.392 55.1044 29.5483C54.9027 29.7045 54.7479 29.9261 54.6399 30.2131C54.532 30.5 54.478 30.8381 54.478 31.2273ZM60.2947 36.9545V27.9545H62.0845V29.054H62.1655C62.245 28.8778 62.3601 28.6989 62.5107 28.517C62.6641 28.3324 62.8629 28.179 63.1072 28.0568C63.3544 27.9318 63.6612 27.8693 64.0277 27.8693C64.505 27.8693 64.9453 27.9943 65.3487 28.2443C65.7521 28.4915 66.0746 28.8651 66.3161 29.3651C66.5575 29.8622 66.6783 30.4858 66.6783 31.2358C66.6783 31.9659 66.5604 32.5824 66.3246 33.0852C66.0916 33.5852 65.7734 33.9645 65.37 34.223C64.9695 34.4787 64.5206 34.6065 64.0234 34.6065C63.6712 34.6065 63.3714 34.5483 63.1243 34.4318C62.88 34.3153 62.6797 34.169 62.5234 33.9929C62.3672 33.8139 62.2479 33.6335 62.1655 33.4517H62.1101V36.9545H60.2947ZM62.0717 31.2273C62.0717 31.6165 62.1257 31.956 62.2337 32.2457C62.3416 32.5355 62.4979 32.7614 62.7024 32.9233C62.907 33.0824 63.1555 33.1619 63.4482 33.1619C63.7436 33.1619 63.9936 33.081 64.1982 32.919C64.4027 32.7543 64.5575 32.527 64.6626 32.2372C64.7706 31.9446 64.8246 31.608 64.8246 31.2273C64.8246 30.8494 64.772 30.517 64.6669 30.2301C64.5618 29.9432 64.407 29.7187 64.2024 29.5568C63.9979 29.3949 63.7464 29.3139 63.4482 29.3139C63.1527 29.3139 62.9027 29.392 62.6982 29.5483C62.4964 29.7045 62.3416 29.9261 62.2337 30.2131C62.1257 30.5 62.0717 30.8381 62.0717 31.2273ZM75.4343 28.2827C75.4002 27.9389 75.2539 27.6719 74.9954 27.4815C74.7369 27.2912 74.386 27.196 73.9428 27.196C73.6417 27.196 73.3874 27.2386 73.18 27.3239C72.9727 27.4062 72.8136 27.5213 72.7028 27.669C72.5948 27.8168 72.5408 27.9844 72.5408 28.1719C72.5352 28.3281 72.5678 28.4645 72.6388 28.581C72.7127 28.6974 72.8136 28.7983 72.9414 28.8835C73.0692 28.9659 73.217 29.0384 73.3846 29.1009C73.5522 29.1605 73.7312 29.2116 73.9215 29.2543L74.7056 29.4418C75.0863 29.527 75.4357 29.6406 75.7539 29.7827C76.0721 29.9247 76.3477 30.0994 76.5806 30.3068C76.8136 30.5142 76.994 30.7585 77.1218 31.0398C77.2525 31.321 77.3192 31.6435 77.3221 32.0071C77.3192 32.5412 77.1829 33.0043 76.913 33.3963C76.646 33.7855 76.2596 34.0881 75.7539 34.304C75.2511 34.517 74.6445 34.6236 73.9343 34.6236C73.2298 34.6236 72.6161 34.5156 72.0934 34.2997C71.5735 34.0838 71.1673 33.7642 70.8746 33.3409C70.5849 32.9148 70.4329 32.3878 70.4187 31.7599H72.2042C72.2241 32.0526 72.3079 32.2969 72.4556 32.4929C72.6062 32.6861 72.8065 32.8324 73.0565 32.9318C73.3093 33.0284 73.5948 33.0767 73.913 33.0767C74.2255 33.0767 74.4968 33.0312 74.7269 32.9403C74.9599 32.8494 75.1403 32.723 75.2681 32.5611C75.396 32.3991 75.4599 32.2131 75.4599 32.0028C75.4599 31.8068 75.4016 31.642 75.2852 31.5085C75.1715 31.375 75.0039 31.2614 74.7823 31.1676C74.5636 31.0739 74.2951 30.9886 73.9769 30.9119L73.0266 30.6733C72.2908 30.4943 71.7099 30.2145 71.2837 29.8338C70.8576 29.4531 70.646 28.9403 70.6488 28.2955C70.646 27.767 70.7866 27.3054 71.0707 26.9105C71.3576 26.5156 71.7511 26.2074 72.2511 25.9858C72.7511 25.7642 73.3192 25.6534 73.9556 25.6534C74.6033 25.6534 75.1687 25.7642 75.6516 25.9858C76.1374 26.2074 76.5153 26.5156 76.7852 26.9105C77.055 27.3054 77.1942 27.7628 77.2028 28.2827H75.4343ZM82.0107 27.9545V29.3182H78.0689V27.9545H82.0107ZM78.9638 26.3864H80.7791V32.4886C80.7791 32.6562 80.8047 32.7869 80.8558 32.8807C80.907 32.9716 80.978 33.0355 81.0689 33.0724C81.1626 33.1094 81.2706 33.1278 81.3928 33.1278C81.478 33.1278 81.5632 33.1207 81.6484 33.1065C81.7337 33.0895 81.799 33.0767 81.8445 33.0682L82.13 34.419C82.0391 34.4474 81.9112 34.4801 81.7464 34.517C81.5817 34.5568 81.3814 34.581 81.1456 34.5895C80.7081 34.6065 80.3246 34.5483 79.995 34.4148C79.6683 34.2812 79.4141 34.0739 79.2322 33.7926C79.0504 33.5114 78.9609 33.1562 78.9638 32.7273V26.3864ZM86.0803 34.6278C85.4183 34.6278 84.8459 34.4872 84.3629 34.206C83.8828 33.9219 83.5121 33.527 83.2507 33.0213C82.9893 32.5128 82.8587 31.9233 82.8587 31.2528C82.8587 30.5767 82.9893 29.9858 83.2507 29.4801C83.5121 28.9716 83.8828 28.5767 84.3629 28.2955C84.8459 28.0114 85.4183 27.8693 86.0803 27.8693C86.7422 27.8693 87.3132 28.0114 87.7933 28.2955C88.2763 28.5767 88.6484 28.9716 88.9098 29.4801C89.1712 29.9858 89.3018 30.5767 89.3018 31.2528C89.3018 31.9233 89.1712 32.5128 88.9098 33.0213C88.6484 33.527 88.2763 33.9219 87.7933 34.206C87.3132 34.4872 86.7422 34.6278 86.0803 34.6278ZM86.0888 33.2216C86.3899 33.2216 86.6413 33.1364 86.843 32.9659C87.0447 32.7926 87.1967 32.5568 87.299 32.2585C87.4041 31.9602 87.4567 31.6207 87.4567 31.2401C87.4567 30.8594 87.4041 30.5199 87.299 30.2216C87.1967 29.9233 87.0447 29.6875 86.843 29.5142C86.6413 29.3409 86.3899 29.2543 86.0888 29.2543C85.7848 29.2543 85.5291 29.3409 85.3217 29.5142C85.1172 29.6875 84.9624 29.9233 84.8572 30.2216C84.755 30.5199 84.7038 30.8594 84.7038 31.2401C84.7038 31.6207 84.755 31.9602 84.8572 32.2585C84.9624 32.5568 85.1172 32.7926 85.3217 32.9659C85.5291 33.1364 85.7848 33.2216 86.0888 33.2216ZM90.4822 34.5V27.9545H92.2422V29.0966H92.3104C92.4297 28.6903 92.63 28.3835 92.9112 28.1761C93.1925 27.9659 93.5163 27.8608 93.8828 27.8608C93.9737 27.8608 94.0717 27.8665 94.1768 27.8778C94.282 27.8892 94.3743 27.9048 94.4538 27.9247V29.5355C94.3686 29.5099 94.2507 29.4872 94.1001 29.4673C93.9496 29.4474 93.8118 29.4375 93.6868 29.4375C93.4197 29.4375 93.1811 29.4957 92.9709 29.6122C92.7635 29.7259 92.5987 29.8849 92.4766 30.0895C92.3572 30.294 92.2976 30.5298 92.2976 30.7969V34.5H90.4822ZM98.0707 34.6278C97.3974 34.6278 96.8178 34.4915 96.332 34.2188C95.8491 33.9432 95.4769 33.554 95.2156 33.0511C94.9542 32.5455 94.8235 31.9474 94.8235 31.2571C94.8235 30.5838 94.9542 29.9929 95.2156 29.4844C95.4769 28.9759 95.8448 28.5795 96.3192 28.2955C96.7965 28.0114 97.3562 27.8693 97.9982 27.8693C98.43 27.8693 98.832 27.9389 99.2042 28.0781C99.5792 28.2145 99.9059 28.4205 100.184 28.696C100.466 28.9716 100.684 29.3182 100.841 29.7358C100.997 30.1506 101.075 30.6364 101.075 31.1932V31.6918H95.5479V30.5668H99.3661C99.3661 30.3054 99.3093 30.0739 99.1957 29.8722C99.082 29.6705 98.9244 29.5128 98.7227 29.3991C98.5238 29.2827 98.2923 29.2244 98.0281 29.2244C97.7525 29.2244 97.5082 29.2884 97.2951 29.4162C97.0849 29.5412 96.9201 29.7102 96.8008 29.9233C96.6815 30.1335 96.6204 30.3679 96.6175 30.6264V31.696C96.6175 32.0199 96.6772 32.2997 96.7965 32.5355C96.9187 32.7713 97.0906 32.9531 97.3121 33.081C97.5337 33.2088 97.7965 33.2727 98.1005 33.2727C98.3022 33.2727 98.4869 33.2443 98.6545 33.1875C98.8221 33.1307 98.9656 33.0455 99.0849 32.9318C99.2042 32.8182 99.2951 32.679 99.3576 32.5142L101.037 32.625C100.951 33.0284 100.777 33.3807 100.512 33.6818C100.251 33.9801 99.913 34.2131 99.4982 34.3807C99.0863 34.5455 98.6104 34.6278 98.0707 34.6278Z"
									fill="white"
								/>
								<g clip-path="url(#clip1_943_911)">
									<path
										d="M32.4906 17.8634C32.3398 17.9804 29.6774 19.4806 29.6774 22.8164C29.6774 26.6748 33.0652 28.0398 33.1666 28.0736C33.151 28.1568 32.6284 29.943 31.3804 31.763C30.2676 33.3646 29.1054 34.9636 27.3374 34.9636C25.5694 34.9636 25.1144 33.9366 23.0734 33.9366C21.0844 33.9366 20.3772 34.9974 18.76 34.9974C17.1428 34.9974 16.0144 33.5154 14.717 31.6954C13.2142 29.5582 12 26.238 12 23.0868C12 18.0324 15.2864 15.3518 18.5208 15.3518C20.2394 15.3518 21.672 16.4802 22.751 16.4802C23.778 16.4802 25.3796 15.2842 27.3348 15.2842C28.0758 15.2842 30.7382 15.3518 32.4906 17.8634ZM26.4066 13.1444C27.2152 12.185 27.7872 10.8538 27.7872 9.5226C27.7872 9.338 27.7716 9.1508 27.7378 9C26.4222 9.0494 24.857 9.8762 23.9132 10.9708C23.1722 11.8132 22.4806 13.1444 22.4806 14.4938C22.4806 14.6966 22.5144 14.8994 22.53 14.9644C22.6132 14.98 22.7484 14.9982 22.8836 14.9982C24.064 14.9982 25.5486 14.2078 26.4066 13.1444Z"
										fill="white"
									/>
								</g>
								<g clip-path="url(#clip2_943_911)">
									<path
										d="M394.1 -140.1C388.3 -135.6 285.9 -77.9 285.9 50.4C285.9 198.8 416.2 251.3 420.1 252.6C419.5 255.8 399.4 324.5 351.4 394.5C308.6 456.1 263.9 517.6 195.9 517.6C127.9 517.6 110.4 478.1 31.9 478.1C-44.6 478.1 -71.8 518.9 -134 518.9C-196.2 518.9 -239.6 461.9 -289.5 391.9C-347.3 309.7 -394 182 -394 60.8C-394 -133.6 -267.6 -236.7 -143.2 -236.7C-77.1 -236.7 -22 -193.3 19.5 -193.3C59 -193.3 120.6 -239.3 195.8 -239.3C224.3 -239.3 326.7 -236.7 394.1 -140.1ZM160.1 -321.6C191.2 -358.5 213.2 -409.7 213.2 -460.9C213.2 -468 212.6 -475.2 211.3 -481C160.7 -479.1 100.5 -447.3 64.2 -405.2C35.7 -372.8 9.10001 -321.6 9.10001 -269.7C9.10001 -261.9 10.4 -254.1 11 -251.6C14.2 -251 19.4 -250.3 24.6 -250.3C70 -250.3 127.1 -280.7 160.1 -321.6Z"
										fill="black"
									/>
								</g>
								<path
									d="M47.5767 14.5199C47.5218 14.3475 47.4479 14.1932 47.3551 14.0568C47.2642 13.9186 47.1553 13.8011 47.0284 13.7045C46.9015 13.6061 46.7566 13.5312 46.5938 13.4801C46.4328 13.429 46.2557 13.4034 46.0625 13.4034C45.7348 13.4034 45.4394 13.4877 45.1761 13.6562C44.9129 13.8248 44.7045 14.072 44.5511 14.3977C44.3996 14.7216 44.3239 15.1184 44.3239 15.5881C44.3239 16.0597 44.4006 16.4583 44.554 16.7841C44.7074 17.1098 44.9176 17.357 45.1847 17.5256C45.4517 17.6941 45.7557 17.7784 46.0966 17.7784C46.4129 17.7784 46.6884 17.714 46.9233 17.5852C47.16 17.4564 47.3428 17.2746 47.4716 17.0398C47.6023 16.803 47.6676 16.5246 47.6676 16.2045L47.8949 16.2472H46.2301V15.5227H48.517V16.1847C48.517 16.6733 48.4129 17.0975 48.2045 17.4574C47.9981 17.8153 47.7121 18.0919 47.3466 18.2869C46.983 18.482 46.5663 18.5795 46.0966 18.5795C45.5701 18.5795 45.108 18.4583 44.7102 18.2159C44.3144 17.9735 44.0057 17.6297 43.7841 17.1847C43.5625 16.7377 43.4517 16.2074 43.4517 15.5938C43.4517 15.1297 43.5161 14.7131 43.6449 14.3438C43.7737 13.9744 43.9545 13.661 44.1875 13.4034C44.4223 13.1439 44.6979 12.946 45.0142 12.8097C45.3324 12.6714 45.6799 12.6023 46.0568 12.6023C46.3712 12.6023 46.6638 12.6487 46.9347 12.7415C47.2074 12.8343 47.4498 12.9659 47.6619 13.1364C47.8759 13.3068 48.053 13.5095 48.1932 13.7443C48.3333 13.9773 48.428 14.2358 48.4773 14.5199H47.5767ZM49.6314 18.5V12.6818H53.2791V13.4375H50.5092V15.2102H53.0888V15.9631H50.5092V17.7443H53.3132V18.5H49.6314ZM54.1648 13.4375V12.6818H58.6676V13.4375H56.8523V18.5H55.9773V13.4375H54.1648ZM62.6577 12.6818V18.5H61.7798V12.6818H62.6577ZM63.6491 13.4375V12.6818H68.152V13.4375H66.3366V18.5H65.4616V13.4375H63.6491ZM76.3182 15.5909C76.3182 16.2121 76.2045 16.7462 75.9773 17.1932C75.75 17.6383 75.4384 17.9811 75.0426 18.2216C74.6487 18.4602 74.2008 18.5795 73.6989 18.5795C73.1951 18.5795 72.7453 18.4602 72.3494 18.2216C71.9555 17.9811 71.6449 17.6373 71.4176 17.1903C71.1903 16.7434 71.0767 16.2102 71.0767 15.5909C71.0767 14.9697 71.1903 14.4366 71.4176 13.9915C71.6449 13.5445 71.9555 13.2017 72.3494 12.9631C72.7453 12.7225 73.1951 12.6023 73.6989 12.6023C74.2008 12.6023 74.6487 12.7225 75.0426 12.9631C75.4384 13.2017 75.75 13.5445 75.9773 13.9915C76.2045 14.4366 76.3182 14.9697 76.3182 15.5909ZM75.4489 15.5909C75.4489 15.1174 75.3722 14.7187 75.2188 14.3949C75.0672 14.0691 74.8589 13.8229 74.5938 13.6562C74.3305 13.4877 74.0322 13.4034 73.6989 13.4034C73.3636 13.4034 73.0644 13.4877 72.8011 13.6562C72.5379 13.8229 72.3295 14.0691 72.1761 14.3949C72.0246 14.7187 71.9489 15.1174 71.9489 15.5909C71.9489 16.0644 72.0246 16.464 72.1761 16.7898C72.3295 17.1136 72.5379 17.3598 72.8011 17.5284C73.0644 17.6951 73.3636 17.7784 73.6989 17.7784C74.0322 17.7784 74.3305 17.6951 74.5938 17.5284C74.8589 17.3598 75.0672 17.1136 75.2188 16.7898C75.3722 16.464 75.4489 16.0644 75.4489 15.5909ZM82.1087 12.6818V18.5H81.3018L78.3445 14.233H78.2905V18.5H77.4126V12.6818H78.2251L81.1854 16.9545H81.2393V12.6818H82.1087Z"
									fill="white"
								/>
								<path
									d="M45.2628 34.5H43.2855L46.2983 25.7727H48.6761L51.6847 34.5H49.7074L47.5213 27.767H47.4531L45.2628 34.5ZM45.1392 31.0696H49.8097V32.5099H45.1392V31.0696ZM52.701 36.9545V27.9545H54.4908V29.054H54.5717C54.6513 28.8778 54.7663 28.6989 54.9169 28.517C55.0703 28.3324 55.2692 28.179 55.5135 28.0568C55.7607 27.9318 56.0675 27.8693 56.4339 27.8693C56.9112 27.8693 57.3516 27.9943 57.755 28.2443C58.1584 28.4915 58.4808 28.8651 58.7223 29.3651C58.9638 29.8622 59.0845 30.4858 59.0845 31.2358C59.0845 31.9659 58.9666 32.5824 58.7308 33.0852C58.4979 33.5852 58.1797 33.9645 57.7763 34.223C57.3757 34.4787 56.9268 34.6065 56.4297 34.6065C56.0774 34.6065 55.7777 34.5483 55.5305 34.4318C55.2862 34.3153 55.0859 34.169 54.9297 33.9929C54.7734 33.8139 54.6541 33.6335 54.5717 33.4517H54.5163V36.9545H52.701ZM54.478 31.2273C54.478 31.6165 54.532 31.956 54.6399 32.2457C54.7479 32.5355 54.9041 32.7614 55.1087 32.9233C55.3132 33.0824 55.5618 33.1619 55.8544 33.1619C56.1499 33.1619 56.3999 33.081 56.6044 32.919C56.8089 32.7543 56.9638 32.527 57.0689 32.2372C57.1768 31.9446 57.2308 31.608 57.2308 31.2273C57.2308 30.8494 57.1783 30.517 57.0732 30.2301C56.968 29.9432 56.8132 29.7187 56.6087 29.5568C56.4041 29.3949 56.1527 29.3139 55.8544 29.3139C55.5589 29.3139 55.3089 29.392 55.1044 29.5483C54.9027 29.7045 54.7479 29.9261 54.6399 30.2131C54.532 30.5 54.478 30.8381 54.478 31.2273ZM60.2947 36.9545V27.9545H62.0845V29.054H62.1655C62.245 28.8778 62.3601 28.6989 62.5107 28.517C62.6641 28.3324 62.8629 28.179 63.1072 28.0568C63.3544 27.9318 63.6612 27.8693 64.0277 27.8693C64.505 27.8693 64.9453 27.9943 65.3487 28.2443C65.7521 28.4915 66.0746 28.8651 66.3161 29.3651C66.5575 29.8622 66.6783 30.4858 66.6783 31.2358C66.6783 31.9659 66.5604 32.5824 66.3246 33.0852C66.0916 33.5852 65.7734 33.9645 65.37 34.223C64.9695 34.4787 64.5206 34.6065 64.0234 34.6065C63.6712 34.6065 63.3714 34.5483 63.1243 34.4318C62.88 34.3153 62.6797 34.169 62.5234 33.9929C62.3672 33.8139 62.2479 33.6335 62.1655 33.4517H62.1101V36.9545H60.2947ZM62.0717 31.2273C62.0717 31.6165 62.1257 31.956 62.2337 32.2457C62.3416 32.5355 62.4979 32.7614 62.7024 32.9233C62.907 33.0824 63.1555 33.1619 63.4482 33.1619C63.7436 33.1619 63.9936 33.081 64.1982 32.919C64.4027 32.7543 64.5575 32.527 64.6626 32.2372C64.7706 31.9446 64.8246 31.608 64.8246 31.2273C64.8246 30.8494 64.772 30.517 64.6669 30.2301C64.5618 29.9432 64.407 29.7187 64.2024 29.5568C63.9979 29.3949 63.7464 29.3139 63.4482 29.3139C63.1527 29.3139 62.9027 29.392 62.6982 29.5483C62.4964 29.7045 62.3416 29.9261 62.2337 30.2131C62.1257 30.5 62.0717 30.8381 62.0717 31.2273ZM75.4343 28.2827C75.4002 27.9389 75.2539 27.6719 74.9954 27.4815C74.7369 27.2912 74.386 27.196 73.9428 27.196C73.6417 27.196 73.3874 27.2386 73.18 27.3239C72.9727 27.4062 72.8136 27.5213 72.7028 27.669C72.5948 27.8168 72.5408 27.9844 72.5408 28.1719C72.5352 28.3281 72.5678 28.4645 72.6388 28.581C72.7127 28.6974 72.8136 28.7983 72.9414 28.8835C73.0692 28.9659 73.217 29.0384 73.3846 29.1009C73.5522 29.1605 73.7312 29.2116 73.9215 29.2543L74.7056 29.4418C75.0863 29.527 75.4357 29.6406 75.7539 29.7827C76.0721 29.9247 76.3477 30.0994 76.5806 30.3068C76.8136 30.5142 76.994 30.7585 77.1218 31.0398C77.2525 31.321 77.3192 31.6435 77.3221 32.0071C77.3192 32.5412 77.1829 33.0043 76.913 33.3963C76.646 33.7855 76.2596 34.0881 75.7539 34.304C75.2511 34.517 74.6445 34.6236 73.9343 34.6236C73.2298 34.6236 72.6161 34.5156 72.0934 34.2997C71.5735 34.0838 71.1673 33.7642 70.8746 33.3409C70.5849 32.9148 70.4329 32.3878 70.4187 31.7599H72.2042C72.2241 32.0526 72.3079 32.2969 72.4556 32.4929C72.6062 32.6861 72.8065 32.8324 73.0565 32.9318C73.3093 33.0284 73.5948 33.0767 73.913 33.0767C74.2255 33.0767 74.4968 33.0312 74.7269 32.9403C74.9599 32.8494 75.1403 32.723 75.2681 32.5611C75.396 32.3991 75.4599 32.2131 75.4599 32.0028C75.4599 31.8068 75.4016 31.642 75.2852 31.5085C75.1715 31.375 75.0039 31.2614 74.7823 31.1676C74.5636 31.0739 74.2951 30.9886 73.9769 30.9119L73.0266 30.6733C72.2908 30.4943 71.7099 30.2145 71.2837 29.8338C70.8576 29.4531 70.646 28.9403 70.6488 28.2955C70.646 27.767 70.7866 27.3054 71.0707 26.9105C71.3576 26.5156 71.7511 26.2074 72.2511 25.9858C72.7511 25.7642 73.3192 25.6534 73.9556 25.6534C74.6033 25.6534 75.1687 25.7642 75.6516 25.9858C76.1374 26.2074 76.5153 26.5156 76.7852 26.9105C77.055 27.3054 77.1942 27.7628 77.2028 28.2827H75.4343ZM82.0107 27.9545V29.3182H78.0689V27.9545H82.0107ZM78.9638 26.3864H80.7791V32.4886C80.7791 32.6562 80.8047 32.7869 80.8558 32.8807C80.907 32.9716 80.978 33.0355 81.0689 33.0724C81.1626 33.1094 81.2706 33.1278 81.3928 33.1278C81.478 33.1278 81.5632 33.1207 81.6484 33.1065C81.7337 33.0895 81.799 33.0767 81.8445 33.0682L82.13 34.419C82.0391 34.4474 81.9112 34.4801 81.7464 34.517C81.5817 34.5568 81.3814 34.581 81.1456 34.5895C80.7081 34.6065 80.3246 34.5483 79.995 34.4148C79.6683 34.2812 79.4141 34.0739 79.2322 33.7926C79.0504 33.5114 78.9609 33.1562 78.9638 32.7273V26.3864ZM86.0803 34.6278C85.4183 34.6278 84.8459 34.4872 84.3629 34.206C83.8828 33.9219 83.5121 33.527 83.2507 33.0213C82.9893 32.5128 82.8587 31.9233 82.8587 31.2528C82.8587 30.5767 82.9893 29.9858 83.2507 29.4801C83.5121 28.9716 83.8828 28.5767 84.3629 28.2955C84.8459 28.0114 85.4183 27.8693 86.0803 27.8693C86.7422 27.8693 87.3132 28.0114 87.7933 28.2955C88.2763 28.5767 88.6484 28.9716 88.9098 29.4801C89.1712 29.9858 89.3018 30.5767 89.3018 31.2528C89.3018 31.9233 89.1712 32.5128 88.9098 33.0213C88.6484 33.527 88.2763 33.9219 87.7933 34.206C87.3132 34.4872 86.7422 34.6278 86.0803 34.6278ZM86.0888 33.2216C86.3899 33.2216 86.6413 33.1364 86.843 32.9659C87.0447 32.7926 87.1967 32.5568 87.299 32.2585C87.4041 31.9602 87.4567 31.6207 87.4567 31.2401C87.4567 30.8594 87.4041 30.5199 87.299 30.2216C87.1967 29.9233 87.0447 29.6875 86.843 29.5142C86.6413 29.3409 86.3899 29.2543 86.0888 29.2543C85.7848 29.2543 85.5291 29.3409 85.3217 29.5142C85.1172 29.6875 84.9624 29.9233 84.8572 30.2216C84.755 30.5199 84.7038 30.8594 84.7038 31.2401C84.7038 31.6207 84.755 31.9602 84.8572 32.2585C84.9624 32.5568 85.1172 32.7926 85.3217 32.9659C85.5291 33.1364 85.7848 33.2216 86.0888 33.2216ZM90.4822 34.5V27.9545H92.2422V29.0966H92.3104C92.4297 28.6903 92.63 28.3835 92.9112 28.1761C93.1925 27.9659 93.5163 27.8608 93.8828 27.8608C93.9737 27.8608 94.0717 27.8665 94.1768 27.8778C94.282 27.8892 94.3743 27.9048 94.4538 27.9247V29.5355C94.3686 29.5099 94.2507 29.4872 94.1001 29.4673C93.9496 29.4474 93.8118 29.4375 93.6868 29.4375C93.4197 29.4375 93.1811 29.4957 92.9709 29.6122C92.7635 29.7259 92.5987 29.8849 92.4766 30.0895C92.3572 30.294 92.2976 30.5298 92.2976 30.7969V34.5H90.4822ZM98.0707 34.6278C97.3974 34.6278 96.8178 34.4915 96.332 34.2188C95.8491 33.9432 95.4769 33.554 95.2156 33.0511C94.9542 32.5455 94.8235 31.9474 94.8235 31.2571C94.8235 30.5838 94.9542 29.9929 95.2156 29.4844C95.4769 28.9759 95.8448 28.5795 96.3192 28.2955C96.7965 28.0114 97.3562 27.8693 97.9982 27.8693C98.43 27.8693 98.832 27.9389 99.2042 28.0781C99.5792 28.2145 99.9059 28.4205 100.184 28.696C100.466 28.9716 100.684 29.3182 100.841 29.7358C100.997 30.1506 101.075 30.6364 101.075 31.1932V31.6918H95.5479V30.5668H99.3661C99.3661 30.3054 99.3093 30.0739 99.1957 29.8722C99.082 29.6705 98.9244 29.5128 98.7227 29.3991C98.5238 29.2827 98.2923 29.2244 98.0281 29.2244C97.7525 29.2244 97.5082 29.2884 97.2951 29.4162C97.0849 29.5412 96.9201 29.7102 96.8008 29.9233C96.6815 30.1335 96.6204 30.3679 96.6175 30.6264V31.696C96.6175 32.0199 96.6772 32.2997 96.7965 32.5355C96.9187 32.7713 97.0906 32.9531 97.3121 33.081C97.5337 33.2088 97.7965 33.2727 98.1005 33.2727C98.3022 33.2727 98.4869 33.2443 98.6545 33.1875C98.8221 33.1307 98.9656 33.0455 99.0849 32.9318C99.2042 32.8182 99.2951 32.679 99.3576 32.5142L101.037 32.625C100.951 33.0284 100.777 33.3807 100.512 33.6818C100.251 33.9801 99.913 34.2131 99.4982 34.3807C99.0863 34.5455 98.6104 34.6278 98.0707 34.6278Z"
									fill="white"
								/>
								<g clip-path="url(#clip3_943_911)">
									<path
										d="M32.4906 17.8634C32.3398 17.9804 29.6774 19.4806 29.6774 22.8164C29.6774 26.6748 33.0652 28.0398 33.1666 28.0736C33.151 28.1568 32.6284 29.943 31.3804 31.763C30.2676 33.3646 29.1054 34.9636 27.3374 34.9636C25.5694 34.9636 25.1144 33.9366 23.0734 33.9366C21.0844 33.9366 20.3772 34.9974 18.76 34.9974C17.1428 34.9974 16.0144 33.5154 14.717 31.6954C13.2142 29.5582 12 26.238 12 23.0868C12 18.0324 15.2864 15.3518 18.5208 15.3518C20.2394 15.3518 21.672 16.4802 22.751 16.4802C23.778 16.4802 25.3796 15.2842 27.3348 15.2842C28.0758 15.2842 30.7382 15.3518 32.4906 17.8634ZM26.4066 13.1444C27.2152 12.185 27.7872 10.8538 27.7872 9.5226C27.7872 9.338 27.7716 9.1508 27.7378 9C26.4222 9.0494 24.857 9.8762 23.9132 10.9708C23.1722 11.8132 22.4806 13.1444 22.4806 14.4938C22.4806 14.6966 22.5144 14.8994 22.53 14.9644C22.6132 14.98 22.7484 14.9982 22.8836 14.9982C24.064 14.9982 25.5486 14.2078 26.4066 13.1444Z"
										fill="white"
									/>
								</g>
							</g>
							<rect x="0.5" y="0.5" width="126" height="47" rx="5.5" stroke="#776F6F" />
							<defs>
								<clipPath id="clip0_943_911">
									<rect width="127" height="48" rx="6" fill="white" />
								</clipPath>
								<clipPath id="clip1_943_911">
									<rect width="21.164" height="26" fill="white" transform="translate(12 9)" />
								</clipPath>
								<clipPath id="clip2_943_911">
									<rect width="814" height="1000" fill="white" transform="translate(-394 -481)" />
								</clipPath>
								<clipPath id="clip3_943_911">
									<rect width="21.164" height="26" fill="white" transform="translate(12 9)" />
								</clipPath>
							</defs>
						</svg>
					</div>
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
	.landImageWrap {
		/* margin-top: 90px; */
		/* object-fit: cover; */
		/* min-height: 100vh; */
		padding: 0;
	}

	.landPgHeroMailInput {
		padding: 8px;
		border: none;
		outline: none;
		flex: 1;
	}

	.flexRow {
		display: flex;
		flex-direction: row;
		gap: 12px;
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
		/* padding: 16px; */
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
		padding: 16px 0 16px 0;
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

		.landingPageWrap {
			padding-bottom: 50px;
		}

		.flexRow {
			justify-content: space-evenly;
		}
	}
</style>
