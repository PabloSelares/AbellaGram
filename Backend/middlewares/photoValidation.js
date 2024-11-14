const { body } = require("express-validator");

const photoInsertValidation = () => {
    return [
        body("title")
            .not().equals("undefined").withMessage("O título é obrigatório.")
            .isString().withMessage("O título deve ser uma string.")
            .isLength({ min: 3 }).withMessage("O título precisa ter no mínimo 3 caracteres."),
        body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("É necessário enviar uma imagem.");
            }
            return true;
        }),
    ];
};

const photoUpadateValidation=()=>{
    return [
        body("title").optional().isString().withMessage("O titulo é Obrigatorio!")
        .isLength({ min: 3 }).withMessage("O título precisa ter no mínimo 3 caracteres."),
    ]
}
const commentValidation = () =>{
    return [
        body( "Comment").isString().withMessage(" o comentário é obrigatorio")
    ]
}

module.exports = {
    photoInsertValidation,
    photoUpadateValidation,
    commentValidation,
};
