export default function HttpError() {
  const codeParam = new URLSearchParams(document.location.search).get('code')

  const code = codeParam ? codeParam : ''

  const errorMessage =
    code +
    ' ' +
    (code === '400'
      ? 'Bad Request'
      : code === '401'
      ? 'Unauthorized'
      : code === '403'
      ? 'Forbidden'
      : code === '404'
      ? 'Not Found'
      : 'Unknown')

  return (
    <main>
      <h2>Something went wrong!</h2>
      <small>Have a coffee and try again...</small>
      <p style={{ paddingTop: '0.5em', fontSize: '3em' }}>{`${errorMessage}`}</p>
    </main>
  )
}
