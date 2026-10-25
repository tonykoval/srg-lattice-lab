# Sources and editorial scope

Prepared 15 October 2026; editorial snapshot 25 October 2026. This is an educational companion, not a paper, proof certificate, or an independent publication of new results.

## Daijiro Obata (added 25 October 2026)

- [Zenodo record 22682072](https://doi.org/10.5281/zenodo.22682072), *srg-eigenlattice-obstruction* v0.1.1, published 9 September 2026; source at [GitHub daijiro-obata/srg-eigenlattice-obstruction](https://github.com/daijiro-obata/srg-eigenlattice-obstruction).
- A Lean 4 / Mathlib formalisation of the odd-determinant obstruction: the even eigenlattice Z^v ∩ ker(A − θI) with c_θ = (θ − k)(θ − θ′) odd has odd determinant, det Λ_r · det Λ_s · v is a square, and det ≡ (−1)^(n/2) (mod 4). It settles 35 open parameter sets, identical to Djematene’s 35 and to the odd-gap half of Kovaľ’s 70, plus (154,51,8,21) and (289,54,1,12).
- Priority: this is the earliest of the three deposits (9 September; Kovaľ 10 October; Djematene 11 October). Neither later deposit cited it; the project comparison of 21 October 2026 verified that the 12 rows Kovaľ had settled only by computation follow from Obata’s short argument.
- Joint paper: on 21 October 2026 A. E. Brouwer proposed that Obata, Kovaľ and Djematene write one paper; all three agreed (classical prose, computations only in an appendix). The site reports this as planned work, not a publication.

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
- `docs/obata_comparison_2026_10_21.md`: three-way comparison (Obata, Djematene, Kovaľ), priority dates, the four ingredients, the 12 C2 rows, whole-table sweep, lattice controls on real graphs.
- `docs/joint_paper_roadmap_2026_10_21.md`: shared lemmas, Theorem A and the (630, 68, 1, 8) example, Theorem B / Corollary B (work in progress), agreed format of the joint paper.
- `docs/bpr76_comparison_2026_10_21.md` and `docs/audit_corollaryB_fable_2026_10_21.md`: the 76-point two-graph remark and the internal blind audit of Corollary B.
- `out/external_untrusted/obata_eigenlattice/`: Obata’s README and Zenodo metadata as downloaded 21 October 2026 (read as data; nothing executed).

These internal reports are not bundled or linked as if publicly available. The display of audit status reports what those records say; producing this website did not rerun the large research computations. The 2-adic calculator is tested on every listed pair, complements, and known-graph controls. No external manuscript scripts were run.

The 35 Djematene pairs are contained in the project’s 70 published pairs. All 35 additional pairs have even restricted eigenvalue gap. This is a statement about these two snapshots, not a general proof that one theorem implies the other. The project comparison credits Djematene’s prime-to-gap refinement with additional hand proofs beyond the project’s simpler parity corollary.

## Chapter 03 expansion (25 October 2026)

Chapter 03 now treats the two independent discoveries of the odd-determinant obstruction and their relation. Every statement is taken from the sources below or marked on the page as our reimplementation.

- **Obata’s four ingredients (lesson 03·1).** Ingredients 1–3 and the statement of Theorem A follow Obata’s README (“Method”, the note “On the oddness of θ”, “Scope”) and the joint-paper roadmap §2–3 (`docs/joint_paper_roadmap_2026_10_21.md` in the parent orbit-gen checkout: Lemmas 1–4, Theorem A without the hypothesis “θ odd”). The alternative description of ingredient 3 through Z^v ∩ (E_s ⊕ R1) is the roadmap’s Lemma 3. The one-line proof sketch of ingredient 4 follows Djematene’s fact (F3) in `papers/s5_2adic/s5_2adic.tex`; the congruence is classical (Conway–Sloane ch. 15, cited by both deposits). The page says that Obata’s formal `branchD_core` still assumes θ odd.
- **What the Lean deposit gives.** From Obata’s README (“Result”, “Soundness”, “Verification”, “Use of large language models”): 37 theorems stated with Mathlib’s `SimpleGraph.IsSRGWith`; the kernel-checked axiom list propext, Classical.choice, Quot.sound; no `sorry`/`native_decide`; matrix lemmas assume only SRG-like identities; the whole-table enumeration is not in the repository. This website did not rebuild the Lean project or read its source; the project comparison (`docs/obata_comparison_2026_10_21.md`) also did not read the Lean, but recomputed every row of the README table with its own exact-integer code.
- **Worked example (630, 68, 1, 8).** Roadmap §3 (“Daijiro’s core example opens the paper”) and README table row 21. Every number on the page is recomputed in `test.cjs`.
- **Theorem A checker (Experiment 02).** `SRG.theoremA` in `math.js` is our independent reimplementation, exact integer arithmetic (all values stay far below 2^53 for v ≤ 10,000). It tests both restricted eigenvalues of the graph and of its complement; it reports c_θ, the primes of c_θ with their role (fixed parity through ingredient 3, harmless ≡ 1 mod 4, blocking because shared with c_θ′, or 2), 𝒮, n_θ/2 and the mod-4 verdict, plus, for comparison only, whether Lean’s θ-odd hypothesis and Djematene’s determinant-odd hypothesis hold and his P_θ. `test.cjs` asserts: all 37 rows of Obata’s README table (θ, |c_θ|, 𝒮, n_θ/2, and the orientation he used); all 35 odd-gap rows excluded and all 35 even-gap rows outside the theorem with both c even; the worked example line by line; (209, 52, 15, 12) with θ = 8; the 12-row explainer; and that no existing graph is excluded — named graphs (Petersen, T(7), L2(5), Paley(9/25/49/81), Clebsch, Shrikhande, Schläfli, Chang, Hoffman–Singleton, Gewirtz, M22, Brouwer–Haemers, Higman–Sims, Berlekamp–van Lint–Seidel, McLaughlin) and the families T(n), L2(n), Paley(q) for square q, Latin square graphs LS_m(n) from affine planes, complete multipartite graphs, with complements. T(7), L2(5) and Paley(25) are asserted to *pass* with the hypotheses met (the comparison’s positive controls).
- **Whole-table check (not bundled).** While preparing this page, the same `theoremA` was run on the local copy of Brouwer’s table fetched 21 October 2026 by the project comparison (4,538 rows, v ≤ 1300, both orientations). It excludes exactly Obata’s 37 parameter sets and no row marked “+”, “!” or “?”. This agrees with the comparison’s own sweep and with Obata’s README claim. The table copy is not bundled.
- **Why 12 rows (lesson 03·2).** The split 20 (parity corollary) + 3 (hand, phase) + 12 (C2) and the diagnosis — the parity corollary uses only det L | ℓ^n with every prime of ℓ ≡ 1 (mod 4) and never the square relation — are from the comparison §2–4. The test asserts the checkable consequence used on the page: for each of the 12 rows, every eigenvalue on which Theorem A fires has a prime ≡ 3 (mod 4) whose parity only ingredient 3 fixes. It does not claim to characterize the 20 parity rows. The pg(14, 14, 4) side panel uses the data of Djematene’s pg(14, 14, 4) corollary (θ = −15, n = 308, P = 3).
- **Djematene’s version (lesson 03·3, Experiment 03).** Hypothesis, Theorem 1(a)/(b), Corollary 2, facts (F1)–(F3) and the scope remark on srg(99, 14, 1, 2) (d = 7) are from `papers/s5_2adic/s5_2adic.tex`. “Weaker hypothesis than c_θ odd; fires on extra eigenvalues such as (209, 52, 15, 12) with θ = 8; adds no row; same 35 open sets” is from the comparison §2 and §4; the 209 example is also row 3 of his Table 1 (θ = 8, m = 76, P = 11). The deposit does not cite Obata (comparison §1). **Not sourced:** a claim that Djematene found the condition *while working on* Conway-99. The page says only what the deposit shows: the 2-adic manuscript is part of a collection whose main subject is Conway’s 99-graph.
- **What happened next.** Dates: Obata Zenodo 9 Sept 2026; Kovaľ Zenodo v1.0 10.5281/zenodo.23275433 on 10 Oct 2026 (v1.1 23281359 on 11 Oct); Djematene 11 Oct 2026 (comparison §1). Brouwer’s suggestion and the agreed format are from the roadmap preamble (21 October 2026). The even-gap paragraph follows roadmap §4 (Theorem B, Corollary B for r − s ≡ 2 mod 4) as work in progress; “an internal project audit found no error” refers to `docs/audit_corollaryB_fable_2026_10_21.md` (blind audit, 21 October 2026), not to review by the co-authors or a referee. The 76-point two-graph sentence follows `docs/bpr76_comparison_2026_10_21.md` §§2–4: Bondarenko–Prymak–Radchenko, Linear Algebra Appl. 527 (2017) 53–72, arXiv:1410.6748; Azarija–Marc, Linear Algebra Appl. 557 (2018) 62–83, arXiv:1509.05933, who state that there is no regular two-graph on 76 vertices.
- Internal notes [3] are summarized, not linked or bundled.

## Visual and computational conventions

- The hero diagram is conceptual. Actual graph experiments use Petersen and 3×3 rook adjacency matrices generated in `math.js`.
- Gram heatmaps show dependent generators; the determinant of this singular matrix is not the lattice determinant.
- The A₂ lattice is a two-dimensional teaching example with Gram matrix [[2,-1],[-1,2]]. The dual overlay has index 3.
- Quadratic forms use q(x) = x² modulo 2ℤ, so the Gauss sum uses exp(πiq(x)), not exp(2πiq(x)). Cyclic examples are well-defined forms; no inference of a full lattice or graph construction is made from phase compatibility alone.
- The arithmetic input limit is v ≤ 10,000 to keep every integer calculation within JavaScript’s exact integer range. This is not a full SRG feasibility checker and does not implement the full finite-module enumeration.
- Symmetry exclusion is distinct from graph nonexistence. In particular the site does not claim to settle Conway-99 existence or independently certify the complete asymmetry claim.

## Beginner chapter

The rank-two teaching example starts with L = 2ℤ², Gram matrix diag(4,4), determinant 16; its dual is (½ℤ)². Adding (1,1) gives the even index-two overlattice M with Gram diag(2,2), determinant 4. Its discriminant form has values 0, ½, ½, 1 and is anisotropic. The worked (169,42,5,12) obstruction uses the project paper’s centred dual-vector identity and parity corollary: G = −13(A−3I)+3J, rank 42, G² = 169G, and 169L# ⊆ L. This is an explanation of the existing result, not a new exclusion.

## Lattice theory companion page

- The new standalone page follows the local SRG Notebook Part V learning sequence: lattice primer, worked 3×3 rook-graph example, then interactive proof. The notebook HTML build is in the parent project’s `out/notebook_build/part5_lattices/`; its content is summarized in original wording, not copied.
- The rook graph has parameters (9,4,1,2), adjacency spectrum 4, 1⁴, (−2)⁴. For G=A+sI, s=2 is the least integer making G positive semidefinite and gives rank 5. Its vertex lattice is isometric to A₅, with determinant 6 and cyclic discriminant form generated by q=5/6. The six-term normalized Gauss sum has phase 5/8, matching rank 5 modulo 8.
- The live arithmetic on the page is an educational rendering; it is not a full finite-module admissibility check or a new graph result.

## Automorphisms and lattice actions

- The companion page states the standard induced-action argument: graph automorphisms preserve adjacency and any Gram matrix built equivariantly from A, I, J; they therefore act orthogonally on the span of the Gram vectors and preserve the generated vertex lattice. If the vectors do not span, the action on the ambient orthogonal complement is not determined by this construction.
- It distinguishes the graph automorphism group, the induced lattice isometry group, and the discriminant-form automorphism group; preservation/lifting between these groups is not automatic. Rational eigenspace splittings need not split the integral lattice; finite-index gluing must be tracked in determinant comparisons.
- The Conway-99 discussion follows the deposited order-3 manuscript’s free 33-triple and fixed-triangle (32 triples plus three fixed vertices) cases. Excluding a symmetry is not a graph nonexistence proof.
