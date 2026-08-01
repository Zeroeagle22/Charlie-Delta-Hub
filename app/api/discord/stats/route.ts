import { NextResponse } from "next/server";

const INVITE_CODE = "qkAueYSTfK";
const DISCORD_API = `https://discord.com/api/v9/invites/${INVITE_CODE}?with_counts=true`;

export const revalidate = 300;

export async function GET() {
  try {
    const res = await fetch(DISCORD_API, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json({ memberCount: 6210 }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json({ memberCount: data.approximate_member_count ?? 1256 });
  } catch {
    return NextResponse.json({ memberCount: 1256 }, { status: 200 });
  }
}