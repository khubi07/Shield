from app.database.database import SessionLocal
from app.database.models import Asset, SuspiciousPost
from app.services.alerts import trigger_alert


def run_monitoring_scan():

    # Open database session
    db = SessionLocal()

    # Fetch protected assets
    assets = db.query(Asset).all()

    # Fetch suspicious monitored posts
    posts = db.query(
        SuspiciousPost
    ).all()
    alerts = []

    # Compare suspicious posts
    # against protected assets
    for asset in assets:

        for post in posts:

            result = trigger_alert(

                asset.protected_path,

                post.image_path,

                post.source,

                post.authorized # type: ignore
            )

            alerts.append(result)
    # Close database connection
    db.close()
    return alerts



if __name__=="__main__":

    results = run_monitoring_scan()

    for r in results:
        print(r)