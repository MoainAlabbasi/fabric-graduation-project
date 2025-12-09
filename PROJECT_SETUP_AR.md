# مشروع التخرج - Hyperledger Fabric

## نظرة عامة
هذا المستودع يحتوي على **Hyperledger Fabric v2.5.9** مع جميع الأمثلة والأدوات اللازمة لتشغيل شبكة Blockchain.

## المحتويات
- ✅ **Fabric Binaries v2.5.9**: جميع الأدوات الثنائية المطلوبة
- ✅ **Fabric CA v1.5.7**: أدوات إدارة الشهادات
- ✅ **Test Network**: شبكة اختبار جاهزة للتشغيل
- ✅ **Go Chaincode**: كود العقود الذكية بلغة Go في `asset-transfer-basic/chaincode-go`

## خطوات التشغيل على جهازك المحلي

### المتطلبات
1. **Docker** و **Docker Compose**
2. **Go** (لتشغيل chaincode)
3. **Git**

### التثبيت والتشغيل

#### 1. استنساخ المستودع
```bash
git clone https://github.com/MoainAlabbasi/fabric-graduation-project.git
cd fabric-graduation-project
```

#### 2. تشغيل شبكة الاختبار
```bash
cd test-network

# تنظيف أي إعداد سابق
./network.sh down

# بدء الشبكة وإنشاء قناة
./network.sh up createChannel
```

#### 3. نشر العقد الذكي (Chaincode) بلغة Go
```bash
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go
```

#### 4. التحقق من نجاح التشغيل
```bash
# التحقق من الحاويات
docker ps

# يجب أن ترى:
# - orderer.example.com
# - peer0.org1.example.com
# - peer0.org2.example.com
# - chaincode containers
```

## هيكل المشروع

```
fabric-graduation-project/
├── test-network/          # شبكة الاختبار الرئيسية
├── asset-transfer-basic/  # أمثلة العقود الذكية
│   ├── chaincode-go/      # ✅ العقد الذكي بلغة Go
│   ├── chaincode-java/
│   ├── chaincode-javascript/
│   └── chaincode-typescript/
├── bin/                   # الأدوات الثنائية لـ Fabric
└── config/                # ملفات الإعداد
```

## العقد الذكي (Chaincode)
العقد الذكي المستخدم في هذا المشروع هو **Asset Transfer Basic** بلغة **Go (Golang)**:
- المسار: `asset-transfer-basic/chaincode-go`
- اللغة: Go
- الوظيفة: إدارة الأصول (Assets) على Blockchain

## ملاحظات مهمة
1. تأكد من تشغيل Docker قبل بدء الشبكة
2. استخدم `./network.sh down` لإيقاف الشبكة وتنظيف البيئة
3. جميع الملفات جاهزة للاستخدام المباشر

## روابط مفيدة
- [Hyperledger Fabric Documentation](https://hyperledger-fabric.readthedocs.io/)
- [Test Network Tutorial](https://hyperledger-fabric.readthedocs.io/en/latest/test_network.html)
- [Chaincode Tutorial](https://hyperledger-fabric.readthedocs.io/en/latest/chaincode.html)

## معلومات الإصدار
- **Fabric Version**: 2.5.9
- **Fabric CA Version**: 1.5.7
- **Chaincode Language**: Go (Golang)

---
**تم الإعداد بواسطة**: Manus AI Assistant  
**التاريخ**: ديسمبر 2025
