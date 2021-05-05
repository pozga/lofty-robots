export async function postData(url = "", data = undefined) {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    cors: "cors",
    headers: data
      ? {
          "Content-Type": "application/json",
        }
      : undefined,
    body: data ? JSON.stringify(data) : undefined,
  });
  return response.json();
}
