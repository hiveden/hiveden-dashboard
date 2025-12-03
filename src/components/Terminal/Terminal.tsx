'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { Card, Badge, Group, ActionIcon, Text, Box } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { ShellService } from '@/services/shellService';
import 'xterm/css/xterm.css';

interface TerminalProps {
  sessionId: string;
  onClose?: () => void;
  title?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ sessionId, onClose, title = 'Terminal' }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const shellService = new ShellService();

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm.js
    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#f0f0f0',
        cursor: '#4caf50',
        black: '#000000',
        red: '#e06c75',
        green: '#98c379',
        yellow: '#d19a66',
        blue: '#61afef',
        magenta: '#c678dd',
        cyan: '#56b6c2',
        white: '#abb2bf',
        brightBlack: '#5c6370',
        brightRed: '#e06c75',
        brightGreen: '#98c379',
        brightYellow: '#d19a66',
        brightBlue: '#61afef',
        brightMagenta: '#c678dd',
        brightCyan: '#56b6c2',
        brightWhite: '#ffffff',
      },
      allowProposedApi: true,
    });

    // Add addons
    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    
    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);

    // Open terminal
    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Connect to WebSocket
    const ws = shellService.connectToSession(sessionId);

    ws.onopen = () => {
      setIsConnected(true);
      term.writeln('\x1b[1;32m● Connected to shell session\x1b[0m');
      term.writeln('');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === 'output') {
          term.write(message.data.output);
        } else if (message.type === 'error') {
          term.writeln(`\x1b[1;31mError: ${message.message}\x1b[0m`);
        } else if (message.type === 'exit') {
          term.writeln('');
          term.writeln(`\x1b[1;33m● Session ended with exit code: ${message.data.exit_code}\x1b[0m`);
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      term.writeln('');
      term.writeln('\x1b[1;31m○ Disconnected from shell session\x1b[0m');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
      term.writeln('');
      term.writeln('\x1b[1;31m✗ Connection error\x1b[0m');
    };

    wsRef.current = ws;

    // Handle terminal input
    term.onData((data) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'input',
          data: data
        }));
      }
    });

    // Handle window resize
    const handleResize = () => {
      fitAddon.fit();
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'resize',
          cols: term.cols,
          rows: term.rows
        }));
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      ws.close();
      term.dispose();
    };
  }, [sessionId]);

  return (
    <Card shadow="sm" padding="0" radius="md" withBorder>
      <Box p="xs" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
        <Group justify="space-between">
          <Group gap="xs">
            <Text size="sm" fw={500}>{title}</Text>
            <Badge 
              size="sm" 
              color={isConnected ? 'green' : 'gray'}
              variant="dot"
            >
              {isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </Group>
          {onClose && (
            <ActionIcon 
              variant="subtle" 
              color="gray" 
              onClick={onClose}
              size="sm"
            >
              <IconX size={16} />
            </ActionIcon>
          )}
        </Group>
      </Box>
      <Box
        ref={terminalRef}
        style={{
          height: '500px',
          padding: '8px',
          overflow: 'hidden',
        }}
      />
    </Card>
  );
};
