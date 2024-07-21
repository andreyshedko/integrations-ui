export async function GET() {
    const res = await fetch(`${process.env.AUTOMATO_API}/countries/en`);
  
    if (!res.ok) {
      throw new Error("Failed to fetch delivery providers");
    }
  
    const countries = await res.json()
  
    return Response.json({ countries });
  }