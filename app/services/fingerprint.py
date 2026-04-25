from PIL import Image
import imagehash
import cv2


# ------------------------
# pHash similarity
# ------------------------
def phash_similarity(img1_path, img2_path):

    h1 = imagehash.phash(Image.open(img1_path))
    h2 = imagehash.phash(Image.open(img2_path))

    distance = h1 - h2
    similarity = 100 - (distance/64)*100

    return float(round(similarity,2))

# ------------------------
# Histogram similarity
# ------------------------ 
def histogram_similarity(img1_path,img2_path):

    img1 = cv2.imread(img1_path)
    img2 = cv2.imread(img2_path)

    img1 = cv2.resize(img1,(500,500))
    img2 = cv2.resize(img2,(500,500))

    hist1 = cv2.calcHist([img1],[0,1,2],None,[8,8,8],
                         [0,256,0,256,0,256])

    hist2 = cv2.calcHist([img2],[0,1,2],None,[8,8,8],
                         [0,256,0,256,0,256])

    cv2.normalize(hist1,hist1)
    cv2.normalize(hist2,hist2)

    score = cv2.compareHist(
        hist1,
        hist2,
        cv2.HISTCMP_CORREL
    )

    similarity = max(0,score)*100

    return float(round(similarity,2))
# ------------------------
# ORB feature similarity
# ------------------------
def orb_similarity(img1_path, img2_path):

    img1 = cv2.imread(img1_path, 0)
    img2 = cv2.imread(img2_path, 0)

    orb = cv2.ORB_create()

    kp1, des1 = orb.detectAndCompute(img1,None)
    kp2, des2 = orb.detectAndCompute(img2,None)

    if des1 is None or des2 is None:
        return 0

    bf = cv2.BFMatcher(cv2.NORM_HAMMING,crossCheck=True)

    matches = bf.match(des1,des2)

    if len(matches)==0:
        return 0

    good_matches = [m for m in matches if m.distance < 60]

    similarity = (len(good_matches)/max(len(kp1),len(kp2)))*100

    return float(round(similarity,2))


# ------------------------
# Combined score
# ------------------------
def combined_similarity(img1,img2):

    pscore = phash_similarity(img1,img2)
    oscore = orb_similarity(img1,img2)

    hscore = histogram_similarity(img1,img2)

    final_score = (
        pscore*0.3 +
        oscore*0.3 +
        hscore*0.4
    )

    return {
    "phash":pscore,
    "orb":oscore,
    "histogram":hscore,
    "combined":round(final_score,2)
    }


if __name__=="__main__":

    result = combined_similarity(
        "app/uploads/org.jpg",
        "app/uploads/modified.jpg"
    )

    print(result)