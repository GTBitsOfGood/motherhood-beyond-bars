import crypto from "crypto";
import { Buffer } from "buffer";

const key = crypto
  .createHash("sha256")
  .update(String(process.env.SECRET_KEY))
  .digest("base64")
  .substr(0, 32);

const encrypt = (text: string) => {
  const buf = Buffer.alloc(16);
  const iv = crypto.randomFillSync(new Uint8Array(buf.buffer));

  const cipher = crypto.createCipheriv("aes-256-ctr", key!, iv);

  const updated = cipher.update(text);
  const final = cipher.final();

  const encrypted = new Uint8Array(updated.length + final.length);
  encrypted.set(updated, 0);
  encrypted.set(final, updated.length);

  return {
    iv: Buffer.from(iv).toString("hex"),
    content: Buffer.from(encrypted).toString("hex"),
  };
};

const decrypt = (hash: { iv: string; content: string }) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    key!,
    Uint8Array.from(Buffer.from(hash.iv, "hex"))
  );

  const updated = decipher.update(
    Uint8Array.from(Buffer.from(hash.content, "hex"))
  );
  const final = decipher.final();

  const decrpyted = new Uint8Array(updated.length + final.length);
  decrpyted.set(updated, 0);
  decrpyted.set(final, updated.length);

  return new TextDecoder().decode(decrpyted);
};

export { encrypt, decrypt };
