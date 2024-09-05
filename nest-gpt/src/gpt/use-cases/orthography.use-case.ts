import OpenAI from 'openai';
interface Options {
    prompt: string;
}

export const orthographyUseCase = async ( openai: OpenAI, options: Options ) => {
    const { prompt } = options;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content: `
                Te serán proveídos textos en español con posibles errorers ortográficos y gramaticales,
                Las palabras pueden estar mal escritas, faltantes o mal acentuadas,
                Las palabras deben existir en el diccionario de la RAE,
                Debes de responder en formato JSON,
                tu tarea es corregirlos y retornar la información de la solución,
                también debes de dar un porcentaje de acierto por el usuario, 
                Si no hay errores, debes de retornar un mensaje de felicitaciones,
                Si no puedes corregir el texto, debes de retornar un mensaje de error.
                Ejemplo de respuesta:
                {
                    "correction": string[], // ['error -> corrección']
                    "userPercentAccuracy": string, // porcentaje
                    "message": string // 'usa emojis y texto para felicitar al usuario'
                }
                `,
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.3,
        max_tokens: 60,
    });

    const response = JSON.parse(completion.choices[0].message.content);

    return response;
}