import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
    plugins: [pluginReact()],
    resolve: {
        alias: {
            '@': './src',
        },
    },
    html: {
        title: 'Benefits Admin',
        meta: {
            description: 'Admin dashboard for managing employee benefits enrolment.',
            viewport: 'width=device-width, initial-scale=1',
        },
    },
});
