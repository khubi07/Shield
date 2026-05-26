from PIL import Image
from PIL import ImageChops
from PIL import ImageEnhance

import os


def detect_forgery(image_path):

    # Temporary compressed image
    temp_path = "temp_ela.jpg"

    # Open original image
    original = Image.open(
        image_path
    ).convert("RGB")

    # Save compressed copy
    original.save(
        temp_path,
        "JPEG",
        quality=90
    )

    # Reload compressed image
    compressed = Image.open(
        temp_path
    )

    # Compute pixel differences
    ela_image = ImageChops.difference(
        original,
        compressed
    )

    # Increase visibility
    enhancer = ImageEnhance.Brightness(
        ela_image
    )

    ela_image = enhancer.enhance(15)

    # Calculate rough forgery score
    extrema = ela_image.getextrema()

    max_diff = max(
        channel[1] # type: ignore
        for channel in extrema
    )

    # Cleanup temp file
    os.remove(temp_path)

    # Simple threshold scoring
    if max_diff > 80:

        return {

            "forgery_detected": True,

            "forgery_score": max_diff,

            "status": "Potential Manipulation"
        }

    return {

        "forgery_detected": False,

        "forgery_score": max_diff,

        "status": "Authentic"
    }