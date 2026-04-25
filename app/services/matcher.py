from app.services.fingerprint import combined_similarity
from app.services.watermark import extract_watermark

MATCH_THRESHOLD = 70
REVIEW_THRESHOLD = 50


def check_originality(img1,img2):

    # First check watermark
    try:
        wm = extract_watermark(img2)

        if wm=="SHIELD":
            return {
                "status":"Watermark Verified",
                "ownership":"Confirmed",
                "combined":100
            }

    except:
        pass


    # fallback fingerprint check
    result = combined_similarity(
        img1,
        img2
    )

    score = result["combined"]


    if score >=75:
        status="Likely Match"

    elif score >=55:
        status="Needs Review"

    else:
        status="No Match"


    return {
       **result,
       "status":status
    }


if __name__=="__main__":

    result = check_originality(
        "app/uploads/org.png",
        "app/uploads/watermarked.png"
    )

    print(result)