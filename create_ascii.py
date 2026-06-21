from PIL import Image

image_path = 'public/profile.webp'
try:
    img = Image.open(image_path)
except Exception as e:
    print(f"Error opening image: {e}")
    exit(1)

# Resize image
width, height = img.size
new_width = 45
aspect_ratio = height / width
# Multiply by 0.5 because terminal characters are usually twice as tall as they are wide
new_height = int(aspect_ratio * new_width * 0.5)
img = img.resize((new_width, new_height))

# Convert to grayscale
img = img.convert('L')

# ASCII characters from darkest to lightest
chars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "]

pixels = img.getdata()
ascii_str = ''
for pixel in pixels:
    ascii_str += chars[pixel // 26]

# Split string into lines
ascii_img = ""
for i in range(0, len(ascii_str), new_width):
    ascii_img += ascii_str[i:i+new_width] + "\n"

with open("ascii_face.txt", "w") as f:
    f.write(ascii_img)

print("ASCII art generated successfully.")
