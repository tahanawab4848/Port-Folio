from PIL import Image, ImageEnhance, ImageOps

image_path = 'public/profile.webp'
try:
    img = Image.open(image_path)
except Exception as e:
    print(f"Error opening image: {e}")
    exit(1)

# Convert to grayscale
img = img.convert('L')

# Crop to center square if it's not a face crop
width, height = img.size
min_dim = min(width, height)
left = (width - min_dim)/2
top = (height - min_dim)/2
right = (width + min_dim)/2
bottom = (height + min_dim)/2
img = img.crop((left, top, right, bottom))

# Increase contrast significantly
enhancer = ImageEnhance.Contrast(img)
img = enhancer.enhance(1.8)

# Resize image
new_width = 80
aspect_ratio = 1.0
# Multiply by 0.55 because terminal characters are usually twice as tall as they are wide
new_height = int(aspect_ratio * new_width * 0.55)
img = img.resize((new_width, new_height))

# More detailed ASCII characters from darkest to lightest
chars = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", ".", " "]

pixels = img.getdata()
ascii_str = ''

# Normalize pixel values
min_p = min(pixels)
max_p = max(pixels)
range_p = max_p - min_p if max_p != min_p else 1

for pixel in pixels:
    # Map pixel to 0-11
    val = int(((pixel - min_p) / range_p) * 11)
    if val > 11: val = 11
    if val < 0: val = 0
    ascii_str += chars[val]

# Split string into lines
ascii_img = ""
for i in range(0, len(ascii_str), new_width):
    ascii_img += ascii_str[i:i+new_width] + "\n"

with open("ascii_face.txt", "w") as f:
    f.write(ascii_img)

print("ASCII art generated successfully.")
