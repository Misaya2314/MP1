// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "\u535A\u5BA2\u6587\u7AE0",
        path: "src/content/blog",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "\u6807\u9898",
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "\u53D1\u5E03\u65E5\u671F",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "\u63CF\u8FF0",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "\u5185\u5BB9",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
