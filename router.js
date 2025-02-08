function goToPage(page, params) {
  let url = `../View/${page}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }
  window.location.href = url;
}
