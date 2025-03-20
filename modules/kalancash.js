const Key = require("../models/Key");

module.exports = async (client, key, amountSent) => {
    const keyData = await Key.findOne({ key });

    if (!keyData) {
        console.log("❌ Key bulunamadı!");
        return process.exit(1);
    }

    keyData.amount -= amountSent;

    if (keyData.amount <= 0) {
        keyData.used = true;
        await keyData.save();
        console.log("✅ Key kullanıldı, işlem tamamlandı.");
        require("./finish")(client, key);
    } else {
        await keyData.save();
        console.log(`✅ Kalan bakiye: ${keyData.amount}`);
        require("./join")(client, key);
    }
}; 
