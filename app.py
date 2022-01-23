from fastapi import Depends, FastAPI, HTTPException
import fastapi

from optipyzer.routers import species, optimize
from optipyzer.const import VERSION

app = FastAPI()
app.include_router(species.router)
app.include_router(optimize.router)

@app.get("/")
async def root():
    return {
        'message': "Optipyzer codon optimization server. For more details see https://github.com/nleroy917/optipyzer",
        'url': 'https://github.com/nleroy917/optipyzer',
        'version': VERSION,
        'fastapi_version': fastapi.__version__
    }