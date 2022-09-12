export const fetcher = (url: string, ...otherParams: any[]) => {
  if (url.startsWith('/')) {
    return fetch(process.env.NEXT_PUBLIC_BASE_URL + url, ...otherParams).then(
      (res) => res.json()
    );
  }
  return fetch(url, ...otherParams).then((res) => res.json());
};
