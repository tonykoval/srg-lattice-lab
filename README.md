# Graph → Lattice

A self-contained interactive field guide to Dilan Djematene’s eigenlattice methods and Anton Kovaľ’s BMV–Milgram work in orbit-gen.

Website: **https://tonykoval.github.io/srg-lattice-lab/**

Source: https://github.com/tonykoval/srg-lattice-lab

## View locally

Open `index.html` directly in a browser. No installation, network, API key, CDN, or build is needed. All mathematics runs locally. Alternatively serve this folder with `python3 -m http.server 8000` and visit `http://localhost:8000`.

## GitHub Pages hosting

1. Put the **contents of this folder** in the new repository’s root (so `index.html` is at the root).
2. Commit and push to `main`.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then **main** and **/ (root)**, and save.
4. GitHub shows the deployment URL in that Pages panel. For a normal project repository it is `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

Keep the empty `.nojekyll` file. Every local asset uses a relative URL, so project subpaths work. The page code does not hard-code a repository name. This repository uses `main` and `/ (root)` as its publishing source.

Reference: [GitHub’s publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## What is interactive

- Petersen and 3×3 rook graphs: select vertices, inspect common neighbours and centred Gram matrices for both eigenspaces.
- A₂ lattice: change integer coefficients and show the dual lattice’s extra cosets.
- Parameter calculator: Djematene’s Theorem 1 / mod-4 corollary with explicit hypotheses, prime-to-gap factor, and separate eigenspace results.
- The 70-pair project snapshot, including all 35 pairs in Djematene’s table, with filters and click-to-load examples.
- Six finite quadratic forms: normalized Gauss sums versus a user-selected rank modulo 8.
- A five-step Conway-99 order-3 proof, with a separate explanation of the fixed-triangle case.

The site distinguishes a criterion passing, failing, and being inapplicable. The phase experiment is not the complete Milgram screening algorithm. The Conway demonstration excludes symmetry, not existence.

## Files and checks

- `index.html`, `style.css`, `app.js`: presentation and interactions.
- `math.js`: pure arithmetic and graph kernels.
- `data.js`: static public table snapshot, with source URLs.
- `SOURCE_NOTES.md`: attribution, provenance, scope, audit status.
- `test.cjs`: run `node test.cjs` for mathematical regression checks.
- `build_data.py`: maintainer export from the parent orbit-gen comparison. Only needed to regenerate the already included `data.js`; it deliberately requires the original project checkout.

The public tables are historical snapshots from the cited papers, not a live claim about which graph parameters remain open. Update both content and source notes when changing that snapshot. Mathematical diagrams are original SVG drawings. No source manuscript programs are executed, and private project audit files are not bundled.
