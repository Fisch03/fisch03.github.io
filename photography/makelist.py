import json, os
from datetime import datetime
from PIL import Image

basepath = "photography"

listing = []

years = os.listdir("photography")

def makeBatch(name, imgs):
    return {
        "name": name,
        "images": imgs
    }

batches = {}
for year in years:
    if not os.path.isdir(os.path.join(basepath, year)):
            continue
    print(f"Processing {year}...\n------------------")

    for date in os.listdir(os.path.join(basepath, year)):
        print(f"Processing Date {date}...")

        datef = datetime.strptime(date, "%Y-%m-%d")
        if datef.strftime("%B %Y") not in batches:
            batches[datef.strftime("%B %Y")] = []

        print(f"  ↪Removing unneeded files...")
        for file in os.scandir(os.path.join(basepath, year, date)):
            if file.is_file():
                os.remove(file.path)
                print(f"    ↪Removed {file.name}...")
            
        print(f"  ↪Processing images...")
        try:
            for img in os.listdir(os.path.join(basepath, year, date, 'export')):
                ext = img.rsplit('.', 1)[1]
                img = img.rsplit('.', 1)[0]

                print(f"    ↪Processing {img}...", end=' ')

                imgpath = os.path.join(basepath, year, date, 'export', img+'.'+ext)
                imgpath_full = os.path.join(basepath, year, date, 'export', img+'_full'+'.'+ext)

                compimg = Image.open(imgpath)
                if(compimg.width > 4096) or (compimg.height > 4096):
                    compimg.thumbnail((4096, 4096), Image.LANCZOS)
                    compimg.save(imgpath, "JPEG")
                    compimg.close()

                if '_full' in img:
                    print("already processed.")
                    continue
                
                batches[datef.strftime("%B %Y")].append(imgpath)
                testimg = Image.open(imgpath)
                if(testimg.width < 750) or (testimg.height < 750):
                    print("dimensions already small enough.")
                    continue
                testimg.close()

                os.rename(imgpath, imgpath_full)

                img = Image.open(imgpath_full)
                img.thumbnail((512, 512), Image.LANCZOS)
                img.save(imgpath, "JPEG")
                img.close()

                print("done.")
        except FileNotFoundError:
            print("No exported images found. Skipping...")

            

    for month in batches:
        listing.append(makeBatch(month, batches[month]))

print("Writing index file...")
with open(os.path.join(basepath, 'list.json'), 'w') as f:
    json.dump(listing, f)
print("Done.")