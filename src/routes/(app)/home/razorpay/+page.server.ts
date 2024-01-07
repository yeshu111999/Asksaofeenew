import Cookies from "js-cookie";
async function createSubscription(cookies) {
    console.log('createSubscription')
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + cookies.get("token"),
    };
    const gauth = cookies.get("Google-Auth");
    if (gauth) {
        headers["Google-Auth"] = "True";
    }
    console.log('headers', headers)
    const response = await fetch("https://backend.immigpt.ai/create-subscription", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ planId: "plan_NIf6lW1EopNhsx" }),
    });
    console.log('response', response)
    console.log('response-statu', response.ok)
    if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        openRazorpay(data.id, cookies);
    } else {
        const data = await response.json();
        console.error("Subscription creation failed:", data);
    }

}

function openRazorpay(subscriptionId, cookies) {
    console.log('openRazorpay');
    const options = {
        key: "rzp_test_HV4tUhpyqqO38s",
        subscription_id: subscriptionId,
        prefill: {
            name: cookies.get("name"),
            email: cookies.get("email")
        },
        handler: function (response) {
            console.log(response);
            // Handle post-payment logic here
        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
}

export async function load({cookies}) {
    console.log('check2', cookies.get("token"))
    createSubscription(cookies);
}