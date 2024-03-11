import { z } from "zod";

// * Define a schema for the environment variables using zod.
// * zod automatically checks if env are not empty
const envSchema = z.object({
    URL: z.string().url(),
    STRING: z.string().min(1),
    // * All numbers are strings in env so following line will throw error
    // * NUMBER: z.number(),
    NUMBER: z.string().min(1),
});

// * Destructure the environment variables from process.env
const { URL, STRING, NUMBER } = process.env;

// * Parse the environment variables according to the schema
const parsedResult = envSchema.safeParse({ URL, STRING, NUMBER });

// * Log the result of the parsing
console.log(parsedResult);

// * If the parsing was not successful, log the error and throw an exception
if (!parsedResult.success) {
    console.error(parsedResult.error);
    throw new Error("Environment variables do not match the schema.");
}

// * Export the parsed environment variables
export const envVariables = parsedResult.data;

// * Define a type for the environment variables using the schema
type EnvVariablesType = z.infer<typeof envSchema>;

// * Extend the ProcessEnv interface with the EnvVariablesType
declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvVariablesType {}
    }
}
