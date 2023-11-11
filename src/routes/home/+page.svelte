<script>
	import { Button } from "@svelteuidev/core";
	import LoginModal from "$lib/components/LoginModal.svelte";

	let loginModalOpen = false;
	let settings;
</script>

<div class="landingPageWrap scrollbar-custom">
	{#if loginModalOpen}
		<LoginModal {settings} on:close={() => (loginModalOpen = false)} />
	{/if}
	<div class="landingPageWrapChild">
		<div class="landBarWrap">
			<div class="landBarWidthWrap">
				<div class="logoTitleWrap">
					<div class="logoWrap">
						<svg
							width="36"
							height="36"
							viewBox="0 0 36 36"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_709_2093)">
								<circle
									cx="17.8769"
									cy="17.8772"
									r="15"
									transform="rotate(-24.714 17.8769 17.8772)"
									stroke="black"
									stroke-width="1.85"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M22.6246 18.9943L19.8712 26.4433C19.7505 26.7698 19.5051 27.035 19.1888 27.1805L18.0643 27.6981C17.6483 27.8896 17.1625 27.8503 16.7825 27.5945C16.4026 27.3387 16.1835 26.9033 16.2045 26.4458L16.4148 21.8523"
									stroke="black"
									stroke-width="1.85"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M22.106 14.2792L14.657 11.5258C14.3305 11.4051 13.9694 11.419 13.6532 11.5646L12.5287 12.0821C12.1126 12.2736 11.8265 12.6682 11.7737 13.1231C11.7209 13.5781 11.9091 14.0277 12.2703 14.3094L15.8962 17.1372"
									stroke="black"
									stroke-width="1.85"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12.3928 18.7499L10.8609 17.5216C10.196 16.9885 9.28691 16.8768 8.51273 17.2331L7.82088 17.5516C7.38288 17.7532 7.06848 18.153 6.97591 18.6262C6.88334 19.0994 7.02388 19.5883 7.35364 19.94L10.1047 22.8749C10.8406 23.66 11.9964 23.8861 12.9739 23.4361L16.3271 21.8929"
									stroke="black"
									stroke-width="1.85"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12.4807 18.7095L24.7442 13.0653C25.873 12.5457 27.2093 13.0397 27.7288 14.1685V14.1685C28.2483 15.2973 27.7544 16.6336 26.6256 17.1531"
									stroke="black"
									stroke-width="1.85"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M26.6254 17.1529L22.6246 18.9943"
									stroke="black"
									stroke-width="1.85"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_709_2093">
									<rect width="36" height="36" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</div>
					<div class="logoTitle">ImmiGPT</div>
				</div>
				<div class="authBtnWrap">
					<Button
						on:click={() => (loginModalOpen = true)}
						variant="default"
						color="dark"
						radius="xl"
						size="md">Sign up</Button
					>
					<Button on:click={() => (loginModalOpen = true)} color="dark" radius="xl" size="md"
						>Login</Button
					>
				</div>
			</div>
		</div>
		<div class="landPgHeroWrap">
			<div class="landPgHeroDetailWrap">
				<div class="landPgHeroTitle1">Ultimate guide for</div>
				<div class="landPgHeroTitle2">Travel and Immigration</div>
				<div class="landPgHeroDesc">
					Find real time answers related to Travel and Immigration, Prepare and attempt mocks for
					Visa interview, Compelling SOP assistance
				</div>
			</div>
			<div class="landPgHeroMailSection2">
				<div class="landPgHeroMailInputWrap">
					<input class="landPgHeroMailInput" type="text" placeholder="Enter Email address" />
					<Button color="dark" radius="xl">Try now</Button>
				</div>
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
								<div class="featureTextTitle">Visa Preparation</div>
								<div class="featureTextDesc">
									Find real time answers related to Travel and Immigration, Prepare and attempt
									mocks for Visa.
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
								<div class="featureTextTitle">Prepared templates</div>
								<div class="featureTextDesc">
									Find real time answers related to Travel and Immigration, Prepare and attempt
									mocks for Visa.
								</div>
							</div>
						</div>
					</div>
					<div class="featureMainCard">
						<div class="featureMainCardFull">
							<div class="featureTextTitle">
								Web based results for all your travel & Immirgration quesitons
							</div>
							<div class="featureTextDesc">
								Find real time answers related to Travel and Immigration, Prepare and attempt mocks
								for Visa.
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
								<div class="featureTextTitle">Visa Mockup Tests</div>
								<div class="featureTextDesc">
									Find real time answers related to Travel and Immigration, Prepare and attempt
									mocks for Visa.
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
								<div class="featureTextTitle">Streamlined Blogs</div>
								<div class="featureTextDesc">
									Find real time answers related to Travel and Immigration, Prepare and attempt
									mocks for Visa.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pricingDetailSection">
			<div class="pricingDetailsWrap">
				<div class="pricingDetailSubTitle">pricing</div>
				<div class="pricingDetailTitle">Choose plan suits for you</div>
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
						<Button fullSize variant="default" radius="md"
							><span style="color: #7E7E7E">Choose Plan</span></Button
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
						<Button fullSize variant="default" radius="md"
							><span style="color: #7E7E7E">Choose Plan</span></Button
						>
					</div>
				</div>
			</div>
		</div>
		<div class="trySection">
			<div class="tryWrap">
				<div class="tryTextWrap">
					<div class="tryTitle">Try ImmiGPT for Free</div>
					<div class="tryDesc">
						Find real time answers related to Travel and Immigration, Prepare and attempt mocks for
						Visa interview, Compelling SOP assistance
					</div>
				</div>
				<Button variant="default" color="dark" radius="xl" size="md">Get Started</Button>
			</div>
		</div>
		<div class="footerSection">
			<div class="footerWrap">
				<div class="footerAbout">
					<div class="logoTitleWrap">
						<div class="logoWrap">
							<svg
								width="36"
								height="36"
								viewBox="0 0 36 36"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_709_2093)">
									<circle
										cx="17.8769"
										cy="17.8772"
										r="15"
										transform="rotate(-24.714 17.8769 17.8772)"
										stroke="black"
										stroke-width="1.85"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M22.6246 18.9943L19.8712 26.4433C19.7505 26.7698 19.5051 27.035 19.1888 27.1805L18.0643 27.6981C17.6483 27.8896 17.1625 27.8503 16.7825 27.5945C16.4026 27.3387 16.1835 26.9033 16.2045 26.4458L16.4148 21.8523"
										stroke="black"
										stroke-width="1.85"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M22.106 14.2792L14.657 11.5258C14.3305 11.4051 13.9694 11.419 13.6532 11.5646L12.5287 12.0821C12.1126 12.2736 11.8265 12.6682 11.7737 13.1231C11.7209 13.5781 11.9091 14.0277 12.2703 14.3094L15.8962 17.1372"
										stroke="black"
										stroke-width="1.85"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M12.3928 18.7499L10.8609 17.5216C10.196 16.9885 9.28691 16.8768 8.51273 17.2331L7.82088 17.5516C7.38288 17.7532 7.06848 18.153 6.97591 18.6262C6.88334 19.0994 7.02388 19.5883 7.35364 19.94L10.1047 22.8749C10.8406 23.66 11.9964 23.8861 12.9739 23.4361L16.3271 21.8929"
										stroke="black"
										stroke-width="1.85"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M12.4807 18.7095L24.7442 13.0653C25.873 12.5457 27.2093 13.0397 27.7288 14.1685V14.1685C28.2483 15.2973 27.7544 16.6336 26.6256 17.1531"
										stroke="black"
										stroke-width="1.85"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M26.6254 17.1529L22.6246 18.9943"
										stroke="black"
										stroke-width="1.85"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</g>
								<defs>
									<clipPath id="clip0_709_2093">
										<rect width="36" height="36" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</div>
						<div class="logoTitle">ImmiGPT</div>
					</div>
					<div class="footerAboutDesc">
						ImmiGPT helps to find real time answers related to Travel and Immigration, Prepare and
						attempt mocks for Visa interview, Compelling SOP assistance
					</div>
				</div>
				<div class="footerLinksWrap">
					<div class="linkSection">
						<div class="linksTitle">Important Links</div>
						<div class="linksWrap">
							<div class="link">
								<a href="/#">About us</a>
							</div>
							<div class="link">
								<a href="/#">Pricing</a>
							</div>
							<div class="link">
								<a href="/#">Terms and conditions</a>
							</div>
							<div class="link">
								<a href="/#">Privacy policy</a>
							</div>
							<div class="link">
								<a href="/#">Contact Us</a>
							</div>
						</div>
					</div>
					<div class="linkSection">
						<div class="linksTitle">Follow us</div>
						<div class="linksWrap">
							<div class="link">
								<a href="/#">Linked in</a>
							</div>
							<div class="link">
								<a href="/#">Facebook</a>
							</div>
							<div class="link">
								<a href="/#">Twitter</a>
							</div>
							<div class="link">
								<a href="/#">Instagram</a>
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
	}

	.landingPageWrap {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow-y: auto;
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

	.logoTitle {
		font-size: 16px;
		font-family: Inter;
		font-weight: 600;
	}

	.landPgHeroWrap {
		display: flex;
		flex-direction: column;
		padding: 16px;
		align-items: center;
		gap: 32px;
		height: 100vh;
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
		max-width: 380px;
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
		height: 100vh;
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
		height: 100vh;
		padding: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f7f7f7;
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
		max-width: 400px;
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
		background-color: #000;
		padding: 16px;
		min-height: 400px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tryWrap {
		color: #fff;
		display: flex;
		flex-direction: column;
		gap: 24px;
		align-items: center;
		max-width: 1240px;
	}

	.tryTextWrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: center;
	}

	.tryTitle {
		color: white;
		font-size: 40px;
		font-family: Inter;
		font-weight: 700;
		text-align: center;
	}

	.tryDesc {
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
	}

	.linkSection {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.linksTitle {
		color: #5f5f5f;
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
		color: #131313;
		font-size: 14px;
		font-family: Inter;
		font-weight: 400;
	}
</style>
