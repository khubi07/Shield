from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.database import Base

class Asset(Base):

    __tablename__ = "assets"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    filename = Column(String)

    owner_name = Column(String)

    sport_type = Column(String)

    asset_type = Column(String)

    watermark_text = Column(String)

    protected_path = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )