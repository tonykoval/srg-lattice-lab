# Sources and editorial scope

Prepared 15 October 2026. This is an educational companion, not a paper, proof certificate, or an independent publication of new results.

## Dilan Djematene

- [Zenodo record 23305123, v1.0](https://zenodo.org/records/23305123), DOI 10.5281/zenodo.23305123, published 11 October 2026. The live Zenodo API metadata was retrieved on 15 October 2026 and matched the locally archived v1.0 source.
- [Source repository at v1.0](https://github.com/amazing-source/strongly-regular-graphs-research/tree/v1.0). Local archived export: commit `51ebed5c2bcf627415c7c5af958fc7ad7d89149f`.
- `papers/s5_2adic/s5_2adic.tex`: Theorem 1, mod-4 corollary, projection formula, pg(14,14,4) example, Table 1. The website reimplements these arithmetic statements independently.
- `papers/conway99_order3/preuve_c3.tex`: invariant/Eisenstein blocks, determinant comparison, free and fixed-triangle cases.
- The order-2 and 243-vertex construction summaries follow the archived manuscripts and the project comparison described below. The order-7 paper and 7-rank bounds are part of the collection but are not developed interactively here.

The deposit is marked “awaiting independent review.” Its description says programs, certificates and Lean formalisations not included are available from the author on request. This website does not claim to have checked those absent artifacts. The deposited work is credited to Djematene and acknowledges AI assistance. The record’s CC BY 4.0 license does not cover its third-party Brouwer table copies; this site does not bundle those copies or reproduce paper text wholesale.

## Anton Kovaľ / orbit-gen

- [BMV lattice method, version 1.1](https://zenodo.org/records/23281359), DOI 10.5281/zenodo.23281359. Local manuscript: `docs/paper/milgram_obstruction.tex`.
- Relevant parts: representations and vertex lattices; dual-vector identity; maximal even overlattices; finite quadratic modules; Milgram’s formula; the full theorem and parity corollary; the 70-pair Table 1.
- Historical foundations are Bannai–Munemasa–Venkov and Nebe–Venkov, with standard even-lattice and discriminant-form theory as cited in the paper. This guide does not attribute those foundational results to either current project.

The centred relation L ≅ √e Λθ# assumes G = eEθ. Noncentred representations need the additional all-ones component. The project’s full theorem includes anisotropy, a distinguished class, exponent constraints and per-class integrality/parity conditions beyond the displayed phase check.

## Project comparison and verification status

Source notes inspected in the parent orbit-gen checkout:

- `docs/external_djematene_2026_10_14.md`: 35-versus-70 table comparison, relation by scaling and duality, construction checks, limits of the order-2 audit.
- `docs/audit_conway99_djematene_order3_fable_2026_10_14.md`: independent project re-derivation of the order-3 proof, exact controls on actual graphs. “Project audit” on the site means this internal audit, not journal peer review or a replayed Lean certificate.
- `CHANGELOG.md`: project context and the verified 243-vertex graph data.

These internal reports are not bundled or linked as if publicly available. The display of audit status reports what those records say; producing this website did not rerun the large research computations. The 2-adic calculator is tested on every listed pair, complements, and known-graph controls. No external manuscript scripts were run.

The 35 Djematene pairs are contained in the project’s 70 published pairs. All 35 additional pairs have even restricted eigenvalue gap. This is a statement about these two snapshots, not a general proof that one theorem implies the other. The project comparison credits Djematene’s prime-to-gap refinement with additional hand proofs beyond the project’s simpler parity corollary.

## Visual and computational conventions

- The hero diagram is conceptual. Actual graph experiments use Petersen and 3×3 rook adjacency matrices generated in `math.js`.
- Gram heatmaps show dependent generators; the determinant of this singular matrix is not the lattice determinant.
- The A₂ lattice is a two-dimensional teaching example with Gram matrix [[2,-1],[-1,2]]. The dual overlay has index 3.
- Quadratic forms use q(x) = x² modulo 2ℤ, so the Gauss sum uses exp(πiq(x)), not exp(2πiq(x)). Cyclic examples are well-defined forms; no inference of a full lattice or graph construction is made from phase compatibility alone.
- The arithmetic input limit is v ≤ 10,000 to keep every integer calculation within JavaScript’s exact integer range. This is not a full SRG feasibility checker and does not implement the full finite-module enumeration.
- Symmetry exclusion is distinct from graph nonexistence. In particular the site does not claim to settle Conway-99 existence or independently certify the complete asymmetry claim.
