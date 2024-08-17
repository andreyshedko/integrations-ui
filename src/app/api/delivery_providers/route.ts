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
    throw new Error(`Failed to add delivery providers ${res.statusText}`);
  }

  const data = await res.json();
  return Response.json({ data });
}

export async function PUT(request: Request) {
  console.log(request)
  const provider = await request.json();
  const res = await fetch(
    `${process.env.INTEGRATIONS_API}/delivery_providers`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(provider),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to update delivery providers ${res.statusText}`);
  }

  const data = await res.json();
  return Response.json({ data });
}

export async function DELETE(request: Request) {
  const provider = await request.json();
  const res = await fetch(
    `${process.env.INTEGRATIONS_API}/delivery_providers/${provider.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to add delivery providers ${res.statusText}`);
  }

  const data = await res.json();
  return Response.json({ data });
}
