# Publishing workflow

This directory is the static-site Git repository for `https://www.stina.tech`.
Its remote is `https://github.com/stina-sh/hotel-demo.git`; GitHub Pages
publishes the `main` branch after a push. The working copy on this VM is
`/home/user/elchark-hotel/docs`.

## Direct changes to the published site

From this directory:

```sh
git status
git pull --ff-only origin main
# Edit and review the required files in docs/.
git add <changed-files>
git diff --cached --check
git diff --cached --stat
git commit -m "Describe the change"
git push origin main
```

Wait for GitHub Pages to update, then check the live URL. Keep generated ZIPs,
previews, and the page that links them in the same commit so downloads and
displayed content stay in sync.

## Hotel source changes

The hotel source project is `/home/user/elchark-hotel`, and its root index
source is `project-index.html`. Edit the source, run `npm run build:pages`
from the project root, review the resulting `docs/` changes, then commit and
push from this Git directory as above. A clone containing only this `docs`
repository does not contain the hotel source; use a source checkout before
running the build.

## Nested projects and the Samiha handoff

The projects under `docs/nephew/` and `docs/samihax/` are separate copies.
Updating an older top-level route does not update its nested counterpart.
For a Samiha release, compare the final local site with both
`docs/samiha3/` and `docs/samihax/samiha3/`, update both if both URLs are to
remain current, and verify that their `samiga.zip` files match. The current
local source is `/home/user/3d-workspace/projects/new-model/viewer/samiha/`.
The two public routes are `https://www.stina.tech/samiha3/` and
`https://www.stina.tech/samihax/samiha3/`.

## Authentication

Pushing requires a fine-grained GitHub personal access token authorized for
`stina-sh/hotel-demo` with repository **Contents: Read and write**. At the
interactive Git prompt, enter the GitHub username and use the token as the
password. Do not put a token in a URL, tracked file, shell command, commit,
or workflow document. No credential helper is configured for this repository.
