import "server-only";

import mailchimp from "@mailchimp/mailchimp_marketing";

const MAILCHIMP_SERVER_PREFIX = "us9";
const COMMUNITY_AUDIENCE_ID = "0eb6a93be9";

function configureMailchimp() {
  const apiKey = process.env.MAILCHAMP_API_KEY;

  if (!apiKey) {
    throw new Error("MAILCHAMP_API_KEY is not configured");
  }

  mailchimp.setConfig({
    apiKey,
    server: MAILCHIMP_SERVER_PREFIX,
  });
}

export async function getMailchimpAudiences() {
  configureMailchimp();
  return mailchimp.lists.getAllLists();
}

export async function subscribeToCommunityAudience(email: string) {
  configureMailchimp();

  return mailchimp.lists.addListMember(COMMUNITY_AUDIENCE_ID, {
    email_address: email,
    status: "pending",
  });
}
