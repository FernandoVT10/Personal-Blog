import { Router } from "express";

import jwtAuthentication from "../../utils/jwtAuthentication";
import { uploadImage } from "../../utils/imageUpload";

const router = Router();

const uploadMiddleware = [
    jwtAuthentication,
    uploadImage("image", "/articles/content/")
];

router.post("/uploadImage/", ...uploadMiddleware, (req, res) => {        
    const image = req.file;

    if(image) {
        res.json({
            data: {
                imageName: image.filename
            }
        });
    } else {
        res.json({
            errors: [
                {
                    status: 200,
                    message: "An error ocurred while trying to upload the image."
                }
            ]
        });
    }
});

export default router;