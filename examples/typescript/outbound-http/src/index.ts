declare const spinSdk: any;

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export async function handleRequest(_request: any) {
    const dogFact = await fetch("https://some-random-api.ml/facts/dog")

    const dogFactBody = decoder.decode(await dogFact.arrayBuffer() || new Uint8Array())

    const env = JSON.stringify(process.env)

    const body = `${spinSdk.config.get("message")}\nenv: ${env}\nHere's a dog fact: ${dogFactBody}\n`

    return {
        status: 200,
        headers: { "foo": "bar" },
        body: encoder.encode(body).buffer
    }
}
