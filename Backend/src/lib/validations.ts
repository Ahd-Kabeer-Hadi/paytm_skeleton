import z from "zod";

const JWT_SECRET = "my_SECREATED"

const validateSignup = z.object({
  username: z.string().email().min(5),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
});

const validateSignin =z.object({
    username: z.string().email().min(5),
    password: z.string().min(6),
  });

const validateExistingUserProfileUpdate = z.object({
  password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

export {
    validateSignup,
    validateSignin,
    validateExistingUserProfileUpdate,
    JWT_SECRET
}