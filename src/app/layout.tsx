import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Shell } from '@/components/Layout/Shell';

export const metadata = {
  title: 'Hiveden Dashboard',
  description: 'Manage your Hiveden server',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <Shell>{children}</Shell>
        </MantineProvider>
      </body>
    </html>
  );
}
