export class RenderHelper {
    public static renderWithParams(content: string, params: object): string {
        let renderedContent = content;

        for (const key in params) {
            if (params.hasOwnProperty(key) === false) {
                continue;
            }

            const paramValue = params[key];
            const regex = new RegExp(`{{${key}}}`, "g");
            renderedContent = renderedContent.replace(regex, paramValue);
        }

        return renderedContent;
    }
}
