### Overview

Generic CRUD for FastAPI backend plus Web app based on Shadcn components and ts-rest contracts.
API contracts are generated automatically with the help of openapi-zod-client.
One mono repo setup.

### Setup

To set up the demo, it'll need installing Docker, `pnpm` and `poetry` globally.
E.g. in the case of macOS, `pnpm` and `poetry` can be installled via Homebrew:

```bash
brew install pnpm
brew install poetry
```

### Running

In order to run it,do the following:

```bash
cd backend
./setup.sh
cd ..
pnpm dev
```

Running app should be available at http://localhost:5173/

Check out a recorded demo [`demo2.mp4`](https://github.com/user-attachments/assets/f12eb662-bc55-4a3f-be84-2917365465a0).
