export async function GET() {
  console.log(process.env.INTEGRATIONS_API);
  const res = await fetch(`${process.env.INTEGRATIONS_API}/delivery_providers`);

  if (!res.ok) {
    throw new Error("Failed to fetch delivery providers");
  }

  const data = await res.json()

  return Response.json({ data });
}
