import os

base = "C:\\Users\\benap\\Desktop\\img"

for filename in os.listdir(base):
	os.rename(f"{base}\\{filename}", f"{base}\\{float(filename[:-4]):.3f}.png")