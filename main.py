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
from app.database.models import SuspiciousPost
from app.services.watermark import embed_watermark
from fastapi import Form
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Digital Asset Protection API"
)

# Expose uploaded media publicly
app.mount(

    "/app/uploads",

    StaticFiles(directory="app/uploads"),

    name="uploads"
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

# ---------------------------------
# seed api
# ---------------------------------
@app.get("/seed-posts")
def seed_posts():

    db = SessionLocal()

    # Fake monitored social media posts
    posts = [

        SuspiciousPost(

            source="Fan Page 1",

            image_path="app/uploads/modified.jpg",

            authorized=False
        ),

        SuspiciousPost(

            source="Official Partner",

            image_path="app/uploads/org.png",

            authorized=True
        )
    ]

    # Store monitored posts
    db.add_all(posts)

    db.commit()

    db.close()

    return {
        "message":"Posts seeded"
    }

# ---------------------------------
# upload suspicious post
# ---------------------------------
@app.post("/upload-suspicious-post")
async def upload_suspicious_post(

    file: UploadFile = File(...),

    source: str = Form(...),

    authorized: str = Form(...)
):
    # Convert frontend string into Python boolean
    authorized = authorized.lower() == "true" # type: ignore

    db = SessionLocal()

    # Store uploaded filename
    filename = file.filename or "post.jpg"

    # Create suspicious upload path
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

    # Create suspicious DB record
    post = SuspiciousPost(

        source=source,

        image_path=path,

        authorized=authorized
    )

    # Store suspicious post
    db.add(post)

    db.commit()

    db.refresh(post)

    db.close()

    return {

        "message":"Suspicious post uploaded",

        "source": source
    }

# ---------------------------------
# upload suspicious post
# ---------------------------------

@app.get("/")
def root():
    return {
        "status": "API Running 🚀"
    }