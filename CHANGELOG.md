1.1.0 / 2019-02-16
=================
  * [New] add `BigInt64Array` and `BigUint64Array`
  * [Refactor] use an array instead of an object for storing Typed Array names
  * [meta] ignore `test.html`
  * [Tests] up to `node` `v11.10`, `v10.15`, `v8.15`, `v7.10`, `v6.16`, `v5.10`, `v4.9`
  * [Tests] remove `jscs`
  * [Tests] use `npm audit` instead of `nsp`
  * [Dev Deps] update `eslint`,` @ljharb/eslint-config`, `is-callable`, `tape`, `replace`, `semver`
  * [Dev Deps] remove unused eccheck script + dep

1.0.4 / 2016-03-19
=================
  * [Fix] `Symbol.toStringTag` is on the super-`[[Prototype]]` of Float32Array, not the `[[Prototype]]` (#3)
  * [Tests] up to `node` `v5.9`, `v4.4`
  * [Tests] use pretest/posttest for linting/security
  * [Dev Deps] update `tape`, `jscs`, `nsp`, `eslint`, `@ljharb/eslint-config`, `semver`, `is-callable`

1.0.3 / 2015-10-13
=================
  * [Deps] Add missing `foreach` dependency (#1)

1.0.2 / 2015-10-05
=================
  * [Deps] Remove unneeded "isarray" dependency
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`

1.0.1 / 2015-10-02
=================
  * Rerelease: avoid instanceof and the constructor property; work cross-realm; work with Symbol.toStringTag.

1.0.0 / 2015-05-06
=================
  * Initial release.
