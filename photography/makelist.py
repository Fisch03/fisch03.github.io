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
    for date in os.listdir(os.path.join(basepath, year)):

        datef = datetime.strptime(date, "%Y-%m-%d")
        if datef.month not in batches:
            batches[datef.strftime("%B %Y")] = []

        for file in os.scandir(os.path.join(basepath, year, date)):
            if file.is_file():
                os.remove(file.path)
            
        for img in os.listdir(os.path.join(basepath, year, date, 'export')):
            

            ext = img.rsplit('.', 1)[1]
            img = img.rsplit('.', 1)[0]

            imgpath = os.path.join(basepath, year, date, 'export', img+'.'+ext)
            imgpath_full = os.path.join(basepath, year, date, 'export', img+'_full'+'.'+ext)


            if '_full' in img:
                continue
            
            batches[datef.strftime("%B %Y")].append(imgpath)
            testimg = Image.open(imgpath)
            if(testimg.width < 750) or (testimg.height < 750):
                continue
            testimg.close()

            os.rename(imgpath, imgpath_full)

            img = Image.open(imgpath_full)
            img.thumbnail((512, 512), Image.LANCZOS)
            img.save(imgpath, "JPEG")
            img.close()

            

    for month in batches:
        listing.append(makeBatch(month, batches[month]))

with open(os.path.join(basepath, 'list.json'), 'w') as f:
    json.dump(listing, f)