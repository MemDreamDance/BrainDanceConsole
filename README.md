# README.md

## WELCOME

Welcome to Braindance, we hope you enjoy this brainstorming journey

## Introduction

In this example, you will have a conversation with the US Treasury Secretary to get their latest thinking and gain investment insights

## Getting Started

### 1. Clone the Code

```bash
git clone https://github.com/MemDreamDance/BrainDanceConsole.git
cd BrainDanceConsole
```

### 2. 启动后端服务

#### 方法一：使用 Docker Compose（推荐）

我们提供了 Docker Compose 配置文件来简化部署过程：

1. 确保已安装 Docker 和 Docker Compose
2. 在项目根目录下运行：

```bash
cd braindance_back
docker-compose up -d
```

这将自动启动以下服务：
- Weaviate 向量数据库 (端口 8080)
- Ollama 模型服务 (端口 11434)

等待所有容器启动完成后，可以使用以下命令检查状态：

```bash
docker-compose ps
```

#### 方法二：手动配置

如果您不想使用 Docker Compose，也可以手动配置各个组件：

1. 安装 Python 依赖：
```bash
pip install openai flask flask-cors requests qdrant-client mem0ai
```

2. 安装 Qdrant 数据库：
```bash
docker pull qdrant/qdrant
docker run -p 6333:6333 -p 6334:6334 -v $(pwd)/qdrant_storage:/qdrant/storage qdrant/qdrant
```

3. 安装 Ollama 嵌入模型：
```bash
ollama pull mxbai-embed-large
```

### 3. 配置 API 密钥

修改 [braindance_back/config.py] 中的 API 密钥：

```python
API_KEY = "your DeepSeek API-key"
BASE_URL = "https://api.deepseek.com"
```

### 4. 配置前端

1. 安装前端依赖：
```bash
cd braindance_front
npm install
```

2. 配置 API 地址：
确保 chatService.ts 和 memoryService.ts 中的 API_BASE_URL 指向正确的后端地址：

```typescript
const API_BASE_URL = 'http://localhost:5002/api';
```

### 5. 运行项目

1. 启动后端服务：
```bash
python run_braindance.py --port 5002
```

2. 启动前端应用：
```bash
cd braindance_front
npm start
```

访问 http://localhost:3000 开始使用应用。

## 项目结构

```
- braindance_back/ (Python 后端代码)
  - api.py (Flask API 接口)
  - chat.py (聊天功能实现)
  - config.py (配置信息)
  - memory_store.py (记忆存储和管理)
  - main.py (程序入口点)
  - docker-compose.yaml (Docker 编排配置)

- braindance_front/ (React 前端代码)
  - src/
    - components/ (UI 组件)
    - api/ (API 服务调用)
    - styles/ (样式文件)

- your_memory/ (记忆快照存储目录)
```

## 其他配置

### LLM 配置

#### OpenAI

```python
API_KEY = "你的 DeepSeek API 密钥"
BASE_URL = "https://api.openai.com"

config = {
    "llm": {
        "provider": "openai",
        "config": {
            "model": "gpt-4",
            "temperature": 0.2,
            "max_tokens": 2000,
        }
    }
}
```

#### Google AI

```python
API_KEY = "你的 DeepSeek API 密钥"
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