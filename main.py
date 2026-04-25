from fastapi import FastAPI, UploadFile, File
import shutil
import os
import uuid
from app.services.matcher import check_originality
from app.services.scanner import run_monitoring_scan


app = FastAPI(
    title="Digital Asset Protection API"
)

UPLOAD_DIR = "app/uploads"
LAST_UPLOADED_ASSET = None

os.makedirs(UPLOAD_DIR, exist_ok=True)

# ---------------------------------
# Register Asset
# ---------------------------------
@app.post("/register-asset")
async def register_asset(file: UploadFile = File(...)):

    global LAST_UPLOADED_ASSET

    filename = file.filename or "asset.jpg"
    path = os.path.join(UPLOAD_DIR, filename)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    LAST_UPLOADED_ASSET = path   # ✅ store it

    return {
        "message": "Asset registered",
        "asset_name": filename
    }



# ---------------------------------
# Check Originality
# ---------------------------------
@app.post("/check-originality")
async def check_originality_api(file: UploadFile = File(...)):

    filename = file.filename or "suspect.jpg"
    suspect_path = os.path.join(UPLOAD_DIR, filename)

    with open(suspect_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if not LAST_UPLOADED_ASSET:
        return {"error": "No asset registered yet"}

    result = check_originality(
        LAST_UPLOADED_ASSET,
        suspect_path
    )

    return result


# ---------------------------------
# Run Monitoring Scan
# ---------------------------------
@app.get("/run-scan")
def run_scan():

    alerts = run_monitoring_scan()

    return alerts


@app.get("/")
def root():
    return {
        "status": "API Running 🚀"
    }