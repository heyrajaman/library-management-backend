import bcrypt from "bcrypt";

async function hashPassword() {
    const hash = await bcrypt.hash("Sakshi@1234", 10);
    console.log(hash);
}

hashPassword();