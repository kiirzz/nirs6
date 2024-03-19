import numpy as np
import json
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from starlette.websockets import WebSocketDisconnect

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def websocket_endpoint(websocket: WebSocket): 
    await websocket.accept()
    try:
        while True:
            data_str = await websocket.receive_text()
            data = json.loads(data_str)
            print(f"Received data from frontend: {data}")
    except WebSocketDisconnect as e:
        print(f"WebSocket disconnected with reason: {e}")

@app.websocket("/ws")
async def websocket_handler(websocket: WebSocket):
    await websocket_endpoint(websocket)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
