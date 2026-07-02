from PIL import Image, ImageDraw, ImageFont, ImageOps
import os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W,H=1200,630
img=Image.new('RGB',(W,H),(24,24,27))
top=(30,30,34); bot=(20,20,23)
for y in range(H):
    t=y/H
    img.paste(Image.new('RGB',(W,1),tuple(int(top[i]+(bot[i]-top[i])*t) for i in range(3))),(0,y))
d=ImageDraw.Draw(img)
helv=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',110,index=1)
hei_m=ImageFont.truetype('/System/Library/Fonts/STHeiti Medium.ttc',44)
hei_l=ImageFont.truetype('/System/Library/Fonts/STHeiti Light.ttc',30)
X=96
cols=[(10,132,255),(191,90,242),(48,209,88),(255,159,10),(255,69,58),(172,142,255)]
for i,c in enumerate(cols):
    d.ellipse([X+i*26,116,X+16+i*26,132],fill=c)
d.text((X-6,168),'AI Paper',font=helv,fill=(245,245,247))
d.text((X,302),'AI 论文 · 双语全文阅读',font=hei_m,fill=(200,200,205))
d.text((X,372),'著名 AI 学者的代表论文，逐段中英对照，核心贡献速览。',font=hei_l,fill=(140,140,148))
pids=['hinton','lecun','ilya','feifei','demis','kaiming','tridao','jeffdean']
AV=104; y0=448; gap=16
mask=Image.new('L',(AV*4,AV*4),0); ImageDraw.Draw(mask).ellipse([0,0,AV*4,AV*4],fill=255)
mask=mask.resize((AV,AV))
for i,p in enumerate(pids):
    a=Image.open(os.path.join(ROOT,'assets','people',p+'.jpg')).convert('RGB')
    a=ImageOps.fit(a,(AV,AV))
    x=X+i*(AV+gap)
    img.paste(a,(x,y0),mask)
    d.ellipse([x,y0,x+AV,y0+AV],outline=(95,95,104),width=3)
d.text((X,584),'aipaper.jasonlin.tech',font=hei_m.font_variant(size=28),fill=(150,150,158))
img.save(os.path.join(ROOT,'assets','og.png'))
print('saved', img.size)
