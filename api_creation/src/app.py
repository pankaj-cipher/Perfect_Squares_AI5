from .prediction import *
import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
# 2. Create the app object
app = FastAPI()

# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
def index():
    return {'message': 'Hello, World'}

@app.post('/caption_generator')
async def index(data: Request):
    data = await data.json()
    obj = pred()
    final_decision = obj.predict_caption(data)
    return JSONResponse(final_decision)

