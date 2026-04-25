from app.services.fingerprint import combined_similarity


MATCH_THRESHOLD = 70
REVIEW_THRESHOLD = 50


def check_originality(img1,img2):

    result = combined_similarity(img1,img2)

    score = result["combined"]

    if score >= MATCH_THRESHOLD:
        status = "Likely Match"

    elif score >= REVIEW_THRESHOLD:
        status = "Needs Review"

    else:
        status = "No Match"

    return {
        **result,
        "status":status
    }



if __name__=="__main__":

    result = check_originality(
        "app/uploads/org.jpg",
        "app/uploads/modified.jpg"
    )

    print(result)