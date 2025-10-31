
import { headers } from "next/headers";
import { cookies } from "next/headers";
export default async function main() {
  const headerList = await headers();
  const cookieStore=await cookies();
  const headersObj = {};
  console.log("fromCookie",cookieStore.getAll())
   console.log("HEADER",headerList.entries())
   console.log("COOKIES",headerList.get("cookies"))
  // Convert iterator to plain object
  for (const [key, value] of headerList.entries()) {
    headersObj[key] = value;
  }

  // Manually set Host to trigger ingress routing
  headersObj["Host"] = "ticketing.dev";
  const cookieArray = cookieStore.getAll();
if (cookieArray.length) {
  headersObj["cookie"] = cookieArray.map(c => `${c.name}=${c.value}`).join("; ");
}

  console.log(
    "HEADERLIST",headersObj
  )
  try {
    const res = await fetch(
      "http://ingress-internal-srv.default.svc.cluster.local/api/users/currentuser",
      {
        method: "GET",
        headers: headersObj,
        cache: "no-store",
      }
    );
    console.log(res)
    // if (!res.ok) {
    //   const text = await res.text(); // grab the HTML error or message
    //   console.error("Fetch failed:", res.status, text);
    //   throw new Error(`Fetch failed with status ${res.status}`);
    // }
    const data =await  res.json();
    console.log("Current user:", data.currentUser.email);

    return <h1>landing page</h1>;
  } catch (error) {
    console.error("Fetch error:", error);
    return <h1>Error fetching current user</h1>;
  }
}
