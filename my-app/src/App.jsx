import React, { useState } from 'react';

// SUA CHAVE PÚBLICA POLLINATIONS
const API_KEY = 'pk_07BGBe3Q2xICOeWM';

// URLs dos Assets Oficiais do Pollinations
const ASSETS = {
  logoTextWhite: 'https://pollinations.ai/static/logo-text-white.png', // Logo Texto
  badge: 'https://pollinations.ai/static/badges/badge-white.svg', // Badge Oficial
  site: 'https://pollinations.ai'
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f0f13',
    color: '#e0e0e0',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between', // Garante que o footer fique no final se a tela for grande
  },
  contentWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  },
  logoHeader: {
    height: '40px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '2rem',
    margin: 0,
    background: 'linear-gradient(90deg, #00f0ff, #ff0099)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#1a1a20',
    borderRadius: '12px',
    padding: '2rem',
    width: '100%',
    maxWidth: '800px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    border: '1px solid #333',
  },
  tabs: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  tabButton: (isActive) => ({
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: isActive ? '#00f0ff' : '#333',
    color: isActive ? '#000' : '#fff',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  }),
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#25252b',
    color: '#fff',
    minHeight: '100px',
    fontSize: '1rem',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    background: 'linear-gradient(45deg, #00f0ff, #00aaff)',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    width: '100%',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '10px',
  },
  resultArea: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#000',
    borderRadius: '8px',
    minHeight: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed #444',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
  },
  textOutput: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
    textAlign: 'left',
    width: '100%',
  },
  footer: {
    marginTop: '3rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #333',
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  badge: {
    height: '40px',
    transition: 'transform 0.2s',
  }
};

export default function PollinationsApp() {
  const [activeTab, setActiveTab] = useState('image'); 
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageGeneration = () => {
    if (!prompt) return;
    setLoading(true);
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 100000);
    // Usando sua chave para gerar a imagem
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&private=true&model=flux&key=${API_KEY}`;
    
    setTimeout(() => {
        setResult(url);
        setLoading(false);
    }, 500);
  };

  const handleTextGeneration = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult(null);

    try {
      const encodedPrompt = encodeURIComponent(prompt);
      const url = `https://text.pollinations.ai/${encodedPrompt}?key=${API_KEY}&model=openai`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Falha na requisição');
      
      const text = await response.text();
      setResult(text);
    } catch (error) {
      console.error(error);
      setResult('Erro ao gerar texto. Verifique o console.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'image') handleImageGeneration();
    else handleTextGeneration();
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        
        {/* Header com Logo Oficial */}
        <header style={styles.header}>
            <a href={ASSETS.site} target="_blank" rel="noopener noreferrer">
                {/* Fallback visual caso a imagem do logo não carregue, usamos o texto */}
                <img 
                    src="https://pollinations.ai/k/logo_text_white.png" 
                    alt="pollinations.ai" 
                    style={styles.logoHeader} 
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
            </a>
            <h1 style={styles.title}>CREATIVE STUDIO</h1>
            <p style={{ color: '#888' }}>React Integration Demo</p>
        </header>

        <div style={styles.card}>
            {/* Abas */}
            <div style={styles.tabs}>
            <button 
                style={styles.tabButton(activeTab === 'image')} 
                onClick={() => { setActiveTab('image'); setResult(null); }}
            >
                🖼️ Gerar Imagem
            </button>
            <button 
                style={styles.tabButton(activeTab === 'text')} 
                onClick={() => { setActiveTab('text'); setResult(null); }}
            >
                📝 Gerar Texto
            </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} style={styles.inputGroup}>
                <label style={{ fontWeight: 'bold', color: '#00f0ff' }}>
                    {activeTab === 'image' ? 'Descreva a imagem:' : 'Digite sua instrução:'}
                </label>
                <textarea
                    style={styles.textarea}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={activeTab === 'image' 
                        ? "Ex: Um programador cyberpunk codando em Tóquio..." 
                        : "Ex: Crie um post para blog sobre tecnologia..."}
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Processando...' : activeTab === 'image' ? 'RENDERIZAR' : 'GERAR TEXTO'}
                </button>
            </form>

            {/* Área de Resultado */}
            <div style={styles.resultArea}>
                {loading ? (
                    <div style={{ color: '#00f0ff', animation: 'pulse 1s infinite' }}>
                        Conectando à Hive Mind...
                    </div>
                ) : result ? (
                    activeTab === 'image' ? (
                        <div style={{ textAlign: 'center' }}>
                            <img 
                                src={result} 
                                alt="Generated" 
                                style={styles.image} 
                            />
                            <div style={{marginTop: '0.5rem'}}>
                                <a href={result} target="_blank" rel="noreferrer" style={{color: '#00f0ff', fontSize: '0.9rem'}}>
                                    Abrir Original
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div style={styles.textOutput}>
                            {result}
                        </div>
                    )
                ) : (
                    <span style={{ color: '#555' }}>O resultado aparecerá aqui</span>
                )}
            </div>
        </div>
      </div>

      {/* Footer com Badge Oficial e Link */}
      <footer style={styles.footer}>
          <a href={ASSETS.site} target="_blank" rel="noopener noreferrer">
             <img 
                src="https://img.shields.io/badge/Built%20With-Pollinations.ai-blue?style=for-the-badge&logo=pollinations&logoColor=white" 
                alt="Built With Pollinations.ai"
                style={styles.badge}
             />
          </a>
          <p style={{fontSize: '0.8rem', color: '#666'}}>
             Powered by <a href={ASSETS.site} target="_blank" rel="noopener noreferrer" style={{color: '#00f0ff', textDecoration: 'none'}}>pollinations.ai</a>
          </p>
      </footer>
    </div>
  );
}