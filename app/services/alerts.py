from app.services.matcher import check_originality
from app.services.forgery import detect_forgery


def trigger_alert(
    original_img,
    suspect_img,
    source_name,
    authorized=False
):

    result = check_originality(
        original_img,
        suspect_img
    )

    # Analyze image manipulation
    forgery_result = detect_forgery(
        suspect_img
    )

    status = result["status"]

    
    # alert rules

    # Authorized usage bypass
    if authorized:

        return {
            "alert":False,
            "message":"Authorized usage",
            "detection":result
        }
    # High-risk manipulated media
    if forgery_result[
        "forgery_detected"
    ]:

        return {

            "alert": True,

            "severity": "HIGH",

            "reason": "Potential forged or manipulated media detected",

            "source": source_name,

            "detection": result,

            "forgery": forgery_result
        }


    # strongest evidence case
    
    if status=="Watermark Verified":
        return {
        "alert":True,
        "severity":"HIGH",
        "reason":"Protected watermarked asset detected",
        "source":source_name,
        "detection":result
        }
    
    if status == "Likely Match" and not authorized:

        severity = "HIGH"

        return {
            "alert":True,
            "severity":severity,
            "reason":"Unauthorized usage detected",
            "source":source_name,
            "detection":result
        }


    elif status=="Needs Review":

        return {
            "alert":True,
            "severity":"MEDIUM",
            "reason":"Potential misuse requires review",
            "source":source_name,
            "detection":result
        }
    
    

    return {
        "alert":False,
        "message":"No alert triggered",
        "detection":result
    }
    
    


if __name__=="__main__":

    alert = trigger_alert(
        "app/uploads/org.jpg",
        "app/uploads/modified.jpg",
        source_name="Fan Sports Page",
        authorized=False
    )

    print(alert)