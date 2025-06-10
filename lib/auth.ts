export function startLoginWithRedirect(
  router: any,
  email: string,
  password: string,
  redirectUri: string,
  state: string,
  codeChallenge: string
): void {
  if (!email || !password) {
    throw new Error('Missing email or password');
  }

  const params = new URLSearchParams({
    email,
    password,
    redirect_uri: redirectUri,
    state,
    code_challenge: codeChallenge,
  });

  router.push(`/scope?${params.toString()}`);
}
