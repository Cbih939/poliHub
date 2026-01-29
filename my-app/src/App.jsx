import React, { useState } from 'react';

// SUA CHAVE PÚBLICA POLLINATIONS
const API_KEY = 'pk_07BGBe3Q2xICOeWM';

// Estilos simples para interface Dark/Tech (inspirado em Cyberpunk)
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
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
    borderBottom: '2px solid #00f0ff',
    paddingBottom: '1rem',
    width: '100%',
    maxWidth: '800px',
  },
  title: {
    fontSize: '2.5rem',
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
  meta: {
    fontSize: '0.8rem',
    color: '#666',
    marginTop: '0.5rem',
  }
};

export default function PollinationsApp() {
  const [activeTab, setActiveTab] = useState('image'); // 'image' or 'text'
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Função para gerar IMAGEM
  const handleImageGeneration = () => {
    if (!prompt) return;
    setLoading(true);
    
    // Codifica o prompt para URL
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Adiciona seed aleatória para garantir que a imagem mude se o usuário clicar de novo
    const seed = Math.floor(Math.random() * 100000);
    
    // Constrói a URL com a API Key (pk_...)
    // Parâmetros: width/height, nologo (remove marca d'água se permitido), private (não aparece no feed público)
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&private=true&model=flux&key=${API_KEY}`;
    
    // Para imagens, o Pollinations retorna a imagem diretamente, então apenas setamos a URL
    // Damos um pequeno timeout simulado para UX, pois a imagem carrega via browser
    setTimeout(() => {
        setResult(url);
        setLoading(false);
    }, 500);
  };

  // Função para gerar TEXTO
  const handleTextGeneration = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult(null);

    try {
      // Usando o endpoint GET simplificado para texto
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
      <header style={styles.header}>
        <h1 style={styles.title}>POLLINATIONS STUDIO</h1>
        <p style={{ color: '#888' }}>Powered by AI & React</p>
      </header>

      <div style={styles.card}>
        {/* Abas de Seleção */}
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
                {activeTab === 'image' ? 'Descreva a imagem:' : 'Digite sua instrução ou pergunta:'}
            </label>
            <textarea
                style={styles.textarea}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={activeTab === 'image' 
                    ? "Ex: Um programador cyberpunk codando em Tóquio, luzes neon, anime style..." 
                    : "Ex: Crie um título SEO para um review de um teclado mecânico..."}
            />
            <button type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Processando...' : activeTab === 'image' ? 'RENDERIZAR' : 'GERAR TEXTO'}
            </button>
        </form>

        {/* Área de Resultado */}
        <div style={styles.resultArea}>
            {loading ? (
                <div style={{ color: '#00f0ff', animation: 'pulse 1s infinite' }}>
                    Conectando à Matrix...
                </div>
            ) : result ? (
                activeTab === 'image' ? (
                    <div style={{ textAlign: 'center' }}>
                        <img 
                            src={result} 
                            alt="Generated" 
                            style={styles.image} 
                            onError={(e) => { e.target.style.display='none'; alert('Erro ao carregar imagem. Tente novamente.'); }}
                        />
                        <div style={styles.meta}>
                            <a href={result} target="_blank" rel="noreferrer" style={{color: '#00f0ff'}}>Baixar Original</a>
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
        
        <div style={{marginTop: '1rem', fontSize: '0.7rem', color: '#444', textAlign: 'center'}}>
            API Key: {API_KEY.slice(0, 8)}... (Configurada)
        </div>
      </div>
    </div>
  );
}