# README.md

## WELCOME

Welcome to Braindance, we hope you enjoy this brainstorming journey

## Introduction

In this example, you will have a conversation with the US Treasury Secretary to get their latest thinking and gain investment insights

### Example Questions

## Getting Started

### 1. Clone the Code

```bash
git clone https://github.com/MemDreamDance/BrainDanceConsole.git
cd BrainDanceConsole
```

### 2. Configure the Backend

#### Install Python Dependencies

```bash
pip install openai flask flask-cors requests qdrant-client mem0ai
```

#### Install Qdrant Database

We recommend installing Qdrant using Docker:

```bash
docker pull qdrant/qdrant
docker run -p 6333:6333 -p 6334:6334 -v $(pwd)/qdrant_storage:/qdrant/storage qdrant/qdrant
```

#### Install Ollama Embedding Model

```bash
ollama pull mxbai-embed-large
```

#### Configure API Key

Modify the API key in [braindance_back/config.py](vscode-file://vscode-app/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html):

```python
API_KEY = "your DeepSeek API-key"

BASE_URL = "https://api.deepseek.com"
```

### 3. Configure the Frontend

#### Install Frontend Dependencies

```bash
cd braindance_front
npm install
```

#### Configure API Address

Ensure that the `API_BASE_URL` variable in [chatService.ts](vscode-file://vscode-app/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) and [memoryService.ts](vscode-file://vscode-app/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) points to the correct backend address and port. The default is:

```typescript
const API_BASE_URL = 'http://localhost:5002/api';
```

If you change the backend port, please update this address accordingly.

### 4. Run the Project

### Run the Backend Server

```bash
python run_braindance.py --port 5002
```

By default, the backend service will run on port 5002. You can specify a different port using the `--port` parameter.

#### 2. Run the Frontend Application

```bash
cd braindance_front
npm start
```

1. After successful startup, the frontend application will run on `http://localhost:3000`.

### 5. Usage Instructions

1. Open your browser and visit `http://localhost:3000`
2. Type messages in the chat window to converse with the AI
3. The system will automatically store conversation content as memories
4. Use the "Download Memory" button to export memory snapshots
5. Use the "Load Memory" button to import previously saved memory snapshots

## Project Structure

- ```bash
  - `braindance_back/` (Python backend code)
    - `api.py` (Flask API interface)
    - `chat.py` (Chat functionality implementation)
    - `config.py` (Configuration information)
    - `memory_store.py` (Memory storage and management)
    - `main.py` (Program entry point)
  
  - `braindance_front/` (React frontend code)
    - `src/` (Source code)
      - `components/` (UI components)
      - `api/` (API service calls)
      - `styles/` (Style files)
  
  - `your_memory/` (Memory snapshot storage directory)
  ```
  

## Other Configurations

### LLM

#### openAI

```python
API_KEY = "你的DeepSeek API密钥"

BASE_URL = "https://api.openai.com"

config = {
    "llm": {
        "provider": "openai",
        "config": {
            "model": "gpt-4o",
            "temperature": 0.2,
            "max_tokens": 2000,
        }
    }
}
```

#### Google AI

```python
API_KEY = "你的DeepSeek API密钥"

BASE_URL = "https://api.gemini.com"
config = {
    "llm": {
        "provider": "litellm",
        "config": {
            "model": "gemini/gemini-pro",
            "temperature": 0.2,
            "max_tokens": 2000,
        }
    }
}
```

## Troubleshooting

1. If the frontend cannot connect to the backend, please check:
   - Whether the backend service is running correctly
   - Whether the API address is configured correctly
   - Whether there are CORS restrictions
2. If the memory feature is not working, please check:
   - Whether the Qdrant database is running correctly
   - Whether the connection information in the configuration file is correct
3. If AI replies fail, please check:
   - Whether the API key is valid
   - Whether the network connection is normal

We hope you enjoy using the application!