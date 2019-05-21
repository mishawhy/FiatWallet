/* ============
 * State of the connect module
 * ============
 *
 * The initial state of the connect module.
 */

export default {
  address: null,
  passport: null,
  network: null,
  isActive: null,
  isClient: null,
  isIssuer: null,
  isOwner: null,
  isProvider: null,
  sign: sessionStorage.getItem('sign'),
  status: null,
  balance: null,
  loading: null
}
