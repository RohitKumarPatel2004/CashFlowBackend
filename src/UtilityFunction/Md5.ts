import * as crypto from "crypto";
export const md5 = (contents: any) => crypto.createHash('md5').update(contents).digest("hex");