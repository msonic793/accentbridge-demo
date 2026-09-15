# AccentBridge — audio samples

A static page: no build step, no dependencies, no network calls. Everything it needs is in this
folder.

## View locally

    python3 -m http.server 8000

then open <http://localhost:8000>. Opening `index.html` straight from disk works too.

## Publish anonymously on GitHub Pages

Create a repository under an account whose name does not identify you, then, from this folder:

    git init -b main
    git config user.name "Anonymous"
    git config user.email "anonymous@example.com"
    git add -A && git commit -m "Audio samples"
    git remote add origin https://github.com/<account>/<repo>.git
    git push -u origin main

Then Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`. The page
is live at `https://<account>.github.io/<repo>/` within a minute or two. `.nojekyll` is included so
GitHub serves every file as-is.

The two `git config` lines are the important part: they are repository-local, so they override your
global name and email for this repository only. Set them *before* the first commit — a commit
already made under your real identity keeps it, and rewriting history to remove it is easy to get
wrong. Check with:

    git log --format='%an <%ae>'

The remaining identifying surfaces are the account and repository names, and the page itself, which
carries no author, affiliation or funding note.

## Contents

    index.html    the whole page: markup, styling and rendering, one file
    samples.js    sample metadata, read by index.html
    samples.json  the same metadata, for reference
    audio/        WAV files, 24 kHz mono
    .nojekyll     tells GitHub Pages to serve files unprocessed
