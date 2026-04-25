from PIL import Image


def embed_watermark(
    input_image,
    output_image,
    watermark_text="SHIELD"
):

    img = Image.open(input_image).convert("RGB")

    width,height = img.size

    # safer pixel access
    pixels = img.copy()

    binary=''.join(
        format(ord(c),'08b')
        for c in watermark_text
    )

    data_index=0

    for y in range(height):
        for x in range(width):

            if data_index >= len(binary):
                pixels.save(
                    output_image,
                    format="PNG"
                )
                return

            r,g,b = pixels.getpixel((x,y))

            r = (r & ~1) | int(binary[data_index])

            pixels.putpixel(
                (x,y),
                (r,g,b)
            )

            data_index+=1

    pixels.save(
    output_image,
    format="PNG"
    )

def extract_watermark(
    image_path,
    watermark_length=6   # SHIELD
):

    img = Image.open(image_path).convert("RGB")

    width,height = img.size

    bits=[]

    needed_bits = watermark_length * 8

    count=0

    for y in range(height):
        for x in range(width):

            if count >= needed_bits:
                break

            r,g,b = img.getpixel((x,y))

            bits.append(str(r & 1))

            count +=1


    chars=[]

    for i in range(0,len(bits),8):

        byte=''.join(bits[i:i+8])

        chars.append(
            chr(int(byte,2))
        )

    extracted=''.join(chars)

    return extracted

def test_watermark():

    embed_watermark(
      "app/uploads/org.png",
      "app/uploads/watermarked.png"
    )

    print(
      extract_watermark(
         "app/uploads/watermarked.png"
      )
    )


if __name__=="__main__":
    test_watermark()