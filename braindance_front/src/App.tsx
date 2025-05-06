import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { creatorTheme, cyberTheme } from './styles/theme';
import { CyberBackground, GridLines } from './components/CyberBackground';
import { NeonText } from './components/NeonText';
import { MemoryButton } from './components/MemoryButton';
import { ChatWindow } from './components/ChatWindow';
import { ModeSwitch } from './components/ModeSwitch';
// import { motion } from 'framer-motion';
import styled from 'styled-components';
import { memoryService } from './api/memoryService';


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
`;

const StatusMessage = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-top: 1rem;
  min-height: 1.5rem;
`;

export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}

export default function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSavingEpisodicMemory, setIsSavingEpisodicMemory] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [creatorMode, setCreatorMode] = useState<boolean>(false);

  // Handle memory download
  const handleDownloadMemory = async () => {
    setIsDownloading(true);
    setStatusMessage('Exporting memory...');

    try {
      const exportedHistory = messages.map(message => ({
        "role": message.isUser ? "user" : "assistant",
        "content": message.text
      }));
      const blob = new Blob([JSON.stringify({ "messages": exportedHistory })], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'memory.snapshot';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusMessage(`Memory exported: memory.snapshot`);
    } catch (error) {
      setStatusMessage(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle memory upload
  const handleUploadMemory = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setIsUploading(true);
    setStatusMessage(`Uploading memory: ${file.name}...`);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedMessages: { messages: { role: string, content: string }[] } = JSON.parse(content);
        if (!parsedMessages.messages || !Array.isArray(parsedMessages.messages)) {
          throw new Error('Invalid file format. Expected an array of messages.');
        }
        setMessages(parsedMessages.messages.map((msg, index) => ({
          id: index,
          text: msg.content,
          isUser: msg.role === 'user',
          isTyping: false,
        })));
        setStatusMessage(`Memory successfully imported`);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setStatusMessage(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsText(file);
  };

  const handleSaveEpisodicMemory = async () => {
    setIsSavingEpisodicMemory(true);
    try {
      await memoryService.saveEpisodicMemory();
    } catch (error) {
      setStatusMessage(`Save failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSavingEpisodicMemory(false);
    }
  }

  return (
    <ThemeProvider theme={creatorMode ? creatorTheme : cyberTheme}>
      <GlobalStyle />
      <CyberBackground />
      <GridLines />

      <AppContainer>
        <NeonText style={{ fontSize: '3rem', marginBottom: '2rem' }}>
          BRAIN DANCE v2.0.77
        </NeonText>

        <ControlPanel>
          <MemoryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadMemory}
            disabled={isDownloading}
          >
            {isDownloading ? 'Downloading...' : 'Download Memory'}
          </MemoryButton>
          <MemoryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('memory-upload')?.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Load Memory'}
          </MemoryButton>
          <ModeSwitch creatorMode={creatorMode} setCreatorMode={setCreatorMode} />
          {creatorMode && (
            <MemoryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveEpisodicMemory}>
              {isSavingEpisodicMemory ? 'Saving...' : 'Save Episodic Memory'}
            </MemoryButton>
          )}
          <input
            id="memory-upload"
            type="file"
            hidden
            accept=".snapshot"
            onChange={handleUploadMemory}
          />
        </ControlPanel>

        <StatusMessage>{statusMessage}</StatusMessage>

        <ChatWindow messages={messages} setMessages={setMessages} creatorMode={creatorMode} />
      </AppContainer>
    </ThemeProvider>
  );
}