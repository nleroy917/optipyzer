import fastapi
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from optipyzer.routers import species, optimize
from optipyzer.const import VERSION

app = FastAPI()
app.include_router(species.router)
app.include_router(optimize.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "Optipyzer codon optimization server. For more details see https://github.com/nleroy917/optipyzer",
        "url": "https://github.com/nleroy917/optipyzer",
        "version": VERSION,
        "fastapi_version": fastapi.__version__,
    }
