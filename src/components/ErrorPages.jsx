export function PageNotFound() {
  return <h1>Error</h1>;
}

export function ErrorPage(props) {
  const { error } = props;
  return <h1>{error.errorMessage}</h1>;
}
