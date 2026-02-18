const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: Number(process.env.MAX_AVATAR_SIZE_BYTES) || 1 * 1024 * 1024,
        files: 1,
    },
    fileFilter: (req, file, cb) => {
        const allowed = new Set([
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ]);
        if (!allowed.has(file.mimetype)) {
            return cb(new Error("Sadece resim dosyalarına izin veriliyor"), false);
        }
        cb(null, true);
    },
});

module.exports = upload;
