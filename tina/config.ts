import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "博客文章",
        path: "src/content/blog",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "发布日期",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "内容",
            isBody: true,
          },
        ],
      },
      {
        name: "music",
        label: "音乐管理",
        path: "src/content/music",
        format: "json",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return values?.title
                ?.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                || '';
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "歌曲名称",
            required: true,
          },
          {
            type: "string",
            name: "artist",
            label: "艺术家",
            required: true,
          },
          {
            type: "image",
            name: "cover",
            label: "封面图片",
            required: false,
          },
          {
            type: "image",
            name: "audioFile",
            label: "音频文件",
            description: "上传音乐文件 (支持 .mp3, .wav, .ogg 格式)",
            required: true,
          },
          {
            type: "boolean",
            name: "active",
            label: "启用",
            description: "是否在音乐播放器中显示该歌曲",
            required: true,
            ui: {
              defaultValue: true,
            },
          },
        ],
      },
    ],
  },
}); 