export async function GET(request: Request) {
    const id = request.url.split('/').pop();
    const res = await fetch(`${process.env.INTEGRATIONS_API}/delivery_provider/${id}`);
  
    if (!res.ok) {
      throw new Error("Failed to fetch delivery providers");
    }
  
    const data = await res.json();
  
    return Response.json({ data });
  }