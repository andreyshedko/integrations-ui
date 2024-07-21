export async function GET() {
  const res = await fetch(`${process.env.INTEGRATIONS_API}/delivery_providers`);

  if (!res.ok) {
    throw new Error("Failed to fetch delivery providers");
  }

  const data = await res.json();

  return Response.json({ data });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("provider_name");
  const email = formData.get("country_operates");
  return Response.json({ name, email });
}
