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
      mediaRoot: "uploads",
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
      },
      {
        name: "music",
        label: "\u97F3\u4E50\u7BA1\u7406",
        path: "src/content/music",
        format: "json",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "";
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "\u6B4C\u66F2\u540D\u79F0",
            required: true
          },
          {
            type: "string",
            name: "artist",
            label: "\u827A\u672F\u5BB6",
            required: true
          },
          {
            type: "image",
            name: "cover",
            label: "\u5C01\u9762\u56FE\u7247",
            required: false
          },
          {
            type: "image",
            name: "audioFile",
            label: "\u97F3\u9891\u6587\u4EF6",
            description: "\u4E0A\u4F20\u97F3\u4E50\u6587\u4EF6 (\u652F\u6301 .mp3, .wav, .ogg \u683C\u5F0F)",
            required: true
          },
          {
            type: "boolean",
            name: "active",
            label: "\u542F\u7528",
            description: "\u662F\u5426\u5728\u97F3\u4E50\u64AD\u653E\u5668\u4E2D\u663E\u793A\u8BE5\u6B4C\u66F2",
            required: true,
            ui: {
              defaultValue: true
            }
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
