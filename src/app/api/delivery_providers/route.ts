export async function GET() {
  const res = await fetch(`${process.env.INTEGRATIONS_API}/delivery_providers`);

  if (!res.ok) {
    throw new Error("Failed to fetch delivery providers");
  }

  const data = await res.json();

  return Response.json({ data });
}

export async function POST(request: Request) {
  const provider = await request.json();
  const res = await fetch(
    `${process.env.INTEGRATIONS_API}/delivery_providers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(provider),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch delivery providers");
  }

  console.log(await res.json())

  const data = await res.json();
  console.log("6666666", data);
  return Response.json({ data });
}
