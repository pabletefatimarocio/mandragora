async function fetcher(url) {
  const res = await fetch(url);

  const resJSON = await res.json();

  return resJSON;
}

export default fetcher;