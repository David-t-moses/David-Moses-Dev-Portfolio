import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name } = await request.json();

  // Improved email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://us9.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: name,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mailchimp API error:", errorData);
      return NextResponse.json(
        { message: errorData.detail },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(
      { message: "Subscription successful!", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
