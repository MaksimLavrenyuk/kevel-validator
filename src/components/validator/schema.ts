export const SCHEMA = {
    type: "object",
    properties: {
        priority: { type: "integer" },
        clickURL: {
            type: "object",
            properties: {
                src: {
                    type: "object",
                    properties: {
                        deeplink: { type: "string" },
                        web: { type: "string" }
                    }
                }
            },
        }
    },
    additionalProperties: false,
}
