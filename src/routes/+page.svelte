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

	function googleTranslateElementInit() {
		new google.translate.TranslateElement({ pageLanguage: "en" }, "google_translate_element");
	}

	onMount(() => {
		loginModalOpen = false;
		// token = Cookies.get("token");
		// if (token) {
		// 	goto("/home");
		// }
		//googleTranslateElementInit();
	});
</script>

<div class="landingPageWrap scrollbar-custom">
	{#if loginModalOpen}
		<LoginModal
			{showSignUp}
			{settings}
			on:close={() => closeLoginPopup}
			on:closeLoginPopup={closeLoginPopup}
		/>
	{/if}
	<div class="landingPageWrapChild">
		<div class="landBarWrap">
			<div class="landBarWidthWrap">
				<div class="logoTitleWrap">
					<!-- <div class="logoWrap">
						<img width="40px" src="/assets/images/statue-liberty.jpg" alt="immigpt" />
					</div> -->
					<div class="logoTitle">Ask Soafee</div>
				</div>
				<div id="google_translate_element" />
				<div class="authBtnWrap">
					<button on:click={() => showSignUpPopup()} class="signUpBtn"
						><span style="color: #fff !important;">Sign up</span></button
					>
					<button on:click={() => showLoginPopup()} class="loginBtn"
						><span style="color: #222 !important;">Login</span></button
					>
				</div>
				<div class="authBtnWrap2">
					<button on:click={() => showSignUpPopup()} class="signUpBtn"
						><span style="color: #fff !important;">Sign up</span></button
					>
					<button on:click={() => showLoginPopup()} class="loginBtn"
						><span style="color: #222 !important;">Login</span></button
					>
				</div>
			</div>
		</div>
		<div class="landPgHeroWrap">
			<div class="landImageWrap">
				<!-- <img style="" src="/assets/images/homebanner.png" alt="hero" /> -->
				<div class="landStartContentWrap">
					<div class="landPgStartTitle1">Meet Your Smart</div>
					<div class="landPgStartTitle2">Healthcare Companion</div>
					<div class="landPgStartDesc">
						Unlock a wealth of medical expertise at your fingertips with our advanced AI chatbot,
						empowering you to make informed health decisions effortlessly.
					</div>
					<button on:click={() => (loginModalOpen = true)} class="getStartedBtn"
						><span style="color: #5454F0 !important;">Get Started</span></button
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
				</div>
			</div>
			<!-- <div class="landPgHeroDetailWrap">
				<div class="landPgHeroTitle1">A Generative AI</div>
				<div class="landPgHeroTitle2">For Health Care</div>
				<div class="landPgHeroDesc">
					ImmiGPT revolutionizes your journey with cutting-edge AI technology,providing instant
					responses to your Travel and Immigration concerns.
				</div>
			</div> -->
			<!-- <div class="landPgHeroMailSection2">
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
			</div> -->
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
								</svg> Access to AskSoafee Basic Model
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
								</svg> Access to Search Web Functionality
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
								</svg> Access to Health Care Help
							</div>
							<div class="detailText"><span style="color: #fff;">.</span></div>
						</div>
						<!-- <Button fullSize color="dark" radius="md"
							><span style="color: #fff">Choose Plan</span></Button
						> -->
						<button on:click={() => (loginModalOpen = true)} class="choosePlanBtn"
							><span style="color: #7E7E7E !important;">Choose Plan</span></button
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
								</svg> Access to AskSoafee Pro model
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
								</svg> Access to Search Web Functionality
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
								</svg> Access to Health Care Help
							</div>
							<div class="detailText"><span style="color: #fff;">.</span></div>
						</div>
						<!-- <Button fullSize color="dark" radius="md"
							><span style="color: #fff">Choose Plan</span></Button
						> -->
						<button on:click={() => (loginModalOpen = true)} class="choosePlanBtn"
							><span style="color: #7E7E7E !important;">Choose Plan</span></button
						>
					</div>
				</div>
			</div>
		</div>
		<div class="expSection">
			<div class="expWrap">
				<div class="expTextWrap">
					<div class="expTitle">Experience the power of AskSoafee for Free</div>
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
		<div class="footerSection">
			<div class="footerWrap">
				<div class="footerAbout">
					<div class="logoTitleWrap">
						<!-- <div class="logoWrap">
							<img width="40px" src="/assets/images/sl-neg.png" alt="immigpt" />
						</div> -->
						<div class="logoTitleWhite" style="color:#1d1d52">AskSoafee</div>
					</div>
					<div class="footerAboutDesc" style="color:#1d1d52">A Generative AI For Health Care</div>
				</div>
				<div class="footerLinksWrap">
					<div class="linkSection">
						<div class="linksTitle" style="color:#1d1d52">Important Links</div>
						<div class="linksWrap">
							<!-- <div class="link">
								<a href="/#">About us</a>
							</div> -->
							<div class="link">
								<a style="color:#1d1d52">Pricing</a>
							</div>
							<div class="link">
								<a target="_blank" style="color:#1d1d52">Terms and Policies</a>
							</div>
							<!-- <div class="link">
								<a href="/privacy-policy">Privacy policy</a>
							</div> -->
							<div class="link">
								<a on:click={openRaiseAnIssuePopup} style="color:#1d1d52">Contact Us</a>
							</div>
							<div class="link">
								<a on:click={openAboutUsPopup} style="color:#1d1d52">About Us</a>
							</div>
							<div class="link">
								<a target="_blank" style="color:#1d1d52">Blogs</a>
							</div>
						</div>
						<RaiseAnIssuePopup
							{showRaiseAnIssuePopup}
							on:closeRaiseAnIssuePopup={closeRaiseAnIssuePopup}
						/>
						<AboutUsPopup {showAboutUsPopup} on:closeAboutUsPopup={closeAboutUsPopup} />
					</div>
					<div class="linkSection">
						<div class="linksTitle" style="color:#1d1d52">Follow us</div>
						<div class="linksWrap">
							<!-- <div class="link">
								<a href="">Linked in</a>
							</div> -->
							<div class="link">
								<a target="_blank" style="color:#1d1d52">Facebook</a>
							</div>
							<div class="link">
								<a target="_blank" style="color:#1d1d52">Twitter</a>
							</div>
							<div class="link">
								<a target="_blank" style="color:#1d1d52">Instagram</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Montserrat+Alternates&display=swap");

	.landImageWrap {
		/* margin-top: 90px; */
		/* object-fit: cover; */
		min-height: 120vh;
		padding: 0;
		background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)),
			url("/assets/images/homebanner.png");
		background-repeat: no-repeat, repeat;
		background-size: cover;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.landImageWrap2 {
		display: none;
	}

	.landStartContentWrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 16px;
		height: 100%;
		width: 100%;
		max-width: 1240px;
		padding: 16px;
	}

	.landPgStartTitle1 {
		color: #e9e9ff;
		font-size: 48px;
		font-family: Inter;
		font-weight: bolder;
		font-style: italic;
	}

	.landPgStartTitle2 {
		color: #e9e9ff;
		font-size: 48px;
		font-family: Inter;
		font-weight: bolder;
	}

	.landPgStartDesc {
		color: #c0c0c0;
		font-size: 16px;
		font-family: Inter;
		font-weight: 400;
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
		border: 0.7px solid #fff;
		border-radius: 20px;
		color: #fff;
		font-weight: 700;
	}

	.loginBtn {
		padding: 8px 24px;
		display: flex;
		justify-content: center;
		background-color: #fff;
		border-radius: 20px;
		color: #000;
		font-weight: 700;
	}

	.getStartedBtn {
		padding: 12px 32px;
		display: flex;
		justify-content: center;
		background-color: #fff;
		border-radius: 40px;
		color: #5454f0;
		font-weight: 700;
		font-size: 14px;
	}

	/* .getStartedBtn {
		padding: 12px 32px;
		display: flex;
		justify-content: center;
		background-color: #000;
		border-radius: 40px;
		color: #fff;
		font-weight: 700;
		font-size: 20px;
	} */

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
		background-color: #fff;
		border-radius: 8px;
		color: #7e7e7e;
		font-weight: 700;
		border: 1px solid #7e7e7e;
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
		/* background-color: #fff; */
		z-index: 10;
		/* box-shadow: 2px 0 24px rgb(219, 219, 219); */
		background: rgba(84, 84, 240, 0.25);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
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
	.authBtnWrap2 {
		display: none;
	}

	.logoTitleWhite {
		font-size: 16px;
		font-family: "Montserrat Alternates";
		font-weight: 600;
		color: #fff;
	}

	.logoTitle {
		font-size: 16px;
		font-family: "Montserrat Alternates";
		font-weight: 600;
		color: #fff;
	}

	.landPgHeroWrap {
		display: flex;
		flex-direction: column;
		/* padding: 16px; */
		align-items: center;
		/* gap: 32px; */
		min-height: 100vh;
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
		color: #c0c0c0;
		font-size: 14px;
		font-family: Inter;
		font-weight: 400;
	}

	.featureDetailSection {
		min-height: 100vh;
		background-color: #5454f0;
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
		color: #dbdbdb;
		font-size: 14px;
		font-family: Inter;
		font-weight: 500;
		text-transform: uppercase;
		padding: 8px 16px;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.2);
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
		justify-content: center;
		height: 100%;
		padding: 16px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 10px;
		gap: 12px;
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
		color: #fff;
		font-size: 16px;
		font-family: Inter;
		font-weight: 400;
	}

	.featureMainTiltedTrouble {
		backface-visibility: visible;
		background-image: linear-gradient(rgb(104, 104, 239), rgba(0, 0, 0, 0)),
			url("/assets/images/tiltedpun.png");
		background-repeat: no-repeat, repeat;
		background-size: cover;
		height: 250px;
		padding: 16px;
	}

	.pricingDetailSection {
		min-height: 85vh;
		padding: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ebebfa;
	}

	.pricingDetailSubTitle {
		color: #777777;
		font-size: 14px;
		font-family: Inter;
		font-weight: 500;
		text-transform: uppercase;
		padding: 8px 16px;
		border-radius: 16px;
		background: rgb(255, 255, 255);
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
		border: 1px solid #d9d9d9;
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
		background-color: #fff;
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
		gap: 24px;
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
		background-color: #1d1d52;
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
		background-color: #c6c6c6;
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

		.landBarWrap {
			/* background: rgba(255, 255, 255, 1);
			box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
		}

		.authBtnWrap {
			display: none;
			justify-content: center;
			gap: 8px;
			align-items: center;
		}

		.landImageWrap {
			/* margin-top: 90px; */
			/* object-fit: cover; */
			min-height: 100vh;
			padding: 0;
			background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)),
				url("/assets/images/homebanner.png");
			background-repeat: no-repeat, repeat;
			background-size: cover;
			width: 100%;
			display: flex;
			justify-content: center;
			background-position: center;
		}

		.authBtnWrap2 {
			display: flex;
			justify-content: center;
			gap: 8px;
			align-items: center;
		}

		.logoTitle {
			color: #fff;
		}

		.landImageWrap {
			background-image: linear-gradient(rgba(29, 29, 82, 0.8), rgba(29, 29, 82, 0.8)),
				url("/assets/images/homebanner.png");
			/* background: linear-gradient(98deg, #ebebf7 100%, rgba(235, 235, 247, 0) 100%); */
			background-color: #ebebf7;
			background-repeat: no-repeat, repeat;
			min-height: 100vh;
		}

		.landImageWrap2 {
			display: block;
			background-image: linear-gradient(rgba(235, 235, 247, 1), rgba(0, 0, 0, 0.5)),
				url("/assets/images/homebanner.png");
			background-repeat: no-repeat, repeat;
			background-size: cover;
			width: 100%;
			height: 50vh;
			/* flex: 1; */
		}

		.loginBtn {
			/* background-color: #5454f0; */
		}

		.freePlanWrap {
			/* display: none; */
		}

		.landStartContentWrap {
			justify-content: center;
			align-items: center;
		}

		.landPgStartDesc {
			color: #c0c0c0;
			font-size: 14px;
			text-align: center;
		}

		.freePlanWrap2 {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 8px;
		}

		.landPgStartTitle1 {
			color: #fff;
			font-size: 30px;
			text-align: center;
		}

		.landPgStartTitle2 {
			color: #fff;
			font-size: 30px;
			text-align: center;
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
