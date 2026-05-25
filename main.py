from fastapi import FastAPI, UploadFile, File
import shutil
import os
import uuid
from app.services.matcher import check_originality
from app.services.scanner import run_monitoring_scan
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine
from app.database.models import Base
from app.database.database import SessionLocal
from app.database.models import Asset
from app.services.watermark import embed_watermark
from fastapi import Form

app = FastAPI(
    title="Digital Asset Protection API"
)

# Create DB tables
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "app/uploads"
LAST_UPLOADED_ASSET = None

os.makedirs(UPLOAD_DIR, exist_ok=True)

# ---------------------------------
# Register Asset
# ---------------------------------
@app.post("/register-asset")
async def register_asset(

    file: UploadFile = File(...),

    owner_name: str = Form(...),

    sport_type: str = Form(...),

    asset_type: str = Form(...)
):
    
    db = SessionLocal()

    global LAST_UPLOADED_ASSET

    filename = file.filename or "asset.jpg"

    path = os.path.join(
        UPLOAD_DIR,
        filename
    )

    # Save uploaded image
    with open(path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    LAST_UPLOADED_ASSET = path
    # Create protected output path
    protected_filename = f"protected_{filename}"

    protected_path = os.path.join(
        UPLOAD_DIR,
        protected_filename
    )

    # Embed invisible watermark
    embed_watermark(
        path,
        protected_path
)
    # Create DB asset object
    # Create DB asset object
    asset = Asset(

        filename=filename,

        owner_name=owner_name,

        sport_type=sport_type,

        asset_type=asset_type,

        watermark_text="SHIELD",

        protected_path=protected_path
    )

    # Save asset in DB
    db.add(asset)

    db.commit()

    db.refresh(asset)

    db.close()

    return {

        "message": "Asset registered",

        "asset_id": asset.id,

        "asset_name": asset.filename
    }



# ---------------------------------
# Check Originality
# ---------------------------------
@app.post("/check-originality")
async def check_originality_api(file: UploadFile = File(...)):

    filename = file.filename or "suspect.jpg"
    suspect_path = os.path.join(UPLOAD_DIR, filename)

    db = SessionLocal()

    with open(suspect_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    assets = db.query(Asset).all()

    if not assets:

        db.close()

        return {
            "error": "No assets registered yet"
        }

    best_match = None

    highest_score = 0

    for asset in assets:

        result = check_originality(
            asset.protected_path,
            suspect_path
        )

        if result["combined"] > highest_score:

            highest_score = result["combined"]

            best_match = result

    db.close()

    return best_match


# ---------------------------------
# Run Monitoring Scan
# ---------------------------------
@app.get("/run-scan")
def run_scan():

    alerts = run_monitoring_scan()

    return alerts


# ---------------------------------
# get assets 
# ---------------------------------
@app.get("/assets")
def get_assets():

    db = SessionLocal()

    assets = db.query(Asset).all()

    result = []

    for asset in assets:

        result.append({

            "id": asset.id,

            "filename": asset.filename,

            "owner_name": asset.owner_name,

            "sport_type": asset.sport_type,

            "asset_type": asset.asset_type,

            "protected_path": asset.protected_path,

            "created_at": str(asset.created_at)
        })

    db.close()

    return result

@app.get("/")
def root():
    return {
        "status": "API Running 🚀"
    }