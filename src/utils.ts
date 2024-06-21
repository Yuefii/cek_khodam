import { Groq } from "groq-sdk"

const api = import.meta.env.VITE_GROQ
const groq = new Groq({
    apiKey: api,
    dangerouslyAllowBrowser: true
})

export const request = async (name: string) => {
    const reply = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Saya ingin mengetahui nama khodam dari seseorang bernama ${name}. Tolong berikan jawabannya dalam bahasa Indonesia dan hanya berikan nama khodamnya dan arti khodamnya tanpa informasi lainnya. Contoh: "Nama khodam dari ${name} adalah ... dan arti dari khodam tersebut adalah ...".`
            },
        ],
        model: "llama3-8b-8192"
    })
    return reply.choices[0].message.content
}