// Joi is a package for server side validation
// It checks whether the data is entered according to constraints or not


const joi = require("joi");

module.exports.listingSchema = joi.object(
{
    listing : joi.object(
        {
            title:joi.string().required(),
            description:joi.string().required(),
            location:joi.string().required(),
            country:joi.string().required(),
            price:joi.number().min(0),
            image:joi.string().allow("",null),
        }
    ).required()
});

module.exports.reviewSchema = joi.object(
    {
        review:joi.object(
            {
                ratings: joi.number().required().min(1).max(5),
                comment: joi.string().required(),
                name:joi.string()
            }
        ).required()
    }
)