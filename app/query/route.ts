// import { db } from "@vercel/postgres";

// const client = await db.connect();

// async function listInvoices() {
// 	const data = await client.sql`
//     SELECT invoices.amount, customers.name
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE invoices.amount = 666;
//   `;

// 	return data.rows;
// }

// export async function GET() {
//   return Response.json({
//     message:
//       'Uncomment this file and remove this line. You can delete this file when you are finished.',
//   });
//   try {
//   	return Response.json(await listInvoices());
//   } catch (error) {
//   	return Response.json({ error }, { status: 500 });
//   }
// }
import { db } from "@vercel/postgres";

async function listInvoices() {
  const client = await db.connect();

  try {
    const data = await client.sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;
    return data.rows;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  } finally {
    client.release(); // Ensure the database client is released
  }
}

export async function GET() {
  try {
    const invoices = await listInvoices();
    return new Response(JSON.stringify(invoices), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch invoices" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
