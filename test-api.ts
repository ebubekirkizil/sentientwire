async function testApi() {
  try {
    const res = await fetch("http://localhost:3000/api/articles?locale=tr");
    if (res.ok) {
      const data = await res.json();
      console.log("API Response length:", data.length);
      console.log("Data:", data);
    } else {
      console.error("API Error:", res.status, res.statusText);
    }
  } catch (e) {
    console.error("Connection failed. Is the app running on localhost:3000?");
  }
}

testApi();
