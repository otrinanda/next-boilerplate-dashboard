// JWT disimpan di HttpOnly Cookie yang di-set BE — tidak bisa diakses JS.
// Abstraction layer ini memudahkan migrasi jika BE ternyata tidak support HttpOnly Cookie.
export const tokenService = {
  getAccessToken: (): string | null => null,
  clear: (): void => {},
}
